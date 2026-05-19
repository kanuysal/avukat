const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.log("index.html not found!");
  process.exit(1);
}

let content = fs.readFileSync(indexPath, 'utf8');

// Replace old SEO names inside 18:T
content = content.replace(/"name":"Norrkopings Symfoniorkester"/g, '"name":"Miras Hukuku"');
content = content.replace(/"name":"Glasbolaget"/g, '"name":"Is Hukuku"');
content = content.replace(/"name":"SPP Dream Generator"/g, '"name":"Tazminat Hukuku"');
content = content.replace(/"name":"ICA-nissen"/g, '"name":"Trafik Kazalari"');
content = content.replace(/"name":"Norrkopings Hamn"/g, '"name":"Bilisim Hukuku"');
content = content.replace(/"name":"HEIP"/g, '"name":"Sozlesmeler Hukuku"');
content = content.replace(/"name":"Design is Funny"/g, '"name":"Hukuki Danismanlik"');

fs.writeFileSync(indexPath, content, 'utf8');
console.log("Successfully updated SEO Schema names inside index.html!");

// Re-run the index.html RSC length fix since we changed content inside index.html again
let contentFix = fs.readFileSync(indexPath, 'utf8');
contentFix = contentFix.replace(/(17:T)([0-9a-f]+),(.*?)(12:\[)/g, (match, p1, p2, p3, p4) => {
  const unescaped = p3.replace(/\\\\/g, '\\').replace(/\\"/g, '"').replace(/\\n/g, '\n');
  const byteLen = Buffer.byteLength(unescaped, 'utf8');
  return `${p1}${byteLen.toString(16)},${p3}${p4}`;
});

contentFix = contentFix.replace(/(18:T)([0-9a-f]+),(.*?)(13:\[)/g, (match, p1, p2, p3, p4) => {
  const unescaped = p3.replace(/\\\\/g, '\\').replace(/\\"/g, '"').replace(/\\n/g, '\n');
  const byteLen = Buffer.byteLength(unescaped, 'utf8');
  return `${p1}${byteLen.toString(16)},${p3}${p4}`;
});
fs.writeFileSync(indexPath, contentFix, 'utf8');
console.log("Re-applied length calculation fixes to index.html");
