#!/usr/bin/env node
/**
 * fix-august-event-dates.js — Ağustos rehberlerinde JSON-LD endDate'i düzeltir.
 *
 * Sorun: 32 sayfadaki 192 etkinliğin 192'sinde de `endDate === startDate`, oysa
 * kartta görünen tarih bir aralık ("August 21 – 30, 2026"). Google her çok günlü
 * etkinliği tek günlük sanıyor ve etkinlik rich result'ları buna göre bozuluyor.
 *
 * Yöntem: kartta GÖRÜNEN tarih tek doğruluk kaynağı. Kart adı ile JSON-LD adı
 * eşleştirilip endDate (gerekirse startDate) yeniden yazılıyor. Eşleşmeyen tek
 * bir etkinlik kalırsa script hata verir — sessizce yarım iş yapmaz.
 *
 * Kullanım:
 *   node scripts/fix-august-event-dates.js            # kuru çalıştırma
 *   node scripts/fix-august-event-dates.js --commit
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const MONTHS = {
  january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
  july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
  ocak: 1, şubat: 2, mart: 3, nisan: 4, mayıs: 5, haziran: 6,
  temmuz: 7, ağustos: 8, eylül: 9, ekim: 10, kasım: 11, aralık: 12,
};

const iso = (y, m, d) => `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
const decode = s => s
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ')
  .replace(/\s+/g, ' ').trim();

/**
 * Kart metnindeki tarihi {start, end} ISO çiftine çevirir.
 * Desteklenen biçimler (32 sayfa taranarak çıkarıldı, hepsi gerçek veriden):
 *   "August 21 – 30, 2026"              tek ay içi aralık
 *   "August 1 – September 30, 2026"     aylar arası aralık
 *   "August 16, 2026"                   tek gün
 *   "August 6, 13, 20, 27, 2026"        tekrar eden günler → ilk..son
 *   "August 1 – 30 (Weekends)"          yıl yok → dosya adından
 *   "1 – 31 Ağustos 2026" / "23 Ağustos 2026"   yerelleştirilmiş
 */
function parseDate(raw, fallbackYear) {
  const t = decode(raw).replace(/[–—]/g, '-');
  const year = (t.match(/\b(20\d{2})\b/) || [])[1] || String(fallbackYear);
  const monthName = names => names.find(n => MONTHS[n.toLowerCase()]);

  // "August 1 - September 30, 2026"
  let m = t.match(/([A-Za-zÇĞİÖŞÜçğıöşü]+)\s+(\d{1,2})\s*-\s*([A-Za-zÇĞİÖŞÜçğıöşü]+)\s+(\d{1,2})/);
  if (m && MONTHS[m[1].toLowerCase()] && MONTHS[m[3].toLowerCase()]) {
    return {
      start: iso(year, MONTHS[m[1].toLowerCase()], m[2]),
      end: iso(year, MONTHS[m[3].toLowerCase()], m[4]),
    };
  }

  // "August 21 - 30"
  m = t.match(/([A-Za-zÇĞİÖŞÜçğıöşü]+)\s+(\d{1,2})\s*-\s*(\d{1,2})/);
  if (m && MONTHS[m[1].toLowerCase()]) {
    const mo = MONTHS[m[1].toLowerCase()];
    return { start: iso(year, mo, m[2]), end: iso(year, mo, m[3]) };
  }

  // "1 - 31 Ağustos 2026"
  m = t.match(/(\d{1,2})\s*-\s*(\d{1,2})\s+([A-Za-zÇĞİÖŞÜçğıöşü]+)/);
  if (m && MONTHS[m[3].toLowerCase()]) {
    const mo = MONTHS[m[3].toLowerCase()];
    return { start: iso(year, mo, m[1]), end: iso(year, mo, m[2]) };
  }

  // "23 Ağustos 2026"
  m = t.match(/(\d{1,2})\s+([A-Za-zÇĞİÖŞÜçğıöşü]+)\s+20\d{2}/);
  if (m && MONTHS[m[2].toLowerCase()]) {
    const mo = MONTHS[m[2].toLowerCase()];
    return { start: iso(year, mo, m[1]), end: iso(year, mo, m[1]) };
  }

  // "August 16, 2026" ve "August 6, 13, 20, 27, 2026"
  m = t.match(/([A-Za-zÇĞİÖŞÜçğıöşü]+)\s+((?:\d{1,2}\s*,\s*)*\d{1,2})\s*,\s*20\d{2}/);
  if (m && MONTHS[m[1].toLowerCase()]) {
    const mo = MONTHS[m[1].toLowerCase()];
    const days = m[2].split(',').map(s => parseInt(s.trim(), 10)).filter(Number.isFinite);
    if (days.length) {
      return { start: iso(year, mo, days[0]), end: iso(year, mo, days[days.length - 1]) };
    }
  }
  return null;
}

function cardsOf(html) {
  // Görünür kart: "📅 <tarih></span> … <h3 …>Ad</h3>"
  const re = /📅\s*([^<]+?)\s*<\/span>[\s\S]{0,600}?<h3[^>]*>([\s\S]*?)<\/h3>/g;
  const out = [];
  let m;
  while ((m = re.exec(html)) !== null) {
    out.push({ dateText: decode(m[1]), name: decode(m[2].replace(/<[^>]*>/g, '')) });
  }
  return out;
}

function main() {
  const commit = process.argv.includes('--commit');
  const files = fs.readdirSync(ROOT).filter(f => /-events-august-2026\.html$/.test(f)).sort();
  let events = 0, changed = 0;
  const problems = [];

  for (const file of files) {
    const p = path.join(ROOT, file);
    let html = fs.readFileSync(p, 'utf-8');
    const byName = new Map();
    for (const c of cardsOf(html)) {
      const d = parseDate(c.dateText, 2026);
      if (!d) problems.push(`${file}: tarih çözülemedi -> "${c.dateText}"`);
      else byName.set(c.name, d);
    }

    let fileChanged = 0;
    html = html.replace(
      // Yalnızca Event blokları: publisher (Organization) ve about (City) da
      // "name" taşıyor ve ilk etkinliğin startDate'ine yeterince yakınlar.
      /("@type":\s*"Event",\s*"name":\s*"((?:[^"\\]|\\.)*)"[\s\S]{0,400}?"startDate":\s*")([^"]+)(",\s*"endDate":\s*")([^"]+)(")/g,
      (whole, pre, rawName, start, mid, end, post) => {
        events++;
        const name = decode(rawName.replace(/\\"/g, '"'));
        const d = byName.get(name);
        if (!d) { problems.push(`${file}: JSON-LD adı kartlarda yok -> "${name}"`); return whole; }
        if (d.start === start && d.end === end) return whole;
        fileChanged++;
        return `${pre}${d.start}${mid}${d.end}${post}`;
      }
    );

    if (fileChanged) {
      changed += fileChanged;
      if (commit) fs.writeFileSync(p, html);
      console.log(`  ${file.padEnd(42)} ${fileChanged} etkinlik`);
    }
  }

  console.log(`\n${files.length} sayfa · ${events} etkinlik · ${changed} düzeltme`);
  if (problems.length) {
    console.log('\nSORUNLAR:');
    problems.forEach(x => console.log('  -', x));
    return 1;
  }
  console.log(commit ? 'Yazıldı.' : '(--commit verilmedi)');
  return 0;
}

process.exit(main());
