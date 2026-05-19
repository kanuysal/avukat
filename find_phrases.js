const fs = require('fs');
const path = require('path');

const chunkFile = path.join(__dirname, '_next', 'static', 'chunks', '09d2g3rtnbzgs.js');
const content = fs.readFileSync(chunkFile, 'utf8');

const regexes = [
  /Showcase/gi,
  /Companies Serious/gi,
  /Act Now/gi,
  /Convinced/gi,
  /Enough/gi
];

for (const regex of regexes) {
  let match;
  console.log(`--- Matches for ${regex} ---`);
  while ((match = regex.exec(content)) !== null) {
    const startIndex = Math.max(0, match.index - 100);
    const endIndex = Math.min(content.length, match.index + 100);
    console.log(`Context: ${content.substring(startIndex, endIndex)}`);
  }
}
