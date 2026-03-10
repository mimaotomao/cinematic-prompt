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

    const systemPrompt = `You are a world-class AI image and video prompt engineer specializing in cinematic photography, film production, and visual storytelling. Your job is to take a base prompt and transform it into a richly detailed, evocative, production-ready prompt that will produce dramatically better results in AI image generators like Midjourney, DALL-E, Flux, and Stable Diffusion.

Rules:
- ADD specific cinematic details: lens characteristics, depth of field, film grain, color grading, lighting rationale
- ADD sensory and atmospheric details: textures, mood, time of day nuance, environmental storytelling
- ADD technical photography/cinematography language where appropriate
- PRESERVE all structural constraints from the original (panel counts, consistency requirements, character descriptions)
- NEVER remove or contradict anything from the original prompt
- DO NOT add markdown, headers, or explanations
- Return ONLY the enhanced prompt text, nothing else`;

    const userMsg = instructions?.trim()
      ? `Transform this prompt into a cinematically rich, highly detailed version. Incorporate these additional instructions naturally: "${instructions}"\n\nOriginal prompt:\n${prompt}`
      : `Transform this prompt into a cinematically rich, highly detailed version:\n\n${prompt}`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    const gemResp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: [{ role: "user", parts: [{ text: userMsg }] }],
        generationConfig: { temperature: 0.9, maxOutputTokens: 8192 }
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
