#!/usr/bin/env node
/**
 * bake-legal-pages.js — yasal sayfaların metnini statik HTML'e gömer.
 *
 * Neden: privacy.html/terms.html/gdpr.html/support.html gövdesinde
 * `<section id="legalContent"></section>` BOŞ geliyordu; metni script.js
 * çalışma anında enjekte ediyordu. JS çalıştırmayan bir istemci sayfayı 235
 * görünür karakterle görüyordu — başlık ve "Last updated", politika yok.
 *
 * App Store Connect'teki Privacy Policy alanı tam bu URL'i gösteriyor ve Apple
 * 1.6.10'u "functional link to the privacy policy" gerekçesiyle reddetti. Link
 * 200 dönüyordu ama işaret ettiği sayfa boştu.
 *
 * Bu script İngilizce bölümleri sunucudan gelen HTML'e basar; script.js dil
 * değişince üzerine yazmaya devam eder, yani davranış kaybı yok.
 *
 * Kullanım:
 *   node scripts/bake-legal-pages.js           # kuru çalıştırma
 *   node scripts/bake-legal-pages.js --commit
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
// support.html'in kendi statik icerigi var, #legalContent kabi yok — bu yuzden
// listede degil. Buradaki uc sayfa App Store Connect'in dogrudan isaret ettigi
// sayfalar.
const PAGES = ['privacy', 'terms', 'gdpr'];

function loadLegalContent() {
  const src = fs.readFileSync(path.join(ROOT, 'script.js'), 'utf-8');
  const start = src.indexOf('const legalContent =');
  if (start < 0) throw new Error('script.js icinde legalContent bulunamadi');
  // Nesnenin sonunu süslü parantez sayarak bul; regex burada güvenilir değil
  // çünkü metinlerin içinde de parantez geçiyor.
  const open = src.indexOf('{', start);
  let depth = 0, end = -1, inStr = null, prev = '';
  for (let i = open; i < src.length; i++) {
    const c = src[i];
    if (inStr) {
      if (c === inStr && prev !== '\\') inStr = null;
    } else if (c === '"' || c === "'" || c === '`') {
      inStr = c;
    } else if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) { end = i + 1; break; } }
    prev = c;
  }
  if (end < 0) throw new Error('legalContent nesnesinin sonu bulunamadi');
  const ctx = {};
  vm.createContext(ctx);
  vm.runInContext(`legalContent = ${src.slice(open, end)}`, ctx);
  return ctx.legalContent;
}

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function render(sections) {
  return sections.map(([title, body]) => `
      <article class="legal-section">
        <h2>${esc(title)}</h2>
        <p>${esc(body)}</p>
      </article>
    `).join('');
}

function main() {
  const commit = process.argv.includes('--commit');
  const legal = loadLegalContent();
  let changed = 0;
  const problems = [];

  for (const page of PAGES) {
    const file = path.join(ROOT, `${page}.html`);
    if (!fs.existsSync(file)) { problems.push(`${page}.html yok`); continue; }
    const sections = legal[page] && legal[page].en;
    if (!sections || !sections.length) { problems.push(`${page}: en icerigi yok`); continue; }

    const html = fs.readFileSync(file, 'utf-8');
    const re = /(<section class="legal-content" id="legalContent">)([\s\S]*?)(<\/section>)/;
    const m = html.match(re);
    if (!m) { problems.push(`${page}.html: legalContent bolumu bulunamadi`); continue; }

    const baked = render(sections);
    if (m[2].trim() === baked.trim()) { console.log(`  ${page.padEnd(9)} zaten güncel`); continue; }

    const out = html.replace(re, `$1${baked}$3`);
    if (commit) fs.writeFileSync(file, out);
    changed++;
    console.log(`  ${page.padEnd(9)} ${sections.length} bölüm gömüldü (${baked.length} karakter)`);
  }

  console.log(`\n${changed} sayfa güncellendi`);
  if (problems.length) {
    console.log('SORUNLAR:');
    problems.forEach((p) => console.log('  -', p));
    return 1;
  }
  console.log(commit ? 'Yazıldı.' : '(--commit verilmedi)');
  return 0;
}

process.exit(main());
