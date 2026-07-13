/* ======================================================
   André Moller — AI Video Portfolio
   Interactive Scripts
   ====================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ── Navbar Scroll Effect ──
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });

  // ── Mobile Menu Toggle ──
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
  });

  // Close mobile menu when clicking a link
  navLinks.querySelectorAll('.navbar__link, .navbar__cta').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });

  // ── Smooth Scroll for Anchor Links ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ── Scroll Reveal Animation ──
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  revealElements.forEach(el => revealObserver.observe(el));

  // ── Counter Animation ──
  const statNumbers = document.querySelectorAll('.stat__number');
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count'));
          const suffix = el.textContent.replace(/[0-9]/g, '');
          animateCounter(el, target, suffix);
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach(el => counterObserver.observe(el));

  function animateCounter(element, target, suffix) {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const interval = duration / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current) + suffix;
    }, interval);
  }

  // ── Parallax on Mouse Move (Hero) ──
  const hero = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero__content');

  if (hero && heroContent) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      heroContent.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
    });

    hero.addEventListener('mouseleave', () => {
      heroContent.style.transition = 'transform 0.5s ease-out';
      heroContent.style.transform = 'translate(0, 0)';
      setTimeout(() => {
        heroContent.style.transition = '';
      }, 500);
    });
  }

  // ── Magnetic Buttons Effect ──
  const magneticButtons = document.querySelectorAll('.btn-primary, .btn-secondary');

  magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) translateY(-3px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  // ── Cursor Glow Effect ──
  const cursorGlow = document.createElement('div');
  cursorGlow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0, 229, 255, 0.06), transparent 70%);
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s;
    opacity: 0;
  `;
  document.body.appendChild(cursorGlow);

  let glowTimeout;
  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
    cursorGlow.style.opacity = '1';

    clearTimeout(glowTimeout);
    glowTimeout = setTimeout(() => {
      cursorGlow.style.opacity = '0';
    }, 3000);
  }, { passive: true });

  // ── Active Nav Link Highlight ──
  const sections = document.querySelectorAll('section[id]');
  const navLinkElements = document.querySelectorAll('.navbar__link');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinkElements.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === `#${id}`) {
              link.style.color = 'var(--color-accent-cyan)';
            }
          });
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: '-80px 0px -50% 0px'
    }
  );

  sections.forEach(section => sectionObserver.observe(section));

  // ── Typing Effect for Hero Badge ──
  const badge = document.querySelector('.hero__badge');
  if (badge) {
    badge.style.opacity = '0';
    setTimeout(() => {
      badge.style.opacity = '';
    }, 200);
  }

  // ── Service Card Tilt Effect ──
  const serviceCards = document.querySelectorAll('.service-card');

  serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const tiltX = (y - 0.5) * 8;
      const tiltY = (x - 0.5) * -8;

      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ── Testimonial Card Hover Glow ──
  const testimonialCards = document.querySelectorAll('.testimonial-card');

  testimonialCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.background = `
        radial-gradient(
          600px circle at ${x}px ${y}px,
          rgba(0, 229, 255, 0.04),
          transparent 40%
        ),
        rgba(15, 20, 40, 0.6)
      `;
    });

    card.addEventListener('mouseleave', () => {
      card.style.background = '';
    });
  });

  console.log('✨ André Moller Portfolio — Loaded');
});
