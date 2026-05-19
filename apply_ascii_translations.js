const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  path.join(__dirname, 'index.html'),
  path.join(__dirname, '_next', 'static', 'chunks', '09d2g3rtnbzgs.js'),
  path.join(__dirname, '_next', 'static', 'chunks', '0nr6lqdt2xw72.js')
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

// First, let's do a backup or read the current state
for (const file of filesToUpdate) {
  if (!fs.existsSync(file)) {
    console.log(`File not found: ${file}`);
    continue;
  }
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace the Turkish characters that we introduced in our previous translation rounds
  // Let's target specific Turkish phrases and convert them to English-friendly ASCII:
  const targets = [
    "Boşanma Davaları", "Eşinizden kurtulun, mal varlığınızı kurtarın.",
    "Ceza Davaları", "Hapse girmek istemiyorsan, kimi arayacağını biliyorsun.",
    "İcra Takibi", "Alacağınız var ama vermiyorlar mı? Alırız.",
    "Şirketler Hukuku", "Şirket kurmak kolay, batırmamak bizim işimiz.",
    "Miras Hukuku", "Akrabalarla kötü olmadan hakkınızı alın.",
    "İş Hukuku", "Patron musunuz, işçi mi? Fark etmez, her türlü hak aranır.",
    "Trafik Kazaları", "Çarptılar kaçtılar mı? Biz yakalarız.",
    "Bilişim Hukuku", "İnternette kimse anonim değildir.",
    "Tazminat Davaları", "Zararınızı kuruşu kuruşuna geri alın.",
    "Sözleşmeler", "Okumadan imzaladınız değil mi? Neyse ki biz varız.",
    "Danışmanlık", "Siz sorunu yaratın, biz çözelim.",
    "Güvenini Boşa Çıkarmadığımız Müvekkillerimiz",
    "Haklarını Savunmada Ciddi Olanlar İçin",
    "Şimdi Harekete Geçin! Hemen Bize Ulaşın.",
    "Hemen iletişime geçip davanız veya hukuki danışmanlık ihtiyacınız hakkında hızlıca randevu planlayabilirsiniz.",
    "Okumaktan Sıkıldınız mı? Hadi Başlayalım.",
    "Hâlâ davanızı kazanacağımızdan emin değil misiniz?"
  ];

  let newContent = content;
  for (const target of targets) {
    const englishFriendly = toEnglishFriendly(target);
    newContent = newContent.replace(new RegExp(target, 'g'), englishFriendly);
  }

  // Also catch generic Turkish characters that might be inside any other strings we translated earlier
  // like "Hukuk ve Danışmanlık Bürosu" -> "Hukuk ve Danismanlik Burosu"
  newContent = newContent.replace(/Danışmanlık/g, 'Danismanlik');
  newContent = newContent.replace(/Bürosu/g, 'Burosu');
  newContent = newContent.replace(/müvekkil/gi, 'muvekkil');
  newContent = newContent.replace(/türkçe/gi, 'turkce');

  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log(`Converted Turkish characters to ASCII in ${path.basename(file)}`);
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
