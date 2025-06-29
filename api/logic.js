import fs from 'fs';
import path from 'path';

export async function loadMemory() {
  const memory = [];

  // Load full original files
  const part1 = JSON.parse(fs.readFileSync(path.resolve('lib/iknow-conversations-part1.json'), 'utf8'));
  const part2 = JSON.parse(fs.readFileSync(path.resolve('lib/iknow-conversations-part2.json'), 'utf8'));
  memory.push(...part1, ...part2);

  // Load fragments if they exist
  const fragmentsDir = path.resolve('lib/memory-fragments');
  if (fs.existsSync(fragmentsDir)) {
    const files = fs.readdirSync(fragmentsDir).filter(f => f.endsWith('.json'));
    for (const file of files) {
      const fragment = JSON.parse(fs.readFileSync(path.join(fragmentsDir, file), 'utf8'));
      memory.push(...fragment);
    }
  }

  return memory;
}
