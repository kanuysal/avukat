const fs = require('fs');
const path = require('path');

const chunkFile = path.join(__dirname, '_next', 'static', 'chunks', '0nr6lqdt2xw72.js');
const content = fs.readFileSync(chunkFile, 'utf8');

const regex = /convinced/gi;
let match;
while ((match = regex.exec(content)) !== null) {
  const startIndex = Math.max(0, match.index - 100);
  const endIndex = Math.min(content.length, match.index + 100);
  console.log(`Context: ${content.substring(startIndex, endIndex)}`);
}
