// === Soft Fade-In on Scroll ===
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll('.fade-in').forEach((el) => {
  observer.observe(el);
});

// === Smooth Anchor Scroll ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// === Preloader (soft entry reveal) ===
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// === Optional Glow on Hover (for call-to-action buttons) ===
document.querySelectorAll('.btn-dark, .btn-light').forEach(button => {
  button.addEventListener('mouseenter', () => {
    button.style.boxShadow = '0 0 20px rgba(0,0,0,0.1)';
  });
  button.addEventListener('mouseleave', () => {
    button.style.boxShadow = 'none';
  });
});