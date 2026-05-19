const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

const regex = /(\d+:T)([0-9a-f]+),(.*?)((?:\d+:\[)|(?:"\}\]\)))/g;
let match;
while ((match = regex.exec(content)) !== null) {
  console.log("--- Found T chunk ---");
  console.log("Prefix:", match[1]);
  console.log("Length (hex):", match[2], "-> Dec:", parseInt(match[2], 16));
  console.log("Content preview:", match[3].substring(0, 150));
  console.log("Actual char count:", match[3].length);
  const unescaped = match[3].replace(/\\\\/g, '\\').replace(/\\"/g, '"').replace(/\\n/g, '\n');
  console.log("Actual byte length of unescaped:", Buffer.byteLength(unescaped, 'utf8'));
  console.log("Actual byte length of raw match:", Buffer.byteLength(match[3], 'utf8'));
}
