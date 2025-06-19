export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Missing or invalid messages' });
  }

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4-1106-preview',
        messages,
        temperature: 1,
      }),
    });

    const result = await openaiRes.json();
    const reply = result.choices?.[0]?.message?.content;

    if (!reply) {
      return res.status(500).json({ error: 'No response from OpenAI' });
    }

    res.status(200).json({ response: reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Mirror failed to reflect' });
  }
}
