const fs = require('fs');
const path = require('path');

const index = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const chunk1 = fs.readFileSync(path.join(__dirname, '_next', 'static', 'chunks', '09d2g3rtnbzgs.js'), 'utf8');
const chunk2 = fs.readFileSync(path.join(__dirname, '_next', 'static', 'chunks', '0nr6lqdt2xw72.js'), 'utf8');

const phrases = [
  "Still Not Convinced",
  "Serious About Business",
  "Showcase",
  "Valued Clients",
  "Serious About Technology",
  "Had Enough Reading",
  "Let's Shred",
  "Act now",
  "Book a Consultation"
];

for (const phrase of phrases) {
  const inIndex = index.toLowerCase().includes(phrase.toLowerCase());
  const inChunk1 = chunk1.toLowerCase().includes(phrase.toLowerCase());
  const inChunk2 = chunk2.toLowerCase().includes(phrase.toLowerCase());
  console.log(`Phrase "${phrase}": In Index? ${inIndex}, In Chunk1? ${inChunk1}, In Chunk2? ${inChunk2}`);
}
