/**
 * SCROLL REVEAL ANIMATIONS
 * Sistema de animações ao rolar a página usando Intersection Observer
 */

class ScrollReveal {
  constructor(options = {}) {
    // Configurações padrão
    this.config = {
      threshold: options.threshold || 0.15,
      rootMargin: options.rootMargin || '0px 0px -100px 0px',
      once: options.once !== false, // Por padrão, anima apenas uma vez
      reset: options.reset || false, // Resetar animação ao sair da viewport
      delay: options.delay || 0,
      mobile: options.mobile !== false, // Animações no mobile
    };

    // Elementos a serem observados
    this.elements = [];
    
    // Criar observer
    this.observer = this.createObserver();
    
    // Inicializar
    this.init();
  }

  /**
   * Criar Intersection Observer
   */
  createObserver() {
    const options = {
      threshold: this.config.threshold,
      rootMargin: this.config.rootMargin,
    };

    return new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.reveal(entry.target);
          
          // Se once=true, parar de observar após revelar
          if (this.config.once) {
            this.observer.unobserve(entry.target);
          }
        } else if (this.config.reset) {
          // Reset da animação
          this.hide(entry.target);
        }
      });
    }, options);
  }

  /**
   * Inicializar scroll reveal
   */
  init() {
    // Verificar se está no mobile
    const isMobile = window.innerWidth <= 768;
    if (isMobile && !this.config.mobile) {
      // Revelar tudo imediatamente no mobile se mobile=false
      this.revealAll();
      return;
    }

    // Buscar todos os elementos com data-reveal
    this.elements = document.querySelectorAll('[data-reveal], [data-reveal-stagger]');
    
    // Observar cada elemento
    this.elements.forEach((element, index) => {
      // Aplicar delay se especificado
      const delay = element.getAttribute('data-reveal-delay') || this.config.delay;
      if (delay) {
        element.style.transitionDelay = `${delay}ms`;
      }

      // Aplicar duração se especificada
      const duration = element.getAttribute('data-reveal-duration');
      if (duration) {
        const durationMap = {
          'fast': '400ms',
          'normal': '800ms',
          'slow': '1200ms',
        };
        element.style.transitionDuration = durationMap[duration] || duration;
      }

      // Aplicar easing se especificado
      const easing = element.getAttribute('data-reveal-easing');
      if (easing) {
        const easingMap = {
          'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
          'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          'elastic': 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
        };
        element.style.transitionTimingFunction = easingMap[easing] || easing;
      }

      // Observar elemento
      this.observer.observe(element);
    });

    // Log de inicialização
    console.log(`🎬 Scroll Reveal initialized: ${this.elements.length} elements`);
  }

  /**
   * Revelar elemento
   */
  reveal(element) {
    // Adicionar classe revealed
    element.classList.add('revealed');
    
    // Disparar evento customizado
    element.dispatchEvent(new CustomEvent('reveal', {
      bubbles: true,
      detail: { element }
    }));

    // Log para debug
    const revealType = element.getAttribute('data-reveal') || 'stagger';
    console.log(`✨ Revealed: ${revealType}`, element);
  }

  /**
   * Ocultar elemento (para reset)
   */
  hide(element) {
    element.classList.remove('revealed');
    
    // Disparar evento customizado
    element.dispatchEvent(new CustomEvent('hide', {
      bubbles: true,
      detail: { element }
    }));
  }

  /**
   * Revelar todos os elementos imediatamente
   */
  revealAll() {
    const allElements = document.querySelectorAll('[data-reveal], [data-reveal-stagger]');
    allElements.forEach(element => {
      element.classList.add('revealed');
      element.style.opacity = '1';
      element.style.transform = 'none';
    });
    console.log('📱 Mobile mode: All elements revealed immediately');
  }

  /**
   * Adicionar novos elementos dinamicamente
   */
  observe(selector) {
    const elements = typeof selector === 'string' 
      ? document.querySelectorAll(selector)
      : [selector];

    elements.forEach(element => {
      this.observer.observe(element);
    });

    return this;
  }

  /**
   * Parar de observar elementos
   */
  unobserve(selector) {
    const elements = typeof selector === 'string'
      ? document.querySelectorAll(selector)
      : [selector];

    elements.forEach(element => {
      this.observer.unobserve(element);
    });

    return this;
  }

  /**
   * Destruir observer (cleanup)
   */
  destroy() {
    this.observer.disconnect();
    console.log('🗑️ Scroll Reveal destroyed');
  }

  /**
   * Atualizar configurações
   */
  update(options = {}) {
    this.config = { ...this.config, ...options };
    this.destroy();
    this.observer = this.createObserver();
    this.init();
    
    return this;
  }

  /**
   * Sync: Animar elementos já visíveis na viewport
   */
  sync() {
    this.elements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const isVisible = (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );

      if (isVisible) {
        this.reveal(element);
      }
    });

    return this;
  }
}

// Exportar classe
export default ScrollReveal;

/**
 * INICIALIZAÇÃO AUTOMÁTICA
 */
let scrollReveal;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollReveal);
} else {
  initScrollReveal();
}

function initScrollReveal() {
  // Criar instância global
  scrollReveal = new ScrollReveal({
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px',
    once: true,
    mobile: true,
  });

  // Sincronizar elementos já visíveis
  setTimeout(() => {
    scrollReveal.sync();
  }, 100);

  // Tornar disponível globalmente
  window.scrollReveal = scrollReveal;
}

/**
 * ATALHOS DE CONVENIÊNCIA
 */

// Revelar elemento manualmente
export function reveal(selector) {
  const elements = document.querySelectorAll(selector);
  elements.forEach(el => el.classList.add('revealed'));
}

// Ocultar elemento manualmente
export function hide(selector) {
  const elements = document.querySelectorAll(selector);
  elements.forEach(el => el.classList.remove('revealed'));
}

// Resetar elemento
export function reset(selector) {
  const elements = document.querySelectorAll(selector);
  elements.forEach(el => {
    el.classList.remove('revealed');
    setTimeout(() => {
      if (scrollReveal) {
        scrollReveal.observe(el);
      }
    }, 100);
  });
}

/**
 * ANIMAÇÕES ESPECIAIS PARA CONTADORES
 */
export function animateCounter(element, start = 0, end, duration = 2000) {
  let current = start;
  const increment = (end - start) / (duration / 16);
  const timer = setInterval(() => {
    current += increment;
    if (current >= end) {
      element.textContent = Math.round(end);
      clearInterval(timer);
    } else {
      element.textContent = Math.round(current);
    }
  }, 16);
}

/**
 * OBSERVER DE EVENTOS
 */

// Disparar Analytics ao revelar
document.addEventListener('reveal', (e) => {
  const element = e.detail.element;
  const revealType = element.getAttribute('data-reveal') || 'stagger';
  
  // Enviar para analytics (se disponível)
  if (window.gtag) {
    gtag('event', 'scroll_reveal', {
      'reveal_type': revealType,
      'element_id': element.id || 'unnamed',
    });
  }
});
