// Navigation Component - Neo-Brutalist Portfolio

export function initNavigation() {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.header__nav');
  const navLinks = document.querySelectorAll('.nav__link');
  
  // Mobile menu toggle
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      nav.classList.toggle('active');
      document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });
  }
  
  // Close mobile menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        menuToggle?.classList.remove('active');
        nav?.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
  
  // Active link on scroll
  updateActiveLink();
  window.addEventListener('scroll', updateActiveLink);
  
  // Close menu on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav?.classList.contains('active')) {
      menuToggle?.classList.remove('active');
      nav?.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');
  
  let current = '';
  const scrollPosition = window.pageYOffset + 200;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// Keyboard navigation
export function initKeyboardNav() {
  const focusableElements = document.querySelectorAll(
    'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
  );
  
  focusableElements.forEach(el => {
    el.addEventListener('focus', () => {
      el.style.outline = '4px solid var(--color-accent)';
      el.style.outlineOffset = '4px';
    });
    
    el.addEventListener('blur', () => {
      el.style.outline = '';
      el.style.outlineOffset = '';
    });
  });
}
