// ===== NAVIGATION ACTIVE STATE =====
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.screen');

// Better scroll-based navigation tracking
function updateActiveNav() {
  const scrollPosition = window.scrollY;
  const windowHeight = window.innerHeight;

  let currentSection = null;
  let maxVisibility = 0;

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const sectionTop = rect.top + scrollPosition;
    const sectionHeight = rect.height;
    const sectionBottom = sectionTop + sectionHeight;

    // Calculate how much of the section is visible
    const viewportTop = scrollPosition;
    const viewportBottom = scrollPosition + windowHeight;

    const visibleTop = Math.max(sectionTop, viewportTop);
    const visibleBottom = Math.min(sectionBottom, viewportBottom);
    const visibleHeight = Math.max(0, visibleBottom - visibleTop);
    const visibilityRatio = visibleHeight / windowHeight;

    // Section is considered if it's in the top half of viewport
    if (rect.top < windowHeight / 2 && rect.bottom > 0) {
      if (visibilityRatio > maxVisibility) {
        maxVisibility = visibilityRatio;
        currentSection = section;
      }
    }
  });

  // Update active state
  if (currentSection) {
    const id = currentSection.getAttribute('id');
    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${id}`) {
        item.classList.add('active');
      }
    });
  }
}

// Throttle scroll events for performance
let scrollTimeout;
window.addEventListener('scroll', () => {
  if (scrollTimeout) {
    window.cancelAnimationFrame(scrollTimeout);
  }
  scrollTimeout = window.requestAnimationFrame(() => {
    updateActiveNav();
  });
}, { passive: true });

// Initial call
updateActiveNav();

// Smooth scroll on navigation click
navItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = item.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== YEAR UPDATE =====
const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// ===== BUTTON CLICK FEEDBACK =====
// Add satisfying tactile feedback for button clicks
const buttons = document.querySelectorAll('.pixel-btn');
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Add satisfying click feedback
    btn.style.transform = 'translate(0, 0)';
    btn.style.boxShadow = 'none';
    setTimeout(() => {
      btn.style.transform = '';
      btn.style.boxShadow = '';
    }, 100);
  });
});

// ===== CAMERA TIMESTAMP =====
function updateCameraTime() {
  const timeElement = document.getElementById('camera-time');
  if (timeElement) {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    timeElement.textContent = `${hours}:${minutes}:${seconds}`;
  }
}

// Update timestamp every second
updateCameraTime();
setInterval(updateCameraTime, 1000);

// ===== TV STATIC NOISE =====
const noiseCanvas = document.getElementById('noiseCanvas');
if (noiseCanvas) {
  const ctx = noiseCanvas.getContext('2d');
  const heroImage = noiseCanvas.parentElement;
  let frameCount = 0;

  // Set canvas size to match the hero image
  function resizeCanvas() {
    noiseCanvas.width = heroImage.offsetWidth;
    noiseCanvas.height = heroImage.offsetHeight;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Generate TV static noise with increased strength
  function generateNoise() {
    const imageData = ctx.createImageData(noiseCanvas.width, noiseCanvas.height);
    const buffer = new Uint32Array(imageData.data.buffer);
    const len = buffer.length;

    for (let i = 0; i < len; i++) {
      // Increased probability and contrast for stronger noise
      if (Math.random() < 0.6) {
        const gray = Math.random() < 0.5 ? 0 : 255; // Pure black or white
        buffer[i] = (255 << 24) | (gray << 16) | (gray << 8) | gray;
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }

  // Add vintage TV glitch effects
  function addVintageEffects() {
    const width = noiseCanvas.width;
    const height = noiseCanvas.height;

    // Random horizontal distortion bars (like tracking errors)
    if (Math.random() < 0.15) {
      const barY = Math.floor(Math.random() * height);
      const barHeight = Math.floor(Math.random() * 30) + 5;
      const offset = Math.floor(Math.random() * 40) - 20;

      ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.3)`;
      ctx.fillRect(0, barY, width, barHeight);

      // Add horizontal displacement
      const imageData = ctx.getImageData(offset, barY, width - Math.abs(offset), barHeight);
      ctx.putImageData(imageData, offset > 0 ? 0 : Math.abs(offset), barY);
    }

    // Occasional full signal loss (color bars or heavy static)
    if (Math.random() < 0.02) {
      // Draw vintage TV color bars
      const barWidth = width / 7;
      const colors = [
        '#FFFFFF', // White
        '#FFFF00', // Yellow
        '#00FFFF', // Cyan
        '#00FF00', // Green
        '#FF00FF', // Magenta
        '#FF0000', // Red
        '#0000FF'  // Blue
      ];

      ctx.globalAlpha = 0.6;
      for (let i = 0; i < 7; i++) {
        ctx.fillStyle = colors[i];
        ctx.fillRect(i * barWidth, 0, barWidth, height);
      }
      ctx.globalAlpha = 1.0;
    }

    // Random vertical sync issues
    if (Math.random() < 0.08) {
      ctx.save();
      ctx.translate(0, Math.random() * 20 - 10);
      ctx.restore();
    }

    // Scanline effect with occasional interference
    if (Math.random() < 0.3) {
      for (let y = 0; y < height; y += 3) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, y, width, 1);
      }
    }

    // RGB channel separation (chromatic aberration)
    if (Math.random() < 0.1) {
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      const shift = Math.floor(Math.random() * 5) + 1;

      for (let i = 0; i < data.length; i += 4) {
        if (i > shift * 4) {
          data[i] = data[i - shift * 4]; // Red channel shift
        }
      }
      ctx.putImageData(imageData, 0, 0);
    }
  }

  // Animate the noise with vintage TV effects
  function animateNoise() {
    generateNoise();
    addVintageEffects();
    frameCount++;
    requestAnimationFrame(animateNoise);
  }

  animateNoise();
}