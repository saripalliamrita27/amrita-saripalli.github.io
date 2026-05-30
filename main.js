// ─── Custom Cursor System ───
const dot  = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

let clientX = 0;
let clientY = 0;

document.addEventListener('mousemove', e => {
  clientX = e.clientX;
  clientY = e.clientY;
  
  mx = clientX + window.scrollX;
  my = clientY + window.scrollY;
  
  dot.style.left  = mx + 'px';
  dot.style.top   = my + 'px';

  updateLeonFlashlightAngle();
});

(function animateRing() {
  rx += (mx - rx) * 0.14;
  ry += (my - ry) * 0.14;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animateRing);
})();

// ─── Global Teleporting Leon (Anti-Text Spawn Protection Engine) ───
const globalLeon = document.getElementById('global-teleport-leon');

function runGlobalLeonPatrol() {
  if (!globalLeon) return;

  globalLeon.classList.remove('active-flash', 'visible-idle');

  setTimeout(() => {
    const paddingBuffer = 100;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const bioBox = document.querySelector('.standard-about-box');
    const metaBox = document.querySelector('.meta-panel');
    const heroHeader = document.querySelector('.about-hero-header');

    let validSpawn = false;
    let absoluteX = 0;
    let absoluteY = 0;
    let attempts = 0;
    const maxAttempts = 150; 

    while (!validSpawn && attempts < maxAttempts) {
      attempts++;

      const randomX = Math.max(paddingBuffer, Math.floor(Math.random() * (viewportWidth - paddingBuffer * 2)));
      const randomY = Math.max(paddingBuffer, Math.floor(Math.random() * (viewportHeight - paddingBuffer * 2)));

      absoluteX = randomX + window.scrollX;
      absoluteY = randomY + window.scrollY;

      let insideProtectedArea = false;

      if (bioBox) {
        const rect = bioBox.getBoundingClientRect();
        const absLeft = rect.left + window.scrollX;
        const absRight = rect.right + window.scrollX;
        const absTop = rect.top + window.scrollY;
        const absBottom = rect.bottom + window.scrollY;

        if (absoluteX >= absLeft && absoluteX <= absRight && absoluteY >= absTop && absoluteY <= absBottom) {
          insideProtectedArea = true;
        }
      }

      if (metaBox && !insideProtectedArea) {
        const rect = metaBox.getBoundingClientRect();
        const absLeft = rect.left + window.scrollX;
        const absRight = rect.right + window.scrollX;
        const absTop = rect.top + window.scrollY;
        const absBottom = rect.bottom + window.scrollY;

        if (absoluteX >= absLeft && absoluteX <= absRight && absoluteY >= absTop && absoluteY <= absBottom) {
          insideProtectedArea = true;
        }
      }

      if (heroHeader && !insideProtectedArea) {
        const rect = heroHeader.getBoundingClientRect();
        const absLeft = rect.left + window.scrollX;
        const absRight = rect.right + window.scrollX;
        const absTop = rect.top + window.scrollY;
        const absBottom = rect.bottom + window.scrollY;

        if (absoluteX >= absLeft && absoluteX <= absRight && absoluteY >= absTop && absoluteY <= absBottom) {
          insideProtectedArea = true;
        }
      }

      if (!insideProtectedArea) {
        validSpawn = true;
      }
    }

    if (validSpawn) {
      globalLeon.style.left = absoluteX + 'px';
      globalLeon.style.top  = absoluteY + 'px';

      updateLeonFlashlightAngle();

      globalLeon.classList.add('visible-idle');

      setTimeout(() => {
        globalLeon.classList.add('active-flash');
      }, 1200);
    }

  }, 1000); 
}

// ─── GEOMETRY FIX: Syncs Flashlight Rotation with Mirror States ───
function updateLeonFlashlightAngle() {
  if (!globalLeon || !globalLeon.classList.contains('visible-idle')) return;

  // 1. Locate Leon's center point inside the viewport bounds
  const leonRect = globalLeon.getBoundingClientRect();
  const leonCenterX = leonRect.left + leonRect.width / 2;
  const leonCenterY = leonRect.top + leonRect.height / 2;

  // 2. Measure spatial delta vectors to the cursor position
  const deltaX = clientX - leonCenterX;
  const deltaY = clientY - leonCenterY;

  // 3. Convert arc tangent radians smoothly over to standard degrees
  const radians = Math.atan2(deltaY, deltaX);
  const degrees = radians * (180 / Math.PI);

  const lightCone = globalLeon.querySelector('.beam-cone-ray');
  
  // 4. Handle rendering matrix states based on cursor hemisphere placement
  if (clientX < leonCenterX) {
    // Left Hemisphere: Flip character sprite structure horizontally
    globalLeon.style.transform = 'scale(2.5) scaleX(-1)';
    
    if (lightCone) {
      // FIX: Invert the angle and add 180 degrees to cancel out the scaleX(-1) mirror flip
      const mirroredAngle = -degrees + 180;
      lightCone.style.transform = `rotate(${mirroredAngle}deg)`;
    }
  } else {
    // Right Hemisphere: Keep default right-facing layout rules intact
    globalLeon.style.transform = 'scale(2.5) scaleX(1)';
    
    if (lightCone) {
      lightCone.style.transform = `rotate(${degrees}deg)`;
    }
  }
}

// Automatically manage page initialization and lifecycle loops
window.addEventListener('load', () => {
  const loader = document.getElementById('game-loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('loaded');
      if (globalLeon) {
        setTimeout(() => {
          runGlobalLeonPatrol(); 
          setInterval(runGlobalLeonPatrol, 6500);
        }, 600);
      }
    }, 2200); 
  }
});

// Scroll-reveal triggers
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.07 });

document.querySelectorAll('.project-entry').forEach(el => observer.observe(el));

// Navigation visibility changes on scroll
const nav = document.querySelector('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.style.background = 'rgba(8,6,5,0.97)';
      nav.style.borderBottom = '1px solid rgba(244,234,224,0.1)';
    } else {
      nav.style.background = 'linear-gradient(to bottom, rgba(8,6,5,0.98) 0%, transparent 100%)';
      nav.style.borderBottom = 'none';
    }
  });
}