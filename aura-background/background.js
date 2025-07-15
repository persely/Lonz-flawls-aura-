// ==== LONZ FLAWLS AURA – BACKGROUND JS ENHANCEMENT ====

document.addEventListener("DOMContentLoaded", () => {
  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  // Background motion pulse
  const bg = document.body;
  setInterval(() => {
    bg.style.transition = "background-position 1.2s ease-in-out";
    bg.style.backgroundPosition = `center ${Math.random() * 10 - 5}px`;
  }, 10000);
});