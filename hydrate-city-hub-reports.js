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

  fetch('/articles.json')
    .then((response) => {
      if (!response.ok) throw new Error(`articles.json ${response.status}`);
      return response.json();
    })
    .then((articles) => {
      const reports = articles
        .filter((article) => article.type === 'Scene Report' && article.canonicalCitySlug === canonicalPath && article.date)
        .sort((a, b) => new Date(`${b.date}T00:00:00Z`) - new Date(`${a.date}T00:00:00Z`));

      if (!reports.length) return;

      const [latestReport, ...archiveReports] = reports;
      const cityName = latestReport.cityName || canonicalPath.replace(/-/g, ' ');
      sectionTitle.textContent = `${cityName} Scene Reports`;

      const featuredContent = featuredCard.querySelector('.scene-card__content') || featuredCard.firstElementChild;
      if (featuredContent) {
        const tag = featuredContent.querySelector('.scene-card__tag');
        const title = featuredContent.querySelector('.scene-card__title');
        const excerpt = featuredContent.querySelector('.scene-card__excerpt');
        const read = featuredContent.querySelector('.scene-card__read');

        featuredCard.href = `/${latestReport.slug}`;
        if (tag) tag.innerHTML = `${formatDate(latestReport.date)} · Scene Report ${newBadgeHtml}`;
        if (title) title.textContent = cleanTitle(latestReport.title);
        if (excerpt) excerpt.textContent = cleanExcerpt(latestReport.description);
        if (read) read.textContent = 'Read full report →';
      }

      archiveList.setAttribute('aria-label', `${cityName} report archive`);
      archiveList.innerHTML = archiveReports
        .map((report) => {
          return `
      <a href="/${report.slug}" class="report-archive-item">
        <div class="report-archive__meta">
          <time datetime="${report.date}" class="report-archive__date">${formatShortDate(report.date)}</time>
          <span class="report-archive__tag">SCENE REPORT</span>
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
