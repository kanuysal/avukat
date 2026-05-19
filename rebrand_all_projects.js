const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.log("index.html not found!");
  process.exit(1);
}

let content = fs.readFileSync(indexPath, 'utf8');

// Define our 11 new, completely rebranded law projects
const newProjects = [
  {
    uid: "ehealth-arena",
    title: "Sirketler Hukuku",
    subtitle: "Sirket kurmak kolay, batirmamak bizim isimiz.",
    mux_playback_id: "Y7HzOsrmhjd7M00Ib6JYF861ME00I3ZqicLcr4V9vhoXU",
    description: "Sirketinizin kurulusundan buyumesine, sozlesmelerden ortaklik davalarina kadar her turlu ticari riskinizi minimize ediyoruz. Kanunlar karmasik olabilir ama sizin icin degil."
  },
  {
    uid: "select-concept",
    title: "Ceza Davalari",
    subtitle: "Hapse girmek istemiyorsaniz dogru adrestesiniz.",
    mux_playback_id: "caSLneThURyYn402mCTXi6sgHLpL2F0201EcF01rI3ZwKk8",
    description: "Karakoldan mahkemeye kadar her turlu ceza yargilamasinda haklarinizi en kararli sekilde savunuyoruz. Unutmayin, sessiz kalma hakkiniz var ama en iyisi bizi arama hakkinizi kullanin."
  },
  {
    uid: "gamily",
    title: "Icra ve Iflas",
    subtitle: "Alacaginiz var ama vermiyorlar mi? Aliriz.",
    mux_playback_id: "JFKPwSwJdrTK6zn1c013dCw5HTxkekifCD8cbWWmd7JQ",
    description: "Borcunu odemeyenler, sarkan vadeler ve ulasilamayan borclular mi var? Yasal icra ve iflas yollarini en hizli sekilde devreye sokarak alacaginizi son kurusuna kadar tahsil ediyoruz."
  },
  {
    uid: "alamance-foods",
    title: "Aile Hukuku",
    subtitle: "Esinizden kurtulun, mal varliginizi kurtarin.",
    mux_playback_id: "uzBOoiGvXfxdOASlVqDU005foqLExaLY7482szwaUo8g",
    description: "Anlasmali veya cekismeli bosanma, velayet, nafaka ve mal paylasimi davalarinda duygusal surecleri bir kenara birakip tamamen haklarinizi ve geleceginizi guvence altina aliyoruz."
  },
  {
    uid: "son",
    title: "Miras Hukuku",
    subtitle: "Akrabalarla kotu olmadan hakkinizi alin.",
    mux_playback_id: "5WDfnYn02j24uZtRuOWrBqdZs00dGQJIB9JfgLKOLlM6g",
    description: "Miras paylasimi, vasiyetnameler, tenkis davalari ve veraset islemlerinde akrabalarinizla olan iliskilerinizi yipratmadan kanuni payinizi tam olarak almanizi sagliyoruz."
  },
  {
    uid: "glasbolaget",
    title: "Is Hukuku",
    subtitle: "Patron musunuz, isci mi? Fark etmez, hakkimizi aliriz.",
    mux_playback_id: "h344B28uehxF4mUqnTW6tOURAZRB3MJ5r8LRWFo6iEw",
    description: "Ise iade, kidem ve ihbar tazminati, fazla mesai ucretleri and mobbing davalarinda hem iscilerin hem de isverenlerin haklarini kanunlar cercevesinde savunuyoruz."
  },
  {
    uid: "spp-dream-generator",
    title: "Tazminat Hukuku",
    subtitle: "Zararinizi kurusu kurusuna geri alin.",
    mux_playback_id: "XGZPxx01Di01mSOSTZc7r01Kn2H8RN9rbrUqnwX01snmeFw",
    description: "Maddi ve manevi zararlariniz, haksiz fiiller veya kazalar sonucu olusan kayiplariniz icin en yuksek tazminat bedellerini almak adina tum hukuki surecleri titizlikle yurutuyoruz."
  },
  {
    uid: "ica-nissen",
    title: "Trafik Kazalari",
    subtitle: "Carptilar ve kactilar mi? Biz yakalariz.",
    mux_playback_id: "29xq00NijxLTofeMmyr1hvjJjStsZbMzzOBnP8JN24NM",
    description: "Gecirdiginiz trafik kazalarinda sigorta sirketleri ile yasanan anlasmazliklar, kusur orani itirazlari ve bedeni/maddi hasar kayiplarinin hizla tazmin edilmesini sagliyoruz."
  },
  {
    uid: "norrkopings-hamn",
    title: "Bilisim Hukuku",
    subtitle: "Internette kimse anonim degildir.",
    mux_playback_id: "WR4ERwHNIF5rXY9l026yYwwacbpWgU7q3FrYxKYwqDrY",
    description: "Sosyal medya uzerinden islenen suclar, kisisel verilerin korunmasi (KVKK), bilisim sistemlerine yetkisiz erisim ve internet yoluyla dolandiricilik konularinda profesyonel destek sunuyoruz."
  },
  {
    uid: "heip",
    title: "Sozlesmeler Hukuku",
    subtitle: "Okumadan imzaladiniz degil mi? Neyse ki biz variz.",
    mux_playback_id: "LbdE02DF9Gx1iVtxU98nv6uOtEEmQkTSs00Uyqb6O0201Tw",
    description: "Is ortakliklari, kira sozlesmeleri, alim-satim ve her turlu taahhutnamenin gelecekte basinizi agritmayacak sekilde profesyonelce hazirlanmasi ve denetlenmesi hizmetini sunuyoruz."
  },
  {
    uid: "design-is-funny",
    title: "Hukuki Danismanlik",
    subtitle: "Siz sorunu yaratin, biz cozelim.",
    mux_playback_id: "013qxnkYrVxEnqwseKxlEb11Cad02z02BJLjOhQdz01v02nk",
    description: "Hukuki bir sorun ortaya cikmadan once alacaginiz onleyici danismanlik hizmeti, sizi yillarca surecek davalardan ve buyuk maddi kayiplardan kurtarir. 7/24 yaninizdayiz."
  }
];

// Let's rebuild the projects segment in index.html
// The projects segment starts after \"projects\":[ and ends before the matching ] bracket
const startSearch = '\\"projects\\":[';
const index = content.indexOf(startSearch);
if (index === -1) {
  console.log("Could not find projects in index.html!");
  process.exit(1);
}

let bracketCount = 1;
let pos = index + startSearch.length;
while (bracketCount > 0 && pos < content.length) {
  const char = content[pos];
  if (char === '[') bracketCount++;
  else if (char === ']') bracketCount--;
  pos++;
}

const beforeProjects = content.substring(0, index + startSearch.length);
const afterProjects = content.substring(pos);

// Construct the new escaped projects array string
const projectsString = newProjects.map(p => {
  return `{\\"uid\\":\\"${p.uid}\\",\\"url\\":\\"\\",\\"title\\":\\"${p.title}\\",\\"subtitle\\":\\"${p.subtitle}\\",\\"site_link\\":{\\"link_type\\":\\"Web\\",\\"url\\":\\"\\"},\\"collaborator\\":\\"$undefined\\",\\"mux_playback_id\\":\\"${p.mux_playback_id}\\",\\"brightness\\":\\"$undefined\\",\\"contrast\\":\\"$undefined\\",\\"project_media\\":[],\\"description\\":\\"${p.description}\\"}`;
}).join(',');

const finalContent = beforeProjects + projectsString + ']' + afterProjects;

fs.writeFileSync(indexPath, finalContent, 'utf8');
console.log("Successfully rebranded all 11 projects and restored their image playback IDs!");

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
