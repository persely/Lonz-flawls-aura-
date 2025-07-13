// === SOFT FADE-IN ON SCROLL ===
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('appear');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15
});

document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el);
});

// === PRELOADER FADE-OUT ===
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// === SMOOTH SCROLL FOR ANCHOR LINKS ===
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// === OPTIONAL: BUTTON GLOW EFFECT ===
const buttons = document.querySelectorAll('.btn-dark, .btn-light');
buttons.forEach(button => {
  button.addEventListener('mouseenter', () => {
    button.style.boxShadow = '0 0 20px rgba(0,0,0,0.1)';
  });
  button.addEventListener('mouseleave', () => {
    button.style.boxShadow = 'none';
  });
});