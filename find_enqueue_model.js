const fs = require('fs');
const path = require('path');

const chunkFile = path.join(__dirname, '_next', 'static', 'chunks', '17.79-onzp9ko.js');
if (!fs.existsSync(chunkFile)) {
  console.log("File not found!");
  process.exit(1);
}
const content = fs.readFileSync(chunkFile, 'utf8');

const regex = /enqueueModel/gi;
let match;
while ((match = regex.exec(content)) !== null) {
  const startIndex = Math.max(0, match.index - 200);
  const endIndex = Math.min(content.length, match.index + 200);
  console.log(`Context: ${content.substring(startIndex, endIndex)}`);
}
