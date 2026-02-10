// Hover Effects - Neo-Brutalist Portfolio

export function initHoverEffects() {
  // Card tilt effect
  initCardTilt();
  
  // Button ripple effect
  initButtonRipple();
  
  // Magnetic buttons
  initMagneticEffect();
}

function initCardTilt() {
  const cards = document.querySelectorAll('.card, .project-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

function initButtonRipple() {
  const buttons = document.querySelectorAll('.btn, button');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 0;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
      `;
      
      ripple.classList.add('ripple-effect');
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });
  
  // Add CSS animation
  if (!document.querySelector('#ripple-animation')) {
    const style = document.createElement('style');
    style.id = 'ripple-animation';
    style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(2);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

function initMagneticEffect() {
  const magneticElements = document.querySelectorAll('.btn, .project-card__link');
  
  magneticElements.forEach(el => {
    el.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const moveX = x * 0.2;
      const moveY = y * 0.2;
      
      this.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
    
    el.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });
}

// Glitch effect for text
export function initGlitchEffect() {
  const glitchElements = document.querySelectorAll('[data-glitch]');
  
  glitchElements.forEach(el => {
    const text = el.textContent;
    el.setAttribute('data-text', text);
    
    el.addEventListener('mouseenter', () => {
      el.classList.add('glitching');
      setTimeout(() => el.classList.remove('glitching'), 500);
    });
  });
}
