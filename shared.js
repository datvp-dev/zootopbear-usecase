function renderUseCases(config) {
  const { actorName, actorRole, theme, useCases } = config;

  document.body.classList.add(theme);

  const stick = `<svg width="70" height="120" viewBox="0 0 70 120" fill="none" stroke="var(--purple)" stroke-width="2">
    <circle cx="35" cy="20" r="14"/>
    <line x1="35" y1="34" x2="35" y2="76"/>
    <line x1="12" y1="50" x2="58" y2="50"/>
    <line x1="35" y1="76" x2="18" y2="108"/>
    <line x1="35" y1="76" x2="52" y2="108"/>
  </svg>`;

  const pills = useCases.map((uc, i) => {
    let flag = '';
    if (uc.flag === 'open') flag = '<span class="uc-flag flag-open">Cần chốt</span>';
    else if (uc.flag === 'should') flag = '<span class="uc-flag flag-should">Should</span>';
    return `<div class="uc-pill" data-index="${i}">
        <span class="uc-code">${uc.code}</span>
        <div class="uc-title">${uc.title}</div>
        <div class="uc-sub">${uc.sub}</div>
        ${flag}
      </div>`;
  }).join('');

  const canvas = document.getElementById('canvas');
  canvas.insertAdjacentHTML('beforeend', `
    <div class="uc-diagram">
      <div class="actor-col">
        ${stick}
        <div class="actor-name">${actorName}</div>
        <div class="actor-role">${actorRole}</div>
      </div>
      <svg class="connectors" id="connectors"></svg>
      <div class="system-box">
        <div class="system-label">Hệ thống Zootop Bear</div>
        <div class="uc-list" id="ucList">${pills}</div>
      </div>
    </div>
  `);

  drawConnectors();
  window.addEventListener('resize', drawConnectors);

  function drawConnectors() {
    const svg = document.getElementById('connectors');
    const diagram = svg.closest('.uc-diagram');
    const dRect = diagram.getBoundingClientRect();
    const actor = diagram.querySelector('.actor-col svg');
    const aRect = actor.getBoundingClientRect();
    const startX = svg.getBoundingClientRect().left - dRect.left;
    const startY = (aRect.top - dRect.top) + aRect.height * 0.42;
    const svgW = svg.getBoundingClientRect().width;
    let lines = '';
    document.querySelectorAll('.uc-pill').forEach(pill => {
      const pRect = pill.getBoundingClientRect();
      const endY = (pRect.top - dRect.top) + pRect.height / 2;
      lines += `<line x1="0" y1="${startY}" x2="${svgW}" y2="${endY}" stroke="#6b6a63" stroke-width="0.75"/>`;
    });
    svg.setAttribute('height', diagram.getBoundingClientRect().height);
    svg.innerHTML = lines;
  }

  document.getElementById('ucList').addEventListener('click', e => {
    const pill = e.target.closest('.uc-pill');
    if (!pill) return;
    openDetail(useCases[pill.dataset.index]);
  });
}

function openDetail(uc) {
  const overlay = document.getElementById('detailOverlay');
  const card = document.getElementById('detailCard');

  let detailHtml;
  if (uc.detail) {
    detailHtml = uc.detail;
  } else {
    detailHtml = `<div class="placeholder">Chi tiết luồng cho use case này sẽ được bổ sung sau khi khách hàng chốt danh sách. Bao gồm: precondition, luồng chính, luồng ngoại lệ và business rules.</div>`;
  }

  card.innerHTML = `
    <button class="close-btn" onclick="closeDetail()">&times;</button>
    <div class="dc-code">${uc.code}</div>
    <h2>${uc.title}</h2>
    <div class="dc-sub">${uc.sub}</div>
    ${uc.page ? `<a class="screen-jump" href="${uc.page}">Xem mô tả use case</a>` : ''}
    ${uc.screen ? `<a class="screen-jump" href="screens.html#${uc.screen}">Xem màn hình liên quan</a>` : ''}
    ${detailHtml}
  `;
  overlay.classList.add('open');
}

function closeDetail() {
  document.getElementById('detailOverlay').classList.remove('open');
}

document.addEventListener('click', e => {
  if (e.target.id === 'detailOverlay') closeDetail();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeDetail();
});
