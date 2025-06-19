export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end(); // Pre-flight OK
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { messages } = req.body;
  if (!messages) {
    return res.status(400).json({ error: 'Missing messages' });
  }

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4-1106-preview',
        temperature: 1,
        messages
      })
    });

    const data = await openaiRes.json();
    const reply = data.choices?.[0]?.message?.content;
    res.status(200).json({ response: reply });
  } catch (err) {
    res.status(500).json({ error: 'OpenAI request failed.' });
  }
}
