const fs = require('fs');
const path = require('path');

const files = [
  path.join(__dirname, 'index.html'),
  path.join(__dirname, '_next', 'static', 'chunks', '09d2g3rtnbzgs.js'),
  path.join(__dirname, '_next', 'static', 'chunks', '0nr6lqdt2xw72.js')
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    
    // search strictly for "Good" or "good"
    let idx = 0;
    while (true) {
      idx = content.indexOf('Good', idx);
      if (idx === -1) break;
      console.log(`Found 'Good' in ${path.basename(file)} at index ${idx}:`);
      console.log(content.substring(idx - 100, idx + 100));
      idx += 4;
    }
  }
});
