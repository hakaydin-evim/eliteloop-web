const fs = require('fs');
const path = require('path');

const webDir = path.join(__dirname, '..');
const articlesPath = path.join(webDir, 'articles.json');
const citiesPath = path.join(webDir, 'cities.html');
const gpPath = path.join(webDir, 'global-pulse.html');

if (!fs.existsSync(articlesPath)) {
  console.error('articles.json not found');
  process.exit(1);
}

const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

// 1. Calculate counts for each city
const cityCounts = {};
articles.forEach(a => {
  if (['Events Guide', 'Scene Report'].includes(a.type) && a.canonicalCitySlug) {
    if (!cityCounts[a.canonicalCitySlug]) {
      cityCounts[a.canonicalCitySlug] = { guides: 0, reports: 0 };
    }
    // Count root-level English articles
    if (!a.slug.includes('/')) {
      if (a.slug.endsWith('june-2026')) {
        cityCounts[a.canonicalCitySlug].guides = 1;
      } else {
        cityCounts[a.canonicalCitySlug].reports++;
      }
    }
  }
});

// 2. Update cities.html city cards (counts, descriptions, update badges)
if (fs.existsSync(citiesPath)) {
  let html = fs.readFileSync(citiesPath, 'utf8');

  Object.keys(cityCounts).forEach(slug => {
    const counts = cityCounts[slug];
    const reportText = counts.reports === 1 ? '1 Report' : `${counts.reports} Reports`;
    const newCountStr = `📚 1 Guide · ${reportText}`;

    // Regex to match the city card block
    const cardRegex = new RegExp(`(<a href="/${slug}" class="city-card">)([\\s\\S]*?)(</a>)`, 'g');
    
    html = html.replace(cardRegex, (match, p1, p2, p3) => {
      let cardBody = p2;
      
      // Update the count element
      cardBody = cardBody.replace(
        /(<span class="city-card__count">)[^<]*(<\/span>)/,
        `$1${newCountStr}$2`
      );

      // Change NEW HUB to UPDATED
      cardBody = cardBody.replace(
        /city-update-badge--new">NEW HUB<\/span>/,
        'city-update-badge--updated">UPDATED</span>'
      );

      // Change NEW GUIDE to UPDATED
      cardBody = cardBody.replace(
        /city-update-badge--new">NEW GUIDE<\/span>/,
        'city-update-badge--updated">UPDATED</span>'
      );

      // Apply specific summer/June description updates
      if (slug === 'london') {
        cardBody = cardBody.replace(
          /(<p class="city-card__desc">)[^<]*(<\/p>)/,
          `$1London Tech Week, Royal Ascot Enclosures, masterclass sessions, and private Mayfair summer dining.$2`
        );
      } else if (slug === 'istanbul') {
        cardBody = cardBody.replace(
          /(<p class="city-card__desc">)[^<]*(<\/p>)/,
          `$1Where two continents meet — exclusive Bosphorus yacht parties, Yeniköy yalı dinners, and summer social gatherings.$2`
        );
      }

      return p1 + cardBody + p3;
    });
  });

  // 3. Update Global Pulse section in cities.html
  const oldTodayPulseComment = `<!-- Today's article — May 31 Global Pulse: Quiet Luxury -->`;
  if (html.includes(oldTodayPulseComment)) {
    const oldTodayPulseBlock = `      <!-- Today's article — May 31 Global Pulse: Quiet Luxury -->
      <a href="/global-pulse-31-may-2026"
         style="border:1px solid rgba(216,165,87,0.3); border-radius:1rem; padding:1.4rem 1.5rem; text-decoration:none; display:flex; flex-direction:column; gap:0.5rem; background:rgba(216,165,87,0.04); transition:border-color 0.2s, transform 0.2s;"
         onmouseover="this.style.borderColor='rgba(216,165,87,0.6)';this.style.transform='translateY(-2px)'"
         onmouseout="this.style.borderColor='rgba(216,165,87,0.3)';this.style.transform='translateY(0)'">
        <div style="display:flex; align-items:center; gap:0.5rem;">
          <span style="font-size:0.6rem; letter-spacing:0.15em; text-transform:uppercase; color:#fae6b7; font-weight:700;">Global Pulse · Quiet Luxury</span>
          <span style="background:rgba(216,165,87,0.15); color:#fae6b7; border:1px solid rgba(216,165,87,0.4); font-size:0.54rem; font-weight:800; letter-spacing:0.1em; text-transform:uppercase; padding:2px 6px; border-radius:999px;">TODAY</span>
        </div>
        <div style="font-family:'Cormorant Garamond',serif; font-size:1.2rem; font-weight:600; color:#f8efe2; line-height:1.3;">The First Door: Passing the Ultimate High-Trust Filter</div>
        <div style="font-size:0.8rem; color:rgba(248,239,226,0.55); line-height:1.65; font-weight:300;">Explore why elite social circles are structured with high-resistance entries and how passing the first door changes the trajectory of access in New York City.</div>
        <div style="font-size:0.7rem; color:rgba(248,239,226,0.3); margin-top:0.25rem;">May 31, 2026 · 4 min read</div>
      </a>`;

    const pastMay31PulseBlock = `      <!-- Past article — May 31 Global Pulse: Quiet Luxury & Access Psychology -->
      <a href="/global-pulse-31-may-2026"
         style="border:1px solid rgba(255,255,255,0.08); border-radius:1rem; padding:1.4rem 1.5rem; text-decoration:none; display:flex; flex-direction:column; gap:0.5rem; transition:border-color 0.2s, transform 0.2s;"
         onmouseover="this.style.borderColor='rgba(216,165,87,0.4)';this.style.transform='translateY(-2px)'"
         onmouseout="this.style.borderColor='rgba(255,255,255,0.08)';this.style.transform='translateY(0)'">
        <span style="font-size:0.6rem; letter-spacing:0.15em; text-transform:uppercase; color:rgba(248,239,226,0.45); font-weight:600;">Global Pulse · Quiet Luxury &amp; Access Psychology</span>
        <div style="font-family:'Cormorant Garamond',serif; font-size:1.2rem; font-weight:600; color:#f8efe2; line-height:1.3;">The First Door: Passing the Ultimate High-Trust Filter</div>
        <div style="font-size:0.8rem; color:rgba(248,239,226,0.55); line-height:1.65; font-weight:300;">Explore why elite social circles are structured with high-resistance entries and how passing the first door changes the trajectory of access in New York City.</div>
        <div style="font-size:0.7rem; color:rgba(248,239,226,0.3); margin-top:0.25rem;">May 31, 2026 · 4 min read</div>
      </a>`;

    const newTodayPulseBlock = `      <!-- Today's article — June 6 Global Pulse: Quiet Luxury & Access Psychology -->
      <a href="/global-pulse-06-june-2026"
         style="border:1px solid rgba(216,165,87,0.3); border-radius:1rem; padding:1.4rem 1.5rem; text-decoration:none; display:flex; flex-direction:column; gap:0.5rem; background:rgba(216,165,87,0.04); transition:border-color 0.2s, transform 0.2s;"
         onmouseover="this.style.borderColor='rgba(216,165,87,0.6)';this.style.transform='translateY(-2px)'"
         onmouseout="this.style.borderColor='rgba(216,165,87,0.3)';this.style.transform='translateY(0)'">
        <div style="display:flex; align-items:center; gap:0.5rem;">
          <span style="font-size:0.6rem; letter-spacing:0.15em; text-transform:uppercase; color:#fae6b7; font-weight:700;">Global Pulse · Quiet Luxury &amp; Access Psychology</span>
          <span style="background:rgba(216,165,87,0.15); color:#fae6b7; border:1px solid rgba(216,165,87,0.4); font-size:0.54rem; font-weight:800; letter-spacing:0.1em; text-transform:uppercase; padding:2px 6px; border-radius:999px;">TODAY</span>
        </div>
        <div style="font-family:'Cormorant Garamond',serif; font-size:1.2rem; font-weight:600; color:#f8efe2; line-height:1.3;">The Summer Access Layer: How Private Circles Restructure for the High-Season</div>
        <div style="font-size:0.8rem; color:rgba(248,239,226,0.55); line-height:1.65; font-weight:300;">Explore how elite social networks in Paris, London, and Monaco shift from private dining rooms to exclusive seasonal estates and yacht briefings in June 2026.</div>
        <div style="font-size:0.7rem; color:rgba(248,239,226,0.3); margin-top:0.25rem;">June 6, 2026 · 4 min read</div>
      </a>`;

    html = html.replace(oldTodayPulseBlock, newTodayPulseBlock + '\n\n' + pastMay31PulseBlock);
    console.log('✅ cities.html Global Pulse section updated');
  }

  fs.writeFileSync(citiesPath, html, 'utf8');
  console.log('✅ cities.html city card counts and descriptions updated');
}

// 4. Update global-pulse.html (Featured article and archive prepending)
if (fs.existsSync(gpPath)) {
  let html = fs.readFileSync(gpPath, 'utf8');

  if (html.includes('href="/global-pulse-31-may-2026" class="pulse-featured-card"')) {
    // Replace featured section
    const oldFeaturedSection = `  <!-- Featured -->
  <section class="pulse-featured" aria-label="Latest Global Pulse">
    <div class="pulse-featured__label">Today's Pulse</div>
    <a href="/global-pulse-31-may-2026" class="pulse-featured-card">
      <div class="pulse-featured-card__img">🌐</div>
      <div class="pulse-featured-card__body">
        <div class="pulse-featured-card__tag">Quiet Luxury & Access Psychology · Sunday, May 31, 2026</div>
        <div class="pulse-featured-card__title">The First Door: Passing the Ultimate High-Trust Filter — EliteLoop Global</div>
        <div class="pulse-featured-card__excerpt">Explore why elite social circles are structured with high-resistance entries and how passing the first door changes the trajectory of access in New York City.</div>
        <div class="pulse-featured-card__meta">May 31, 2026 · 4 min read</div>
        <div style="margin-top:1rem;" class="pulse-featured-card__read">Read full dispatch →</div>
      </div>
    </a>
  </section>`;

    const newFeaturedSection = `  <!-- Featured -->
  <section class="pulse-featured" aria-label="Latest Global Pulse">
    <div class="pulse-featured__label">Today's Pulse</div>
    <a href="/global-pulse-06-june-2026" class="pulse-featured-card">
      <div class="pulse-featured-card__img">🌐</div>
      <div class="pulse-featured-card__body">
        <div class="pulse-featured-card__tag">Quiet Luxury & Access Psychology · Saturday, June 6, 2026</div>
        <div class="pulse-featured-card__title">The Summer Access Layer: How Private Circles Restructure for the High-Season — EliteLoop Global</div>
        <div class="pulse-featured-card__excerpt">Explore how elite social networks in Paris, London, and Monaco shift from private dining rooms to exclusive seasonal estates and yacht briefings in June 2026.</div>
        <div class="pulse-featured-card__meta">June 6, 2026 · 4 min read</div>
        <div style="margin-top:1rem;" class="pulse-featured-card__read">Read full dispatch →</div>
      </div>
    </a>
  </section>`;

    // Prepend May 31 to archive
    const may31ArchiveCard = `      <a href="/global-pulse-31-may-2026" class="pulse-article-card">
        <div class="pulse-article-card__lens">Quiet Luxury &amp; Access Psychology</div>
        <div class="pulse-article-card__title">The First Door: Passing the Ultimate High-Trust Filter</div>
        <div class="pulse-article-card__excerpt">Explore why elite social circles are structured with high-resistance entries and how passing the first door changes the trajectory of access in New York City.</div>
        <div class="pulse-article-card__meta">May 31, 2026 · 4 min read</div>
      </a>\n`;

    html = html.replace(oldFeaturedSection, newFeaturedSection);
    html = html.replace('<div class="pulse-articles">', '<div class="pulse-articles">\n' + may31ArchiveCard);
    
    fs.writeFileSync(gpPath, html, 'utf8');
    console.log('✅ global-pulse.html featured section and archive grid updated');
  }
}
