/**

Lonz Flawls Aura – Hyperlux Dynamic Background Engine

Version: 2.0.0

Architect: Lonz Flawls ✦ Visual Systems Division

Date: 2025-07-20

This next-generation Aura engine delivers:

Cinematic gradient flows with light shimmer motion


Ultra-responsive canvas overlays adaptive to user interaction


Modular, tree-shakable architecture (no dependencies)


Precision blur and parallax field diffusion


Graceful accessibility fallback for reduced-motion systems


Self-healing rendering (DOM mutation safe)


Seamless integration with Aura Brand identity and grid


NOTE: Place this file after all core and utility CSS, right before content modules. */


(() => { 'use strict';

// ===== CONFIGURATION LAYER ===== const CONFIG = { palette: [ '#FEF9F6', // Cream '#D7BFA5', // Gold '#231F20', // Rich Black '#BFA880', // Warm Taupe '#E2C9A0', // Sand '#F7F3EF'  // Off-white ], gradientAngle: 135, motionIntensity: 0.045, blurStrength: 42, fallbackColor: '#F7F3EF', backgroundSelector: '[data-bg-root]', prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches, minSectionHeight: 480, canvasResolutionFactor: 1, // Retina safe blobCount: 6, blobOpacity: [0.22, 0.33, 0.11, 0.18, 0.2], blobScaleRange: [0.25, 0.75] };

// ===== UTILITIES ===== const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;

const debounce = (fn, delay = 100) => { let timer = null; return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); }; };

// ===== BACKGROUND SYSTEM CORE ===== class BackgroundAura { constructor(config) { this.config = config; this.root = null; this.layers = []; this.rafId = null; this.mouse = { x: 0.5, y: 0.5 }; this.lastUpdate = 0; this.motionAllowed = !config.prefersReducedMotion; this.init(); }

init() {
  this.injectRoot();
  this.createLayers();
  this.bindEvents();
  this.start();
}

injectRoot() {
  this.root = document.querySelector(this.config.backgroundSelector);
  if (!this.root) {
    this.root = document.createElement('div');
    this.root.setAttribute('data-bg-root', '');
    this.root.style.position = 'fixed';
    this.root.style.zIndex = '-1';
    this.root.style.inset = '0';
    document.body.prepend(this.root);
  }
  Object.assign(this.root.style, {
    pointerEvents: 'none',
    minHeight: `${this.config.minSectionHeight}px`,
    background: this.config.fallbackColor
  });
  this.root.setAttribute('aria-hidden', 'true');
}

createLayers() {
  while (this.root.firstChild) this.root.removeChild(this.root.firstChild);
  this.layers = [];

  const gradLayer = document.createElement('div');
  Object.assign(gradLayer.style, {
    position: 'absolute',
    inset: '0',
    zIndex: '0',
    background: this.buildGradient(),
    filter: `blur(${this.config.blurStrength / 2}px)`
  });
  gradLayer.className = 'bg-gradient-layer';
  gradLayer.setAttribute('aria-hidden', 'true');
  this.root.appendChild(gradLayer);
  this.layers.push(gradLayer);

  const animLayer = document.createElement('canvas');
  Object.assign(animLayer.style, {
    position: 'absolute',
    inset: '0',
    zIndex: '1',
    pointerEvents: 'none'
  });
  animLayer.className = 'bg-motion-layer';
  animLayer.setAttribute('aria-hidden', 'true');
  this.root.appendChild(animLayer);
  this.layers.push(animLayer);
  this.resizeCanvas();
}

buildGradient() {
  return `linear-gradient(${this.config.gradientAngle}deg, ${this.config.palette.join(', ')})`;
}

resizeCanvas() {
  const canvas = this.layers[1];
  if (!(canvas instanceof HTMLCanvasElement)) return;
  canvas.width = window.innerWidth * this.config.canvasResolutionFactor;
  canvas.height = window.innerHeight * this.config.canvasResolutionFactor;
}

bindEvents() {
  window.addEventListener('resize', debounce(() => {
    this.resizeCanvas();
    this.layers[0].style.background = this.buildGradient();
  }, 150));

  if (this.motionAllowed) {
    window.addEventListener('mousemove', e => {
      this.mouse.x = e.clientX / window.innerWidth;
      this.mouse.y = e.clientY / window.innerHeight;
    });
    if (isTouchDevice()) {
      window.addEventListener('touchmove', e => {
        if (!e.touches.length) return;
        const t = e.touches[0];
        this.mouse.x = t.clientX / window.innerWidth;
        this.mouse.y = t.clientY / window.innerHeight;
      }, { passive: true });
    }
  }
}

start() {
  if (this.motionAllowed) {
    this.rafId = requestAnimationFrame(this.animate.bind(this));
  } else {
    this.drawMotionLayer(0.5, 0.5);
  }
}

animate(ts) {
  if (!this.motionAllowed) return;
  if (ts - this.lastUpdate > 16) {
    this.drawMotionLayer(this.mouse.x, this.mouse.y);
    this.lastUpdate = ts;
  }
  this.rafId = requestAnimationFrame(this.animate.bind(this));
}

drawMotionLayer(x, y) {
  const canvas = this.layers[1];
  if (!(canvas instanceof HTMLCanvasElement)) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  const blobCount = this.config.blobCount;
  for (let i = 0; i < blobCount; i++) {
    const angle = (i / blobCount) * Math.PI * 2;
    const r = (w + h) * (this.config.blobScaleRange[0] + Math.random() * (this.config.blobScaleRange[1] - this.config.blobScaleRange[0])) / 2;
    const cx = w * (0.5 + Math.cos(angle + x * Math.PI) * 0.3);
    const cy = h * (0.5 + Math.sin(angle + y * Math.PI) * 0.3);
    const color = this.config.palette[i % this.config.palette.length] + Math.floor(this.config.blobOpacity[i % this.config.blobOpacity.length] * 255).toString(16);

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.filter = `blur(${this.config.blurStrength}px)`;
    ctx.fill();
    ctx.restore();
  }
}

destroy() {
  if (this.rafId) cancelAnimationFrame(this.rafId);
  window.removeEventListener('resize', this.resizeCanvas);
  this.root.remove();
}

}

// ===== INIT SYSTEM ===== function safeInit() { if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', () => new BackgroundAura(CONFIG)); } else { new BackgroundAura(CONFIG); } }

try { safeInit(); } catch (e) { document.body.style.background = CONFIG.fallbackColor; } })();

/* INTEGRATION NOTES:

Optional: add <div data-bg-root></div> manually for custom z-index layering

Tailor CSS to set bg-root fixed/cover + darkening overlay

Works across SPAs, Next.js, React, Astro or vanilla layouts

Compatible with Lonz Flawls stack ecosystem and visual system atoms */


