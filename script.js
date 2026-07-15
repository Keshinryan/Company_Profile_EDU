const counters = document.querySelectorAll('.counter');

const startCounter = (counter) => {

  const target = Number(counter.dataset.target);

  counter.innerText = 0;

  const updateCounter = () => {

    const current = Number(counter.innerText);

    const increment = target /500;

    if (current < target) {

      counter.innerText = Math.ceil(current + increment);

      requestAnimationFrame(updateCounter);

    } else {

      counter.innerText = target;

    }

  };

  updateCounter();

};

const observer = new IntersectionObserver((entries, observer) => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {

      startCounter(entry.target);

      observer.unobserve(entry.target);

    }

  });

}, {
  threshold: 0.5
});

counters.forEach(counter => {
  observer.observe(counter);
});

// PRODUCT PAGE — scroll reveal
// Fades / slides each .reveal element into place the first time
// it enters the viewport. Respects reduced-motion via CSS.

document.addEventListener('DOMContentLoaded', () => {
  const revealEls = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window) || revealEls.length === 0) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => observer.observe(el));
});

// ABOUT US PAGE — scroll reveal
// Same pattern as product.js: fades / slides .reveal elements into
// place the first time they enter the viewport.

document.addEventListener('DOMContentLoaded', () => {
  const revealEls = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window) || revealEls.length === 0) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  revealEls.forEach((el) => observer.observe(el));
});
