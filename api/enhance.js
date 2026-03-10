const ALLOWED_ORIGIN = "https://cinematic-prompt-snowy.vercel.app";
const MAX_INPUT = 8000;
const CLIENT_ID = "730553596086-s59f1v381pocjk3gr992m8u18s3724k2.apps.googleusercontent.com";

function cors(res) {
  res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

async function verifyGoogleToken(idToken) {
  const resp = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`);
  if (!resp.ok) return null;
  const data = await resp.json();
  if (data.aud !== CLIENT_ID) return null;
  if (data.exp < Date.now() / 1000) return null;
  return data;
}

async function getBestModel(apiKey) {
  const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
  if (!resp.ok) return "gemini-1.5-flash";
  const data = await resp.json();
  const models = (data.models || []).map(m => m.name.replace("models/", ""));
  // prefer flash variants in order of preference
  const preferred = ["gemini-2.0-flash", "gemini-2.5-flash", "gemini-1.5-flash"];
  for (const p of preferred) {
    const match = models.find(m => m.startsWith(p));
    if (match) return match;
  }
  // fallback: first model that supports generateContent
  return models[0] || "gemini-1.5-flash";
}

async function callGemini(prompt, instructions, apiKey) {
  const model = await getBestModel(apiKey);
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const system = `You are an expert AI image/video prompt engineer. Enhance the given prompt — richer visual language, more cinematic precision, weave in any additional instructions naturally. Return ONLY the enhanced prompt text, nothing else.`;
  const userMsg = instructions?.trim()
    ? `Enhance this prompt. Additional instructions: "${instructions}"\n\nPrompt:\n${prompt}`
    : `Enhance this prompt with richer visual language and cinematic precision:\n\n${prompt}`;
  const resp = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: system }] },
      contents: [{ role: "user", parts: [{ text: userMsg }] }],
      generationConfig: { temperature: 0.8, maxOutputTokens: 2048 }
    })
  });
  if (!resp.ok) {
    const e = await resp.json();
    throw new Error(e.error?.message || "Gemini API error");
  }
  const data = await resp.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
}

module.exports = async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { prompt, instructions, idToken } = req.body || {};

  if (!prompt || prompt.length > MAX_INPUT)
    return res.status(400).json({ error: "Invalid or too large prompt" });

  if (!idToken)
    return res.status(401).json({ error: "Sign in with Google to use this feature" });

  const user = await verifyGoogleToken(idToken);
  if (!user)
    return res.status(401).json({ error: "Invalid or expired Google token" });

  try {
    const result = await callGemini(prompt, instructions, process.env.GEMINI_API_KEY);
    return res.status(200).json({ result });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
