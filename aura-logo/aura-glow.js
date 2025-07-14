document.addEventListener("DOMContentLoaded", () => {
  const logo = document.querySelector(".aura-logo svg");
  if (!logo) return;

  let glowIntensity = 0.4;
  let direction = 1; // 1 = increase, -1 = decrease

  function animateGlow() {
    glowIntensity += direction * 0.005;

    if (glowIntensity >= 0.7) direction = -1;
    if (glowIntensity <= 0.4) direction = 1;

    logo.style.filter = `drop-shadow(0 0 25px rgba(212, 175, 55, ${glowIntensity}))`;

    requestAnimationFrame(animateGlow);
  }

  animateGlow();

  // Optional: golden shimmer boost on hover
  logo.addEventListener("mouseenter", () => {
    logo.style.transition = "filter 0.4s ease-in-out";
    logo.style.filter = `drop-shadow(0 0 40px rgba(255, 215, 0, 1))`;
  });

  logo.addEventListener("mouseleave", () => {
    logo.style.transition = "filter 0.4s ease-in-out";
    logo.style.filter = `drop-shadow(0 0 25px rgba(212, 175, 55, ${glowIntensity}))`;
  });
});