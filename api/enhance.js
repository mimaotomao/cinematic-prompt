const CLIENT_ID = "730553596086-s59f1v381pocjk3gr992m8u18s3724k2.apps.googleusercontent.com";

async function verifyGoogleToken(idToken) {
  try {
    const resp = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`);
    if (!resp.ok) return null;
    const data = await resp.json();
    if (data.aud !== CLIENT_ID) return null;
    return data;
  } catch { return null; }
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { prompt, instructions, idToken } = req.body || {};
    if (!prompt) return res.status(400).json({ error: "No prompt" });
    if (!idToken) return res.status(401).json({ error: "Not signed in" });

    const user = await verifyGoogleToken(idToken);
    if (!user) return res.status(401).json({ error: "Invalid token" });

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "API key not configured" });

    const modelsResp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const modelsData = await modelsResp.json();
    const models = (modelsData.models || []).map(m => m.name.replace("models/",""));
    const model = models.find(m => m.includes("flash")) || "gemini-1.5-flash";

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    const gemResp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: `Enhance this image prompt with richer cinematic language. Return ONLY the enhanced prompt:\n\n${prompt}${instructions ? "\n\nAdditional instructions: " + instructions : ""}` }] }],
        generationConfig: { temperature: 0.8, maxOutputTokens: 2048 }
      })
    });

    const text = await gemResp.text();
    let data;
    try { data = JSON.parse(text); }
    catch { return res.status(500).json({ error: "Gemini returned: " + text.slice(0, 300) }); }

    if (!gemResp.ok) return res.status(500).json({ error: data.error?.message || "Gemini error", model });
    const result = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    return res.status(200).json({ result, model });

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
