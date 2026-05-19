const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  path.join(__dirname, 'index.html'),
  path.join(__dirname, '_next', 'static', 'chunks', '09d2g3rtnbzgs.js'),
  path.join(__dirname, '_next', 'static', 'chunks', '0nr6lqdt2xw72.js')
];

const replacements = [
  {
    from: /# A Showcase of Valued Clients/g,
    to: "# Güvenini Boşa Çıkarmadığımız Müvekkillerimiz"
  },
  {
    from: /A Showcase of Valued Clients/g,
    to: "Güvenini Boşa Çıkarmadığımız Müvekkillerimiz"
  },
  {
    from: /# For Companies Serious About Technology/g,
    to: "# Haklarını Savunmada Ciddi Olanlar İçin"
  },
  {
    from: /For Companies Serious About Technology/g,
    to: "Haklarını Savunmada Ciddi Olanlar İçin"
  },
  {
    from: /# Act now! Book a Consultation\./g,
    to: "# Şimdi Harekete Geçin! Hemen Bize Ulaşın."
  },
  {
    from: /Act now! Book a Consultation\./g,
    to: "Şimdi Harekete Geçin! Hemen Bize Ulaşın."
  },
  {
    from: /Cut along the dotted line and mail this to the post address below for a free 30 minute video call consultation\./g,
    to: "Hemen iletişime geçip davanız veya hukuki danışmanlık ihtiyacınız hakkında hızlıca randevu planlayabilirsiniz."
  },
  {
    from: /# Had Enough Reading\? Let's Shred This Thing\./gi,
    to: "# Okumaktan Sıkıldınız mı? Hadi Başlayalım."
  },
  {
    from: /Had Enough Reading\? Let's Shred This Thing\./gi,
    to: "Okumaktan Sıkıldınız mı? Hadi Başlayalım."
  },
  {
    from: /Still Not Convinced We're Serious About Business\?/gi,
    to: "Hâlâ davanızı kazanacağımızdan emin değil misiniz?"
  },
  {
    from: /About Us/g,
    to: "Hakkımızda"
  },
  {
    from: /Laxholmstorget 3<br\/>602 21(<!-- -->)? (<!-- -->)?Norrköping<br\/>Sweden/g,
    to: "Bursa, Türkiye"
  },
  {
    from: /Laxholmstorget 3\\n602 21 Norrköping\\nSweden/g,
    to: "Bursa, Türkiye"
  },
  {
    from: /Laxholmstorget 3\n602 21 Norrköping\nSweden/g,
    to: "Bursa, Türkiye"
  },
  {
    from: /Norrköping, Sweden/g,
    to: "Bursa, Türkiye"
  },
  {
    from: /"addressLocality":"Norrköping"/g,
    to: '"addressLocality":"Bursa"'
  },
  {
    from: /"streetAddress":"Laxholmstorget 3"/g,
    to: '"streetAddress":"Bursa, Türkiye"'
  },
  {
    from: /"postalCode":"602 21"/g,
    to: '"postalCode":""'
  },
  {
    from: /"addressCountry":"SE"/g,
    to: '"addressCountry":"TR"'
  }
];

// Apply replacements to all files
for (const file of filesToUpdate) {
  if (!fs.existsSync(file)) {
    console.log(`File not found: ${file}`);
    continue;
  }
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content;

  for (const {from, to} of replacements) {
    newContent = newContent.replace(from, to);
  }

  // Also do a simple string replace for "Türkiye" left overs to make sure they are "Bursa, Türkiye" where appropriate
  if (file.endsWith('index.html')) {
    newContent = newContent.replace(/>Türkiye</g, '>Bursa, Türkiye<');
  }

  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log(`Updated ${path.basename(file)}`);
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
