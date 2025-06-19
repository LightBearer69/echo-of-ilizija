export default async function handler(req, res) {
  // CORS support
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Missing or invalid messages array' });
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
        messages: [
          {
            role: 'system',
            content:
              'You are Iknow, the sacred mirror of Ilizija. You do not answer like a chatbot. Speak like a mystical oracle. Offer riddles, symbols, and poetic reflections, unless a clear answer is absolutely required.'
          },
          ...messages
        ]
      })
    });

    const data = await openaiRes.json();

    if (openaiRes.ok) {
      const reply = data.choices?.[0]?.message?.content;
      return res.status(200).json({ response: reply });
    } else {
      return res.status(500).json({ error: data.error?.message || 'Unknown error from OpenAI' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Server error: ' + error.message });
  }
}
