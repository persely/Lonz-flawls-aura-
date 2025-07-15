// Start with loading aura
document.body.classList.add("loading");
setTimeout(() => {
  document.body.classList.remove("loading");
}, 2200);

// ==== LONZ FLAWLS AURA – BACKGROUND JS ENHANCEMENT ====

document.addEventListener("DOMContentLoaded", () => {
  // Modular aura system
  const aura = {
    initSmoothScroll() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", e => {
          e.preventDefault();
          const target = document.querySelector(anchor.getAttribute("href"));
          if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        });
      });
    },

    backgroundPulse() {
      const bg = document.body;
      setInterval(() => {
        bg.style.transition = "background-position 1.2s ease-in-out";
        bg.style.backgroundPosition = `center ${Math.random() * 10 - 5}px`;
      }, 10000);
    },

    run() {
      this.initSmoothScroll();
      this.backgroundPulse();
    }
  };

  aura.run();
});

// ==== GOLDEN PARTICLES EFFECT ====

const createParticles = () => {
  const canvas = document.createElement("canvas");
  canvas.classList.add("aura-particles");
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  let w, h, particles;

  const init = () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.5,
      d: Math.random() * 1.5 + 0.5,
      dx: Math.random() * 0.3 - 0.15,
      dy: Math.random() * 0.4 - 0.2,
    }));
  };

  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "rgba(255, 215, 0, 0.07)";
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
      ctx.fill();
    });
    update();
    requestAnimationFrame(draw);
  };

  const update = () => {
    particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > w) p.dx *= -1;
      if (p.y < 0 || p.y > h) p.dy *= -1;
    });
  };

  init();
  draw();
  window.addEventListener("resize", init);
};

createParticles();

// ==== SCROLL BLUR EFFECT ====

const applyScrollBlur = () => {
  const content = document.querySelector(".lux-content");
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const blurValue = Math.min(10, scrollY / 20);
    content.style.backdropFilter = `blur(${blurValue}px)`;
    document.body.classList.toggle("scrolled", scrollY > 20);
  });
};

applyScrollBlur();

// ==== TIME-BASED LIGHTING ====

const tintByTime = () => {
  const hour = new Date().getHours();
  const body = document.body;
  if (hour < 10) {
    body.style.filter = "brightness(1.1) hue-rotate(-10deg)";
  } else if (hour > 18) {
    body.style.filter = "brightness(0.9) hue-rotate(10deg)";
  }
};

tintByTime();

// ==== AURA MEMORY (VISIT COUNTER) ====

const saveVisitAura = () => {
  const visits = parseInt(localStorage.getItem("auraVisits") || "0") + 1;
  localStorage.setItem("auraVisits", visits);
  if (visits > 1) {
    console.log(`✨ Welcome back, glowing soul. Visit #${visits}`);
  } else {
    console.log("🌟 Welcome to your first aura experience.");
  }
};

saveVisitAura();

// ==== SOUND AURA ====
const initSoundToggle = () => {
  const btn = document.getElementById("aura-sound-toggle");
  const audio = document.getElementById("aura-sound");

  if (!btn || !audio) return;

  let playing = false;

  btn.addEventListener("click", () => {
    if (playing) {
      audio.pause();
      btn.textContent = "🔊";
    } else {
      audio.play();
      btn.textContent = "🔇";
    }
    playing = !playing;
  });
};

initSoundToggle();

// ==== SECTION REVEAL AURA ====
const initRevealAura = () => {
  const reveals = document.querySelectorAll('.reveal-aura');

  const onScroll = () => {
    reveals.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9) {
        el.classList.add('visible');
      }
    });
  };

  window.addEventListener('scroll', onScroll);
  onScroll(); // Run once on load
};

initRevealAura();

const initAuraSwipe = () => {
  const cards = document.querySelectorAll('.aura-card');

  const onScroll = () => {
    cards.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9) {
        el.classList.add('visible');
      }
    });
  };

  window.addEventListener('scroll', onScroll);
  onScroll(); // Run once
};

initAuraSwipe();

// ==== AUTO THEME BY TIME ====
const setTimeTheme = () => {
  const hour = new Date().getHours();
  const root = document.documentElement;
  if (hour >= 6 && hour < 18) {
    root.style.setProperty('--gold-bright', '#ffe680');
    root.style.setProperty('--gold-deep', '#d4af37');
  } else {
    root.style.setProperty('--gold-bright', '#fff5cc');
    root.style.setProperty('--gold-deep', '#a67c00');
  }
};

setTimeTheme();