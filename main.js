(() => {
'use strict';

// Small, dependency-free enhancements: the content remains usable without JS.
for (const element of document.querySelectorAll('[data-year]')) {
  element.textContent = String(new Date().getFullYear());
}

const header = document.querySelector('.site-header');
const root = document.documentElement;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// Anchor offsets stay correct when the mobile header wraps onto two lines.
function measureHeader() {
  if (!header) return;
  root.style.setProperty('--header-offset', `${Math.ceil(header.getBoundingClientRect().height) + 16}px`);
}
measureHeader();
if (header && 'ResizeObserver' in window) {
  new ResizeObserver(measureHeader).observe(header);
} else {
  window.addEventListener('resize', measureHeader, { passive: true });
}

// Passive, requestAnimationFrame-throttled scroll state and in-page navigation.
const navLinks = Array.from(document.querySelectorAll('.site-nav a[href^="#"]'));
const sections = navLinks
  .map(link => ({ link, section: document.querySelector(link.getAttribute('href')) }))
  .filter(entry => entry.section);
let scrollFrame = 0;
function updateScrollState() {
  scrollFrame = 0;
  if (header) header.classList.toggle('is-scrolled', window.scrollY > 12);
  if (!sections.length) return;
  const cutoff = window.scrollY + (header ? header.offsetHeight : 0) + 74;
  let active = sections[0];
  for (const entry of sections) {
    if (entry.section.offsetTop <= cutoff) active = entry;
  }
  for (const entry of sections) {
    if (entry === active) entry.link.setAttribute('aria-current', 'location');
    else entry.link.removeAttribute('aria-current');
  }
}
function requestScrollUpdate() {
  if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateScrollState);
}
window.addEventListener('scroll', requestScrollUpdate, { passive: true });
window.addEventListener('resize', requestScrollUpdate, { passive: true });
window.addEventListener('hashchange', requestScrollUpdate);
requestScrollUpdate();

// Reveal only below-the-fold sections; don't animate content already on screen.
if (!reducedMotion.matches && 'IntersectionObserver' in window) {
  const candidates = document.querySelectorAll('.content-section, .detail-article, .page-ending');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-revealed');
      observer.unobserve(entry.target);
    }
  }, { rootMargin: '0px 0px -36px 0px', threshold: 0.01 });

  for (const section of candidates) {
    const rect = section.getBoundingClientRect();
    // Keep hash targets and initially visible content immediately readable.
    if (rect.top < window.innerHeight + 10 || `#${section.id}` === window.location.hash) continue;
    section.classList.add('will-reveal');
    revealObserver.observe(section);
  }
  // If the motion preference changes, immediately show everything.
  reducedMotion.addEventListener?.('change', (event) => {
    if (event.matches) {
      for (const section of candidates) {
        section.classList.add('is-revealed');
        revealObserver.unobserve(section);
      }
    }
  });
}

})();
