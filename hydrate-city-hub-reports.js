(function hydrateCityHubReports() {
  const canonicalLink = document.querySelector('link[rel="canonical"]');
  const sceneSection = document.querySelector('.scene-section');
  const featuredCard = sceneSection?.querySelector('.scene-card');
  const archiveList = sceneSection?.querySelector('.report-archive-list');
  const sectionTitle = sceneSection?.querySelector('.scene-section__title');

  if (!canonicalLink || !sceneSection || !featuredCard || !archiveList || !sectionTitle) return;

  const canonicalPath = new URL(canonicalLink.href, window.location.origin).pathname.replace(/^\/|\/$/g, '');
  if (!canonicalPath || canonicalPath === 'cities' || canonicalPath.startsWith('global-pulse')) return;

  const formatDate = (value) =>
    new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC'
    }).format(new Date(`${value}T00:00:00Z`));

  const formatShortDate = (value) =>
    new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      timeZone: 'UTC'
    }).format(new Date(`${value}T00:00:00Z`));

  const cleanTitle = (title) =>
    title
      .replace(/\s+[—-]\s+EliteLoop.*$/i, '')
      .replace(/\s+\|\s+EliteLoop.*$/i, '')
      .trim();

  const cleanExcerpt = (description) =>
    (description || '')
      .replace(/\s*EliteLoop.*$/i, '')
      .replace(/\s+/g, ' ')
      .trim();

  const newBadgeHtml = '<span style="display:inline-block;margin-left:10px;padding:2px 7px;background:rgba(201,160,47,0.15);color:#ebcf79;border:1px solid rgba(201,160,47,0.4);border-radius:4px;font-weight:800;font-size:0.55rem;letter-spacing:0.1em;text-transform:uppercase;vertical-align:middle;">NEW</span>';
  
  const isCityContent = (article) => ['Events Guide', 'Scene Report'].includes(article.type);
  const contentLabel = (article) => article.type === 'Events Guide' ? 'Events Guide' : 'Scene Report';
  const contentTag = (article) => article.type === 'Events Guide' ? 'EVENTS GUIDE' : 'SCENE REPORT';
  const contentPriority = (article) => article.type === 'Events Guide' ? 0 : 1;
  const isLocalized = (article) => article.slug.includes('/');

  fetch('/articles.json')
    .then((response) => {
      if (!response.ok) throw new Error(`articles.json ${response.status}`);
      return response.json();
    })
    .then((articles) => {
      // Filter for this city
      const cityArticles = articles.filter((article) => isCityContent(article) && article.canonicalCitySlug === canonicalPath && article.date);
      
      // Separate primary (English/Root) and localized versions
      const primaryReports = cityArticles.filter(a => !isLocalized(a)).sort((a, b) =>
        new Date(`${b.date}T00:00:00Z`) - new Date(`${a.date}T00:00:00Z`) ||
        contentPriority(a) - contentPriority(b)
      );

      if (!primaryReports.length) return;

      const [latestReport, ...archiveReports] = primaryReports;
      const cityName = latestReport.cityName || canonicalPath.replace(/-/g, ' ');
      sectionTitle.textContent = `${cityName} Events Guides & Reports`;

      // Check for localized version of the latest report
      const localVersion = cityArticles.find(a => isLocalized(a) && a.slug.endsWith(latestReport.slug));
      let localLinkHtml = '';
      if (localVersion) {
        const langCode = localVersion.slug.split('/')[0];
        const langMap = { 'fr': 'Français', 'es': 'Español', 'ar': 'العربية', 'de': 'Deutsch', 'it': 'Italiano', 'tr': 'Türkçe', 'ja': '日本語', 'pt': 'Português', 'ko': '한국어' };
        const langName = langMap[langCode] || langCode.toUpperCase();
        localLinkHtml = `<a href="/${localVersion.slug}" class="local-edition-link" style="display:inline-flex; align-items:center; gap:0.4rem; margin-top:1.2rem; font-size:0.75rem; color:#ebcf79; text-decoration:none; border:1px solid rgba(235,207,121,0.3); padding:0.4rem 0.8rem; border-radius:0.4rem; background:rgba(201,160,47,0.05); transition:background 0.2s;"><span>🌐</span> ${langName} Edition</a>`;
      }

      const featuredContent = featuredCard.querySelector('.scene-card__content') || featuredCard.firstElementChild;
      if (featuredContent) {
        const tag = featuredContent.querySelector('.scene-card__tag');
        const title = featuredContent.querySelector('.scene-card__title');
        const excerpt = featuredContent.querySelector('.scene-card__excerpt');
        const read = featuredContent.querySelector('.scene-card__read');

        featuredCard.href = `/${latestReport.slug}`;
        if (tag) tag.innerHTML = `${formatDate(latestReport.date)} · ${contentLabel(latestReport)} ${newBadgeHtml}`;
        if (title) title.textContent = cleanTitle(latestReport.title);
        if (excerpt) excerpt.textContent = cleanExcerpt(latestReport.description);
        if (read) {
          const btnText = latestReport.type === 'Events Guide' ? 'Read full guide →' : 'Read full report →';
          read.innerHTML = `<span style="display:block; margin-bottom:${localVersion ? '0.5rem' : '0'};">${btnText}</span>${localLinkHtml}`;
        }
      }

      archiveList.setAttribute('aria-label', `${cityName} report archive`);
      archiveList.innerHTML = archiveReports
        .map((report) => {
          return `
      <a href="/${report.slug}" class="report-archive-item">
        <div class="report-archive__meta">
          <time datetime="${report.date}" class="report-archive__date">${formatShortDate(report.date)}</time>
          <span class="report-archive__tag">${contentTag(report)}</span>
        </div>
        <div class="report-archive__content">
          <div class="report-archive__title">${cleanTitle(report.title)}</div>
          <div class="report-archive__excerpt">${cleanExcerpt(report.description)}</div>
        </div>
      </a>`;
        })
        .join('');
    })
    .catch((error) => {
      console.error('Failed to hydrate city hub reports:', error);
    });
})();
