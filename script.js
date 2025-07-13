// --- Lonz Flawless Aura: System-level Elevated JS ---
// (Original code preserved, but adding more aura, emotion, light, ritual, rare, hypnotic luxury)

// === Ambient Rainfall Shimmer: Layered, Responsive, Soft Gold ===
const canvas = document.getElementById('rainfall-bg');
if (canvas) {
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  const ctx = canvas.getContext('2d');
  const DROP_COUNT = window.innerWidth < 600 ? 38 : 90;
  let drops = [];
  for (let i = 0; i < DROP_COUNT; i++) {
    drops.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      l: Math.random() * 14 + 8,
      sp: Math.random() * 1.22 + 0.33,
      op: Math.random() * 0.14 + 0.06
    });
  }
  function drawRain() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let d of drops) {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(231,199,124,${d.op})`;
      ctx.lineWidth = 1.2;
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

// === Feather Icons Modular Injection (Luxury, Emotional Function, Animated) ===
function injectFeatherIcons() {
  document.querySelectorAll('[data-feather]').forEach(el => {
    el.innerHTML = feather.icons[el.dataset.feather].toSvg({stroke: "#e7c77c", width: "26", height: "26"});
    el.style.transition = 'filter .3s, transform .3s';
    el.addEventListener('mouseenter', () => {
      el.style.filter = 'drop-shadow(0 0 22px #e7c77ccc)';
      el.style.transform = 'scale(1.18)';
    });
    el.addEventListener('mouseleave', () => {
      el.style.filter = 'drop-shadow(0 0 14px #e7c77c44)';
      el.style.transform = 'scale(1)';
    });
  });
}
if (window.feather) injectFeatherIcons();
else {
  const s = document.createElement('script');
  s.src = 'https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js';
  s.onload = injectFeatherIcons;
  document.head.appendChild(s);
}

// === Ripple/Aura/Glow Micro-Interactions (Buttons, Cards, Nav, WhatsApp, Footer) ===
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

// === Emotional Glow/Shadow on Interaction: Aura, Ritual, Quiet Power ===
document.querySelectorAll('.product-card, .cta-btn, .whatsapp-float, nav a, footer a').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.boxShadow = '0 0 40px 12px #e7c77cbb, 0 6px 38px #e7c77c33';
    this.style.transform = 'scale(1.02)';
  });
  card.addEventListener('mouseleave', function() {
    this.style.boxShadow = '';
    this.style.transform = '';
  });
});

// === WhatsApp Emotional Feedback (Aura, Connectivity) ===
document.querySelectorAll('.whatsapp-float').forEach(btn => {
  btn.addEventListener('mouseenter', () => btn.style.boxShadow = '0 0 40px 12px #25D366bb');
  btn.addEventListener('mouseleave', () => btn.style.boxShadow = '');
});

// === Scroll-based Fade/Blur Animation (Weightless, Aura Motion) ===
function fadeInOnScroll() {
  document.querySelectorAll('.fade-in').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 55) el.classList.add('appear');
  });
}
window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('DOMContentLoaded', fadeInOnScroll);

// === Parallax Depth for Hero/Sections (VisionOS, Ritual, Light) ===
document.querySelectorAll('.hero, .products-section, .about-section, .contact-section, .hero-full, .section-light, .section-center').forEach(sec => {
  sec.addEventListener('mousemove', function(e) {
    let x = (e.clientX - window.innerWidth/2) / 70;
    let y = (e.clientY - window.innerHeight/2) / 70;
    this.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1.01)`;
  });
  sec.addEventListener('mouseleave', function() {
    this.style.transform = 'translate3d(0,0,0) scale(1)';
  });
});

// === Instagram Story Emotion Trail (Aura, Lifestyle, Motion) ===
document.querySelectorAll('.prod-emotion').forEach(emotion => {
  emotion.addEventListener('mouseenter', function () {
    this.style.textShadow = '0 0 22px #e7c77cbb';
    this.style.transition = 'text-shadow .48s cubic-bezier(.7,.2,.2,1)';
  });
  emotion.addEventListener('mouseleave', function () {
    this.style.textShadow = '';
  });
});

// === Quiet Power: Breath Animation on Page Load (Body and Hero) ===
window.addEventListener('DOMContentLoaded', () => {
  document.body.animate([
    { opacity: .93, filter: 'blur(6px)' },
    { opacity: 1, filter: 'blur(0)' }
  ], {
    duration: 1300,
    easing: 'cubic-bezier(.7,.2,.2,1)'
  });
  let hero = document.querySelector('.hero, .hero-full');
  if (hero) {
    hero.animate([
      { opacity: .7, transform: 'scale(.96)' },
      { opacity: 1, transform: 'scale(1)' }
    ], {
      duration: 1100,
      easing: 'cubic-bezier(.7,.2,.2,1)'
    });
  }
});

// === Touch Optimization: Ritual for Mobile ===
if ('ontouchstart' in window) {
  document.body.classList.add('touch-enabled');
}

// --- End Aura System ---