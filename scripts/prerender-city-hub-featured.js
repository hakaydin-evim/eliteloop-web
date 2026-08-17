#!/usr/bin/env node
/**
 * prerender-city-hub-featured.js — şehir hub'larındaki "öne çıkan rehber"
 * kartını statik HTML'e yazar.
 *
 * Sorun: hydrate-city-hub-reports.js çalışma anında en yeni rehberi öne çıkarıyor,
 * ama statik HTML Temmuz'da donmuş kalmıştı. Sonuç: 32 Ağustos rehberine site
 * içinden GİDEN TEK BİR LİNK YOKTU (`grep -rl "events-august-2026"` kendi
 * dosyaları dışında boş dönüyordu) — sayfalar yetimdi. Üstelik robots.txt
 * articles.json'ı engellediği için Googlebot hidrasyonu da hiç çalıştıramıyordu.
 *
 * Bu script hidrasyonun seçimini build zamanında statiğe basar; hidrasyon
 * progressive enhancement olarak yerinde kalır. Idempotent: kart zaten
 * güncelse dosyaya dokunmaz.
 *
 * Kullanım:
 *   node scripts/prerender-city-hub-featured.js            # kuru çalıştırma
 *   node scripts/prerender-city-hub-featured.js --commit
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const articles = JSON.parse(fs.readFileSync(path.join(ROOT, 'articles.json'), 'utf-8'));

const isCityContent = (a) => ['Events Guide', 'Scene Report'].includes(a.type);
const isLocalized = (a) => a.slug.includes('/');
const priority = (a) => (a.type === 'Events Guide' ? 0 : 1);
const label = (a) => (a.type === 'Events Guide' ? 'Events Guide' : 'Scene Report');
const tagOf = (a) => (a.type === 'Events Guide' ? 'EVENTS GUIDE' : 'SCENE REPORT');

const cleanTitle = (t) =>
  t.replace(/\s+[—-]\s+EliteLoop.*$/i, '').replace(/\s+\|\s+EliteLoop.*$/i, '').trim();
const cleanExcerpt = (d) => (d || '').replace(/\s*EliteLoop.*$/i, '').replace(/\s+/g, ' ').trim();
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const longDate = (v) => new Intl.DateTimeFormat('en-US', {
  year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC',
}).format(new Date(`${v}T00:00:00Z`));
const shortDate = (v) => new Intl.DateTimeFormat('en-US', {
  month: 'short', day: '2-digit', year: 'numeric', timeZone: 'UTC',
}).format(new Date(`${v}T00:00:00Z`));
const monthName = (v) => new Intl.DateTimeFormat('en-US', {
  month: 'long', timeZone: 'UTC',
}).format(new Date(`${v}T00:00:00Z`));

/** Hidrasyonla birebir aynı sıralama — iki yerde ayrışırsa statik ile runtime çelişir. */
function newestFor(citySlug) {
  const list = articles
    .filter((a) => isCityContent(a) && a.canonicalCitySlug === citySlug && a.date && !isLocalized(a))
    .sort((a, b) =>
      new Date(`${b.date}T00:00:00Z`) - new Date(`${a.date}T00:00:00Z`) || priority(a) - priority(b));
  return list.length ? list : null;
}

/**
 * `<div class="report-archive-list">` bloğunun İÇİNİ değiştirir.
 *
 * Bunu regex ile yapmaya çalışmak ilk denemede sessizce bozdu: `[\s\S]*?` en
 * yakın `</div>`'de durup listenin değil, içindeki ilk kartın kapanışında
 * eşleşti — eski kayıtlar silinmedi, üstüne yenileri eklendi ve liste ikiye
 * katlandı. O yüzden burada gerçek `<div>` derinliği sayılıyor.
 */
function replaceArchiveList(html, inner) {
  const open = html.match(/<div class="report-archive-list"[^>]*>/);
  if (!open) return null;
  const start = open.index + open[0].length;
  const tag = /<div\b[^>]*>|<\/div>/g;
  tag.lastIndex = start;
  let depth = 1, m;
  while ((m = tag.exec(html)) !== null) {
    depth += m[0] === '</div>' ? -1 : 1;
    if (depth === 0) {
      return html.slice(0, start) + inner + '\n    ' + html.slice(m.index);
    }
  }
  return null;
}

function archiveItem(a) {
  return `
      <a href="/${a.slug}" class="report-archive-item">
        <div class="report-archive__meta">
          <time datetime="${a.date}" class="report-archive__date">${shortDate(a.date)}</time>
          <span class="report-archive__tag">${tagOf(a)}</span>
        </div>
        <div class="report-archive__content">
          <div class="report-archive__title">${esc(cleanTitle(a.title))}</div>
          <div class="report-archive__excerpt">${esc(cleanExcerpt(a.description))}</div>
        </div>
      </a>`;
}

function main() {
  const commit = process.argv.includes('--commit');
  const hubs = articles.filter((a) => a.type === 'City Hub' && a.slug === a.canonicalCitySlug);
  let updated = 0, skipped = 0;
  const problems = [];

  for (const hub of hubs) {
    const file = path.join(ROOT, `${hub.slug}.html`);
    if (!fs.existsSync(file)) { problems.push(`${hub.slug}: dosya yok`); continue; }
    let html = fs.readFileSync(file, 'utf-8');

    const list = newestFor(hub.slug);
    if (!list) { problems.push(`${hub.slug}: articles.json'da içerik yok`); continue; }
    const [latest, ...rest] = list;

    const hrefRe = /(<a href=")([^"]+)(" class="scene-card")/;
    const m = html.match(hrefRe);
    if (!m) { problems.push(`${hub.slug}: .scene-card bulunamadı`); continue; }
    if (m[2] === `/${latest.slug}`) { skipped++; continue; }

    const title = cleanTitle(latest.title);
    html = html
      .replace(hrefRe, `$1/${latest.slug}$3`)
      .replace(/(class="scene-card"[^>]*aria-label=")[^"]*(")/, `$1${esc(title)}$2`)
      .replace(/(<div class="scene-card__tag">)[^<]*(<\/div>)/,
        `$1${longDate(latest.date)} · ${label(latest)}$2`)
      .replace(/(<div class="scene-card__title">)[^<]*(<\/div>)/, `$1${esc(title)}$2`)
      .replace(/(<div class="scene-card__excerpt">)[^<]*(<\/div>)/,
        `$1${esc(cleanExcerpt(latest.description))}$2`)
      .replace(/(<div class="scene-stat__num">)[A-Z][a-z]+(<\/div>\s*<div class="scene-stat__label">Current dispatch)/,
        `$1${monthName(latest.date)}$2`);

    const withArchive = replaceArchiveList(html, rest.map(archiveItem).join('\n'));
    if (!withArchive) { problems.push(`${hub.slug}: arşiv listesi kapanışı bulunamadı`); continue; }
    html = withArchive;

    const anchors = (html.match(/<a[\s>]/g) || []).length;
    if (anchors !== (html.match(/<\/a>/g) || []).length) {
      problems.push(`${hub.slug}: <a> etiketleri dengesiz — yazılmadı`);
      continue;
    }

    if (commit) fs.writeFileSync(file, html);
    updated++;
    console.log(`  ${hub.slug.padEnd(16)} ${m[2]} → /${latest.slug}  (arşiv ${rest.length})`);
  }

  console.log(`\n${hubs.length} hub · ${updated} güncellendi · ${skipped} zaten güncel`);
  if (problems.length) {
    console.log('\nSORUNLAR:');
    problems.forEach((p) => console.log('  -', p));
    return 1;
  }
  console.log(commit ? 'Yazıldı.' : '(--commit verilmedi)');
  return 0;
}

process.exit(main());
