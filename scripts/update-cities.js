const fs = require('fs');
let content = fs.readFileSync('cities.html', 'utf8');

// Remove from Istanbul
content = content.replace('<!-- Istanbul — LIVE — TODAY\'S DISPATCH -->', '<!-- Istanbul — LIVE -->');
content = content.replace('<div class="city-card__dispatch-today">🗓️ Today\'s Dispatch</div>\n      <img src="istanbul-hero.jpg"', '<img src="istanbul-hero.jpg"');

// Add to Paris
content = content.replace('<!-- Paris — LIVE (today\'s city) -->', '<!-- Paris — LIVE — TODAY\'S DISPATCH -->');
content = content.replace('<a href="/paris" class="city-card">\n      <img src="paris-hero.jpg"', '<a href="/paris" class="city-card">\n      <div class="city-card__dispatch-today">🗓️ Today\'s Dispatch</div>\n      <img src="paris-hero.jpg"');

fs.writeFileSync('cities.html', content);
console.log('Updated cities.html');
