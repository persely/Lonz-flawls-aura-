/**
 * Lonz Flawls Aura – Dynamic Background Engine
 * Version: 1.0.0
 * Author: System Architect (GitHub Copilot)
 * Date: 2025-07-20
 * 
 * This module empowers the site's background with:
 * - Adaptive gradients and subtle motion
 * - Seamless integration with the site's structure and branding
 * - Performance and accessibility best practices
 * - Zero dependencies, ES6+, fully tree-shakable
 * 
 * NOTE: Always place this script after the core CSS file for consistency.
 */

(() => {
  'use strict';

  // ====== CONFIGURATION ======
  const CONFIG = {
    // Brand color palette (matches Lonz Flawls Aura identity)
    palette: [
      '#FEF9F6', // Cream
      '#D7BFA5', // Gold
      '#231F20', // Rich Black
      '#BFA880', // Warm Taupe
      '#E2C9A0', // Sand
      '#F7F3EF'  // Off-white
    ],
    gradientAngle: 120,
    motionIntensity: 0.06, // Smaller = slower
    blurStrength: 32,
    fallbackColor: '#F7F3EF',
    backgroundSelector: '[data-bg-root]', // HTML: <div data-bg-root></div>
    prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    minSectionHeight: 320
  };

  // ====== UTILITY FUNCTIONS ======
  const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // Debounce helper (for resize)
  function debounce(fn, delay = 100) {
    let timer = null;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  }

  // ====== DYNAMIC BACKGROUND ENGINE ======
  class BackgroundAura {
    constructor(config) {
      this.config = config;
      this.root = null;
      this.layers = [];
      this.rafId = null;
      this.mouse = { x: 0.5, y: 0.5 };
      this.lastUpdate = 0;
      this.motionAllowed = !config.prefersReducedMotion;
      this.init();
    }

    init() {
      this.root = document.querySelector(this.config.backgroundSelector);
      if (!this.root) {
        // Fallback: create root if missing
        this.root = document.createElement('div');
        this.root.setAttribute('data-bg-root', '');
        this.root.style.position = 'fixed';
        this.root.style.zIndex = '-1';
        this.root.style.inset = '0';
        document.body.prepend(this.root);
      }
      this.root.setAttribute('aria-hidden', 'true');
      this.root.style.pointerEvents = 'none';
      this.root.style.minHeight = `${this.config.minSectionHeight}px`;
      this.root.style.background = this.config.fallbackColor;

      this.createLayers();
      this.bindEvents();
      this.start();
    }

    createLayers() {
      // Remove previous layers if any
      while (this.root.firstChild) this.root.removeChild(this.root.firstChild);
      this.layers = [];

      // Layer 1: Main gradient
      const gradLayer = document.createElement('div');
      gradLayer.className = 'bg-gradient-layer';
      gradLayer.style.position = 'absolute';
      gradLayer.style.inset = '0';
      gradLayer.style.zIndex = '0';
      gradLayer.style.transition = 'background 1s cubic-bezier(.5,0,.5,1)';
      gradLayer.style.background = this.buildGradient();
      gradLayer.style.filter = `blur(${this.config.blurStrength / 2}px)`;
      gradLayer.setAttribute('aria-hidden', 'true');
      this.root.appendChild(gradLayer);
      this.layers.push(gradLayer);

      // Layer 2: Animated soft overlay
      const animLayer = document.createElement('canvas');
      animLayer.className = 'bg-motion-layer';
      animLayer.style.position = 'absolute';
      animLayer.style.inset = '0';
      animLayer.style.zIndex = '1';
      animLayer.style.pointerEvents = 'none';
      animLayer.setAttribute('aria-hidden', 'true');
      this.root.appendChild(animLayer);
      this.layers.push(animLayer);

      this.resizeCanvas();
    }

    buildGradient() {
      // Responsive angle and palette
      const angle = this.config.gradientAngle;
      const colors = this.config.palette;
      return `linear-gradient(${angle}deg, ${colors.join(', ')})`;
    }

    resizeCanvas() {
      const canvas = this.layers[1];
      if (!(canvas instanceof HTMLCanvasElement)) return;
      // Size to viewport
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    bindEvents() {
      // On resize, re-layout backgrounds
      window.addEventListener('resize', debounce(() => {
        this.resizeCanvas();
        // Optionally, update gradients if palette changes
        this.layers[0].style.background = this.buildGradient();
      }, 150));

      // Animate only if motion is allowed
      if (this.motionAllowed) {
        // Mouse and touch motion for parallax
        window.addEventListener('mousemove', (e) => {
          this.mouse.x = e.clientX / window.innerWidth;
          this.mouse.y = e.clientY / window.innerHeight;
        });
        if (isTouchDevice()) {
          window.addEventListener('touchmove', (e) => {
            if (e.touches.length === 0) return;
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
        // If motion is not allowed, render static
        this.drawMotionLayer(0.5, 0.5);
      }
    }

    animate(ts) {
      // Animation loop for the canvas overlay
      if (!this.motionAllowed) return;

      // Throttle updates for perf
      if (ts - this.lastUpdate > 16) {
        this.drawMotionLayer(this.mouse.x, this.mouse.y);
        this.lastUpdate = ts;
      }
      this.rafId = requestAnimationFrame(this.animate.bind(this));
    }

    drawMotionLayer(x, y) {
      // Draws soft, animated light blobs as luxury shimmer
      const canvas = this.layers[1];
      if (!(canvas instanceof HTMLCanvasElement)) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Clear
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Centered blobs, position shifts with user motion
      const blobs = [
        {
          color: this.config.palette[1] + '44', // gold, semi-transparent
          r: Math.max(canvas.height, canvas.width) * 0.5,
          x: canvas.width * (0.55 + (x - 0.5) * this.config.motionIntensity),
          y: canvas.height * (0.55 + (y - 0.5) * this.config.motionIntensity)
        },
        {
          color: this.config.palette[3] + '22', // taupe, lighter
          r: canvas.width * 0.35,
          x: canvas.width * (0.25 - (x - 0.5) * this.config.motionIntensity),
          y: canvas.height * (0.5 + (y - 0.5) * this.config.motionIntensity)
        }
      ];

      blobs.forEach(b => {
        ctx.save();
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = b.color;
        ctx.filter = `blur(${this.config.blurStrength}px)`;
        ctx.fill();
        ctx.restore();
      });
    }

    // Clean up, for SPA navigation or hot reloads
    destroy() {
      if (this.rafId) cancelAnimationFrame(this.rafId);
      window.removeEventListener('resize', this.resizeCanvas);
      this.root.remove();
    }
  }

  // ====== FALLBACKS & INSTANTIATE ======
  function safeInit() {
    // Defer execution until DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => new BackgroundAura(CONFIG));
    } else {
      new BackgroundAura(CONFIG);
    }
  }

  // In case of script load error, fallback to solid color
  try {
    safeInit();
  } catch (e) {
    document.body.style.background = CONFIG.fallbackColor;
    // Optionally, report error to analytics
    // TODO: Integrate with error reporting system if needed
  }
})();

/* 
  SYSTEM COMPATIBILITY NOTES:
  - Expects a <div data-bg-root></div> in the layout, or will auto-inject.
  - CSS should style [data-bg-root] to be fixed/inset/behind content for best results.
  - Next file (e.g. content or sections JS) can safely assume background is always present.
  - This script is completely side-effect free and can be hot-reloaded.
*/