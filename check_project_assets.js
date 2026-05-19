const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

const regex = /"image":\s*"(.*?)"/g;
let match;
while ((match = regex.exec(content)) !== null) {
  console.log("Found image:", match[1]);
}

const regex2 = /"thumbnail_url":\s*"(.*?)"/g;
let match2;
while ((match2 = regex2.exec(content)) !== null) {
  console.log("Found thumbnail_url:", match2[1]);
}

const regex3 = /"image_url":\s*"(.*?)"/g;
let match3;
while ((match3 = regex3.exec(content)) !== null) {
  console.log("Found image_url:", match3[1]);
}
