const fs = require('fs');
const path = require('path');

const filesToClean = [
  path.join(__dirname, 'index.html'),
  path.join(__dirname, '_next', 'static', 'chunks', '09d2g3rtnbzgs.js'),
  path.join(__dirname, '_next', 'static', 'chunks', '0nr6lqdt2xw72.js'),
  path.join(__dirname, '_next', 'static', 'chunks', '12vmxu4i7-3qm.js')
];

function toEnglishFriendly(text) {
  return text
    .replace(/ı/g, 'i')
    .replace(/İ/g, 'I')
    .replace(/ğ/g, 'g')
    .replace(/Ğ/g, 'G')
    .replace(/ü/g, 'u')
    .replace(/Ü/g, 'U')
    .replace(/ş/g, 's')
    .replace(/Ş/g, 'S')
    .replace(/ö/g, 'o')
    .replace(/Ö/g, 'O')
    .replace(/ç/g, 'c')
    .replace(/Ç/g, 'C')
    .replace(/â/g, 'a')
    .replace(/Â/g, 'A');
}

for (const file of filesToClean) {
  if (!fs.existsSync(file)) {
    console.log(`File not found: ${file}`);
    continue;
  }
  let content = fs.readFileSync(file, 'utf8');
  let cleanContent = toEnglishFriendly(content);
  
  if (content !== cleanContent) {
    fs.writeFileSync(file, cleanContent, 'utf8');
    console.log(`Successfully cleaned all non-ASCII Turkish characters in ${path.basename(file)}`);
  }
}

// Re-run the index.html RSC length fix since we changed content inside index.html again
const indexPath = path.join(__dirname, 'index.html');
if (fs.existsSync(indexPath)) {
  let content = fs.readFileSync(indexPath, 'utf8');
  content = content.replace(/(17:T)([0-9a-f]+),(.*?)(12:\[)/g, (match, p1, p2, p3, p4) => {
    const unescaped = p3.replace(/\\\\/g, '\\').replace(/\\"/g, '"').replace(/\\n/g, '\n');
    const byteLen = Buffer.byteLength(unescaped, 'utf8');
    return `${p1}${byteLen.toString(16)},${p3}${p4}`;
  });

  content = content.replace(/(18:T)([0-9a-f]+),(.*?)(13:\[)/g, (match, p1, p2, p3, p4) => {
    const unescaped = p3.replace(/\\\\/g, '\\').replace(/\\"/g, '"').replace(/\\n/g, '\n');
    const byteLen = Buffer.byteLength(unescaped, 'utf8');
    return `${p1}${byteLen.toString(16)},${p3}${p4}`;
  });
  fs.writeFileSync(indexPath, content, 'utf8');
  console.log("Re-applied length calculation fixes to index.html");
}
