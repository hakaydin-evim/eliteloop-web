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

const CITY_RULES = [
    { aliases: ['new-york', 'nyc', 'newyork'], canonicalSlug: 'new-york', name: 'New York' },
    { aliases: ['singapore'], canonicalSlug: 'singapore', name: 'Singapore' },
    { aliases: ['istanbul'], canonicalSlug: 'istanbul', name: 'Istanbul' },
    { aliases: ['london'], canonicalSlug: 'london', name: 'London' },
    { aliases: ['tokyo'], canonicalSlug: 'tokyo', name: 'Tokyo' },
    { aliases: ['paris'], canonicalSlug: 'paris', name: 'Paris' },
    { aliases: ['dubai'], canonicalSlug: 'dubai', name: 'Dubai' },
    { aliases: ['seoul'], canonicalSlug: 'seoul', name: 'Seoul' },
    { aliases: ['zurich'], canonicalSlug: 'zurich', name: 'Zurich' },
    { aliases: ['milan', 'milano'], canonicalSlug: 'milan', name: 'Milan' },
    { aliases: ['rome', 'roma'], canonicalSlug: 'rome', name: 'Rome' },
    { aliases: ['abu-dhabi'], canonicalSlug: 'abu-dhabi', name: 'Abu Dhabi' },
    { aliases: ['amsterdam'], canonicalSlug: 'amsterdam', name: 'Amsterdam' },
    { aliases: ['barcelona'], canonicalSlug: 'barcelona', name: 'Barcelona' },
    { aliases: ['berlin'], canonicalSlug: 'berlin', name: 'Berlin' },
    { aliases: ['chicago'], canonicalSlug: 'chicago', name: 'Chicago' },
    { aliases: ['geneva'], canonicalSlug: 'geneva', name: 'Geneva' },
    { aliases: ['hong-kong'], canonicalSlug: 'hong-kong', name: 'Hong Kong' },
    { aliases: ['lisbon'], canonicalSlug: 'lisbon', name: 'Lisbon' },
    { aliases: ['los-angeles', 'la'], canonicalSlug: 'los-angeles', name: 'Los Angeles' },
    { aliases: ['madrid'], canonicalSlug: 'madrid', name: 'Madrid' },
    { aliases: ['mexico-city'], canonicalSlug: 'mexico-city', name: 'Mexico City' },
    { aliases: ['miami'], canonicalSlug: 'miami', name: 'Miami' },
    { aliases: ['monaco'], canonicalSlug: 'monaco', name: 'Monaco' },
    { aliases: ['mumbai'], canonicalSlug: 'mumbai', name: 'Mumbai' },
    { aliases: ['munich', 'munchen'], canonicalSlug: 'munich', name: 'Munich' },
    { aliases: ['riyadh'], canonicalSlug: 'riyadh', name: 'Riyadh' },
    { aliases: ['san-francisco', 'sf'], canonicalSlug: 'san-francisco', name: 'San Francisco' },
    { aliases: ['sao-paulo'], canonicalSlug: 'sao-paulo', name: 'São Paulo' },
    { aliases: ['sydney'], canonicalSlug: 'sydney', name: 'Sydney' },
    { aliases: ['toronto'], canonicalSlug: 'toronto', name: 'Toronto' },
    { aliases: ['vienna'], canonicalSlug: 'vienna', name: 'Vienna' },
    { aliases: ['copenhagen'], canonicalSlug: 'copenhagen', name: 'Copenhagen' }
];

const MONTH_MAP = {
    january: '01',
    february: '02',
    march: '03',
    april: '04',
    may: '05',
    june: '06',
    july: '07',
    august: '08',
    september: '09',
    october: '10',
    november: '11',
    december: '12'
};

const LEGACY_CANONICAL_OVERRIDES = new Map([
    ['nyc-april-2026', 'new-york-april-2026'],
    ['nyc-mid-april-2026', 'new-york-mid-april-2026'],
    ['nyc-march-2026', 'new-york-march-2026'],
    ['nyc-february-2026', 'new-york-february-2026']
]);

function extractTag(content, regex) {
    const match = content.match(regex);
    return match ? match[1].trim() : '';
}

function inferCityMeta(slug, type) {
    if (type === 'Global Pulse') {
        return {
            citySlug: null,
            cityName: 'Global',
            canonicalCitySlug: null,
            isLegacyAlias: false,
            issueFlags: []
        };
    }

    let cleanedSlug = slug.toLowerCase();
    if (cleanedSlug.includes('/')) {
        cleanedSlug = cleanedSlug.split('/').slice(1).join('/');
    }

    for (const rule of CITY_RULES) {
        for (const alias of rule.aliases) {
            if (cleanedSlug === alias || cleanedSlug.startsWith(`${alias}-`)) {
                const isLegacyAlias = alias !== rule.canonicalSlug;
                return {
                    citySlug: alias,
                    cityName: rule.name,
                    canonicalCitySlug: rule.canonicalSlug,
                    isLegacyAlias,
                    issueFlags: isLegacyAlias ? ['legacy-city-alias'] : []
                };
            }
        }
    }

    return {
        citySlug: null,
        cityName: 'Unknown',
        canonicalCitySlug: null,
        isLegacyAlias: false,
        issueFlags: ['unmapped-city']
    };
}

function inferDateFromSlug(slug) {
    let cleanedSlug = slug;
    if (cleanedSlug.includes('/')) {
        cleanedSlug = cleanedSlug.split('/').slice(1).join('/');
    }
    const exactDateMatch = cleanedSlug.match(/-(\d{1,2})-(january|february|march|april|may|june|july|august|september|october|november|december)-(\d{4})$/i);
    if (exactDateMatch) {
        const [, day, month, year] = exactDateMatch;
        return `${year}-${MONTH_MAP[month.toLowerCase()]}-${String(day).padStart(2, '0')}`;
    }

    const monthYearMatch = cleanedSlug.match(/-(late|mid)?-?(january|february|march|april|may|june|july|august|september|october|november|december)-(\d{4})$/i);
    if (monthYearMatch) {
        const [, qualifier, month, year] = monthYearMatch;
        const day = qualifier === 'late' ? '25' : qualifier === 'mid' ? '15' : '01';
        return `${year}-${MONTH_MAP[month.toLowerCase()]}-${day}`;
    }

    return null;
}

function shouldSkipLegacyAlias(slug, knownFiles) {
    const canonicalSlug = LEGACY_CANONICAL_OVERRIDES.get(slug);
    if (!canonicalSlug) return false;
    return knownFiles.has(canonicalSlug);
}

function isEventsGuideSlug(slug) {
    return /-events-(january|february|march|april|may|june|july|august|september|october|november|december)-\d{4}$/i.test(slug);
}

function getHtmlFiles(dir, prefix = '') {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            const langDirs = ['ar', 'de', 'es', 'fr', 'it', 'ja', 'ko', 'pt', 'tr'];
            if (langDirs.includes(file) && prefix === '') {
                results = results.concat(getHtmlFiles(fullPath, file + '/'));
            }
        } else if (file.endsWith('.html')) {
            results.push(prefix + file);
        }
    });
    return results;
}

function buildJson() {
    const files = getHtmlFiles(webDir);
    const rootFiles = fs.readdirSync(webDir).filter(f => f.endsWith('.html'));
    const knownFiles = new Set(rootFiles.map(f => f.replace('.html', '')));
    const articles = [];
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    files.forEach(file => {
        const baseName = path.basename(file);
        if (
            !baseName.startsWith('_template') &&
            !excludeFiles.includes(baseName)
        ) {
            const content = fs.readFileSync(path.join(webDir, file), 'utf-8');
            
            const title = extractTag(content, /<title>(.*?)<\/title>/i) || 
                          extractTag(content, /<meta property="og:title" content="(.*?)">/i);
            const description = extractTag(content, /<meta name="description" content="(.*?)">/i);
            const timeDate = extractTag(content, /<time datetime="([^"]+)"/i);
            const slug = file.replace('.html', '');
            if (shouldSkipLegacyAlias(slug, knownFiles)) {
                return;
            }
            
            // Kategori belirle
            let type = 'Scene Report';
            if (baseName.startsWith('global-pulse')) {
                type = 'Global Pulse';
            } else if (isEventsGuideSlug(slug)) {
                type = 'Events Guide';
            } else if (!file.includes('-') && !file.includes('/')) {
                type = file.includes('202') ? 'Scene Report' : 'City Hub';
            } else if (file.includes('new-york') && !file.includes('202') && !file.includes('/')) {
                type = 'City Hub';
            }

            const cityMeta = inferCityMeta(slug, type);
            if (cityMeta.canonicalCitySlug && slug === cityMeta.canonicalCitySlug) {
                type = 'City Hub';
            }
            const resolvedDate = type === 'City Hub' ? null : (timeDate || inferDateFromSlug(slug));

            if (resolvedDate && new Date(resolvedDate) > today) {
                return;
            }

            articles.push({
                title: title || slug,
                description: description,
                slug: slug,
                url: `https://eliteloop.app/${slug}`,
                date: resolvedDate,
                type: type,
                filename: file,
                citySlug: cityMeta.citySlug,
                cityName: cityMeta.cityName,
                canonicalCitySlug: cityMeta.canonicalCitySlug,
                canonicalCityUrl: cityMeta.canonicalCitySlug ? `https://eliteloop.app/${cityMeta.canonicalCitySlug}` : null,
                isLegacyAlias: cityMeta.isLegacyAlias,
                issueFlags: cityMeta.issueFlags
            });
        }
    });

    const latestSceneReportByCity = new Map();
    articles.forEach((article) => {
        if (!['Scene Report', 'Events Guide'].includes(article.type) || !article.canonicalCitySlug || !article.date) return;
        const existing = latestSceneReportByCity.get(article.canonicalCitySlug);
        if (!existing || new Date(article.date) > new Date(existing)) {
            latestSceneReportByCity.set(article.canonicalCitySlug, article.date);
        }
    });

    articles.forEach((article) => {
        if (article.type !== 'City Hub' || !article.canonicalCitySlug) return;
        article.date = latestSceneReportByCity.get(article.canonicalCitySlug) || article.date;
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
