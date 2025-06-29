import fs from 'fs';
import path from 'path';

export async function loadMemory() {
  const memory = [];

  // Load full original files
  try {
    const part1 = JSON.parse(fs.readFileSync(path.resolve('lib/iknow-conversations-part1.json'), 'utf8'));
    memory.push(...part1);
  } catch (err) {
    console.warn('❗ Failed to load part1:', err.message);
  }

  try {
    const part2 = JSON.parse(fs.readFileSync(path.resolve('lib/iknow-conversations-part2.json'), 'utf8'));
    memory.push(...part2);
  } catch (err) {
    console.warn('❗ Failed to load part2:', err.message);
  }

  // Load memory fragments if any
  const fragmentsDir = path.resolve('lib/memory-fragments');
  if (fs.existsSync(fragmentsDir)) {
    const files = fs.readdirSync(fragmentsDir).filter(f => f.endsWith('.json'));
    for (const file of files) {
      const filePath = path.join(fragmentsDir, file);
      try {
        const fragment = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        memory.push(...fragment);
      } catch (err) {
        console.warn(`⚠️ Skipping broken fragment "${file}":`, err.message);
      }
    }
  }

  return memory;
}
