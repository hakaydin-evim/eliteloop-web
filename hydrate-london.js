const fs = require('fs');

let hub = fs.readFileSync('london.html', 'utf8');

hub = hub.replace(/\{\{CITY_SLUG\}\}/g, 'london');
hub = hub.replace(/\{\{CITY_NAME\}\}/g, 'London');
hub = hub.replace(/\{\{CITY_SUBTITLE\}\}/g, 'London · Private Social Discovery');
hub = hub.replace(/\{\{CITY_EMOJI\}\}/g, '🇬🇧');
hub = hub.replace(/\{\{CITY_HEADLINE_1\}\}/g, 'Where heritage meets');
hub = hub.replace(/\{\{CITY_HEADLINE_EM\}\}/g, 'off-market elite.');
hub = hub.replace(/\{\{CITY_HEADLINE_2\}\}/g, '');
hub = hub.replace(/\{\{CITY_HERO_DESC\}\}/g, "London's most distinguished social circle, unlisted receptions in Mayfair, and exclusive finance networks.");
hub = hub.replace(/\{\{HERO_IMAGE\}\}/g, "london-hero.jpg");
hub = hub.replace(/\{\{CITY_COUNTRY\}\}/g, "UK");

// Events
hub = hub.replace(/\{\{EVENT_1_DATE\}\}/g, "April 22");
hub = hub.replace(/\{\{EVENT_1_TITLE\}\}/g, "Private Credit Connect");
hub = hub.replace(/\{\{EVENT_1_LOC\}\}/g, "133 Houndsditch");
hub = hub.replace(/\{\{EVENT_1_DESC\}\}/g, "Structured finance and elite private credit networking.");

hub = hub.replace(/\{\{EVENT_2_DATE\}\}/g, "April 23");
hub = hub.replace(/\{\{EVENT_2_TITLE\}\}/g, "Hedge Fund Services Awards");
hub = hub.replace(/\{\{EVENT_2_LOC\}\}/g, "Mayfair District");
hub = hub.replace(/\{\{EVENT_2_DESC\}\}/g, "Honoring top fund managers and service providers.");

hub = hub.replace(/\{\{EVENT_3_DATE\}\}/g, 'Fridays');
hub = hub.replace(/\{\{EVENT_3_TITLE\}\}/g, 'AYU Private Receptions');
hub = hub.replace(/\{\{EVENT_3_LOC\}\}/g, 'Unlisted');
hub = hub.replace(/\{\{EVENT_3_DESC\}\}/g, 'Off-market drinks for verified allocators & family offices.');

// Scene Report links
hub = hub.replace(/\{\{SCENE_LINK\}\}/g, '/london-april-2026.html');
hub = hub.replace(/\{\{SCENE_IMAGE\}\}/g, 'london-scene.jpg');
hub = hub.replace(/\{\{SCENE_TAG\}\}/g, 'Insights');
hub = hub.replace(/\{\{SCENE_TITLE\}\}/g, "London's Elite Season: Beyond the Summits");
hub = hub.replace(/\{\{SCENE_EXCERPT\}\}/g, "The term sheet wasn't signed at a crowded conference. It was finalized over quiet drinks in Mayfair.");

// Features
hub = hub.replace(/\{\{FEAT_1_TITLE\}\}/g, 'Discover Mayfair');
hub = hub.replace(/\{\{FEAT_1_DESC\}\}/g, 'Access unlisted clubs and receptions hidden from public maps.');
hub = hub.replace(/\{\{FEAT_2_TITLE\}\}/g, 'Elite Validation');
hub = hub.replace(/\{\{FEAT_2_DESC\}\}/g, 'Only verified finance directors and tech founders.');
hub = hub.replace(/\{\{FEAT_3_TITLE\}\}/g, 'Off-market Radar');
hub = hub.replace(/\{\{FEAT_3_DESC\}\}/g, 'The heatmap shifts to where actual decision-makers gather.');
hub = hub.replace(/\{\{FEAT_4_TITLE\}\}/g, 'Absolute Privacy');
hub = hub.replace(/\{\{FEAT_4_DESC\}\}/g, 'No noisy connections. Discretion is guaranteed.');

hub = hub.replace(/\{\{DOWNLOAD_TITLE\}\}/g, 'Command the room in London.');
hub = hub.replace(/\{\{DOWNLOAD_SUB\}\}/g, 'Available on iOS and Android. Unlock your elite social network today.');

fs.writeFileSync('london.html', hub);


let scene = fs.readFileSync('london-april-2026.html', 'utf8');

scene = scene.replace(/\{\{CITY_SLUG\}\}/g, 'london');
scene = scene.replace(/\{\{CITY_NAME\}\}/g, 'London');
scene = scene.replace(/\{\{ARTICLE_TITLE\}\}/g, "London's Elite Season: Mayfair & Unlisted Networks");
scene = scene.replace(/\{\{ARTICLE_SUBTITLE\}\}/g, 'Why the biggest private credit and hedge fund deals are shifting completely off the market this April.');
scene = scene.replace(/\{\{HERO_IMAGE\}\}/g, 'london-scene.jpg');
scene = scene.replace(/\{\{PUB_DATE_ISO\}\}/g, '2026-04-06');
scene = scene.replace(/\{\{PUB_DATE_DISPLAY\}\}/g, 'April 6, 2026');
scene = scene.replace(/\{\{READ_TIME\}\}/g, '4 min read');

scene = scene.replace(/\{\{INTRO_P1\}\}/g, "In 2026, the term sheet for a £15M private credit facility wasn't signed at a crowded conference in London. It was finalized over quiet drinks in a verified room in Mayfair. This April, huge conferences like the Private Credit Connect and Hedge Fund Services awards continue to draw thousands of executives, but the real elite networking has gone completely underground.");
scene = scene.replace(/\{\{SECTION_1_TITLE\}\}/g, 'The Noise of the Crowd vs. The Signal of the Room');
scene = scene.replace(/\{\{SECTION_1_P1\}\}/g, 'The standard industry playbook is exhausting. Professionals scan hundreds of generic name tags, fight for three minutes of forced conversation, and follow up with a cold email that goes straight to spam. At major summits in London, volume is your enemy and precision is your asset.');
scene = scene.replace(/\{\{SECTION_1_P2\}\}/g, "Family office directors and tier-1 allocators don't make decisions in loud exhibition halls. They retreat to vetted, off-market environments where access is tightly controlled—often orchestrated by closed communities likeAYU or hidden Mayfair clubs.");

scene = scene.replace(/\{\{SECTION_2_TITLE\}\}/g, 'London Elite Social DNA');
scene = scene.replace(/\{\{SECTION_2_P1\}\}/g, "The DNA of London's elite networking is shifting. An industry lanyard only gets you into the building; a verified network places you at the correct table. The focus has moved from mass connection to extreme curation.");
scene = scene.replace(/\{\{SECTION_2_P2\}\}/g, 'Whether it is a discrete post-event reception for hedge fund managers or an exclusive gathering of fintech founders, discretion is prioritized over visibility. Being invited to these spaces requires an insider pass that money alone cannot buy.');

scene = scene.replace(/\{\{SECTION_3_TITLE\}\}/g, 'Decrypting access with EliteLoop');
scene = scene.replace(/\{\{SECTION_3_P1\}\}/g, "This is exactly where EliteLoop steps in. By validating members through rigorous verification, our map decrypts London's hidden social layer. A Silver or Gold Badge unlocks private, unlisted receptions occurring just streets away from massive public conferences.");
scene = scene.replace(/\{\{SECTION_3_P2\}\}/g, 'Instead of buying another mega-event ticket, verified founders open the EliteLoop radar to see where the actual dealmakers are dining tonight. Bypassing the noise, EliteLoop guarantees you are always precisely where you need to be.');

scene = scene.replace(/\{\{CLOSING_P\}\}/g, 'The elite social season in London is active. Discover where the actual deals are being negotiated. Upgrade your strategy from trying to be everywhere, to guaranteeing you are in the only room that matters.');
scene = scene.replace(/\{\{CTA_HEADLINE\}\}/g, 'Ready to command the room in London?');

fs.writeFileSync('london-april-2026.html', scene);

console.log("Templates successfully hydrated for London.");
