(() => {
  const root = document.documentElement;
  const langButton = document.getElementById('language-toggle');
  const themeButton = document.getElementById('theme-toggle');
  const count = document.getElementById('paper-count');
  let filter = 'all';
  const get = key => { try { return localStorage.getItem(key); } catch { return null; } };
  const set = (key, value) => { try { localStorage.setItem(key, value); } catch {} };
  function updateCount() {
    const n = [...document.querySelectorAll('.paper')].filter(p => !p.hidden).length;
    count.textContent = root.lang === 'zh-CN' ? `显示 ${n} 篇论文` : `${n} papers shown`;
  }
  function language(lang) {
    root.lang = lang === 'zh-CN' ? lang : 'en';
    langButton.textContent = root.lang === 'en' ? '中文' : 'EN';
    langButton.setAttribute('aria-label', root.lang === 'en' ? 'Switch to Chinese' : '切换到英文');
    updateCount();
    updateThemeLabel();
  }
  function updateThemeLabel() {
    const dark = root.dataset.theme === 'dark';
    themeButton.setAttribute('aria-label', root.lang === 'en' ? `Switch to ${dark ? 'light' : 'dark'} theme` : `切换到${dark ? '浅色' : '深色'}模式`);
    themeButton.setAttribute('aria-pressed', String(dark));
  }
  root.dataset.theme = get('ran-theme') === 'dark' ? 'dark' : 'light';
  language(get('ran-language') || 'en');
  langButton.addEventListener('click', () => { language(root.lang === 'en' ? 'zh-CN' : 'en'); set('ran-language', root.lang); });
  themeButton.addEventListener('click', () => { root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark'; set('ran-theme', root.dataset.theme); updateThemeLabel(); });
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    filter = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    document.querySelectorAll('.paper').forEach(p => { p.hidden = filter !== 'all' && p.dataset.kind !== filter; });
    updateCount();
  }));
})();
