const fs = require('fs');
const path = require('path');

const muxImageDir = path.join(__dirname, 'api', 'mux-image');
const imagesDir = path.join(__dirname, 'images');

const muxFolders = fs.readdirSync(muxImageDir).filter(f => fs.statSync(path.join(muxImageDir, f)).isDirectory());
// We expect exactly 20 folders.
// Let's sort them alphabetically just to have a consistent order.
muxFolders.sort();

const sourceImages = [];
for (let i = 1; i <= 20; i++) {
  // Account for different cases like .jpg or .JPG as seen in listing
  let imgPath = path.join(imagesDir, `${i}.jpg`);
  if (!fs.existsSync(imgPath)) {
    imgPath = path.join(imagesDir, `${i}.JPG`);
  }
  if (fs.existsSync(imgPath)) {
    sourceImages.push(imgPath);
  }
}

console.log(`Found ${muxFolders.length} mux folders and ${sourceImages.length} source images.`);

for (let i = 0; i < Math.min(muxFolders.length, sourceImages.length); i++) {
  const folder = muxFolders[i];
  const sourceImage = sourceImages[i];
  
  const folderPath = path.join(muxImageDir, folder);
  const filesInFolder = fs.readdirSync(folderPath);
  
  for (const file of filesInFolder) {
    const targetPath = path.join(folderPath, file);
    fs.copyFileSync(sourceImage, targetPath);
    console.log(`Copied ${path.basename(sourceImage)} to ${folder}/${file}`);
  }
}
