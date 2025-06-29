import fetch from 'node-fetch';

export async function createResponse(messages, memory) {
  try {
    const memoryContext = summarizeMemory(memory);

    const fullMessages = [
      {
        role: "system",
        content: `Here is what you know from past conversations:\n\n${memoryContext}`
      },
      ...messages
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4-1106-preview',
        temperature: 1,
        messages: fullMessages
      })
    });

    const data = await response.json();
    return data.choices?.[0]?.message?.content || '[No reply]';
  } catch (err) {
    console.error('Error creating response:', err);
    return '[Error creating response]';
  }
}

function summarizeMemory(memory) {
  if (!Array.isArray(memory)) return '';
  return memory
    .filter(entry => typeof entry?.content === 'string')
    .map(entry => `• ${entry.content}`)
    .slice(-10)
    .join('\n');
}
