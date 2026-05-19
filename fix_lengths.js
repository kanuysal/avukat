const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

// The format in the string is 17:T<hex>,<text>12:[
// We need to find 17:T<hex>, and the text until 12:[
content = content.replace(/(17:T)([0-9a-f]+),(.*?)(12:\[)/g, (match, p1, p2, p3, p4) => {
  // calculate byte length of p3
  // Since it's inside a JS string, we should unescape it first to get the actual bytes?
  // Actually, Next.js calculates the byte length of the UTF-8 encoded string.
  // Let's just unescape the JSON string.
  // It's mostly regular characters, but let's do a simple calculation:
  // p3 is the literal text inside the JS string. We need to unescape \\", \\n, etc.
  const unescaped = p3.replace(/\\\\/g, '\\').replace(/\\"/g, '"').replace(/\\n/g, '\n');
  const byteLen = Buffer.byteLength(unescaped, 'utf8');
  return `${p1}${byteLen.toString(16)},${p3}${p4}`;
});

content = content.replace(/(18:T)([0-9a-f]+),(.*?)(13:\[)/g, (match, p1, p2, p3, p4) => {
  const unescaped = p3.replace(/\\\\/g, '\\').replace(/\\"/g, '"').replace(/\\n/g, '\n');
  const byteLen = Buffer.byteLength(unescaped, 'utf8');
  return `${p1}${byteLen.toString(16)},${p3}${p4}`;
});

// There might be others? Let's check for any <number>:T<hex>,
// But we only know the boundaries for 17 and 18 based on 12 and 13.
fs.writeFileSync(indexPath, content, 'utf8');
console.log("Lengths fixed in index.html");
