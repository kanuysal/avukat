const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

// Change lang="en" to lang="tr"
content = content.replace(/lang="en"/g, 'lang="tr"');
content = content.replace(/"lang":"en"/g, '"lang":"tr"');

// Inject Google Font (Inter) and custom CSS to override all fonts
const fontHtml = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
  body, *, h1, h2, h3, h4, h5, h6, p, a, button, input, textarea {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
  }
</style>
</head>`;

content = content.replace('</head>', fontHtml);

fs.writeFileSync(indexPath, content, 'utf8');
console.log("Font and lang updated in index.html");
