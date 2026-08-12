function initYunxuSite() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  const header = document.querySelector('.site-header');
  const hero = document.querySelector('.hero');

  toggle?.addEventListener('click', () => {
    const open = nav?.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(Boolean(open)));
  });

  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
  }));

  window.addEventListener('scroll', () => {
    header?.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  if (hero && window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    hero.addEventListener('pointermove', event => {
      const rect = hero.getBoundingClientRect();
      const offsetX = ((event.clientX - rect.left) / rect.width - 0.5) * 28;
      const offsetY = ((event.clientY - rect.top) / rect.height - 0.5) * 22;
      hero.style.setProperty('--glow-x', `${offsetX}px`);
      hero.style.setProperty('--glow-y', `${offsetY}px`);
    }, { passive: true });

    hero.addEventListener('pointerleave', () => {
      hero.style.setProperty('--glow-x', '0px');
      hero.style.setProperty('--glow-y', '0px');
    });
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initYunxuSite, { once: true });
} else {
  initYunxuSite();
}
