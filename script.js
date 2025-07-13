// --- Lonz Flawless Aura Elevated Script ---

// Ambient Rainfall Shimmer (Lightweight Canvas, Soft Gold)
const canvas = document.getElementById('rainfall-bg');
if (canvas) {
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  const ctx = canvas.getContext('2d');
  const DROP_COUNT = window.innerWidth < 600 ? 38 : 80;
  let drops = [];
  for (let i = 0; i < DROP_COUNT; i++) {
    drops.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      l: Math.random() * 13 + 8,
      sp: Math.random() * 1.18 + 0.38,
      op: Math.random() * 0.13 + 0.07
    });
  }
  function drawRain() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let d of drops) {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(231,199,124,${d.op})`;
      ctx.lineWidth = 1.1;
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x, d.y + d.l);
      ctx.stroke();
      d.y += d.sp;
      if (d.y > canvas.height) {
        d.y = -d.l;
        d.x = Math.random() * canvas.width;
      }
    }
    requestAnimationFrame(drawRain);
  }
  drawRain();
}

// Feather Icons Modular Injection (Minimal, Emotional Function)
function injectFeatherIcons() {
  document.querySelectorAll('[data-feather]').forEach(el => {
    el.innerHTML = feather.icons[el.dataset.feather].toSvg({stroke: "#e7c77c", width: "26", height: "26"});
  });
}
if (window.feather) injectFeatherIcons();
else {
  const s = document.createElement('script');
  s.src = 'https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js';
  s.onload = injectFeatherIcons;
  document.head.appendChild(s);
}

// Ripple/Aura/Glow Micro-Interactions (Buttons, Cards, Nav, WhatsApp)
function addRippleAura(e) {
  const el = e.currentTarget;
  if (!el.classList.contains('glass') && !el.classList.contains('cta-btn') && !el.classList.contains('product-card') && !el.classList.contains('whatsapp-float') && el.tagName !== 'BUTTON') return;
  const ripple = document.createElement('span');
  ripple.className = 'ripple-aura';
  ripple.style.left = `${e.offsetX}px`;
  ripple.style.top = `${e.offsetY}px`;
  el.appendChild(ripple);
  setTimeout(() => ripple.remove(), 700);
}
['pointerdown', 'touchstart'].forEach(evt =>
  document.body.addEventListener(evt, function(e) {
    const el = e.target.closest('.glass, .cta-btn, .product-card, .whatsapp-float, button');
    if (el) addRippleAura.call(el, e);
  }, {passive: true})
);

document.querySelectorAll('.product-card, .cta-btn, .whatsapp-float').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.boxShadow = '0 0 38px 10px #e7c77c99, 0 6px 38px #e7c77c22';
  });
  card.addEventListener('mouseleave', function() {
    this.style.boxShadow = '';
  });
});
document.querySelectorAll('.whatsapp-float').forEach(btn => {
  btn.addEventListener('mouseenter', () => btn.style.boxShadow = '0 0 36px 8px #25D36688');
  btn.addEventListener('mouseleave', () => btn.style.boxShadow = '');
});

// Scroll-based Fade/Blur Animation (Lightweight, Aura Motion)
function fadeInOnScroll() {
  document.querySelectorAll('.fade-in').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 55) el.classList.add('appear');
  });
}
window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('DOMContentLoaded', fadeInOnScroll);

// Parallax Depth on Hero/Sections (VisionOS Inspired, Soft)
document.querySelectorAll('.hero, .products-section, .about-section, .contact-section').forEach(sec => {
  sec.addEventListener('mousemove', function(e) {
    let x = (e.clientX - window.innerWidth/2) / 80;
    let y = (e.clientY - window.innerHeight/2) / 80;
    this.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1.01)`;
  });
  sec.addEventListener('mouseleave', function() {
    this.style.transform = 'translate3d(0,0,0) scale(1)';
  });
});

// Instagram Story-like Emotion Motion Trail
document.querySelectorAll('.prod-emotion').forEach(emotion => {
  emotion.addEventListener('mouseenter', function () {
    this.style.textShadow = '0 0 16px #e7c77c88';
    this.style.transition = 'text-shadow .48s cubic-bezier(.7,.2,.2,1)';
  });
  emotion.addEventListener('mouseleave', function () {
    this.style.textShadow = '';
  });
});

// Touch Optimization
if ('ontouchstart' in window) {
  document.body.classList.add('touch-enabled');
}

// --- End Aura System ---