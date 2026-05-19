const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

const matches = [];
const regex = /self\.__next_f\.push\((.*?)\)/g;
let match;
while ((match = regex.exec(content)) !== null) {
  matches.push(match[1]);
}

console.log("Total push calls:", matches.length);
matches.forEach((push, i) => {
  console.log(`Push ${i + 1}: ${push.substring(0, 100)}...`);
});
