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