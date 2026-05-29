// ─── Custom Cursor ───
const dot  = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.left  = mx + 'px';
  dot.style.top   = my + 'px';
});

(function animateRing() {
  rx += (mx - rx) * 0.14;
  ry += (my - ry) * 0.14;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animateRing);
})();

// ─── Scroll-reveal for project entries ───
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.07 });

document.querySelectorAll('.project-entry').forEach(el => observer.observe(el));

// ─── Nav scroll effect ───
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.style.background = 'rgba(10,8,6,0.97)';
    nav.style.borderBottom = '1px solid rgba(232,221,208,0.05)';
  } else {
    nav.style.background = 'linear-gradient(to bottom, rgba(10,8,6,0.95) 0%, transparent 100%)';
    nav.style.borderBottom = 'none';
  }
});
// ─── Retro Game Loading Screen Handler (Safe Multi-Page Version) ───
window.addEventListener('load', () => {
  const loader = document.getElementById('game-loader');
  
  // ONLY run the timer if the page actually has the loader HTML element!
  if (loader) {
    setTimeout(() => {
      loader.classList.add('loaded');
    }, 2200); 
  }
});