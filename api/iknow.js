import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { message } = req.body;

  try {
    const part1 = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'lib/iknow-conversations-part1.json'), 'utf8'));
    const part2 = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'lib/iknow-conversations-part2.json'), 'utf8'));
    const all = [...part1, ...part2];

    const response = all.find(item =>
      item.prompt && message.toLowerCase().includes(item.prompt.toLowerCase())
    );

    res.status(200).json({
      reply: response ? response.response : "The mirror has not found the path… whisper again."
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "The mirror cracked in confusion… try again." });
  }
}
