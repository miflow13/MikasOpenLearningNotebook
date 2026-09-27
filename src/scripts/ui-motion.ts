const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

document.documentElement.classList.add('js');

function initActiveNavigation(): void {
  const currentPath = window.location.pathname.replace(/\/+$/, '');
  document.querySelectorAll<HTMLAnchorElement>('header nav a').forEach((link) => {
    try {
      const path = new URL(link.href, window.location.href).pathname.replace(/\/+$/, '');
      if (path === currentPath) link.setAttribute('aria-current', 'page');
    } catch {
      // External or malformed links do not participate in local active navigation.
    }
  });
}

function initHeaderState(): void {
  const header = document.querySelector<HTMLElement>('body > header');
  if (!header) return;

  const sync = () => header.classList.toggle('is-scrolled', window.scrollY > 12);
  sync();
  window.addEventListener('scroll', sync, { passive: true });
}

function initReveal(): void {
  const selectors = [
    'main > section',
    '.roadmap-step-grid article',
    '.home-trail-grid article',
    '.latest-notebook-grid article',
    '.roadmap-phase',
    '.skill-card',
    '.journey-map-phase',
    '.journey-timeline li',
    '.career-practice-card',
    '.project-list li',
    '.post-list li',
    '.note-list li',
    '.mika-current-pin',
    '.dual-position',
    '.open-questions',
  ].join(',');

  const elements = Array.from(document.querySelectorAll<HTMLElement>(selectors));
  elements.forEach((element, index) => {
    element.classList.add('reveal');
    element.style.transitionDelay = `${Math.min(index % 5, 4) * 45}ms`;
  });

  if (reducedMotion || !('IntersectionObserver' in window)) {
    elements.forEach((element) => element.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      (entry.target as HTMLElement).classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -7% 0px' });

  elements.forEach((element) => observer.observe(element));
}

function initTilt(): void {
  if (reducedMotion || !finePointer) return;

  const selectors = [
    '.skill-card',
    '.roadmap-step-grid article',
    '.home-trail-grid article',
    '.latest-notebook-grid article',
    '.career-practice-card',
    '.mika-current-pin',
  ].join(',');

  document.querySelectorAll<HTMLElement>(selectors).forEach((card) => {
    card.classList.add('tilt-card');

    const reset = () => {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    };

    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty('--rx', `${(-y * 4.5).toFixed(2)}deg`);
      card.style.setProperty('--ry', `${(x * 5.5).toFixed(2)}deg`);
    });

    card.addEventListener('pointerleave', reset);
    card.addEventListener('blur', reset, true);
  });
}

function initAmbientPointer(): void {
  if (reducedMotion || !finePointer) return;

  let frame = 0;
  window.addEventListener('pointermove', (event) => {
    if (frame) return;
    frame = window.requestAnimationFrame(() => {
      document.documentElement.style.setProperty('--mx', `${event.clientX}px`);
      document.documentElement.style.setProperty('--my', `${event.clientY}px`);
      frame = 0;
    });
  }, { passive: true });
}

function initDetailsMotion(): void {
  document.querySelectorAll<HTMLDetailsElement>('.roadmap-phase-details').forEach((details) => {
    details.addEventListener('toggle', () => {
      const phase = details.closest<HTMLElement>('.roadmap-phase');
      if (!phase) return;
      phase.classList.toggle('is-open', details.open);
    });
    if (details.open) details.closest<HTMLElement>('.roadmap-phase')?.classList.add('is-open');
  });
}

function initRipple(): void {
  if (reducedMotion) return;

  const targets = '.primary-link, .hero-links a, .roadmap-settings button, .file-action, .skill-card-link';
  document.querySelectorAll<HTMLElement>(targets).forEach((element) => {
    element.classList.add('ripple-host');
    element.addEventListener('pointerdown', (event) => {
      const rect = element.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ui-ripple';
      ripple.style.left = `${event.clientX - rect.left}px`;
      ripple.style.top = `${event.clientY - rect.top}px`;
      element.append(ripple);
      window.setTimeout(() => ripple.remove(), 650);
    });
  });
}

function initMagneticLinks(): void {
  if (reducedMotion || !finePointer) return;

  document.querySelectorAll<HTMLElement>('.primary-link, .hero-links a').forEach((element) => {
    element.addEventListener('pointermove', (event) => {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * 0.08;
      const y = (event.clientY - rect.top - rect.height / 2) * 0.08;
      element.style.transform = `translate(${x}px,${y - 2}px)`;
    });
    element.addEventListener('pointerleave', () => {
      element.style.removeProperty('transform');
    });
  });
}

export function initUiMotion(): void {
  initActiveNavigation();
  initHeaderState();
  initReveal();
  initTilt();
  initAmbientPointer();
  initDetailsMotion();
  initMagneticLinks();
  initRipple();
}

initUiMotion();
