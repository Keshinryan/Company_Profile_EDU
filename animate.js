// SCROLL ANIMATIONS — shared across all pages
// Triggers .is-visible for any element using the reveal/slide-in
// classes from style.css / animations.css, the moment it scrolls
// into view. Uses IntersectionObserver (no scroll-event listeners,
// so it stays smooth/performant even on long pages).
//
// Usage in HTML — just add one of these classes to any element:
//   <div class="reveal">...</div>
//   <div class="slide-in-left">...</div>
//   <div class="slide-in-right">...</div>
//   <div class="slide-in-up">...</div>
//   <div class="slide-in-down">...</div>
//
// Load this AFTER include.js (if the page uses header/footer
// includes), so elements injected into the footer are also caught.

(function () {
  const SELECTOR =
    '.reveal, .slide-in-left, .slide-in-right, .slide-in-bottom, .slide-in-top,.tracking-in-contract, .fade-in-right, .fade-in-left, .fade-in , .fade-in-bottom';
  function initScrollAnimations() {
    const els = document.querySelectorAll(SELECTOR);
    if (els.length === 0) return;

    // No IntersectionObserver support (very old browsers) — just show everything
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target); // animate once, then stop watching
          }
        });
      },
      {
        threshold: 0.15,        // fire when 15% of the element is visible
        rootMargin: '0px 0px -50px 0px', // trigger a bit before it fully enters
      }
    );

    els.forEach((el) => observer.observe(el));
  }

  // Run once the DOM is ready
  document.addEventListener('DOMContentLoaded', initScrollAnimations);

  // Re-run if header/footer are injected later via include.js,
  // in case any .reveal / .slide-in-* elements live inside them
  document.addEventListener('includes:loaded', initScrollAnimations);
})();