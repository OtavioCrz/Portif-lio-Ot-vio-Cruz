// Main JavaScript - Neo-Brutalist Portfolio

// Import modules
import { initScrollAnimations } from './animations/scroll.js';
import { initHoverEffects } from './animations/hover.js';
import ScrollReveal from './animations/scroll-reveal.js';
import { initNavigation } from './components/navigation.js';
import { initContactForm } from './components/form.js';
import { smoothScroll, debounce } from './utils/helpers.js';

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('🎨 Neo-Brutalist Portfolio Loaded!');
  
  // Initialize components
  initNavigation();
  initScrollAnimations();
  initHoverEffects();
  initContactForm();
  initSmoothScroll();
  initBackToTop();
  initCustomCursor();
  initProjectFilters();
  hideLoader();
});

// Hide loader
function hideLoader() {
  const loader = document.querySelector('.loading');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
      setTimeout(() => loader.remove(), 500);
    }, 1000);
  }
}

// Initialize smooth scroll
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        smoothScroll(target);
      }
    });
  });
}

// Back to top button
function initBackToTop() {
  const backToTopBtn = document.querySelector('.footer__back-to-top');
  
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// Custom cursor (optional)
function initCustomCursor() {
  const cursor = document.querySelector('.custom-cursor');
  
  if (!cursor) return;
  
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  function updateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(updateCursor);
  }
  
  updateCursor();
  
  // Add active state on clickable elements
  const clickables = document.querySelectorAll('a, button, .btn, .card');
  
  clickables.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('active'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
  });
}

// Project filters
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.projects__filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  if (!filterBtns.length) return;
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Filter projects
      projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
          setTimeout(() => card.style.opacity = '1', 10);
        } else {
          card.style.opacity = '0';
          setTimeout(() => card.style.display = 'none', 300);
        }
      });
    });
  });
}

// Window resize handler
let resizeTimer;
window.addEventListener('resize', debounce(() => {
  console.log('Window resized');
}, 250));

// Log when leaving page
window.addEventListener('beforeunload', () => {
  console.log('👋 Goodbye!');
});
