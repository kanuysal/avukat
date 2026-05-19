const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

const replacements = [
  {
    from: /Shader Development Studio/g,
    to: "Avukat ERKAN UYSAL"
  },
  {
    from: /Empowering Your Business with Next-Generation Interactive 3D and AI Solutions\. Based in Sweden and Working with Brands and Agencies Worldwide\./g,
    to: "20 yıllık tecrübe ile şirket avukatlığı, ceza, icra ve aile hukuku alanlarında profesyonel hukuki danışmanlık ve avukatlık hizmeti sunmaktayız."
  },
  {
    from: /A Creative Development Studio, Plugged into the Future/g,
    to: "Adaletin Güvencesi, 20 Yıllık Hukuki Tecrübe"
  },
  {
    from: /Scroll to Inspect Our Closed Deals/g,
    to: "Uzmanlık Alanlarımızı İncelemek İçin Kaydırın"
  },
  {
    from: /Selected Work/g,
    to: "UZMANLIK ALANLARIMIZ"
  },
  {
    from: /Browse our project carousel to explore our selected work\./g,
    to: "Şirket, Ceza, İcra ve Aile Hukuku başta olmak üzere uzmanlık alanlarımızı inceleyin."
  },
  {
    from: /Making Digital Storytelling More Playful, Powerful, and Alive/g,
    to: "Hukuki Süreçlerinizde Güvenilir Çözüm Ortağınız"
  },
  {
    from: /Shader is a creative development studio specialized in building interactive 3D and AI solutions for the web\. Serious about business, based in Sweden, and working with brands, agencies and designers worldwide\./g,
    to: "Avukat Erkan Uysal, 20 yılı aşkın mesleki tecrübesiyle dürüst, şeffaf ve profesyonel bir çerçevede hukuki danışmanlık hizmeti sağlamaktadır. Amacımız, karşılaştığınız hukuki sorunları en hızlı ve en etkili stratejilerle çözüme kavuşturmaktır."
  },
  {
    from: /Plugged into the future\. While we(&#x27;|'|\\')re a small team of creative engineers, we have a hand-picked network of collaborators: designers, 3D artists, copywriters, animators, and creative technologists, ready to plug in with an array of capabilities\./g,
    to: "Şirketler hukuku, ceza davaları, icra takipleri ve aile hukuku gibi en kritik konularda müvekkillerimize sonuç odaklı yaklaşımlar sunuyoruz. Karmaşık gibi görünen hukuki süreçlerde, her adımda yanınızda yer alarak güçlü bir savunma gerçekleştiriyoruz."
  },
  {
    from: /This modular approach means we can scale and adapt to each challenge\. Whether it(&#x27;|'|\\')s a WebGL experiment, an interactive product visualization, a mobile app, or an AI-driven experience, we help bold brands stand out across every screen\./g,
    to: "Hukuki sorunların çözümünde deneyim ve analitik düşünce en önemli faktördür. Alanında uzmanlaşmış kadromuzla, karşılaştığınız hukuki uyuşmazlıklarda hak kaybı yaşamanızın önüne geçmek için titizlikle çalışıyoruz."
  },
  {
    from: /We build storytelling platforms that demand attention and reward curiosity\. We push digital mediums to places you haven(&#x27;|'|\\')t seen before, and have fun doing it\. Beyond code, we offer 3D design and animation, UI and motion design, concepts and digital strategy, full-stack development, and creative consulting\./g,
    to: "Müvekkil odaklı çalışma prensibimiz sayesinde, dava öncesi ve dava süresince detaylı bilgilendirme sağlayarak sürecin şeffaf yürümesini temin ederiz. Danışmanlık hizmetlerimiz potansiyel sorunları da önceden tespit edip engellemeyi amaçlar."
  },
  {
    from: /Whether it(&#x27;|'|\\')s prototyping an idea, launching an augmented reality experience, or bringing high-fidelity visuals to life, Shader bridges the gap between creative ambition and technical execution\. Our process is hands-on, collaborative, and tailored for teams that value both craft and innovation\. We combine technical expertise with a designer(&#x27;|'|\\')s eye, ensuring that every interaction feels natural and every pixel is perfectly placed\. We(&#x27;|'|\\')re not your regular IT department\. We don(&#x27;|'|\\')t troubleshoot printers\./g,
    to: "Ticari hayattaki riskleri minimize etmek, sözleşmelerin doğru tanzim edilmesi, şirket birleşme ve devralmaları gibi profesyonellik gerektiren her türlü konuda yanınızdayız. Ceza davalarında ise özgürlüğünüzü ve temel haklarınızı en üst düzeyde savunuyor, adaletin tecellisi için çalışıyoruz."
  },
  {
    from: /We have had the benefit of working with a large pool of great clients throughout the years\. Our partnerships ranges from some of the most recognizable Swedish brands to international innovators\./g,
    to: "Yıllar boyunca sayısız bireysel ve kurumsal müvekkile başarıyla hizmet verdik. Güven ve başarıya dayalı bu uzun soluklu ilişkiler, mesleki vizyonumuzun en net göstergesidir."
  },
  {
    from: /In today(&#x27;|'|\\')s fast-paced corporate landscape, you need a partner who understands the bottom line\. At Shader, we engineer success through strategic alliances and mutual profitability\. Our team is ready to synergize with your organization, unlock new verticals, and maximize your digital ROI\. We don(&#x27;|'|\\')t just close deals; we deliver results that compound\./g,
    to: "Bugünün karmaşık hukuki dünyasında, çıkarlarınızı tam olarak anlayan ve koruyan bir hukuk bürosuna ihtiyacınız vardır. Stratejik adımlar ve hukuki öngörülerle haklarınızı savunmaya hazırız."
  },
  {
    from: /We leverage state-of-the-art technology to give your brand a decisive competitive advantage\. Whether disrupting the market with paradigm-shifting 3D experiences or streamlining operations with cutting-edge AI, we provide turnkey solutions that scale\. We merge high-performance engineering with executive-level design to build assets that appreciate your brand value\./g,
    to: "Sadece dava aşamasında değil, danışmanlık boyutuyla da iş süreçlerinizi güvence altına alıyoruz. Aile hukuku uyuşmazlıklarında ise sürecin hassasiyetinin bilincinde olarak, çocukların ve tarafların yıpranmasını engelleyen yapıcı çözümler üretiyoruz."
  },
  {
    from: /Ready to take your enterprise to the next level\? Don(&#x27;|'|\\')t waste valuable time\. Review our portfolio, crunch the numbers, and you(&#x27;|'|\\')ll see the trajectory points one way: up\. Pick up the phone, send a fax, or schedule a consultation\. The future of your business is waiting\. Let(&#x27;|'|\\')s execute\./g,
    to: "Hukuki sorunlarınıza profesyonel çözümler getirmek için bizimle iletişime geçin. Haklarınızı şansa bırakmayın, uzman bir ekiple süreci güvence altına alın."
  },
  {
    from: /hello@shader\.se/g,
    to: "uysalerkan@hotmail.com"
  },
  {
    from: /ceo@shader\.se/g,
    to: "uysalerkan@hotmail.com"
  },
  {
    from: /https:\/\/cal\.com\/simon-hedlund-kglzne/g,
    to: "https://wa.me/905447407880"
  },
  {
    from: /Book a [Cc]all/g,
    to: "WhatsApp'tan Ulaşın"
  },
  {
    from: /Laxholmstorget 3<br\/>602 21(<!-- -->)? (<!-- -->)?Norrköping<br\/>Sweden/g,
    to: "Türkiye"
  },
  {
    from: /Laxholmstorget 3\\n602 21 Norrköping\\nSweden/g,
    to: "Türkiye"
  },
  {
    from: /Reach out today to our CEO for new business enquiries at (<!-- -->)?ceo@shader\.se/g,
    to: "Hukuki destek için hemen iletişime geçin: uysalerkan@hotmail.com"
  },
  {
    from: /eHealth Arena/g,
    to: "Şirketler Hukuku"
  },
  {
    from: /3D Showroom/g,
    to: "Kurumsal Danışmanlık"
  },
  {
    from: /Select Concept/g,
    to: "Ceza Hukuku"
  },
  {
    from: /3D Interior Designer/g,
    to: "Ağır Ceza Davaları"
  },
  {
    from: /Gamily/g,
    to: "İcra ve İflas Hukuku"
  },
  {
    from: /Campaign Website/g,
    to: "Alacak Takibi"
  },
  {
    from: /Alamance Foods/g,
    to: "Aile Hukuku"
  },
  {
    from: /Website/g,
    to: "Boşanma ve Nafaka"
  },
  {
    from: /Contact us about your digital project idea or general enquires\. Let(&#x27;|'|\\')s interface, call us today!/g,
    to: "Hukuki süreçleriniz veya genel danışmanlık talepleriniz için bize ulaşın. Haklarınızı korumak için buradayız!"
  },
  {
    from: /General Enquiries/g,
    to: "Genel İletişim"
  },
  {
    from: /Visit us/g,
    to: "Adresimiz"
  },
  {
    from: /New business/g,
    to: "Hukuki Danışmanlık"
  },
  {
    from: /Norrköping, Sweden/g,
    to: "Türkiye"
  },
  {
    from: /Shader Sweden AB/g,
    to: "Avukat ERKAN UYSAL Hukuk Bürosu"
  },
  {
    from: /Shader Sweden/g,
    to: "Erkan Uysal"
  },
  {
    from: /Shader/g,
    to: "Avukat ERKAN UYSAL"
  }
];

let replacedContent = content;

for (const {from, to} of replacements) {
  replacedContent = replacedContent.replace(from, to);
}

fs.writeFileSync(indexPath, replacedContent, 'utf8');
console.log('Index.html updated successfully.');
