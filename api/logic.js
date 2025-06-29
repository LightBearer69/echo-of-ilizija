export async function createResponse(messages, memory = []) {
  const enrichedMessages = [
    ...memory.map((entry) => ({
      role: entry.role || "system",
      content: entry.content,
    })),
    ...messages
  ];

  const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4-1106-preview',
      temperature: 1,
      messages: enrichedMessages
    })
  });

  const data = await openaiRes.json();

  if (!openaiRes.ok) {
    throw new Error(data.error?.message || 'OpenAI API error');
  }

  return data.choices?.[0]?.message?.content;
}
