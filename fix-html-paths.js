import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Hämta __dirname i ES-modul-scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, 'dist');

// Funktion för att uppdatera HTML-länkar
function updateHTMLPaths(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // 🔹 Lägg till .html på interna sidor, men ignorera redan existerande .html, CSS, JS, bilder, mailto och tel
  content = content.replace(
    /href="((?!https?:\/\/|mailto:|tel:|#|.*\.(html|css|js|png|jpg|jpeg|svg|webp|gif|ico))[^"]+)"/g,
    'href="$1.html"'
  );

  // 🔹 Tvinga .html även i URL:er om de saknas (t.ex. i browser-address-fältet)
  content = content.replace(/href="\/([^"]+)"/g, 'href="/$1.html"');

  // 🔹 Se till att alla `href` och `src` har `./` i början (för korrekt navigering)
  content = content.replace(
    /(href|src)="(?!https?:\/\/|mailto:|tel:|#|\.\/)([^"]+)"/g,
    '$1="./$2"'
  );

  // 🔹 Fixar `srcset` för bilder så att de också får `./`
  content = content.replace(
    /srcset="(?!https?:\/\/|mailto:|tel:|#|\.\/)([^"]+)"/g,
    'srcset="./$1"'
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Fixed paths in ${filePath}`);
}

// Processa varje HTML-fil i dist/
fs.readdirSync(distDir).forEach((file) => {
  if (file.endsWith('.html')) {
    updateHTMLPaths(path.join(distDir, file));
  }
});
