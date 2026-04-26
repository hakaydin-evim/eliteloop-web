const fs = require('fs');
const path = require('path');

const webDir = path.join(__dirname, '..');
const articlesFile = path.join(webDir, 'articles.json');
const sitemapFile = path.join(webDir, 'sitemap.xml');
const siteUrl = 'https://eliteloop.app';

const STATIC_PAGES = [
  { slug: '', changefreq: 'weekly', priority: '1.0', file: 'index.html' },
  { slug: 'android', changefreq: 'weekly', priority: '0.9', file: 'android.html' },
  { slug: 'cities', changefreq: 'weekly', priority: '0.9', file: 'cities.html' },
  { slug: 'global-pulse', changefreq: 'daily', priority: '0.9', file: 'global-pulse.html' },
  { slug: 'privacy', changefreq: 'yearly', priority: '0.3', file: 'privacy.html' },
  { slug: 'terms', changefreq: 'yearly', priority: '0.3', file: 'terms.html' },
  { slug: 'gdpr', changefreq: 'yearly', priority: '0.3', file: 'gdpr.html' },
  { slug: 'support', changefreq: 'yearly', priority: '0.3', file: 'support.html' }
];

function toIsoDate(value) {
  return new Date(value).toISOString().slice(0, 10);
}

function getFileLastmod(file) {
  const fullPath = path.join(webDir, file);
  const stat = fs.statSync(fullPath);
  return toIsoDate(stat.mtime);
}

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildStaticEntries() {
  return STATIC_PAGES.map((page) => ({
    loc: page.slug ? `${siteUrl}/${page.slug}` : `${siteUrl}/`,
    changefreq: page.changefreq,
    priority: page.priority,
    lastmod: getFileLastmod(page.file)
  }));
}

function buildArticleEntries() {
  const articles = JSON.parse(fs.readFileSync(articlesFile, 'utf8'));

  return articles
    .filter((article) => article.slug && article.date)
    .filter((article) => !article.isLegacyAlias)
    .filter((article) => !/-gtm$/i.test(article.slug))
    .filter((article) => {
      if (article.type === 'City Hub') {
        return article.slug === article.canonicalCitySlug;
      }
      return true;
    })
    .map((article) => {
      const isHub = article.type === 'City Hub';
      const isGlobalPulse = article.type === 'Global Pulse';
      return {
        loc: article.url,
        changefreq: isHub ? 'weekly' : isGlobalPulse ? 'monthly' : 'monthly',
        priority: isHub ? '0.9' : isGlobalPulse ? '0.8' : '0.8',
        lastmod: article.date
      };
    });
}

function dedupeEntries(entries) {
  const seen = new Set();
  return entries.filter((entry) => {
    if (seen.has(entry.loc)) return false;
    seen.add(entry.loc);
    return true;
  });
}

function buildXml(entries) {
  const urlNodes = entries.map((entry) => {
    return [
      '  <url>',
      `    <loc>${escapeXml(entry.loc)}</loc>`,
      `    <changefreq>${entry.changefreq}</changefreq>`,
      `    <priority>${entry.priority}</priority>`,
      `    <lastmod>${entry.lastmod}</lastmod>`,
      '  </url>'
    ].join('\n');
  });

  return [
    "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
    "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">",
    ...urlNodes,
    "</urlset>",
    ""
  ].join('\n');
}

function main() {
  const entries = dedupeEntries([
    ...buildStaticEntries(),
    ...buildArticleEntries()
  ]).sort((a, b) => {
    if (a.loc === `${siteUrl}/`) return -1;
    if (b.loc === `${siteUrl}/`) return 1;
    return a.loc.localeCompare(b.loc);
  });

  fs.writeFileSync(sitemapFile, buildXml(entries), 'utf8');
  console.log(`Generated sitemap.xml with ${entries.length} URLs.`);
}

main();
