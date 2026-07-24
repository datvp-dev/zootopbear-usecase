function renderSidebar(activePage) {
  const items = [
    { page: 'screens.html', name: 'Màn hình', color: '#6b6a63', count: 17 },
    { page: 'seller.html',  name: 'Seller',   color: 'var(--teal)',   count: 11 },
    { page: 'admin.html',   name: 'Admin',    color: 'var(--purple)', count: 11 },
    { page: 'ketoan.html',  name: 'Kế toán',  color: 'var(--amber)',  count: 5 },
    { page: 'vanhanh.html', name: 'Vận hành', color: 'var(--coral)',  count: 6 },
    { page: 'cskh.html',    name: 'CSKH',     color: 'var(--pink)',   count: 4 },
  ];

  const nav = items.map(it => `
    <a href="${it.page}" class="${activePage === it.page ? 'active' : ''}">
      <span class="swatch" style="background:${it.color}"></span>
      ${it.name}
      <span class="count">${it.count}</span>
    </a>`).join('');

  const html = `
    <div class="brand">
      <h1>Zootop Bear</h1>
      <div class="tag">Use Case Overview · Phase 1</div>
    </div>
    <div class="nav-label">Vai trò người dùng</div>
    <div class="nav">
      <a href="index.html" class="${activePage === 'index.html' ? 'active' : ''}">
        <span class="swatch" style="background:#6b6a63"></span>Tổng quan
      </a>
      ${nav}
    </div>`;

  document.getElementById('sidebar').innerHTML = html;
}
