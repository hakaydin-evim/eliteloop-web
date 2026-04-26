const fs = require('fs');
const path = require('path');

const webDir = path.join(__dirname, '..');
const outputFile = path.join(webDir, 'articles.json');

const excludeFiles = [
    'cities.html',
    'index.html',
    'index-v2.html',
    'index-test.html',
    'support.html',
    'terms.html',
    'privacy.html',
    'gdpr.html',
    'android.html'
];

function extractTag(content, regex) {
    const match = content.match(regex);
    return match ? match[1].trim() : '';
}

function buildJson() {
    const files = fs.readdirSync(webDir);
    const articles = [];

    files.forEach(file => {
        // Sadece .html dosyalarını al, template'leri ve exclude listesindekileri atla
        if (
            file.endsWith('.html') &&
            !file.startsWith('_template') &&
            !excludeFiles.includes(file)
        ) {
            const content = fs.readFileSync(path.join(webDir, file), 'utf-8');
            
            const title = extractTag(content, /<title>(.*?)<\/title>/i) || 
                          extractTag(content, /<meta property="og:title" content="(.*?)">/i);
            const description = extractTag(content, /<meta name="description" content="(.*?)">/i);
            const timeDate = extractTag(content, /<time datetime="([^"]+)"/i);
            const slug = file.replace('.html', '');
            
            // Kategori belirle
            let type = 'Scene Report';
            if (file.startsWith('global-pulse')) {
                type = 'Global Pulse';
            } else if (!file.includes('-')) {
                // Şehir hub'ları genelde tire içermez veya tek tire içerir ama ay/yıl içermez.
                // Kesin ayrım için: içinde '2026' geçiyorsa report'tur.
                type = file.includes('202') ? 'Scene Report' : 'City Hub';
            } else if (file.includes('new-york') && !file.includes('202')) {
                type = 'City Hub';
            }

            articles.push({
                title: title || slug,
                description: description,
                slug: slug,
                url: `https://eliteloop.app/${slug}`,
                date: timeDate || null,
                type: type,
                filename: file
            });
        }
    });

    // Tarihe göre sırala (en yeni en üstte)
    articles.sort((a, b) => {
        if (!a.date) return 1;
        if (!b.date) return -1;
        return new Date(b.date) - new Date(a.date);
    });

    fs.writeFileSync(outputFile, JSON.stringify(articles, null, 2));
    console.log(`Generated articles.json with ${articles.length} items.`);
}

buildJson();
