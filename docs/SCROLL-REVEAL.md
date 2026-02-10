# 🎬 Sistema de Scroll Reveal - Documentação

Sistema completo de animações ao rolar a página, desenvolvido com Intersection Observer API.

## 📋 Índice

- [Tipos de Animações](#tipos-de-animações)
- [Como Usar](#como-usar)
- [Configurações Avançadas](#configurações-avançadas)
- [Exemplos](#exemplos)
- [API JavaScript](#api-javascript)

---

## ✨ Tipos de Animações

### Fade (Desvanecer)

```html
<div data-reveal="fade-up">Aparece de baixo para cima</div>
<div data-reveal="fade-down">Aparece de cima para baixo</div>
<div data-reveal="fade-left">Aparece da esquerda</div>
<div data-reveal="fade-right">Aparece da direita</div>
```

### Scale (Escala)

```html
<div data-reveal="scale-up">Cresce de pequeno para grande</div>
<div data-reveal="scale-down">Diminui de grande para pequeno</div>
```

### Rotate (Rotação)

```html
<div data-reveal="rotate-left">Rotaciona da esquerda</div>
<div data-reveal="rotate-right">Rotaciona da direita</div>
```

### Flip (Virar)

```html
<div data-reveal="flip-x">Vira no eixo X (horizontal)</div>
<div data-reveal="flip-y">Vira no eixo Y (vertical)</div>
```

### Zoom

```html
<div data-reveal="zoom-in">Zoom entrando</div>
<div data-reveal="zoom-out">Zoom saindo</div>
```

### Slide (Deslizar)

```html
<div data-reveal="slide-bottom">Desliza de baixo</div>
<div data-reveal="slide-top">Desliza de cima</div>
```

### Especiais

```html
<div data-reveal="bounce">Efeito de pulo</div>
<div data-reveal="blur">Desfoca enquanto aparece</div>
<div data-reveal="shadow-pop">Pop com sombra Neo-Brutalist</div>
```

### Stagger (Cascata)

Para animar elementos filhos em sequência:

```html
<div data-reveal-stagger>
  <div>Item 1 - anima primeiro</div>
  <div>Item 2 - anima depois</div>
  <div>Item 3 - anima por último</div>
</div>
```

---

## 🚀 Como Usar

### 1. Animação Básica

Adicione o atributo `data-reveal` com o tipo de animação:

```html
<section data-reveal="fade-up">
  <h2>Este conteúdo aparecerá com fade up</h2>
</section>
```

### 2. Com Delay (Atraso)

```html
<h1 data-reveal="fade-up">Aparece primeiro</h1>
<p data-reveal="fade-up" data-reveal-delay="200">Aparece 200ms depois</p>
<button data-reveal="fade-up" data-reveal-delay="400">Aparece 400ms depois</button>
```

**Delays disponíveis:** 100, 200, 300, 400, 500, 600, 700, 800 (em ms)

### 3. Com Duração Customizada

```html
<div data-reveal="fade-up" data-reveal-duration="fast">Rápida (400ms)</div>
<div data-reveal="fade-up" data-reveal-duration="normal">Normal (800ms)</div>
<div data-reveal="fade-up" data-reveal-duration="slow">Lenta (1200ms)</div>
```

### 4. Com Easing (Suavização)

```html
<div data-reveal="fade-up" data-reveal-easing="smooth">Suave</div>
<div data-reveal="fade-up" data-reveal-easing="bounce">Com bounce</div>
<div data-reveal="fade-up" data-reveal-easing="elastic">Elástico</div>
```

---

## ⚙️ Configurações Avançadas

### Inicialização Customizada

```javascript
import ScrollReveal from './animations/scroll-reveal.js';

// Criar instância com configurações customizadas
const reveal = new ScrollReveal({
  threshold: 0.15,           // % do elemento visível para disparar (0-1)
  rootMargin: '0px 0px -100px 0px', // Margem antes de disparar
  once: true,                // Anima apenas uma vez (true) ou sempre (false)
  reset: false,              // Resetar animação ao sair da tela
  mobile: true,              // Ativar animações no mobile
  delay: 0                   // Delay global em ms
});
```

### Observar Elementos Dinamicamente

```javascript
// Adicionar novos elementos após carregamento da página
window.scrollReveal.observe('.novo-elemento');

// Parar de observar elementos
window.scrollReveal.unobserve('.elemento-antigo');

// Re-sincronizar (animar elementos já visíveis)
window.scrollReveal.sync();
```

### Revelar/Ocultar Manualmente

```javascript
import { reveal, hide, reset } from './animations/scroll-reveal.js';

// Revelar elemento manualmente
reveal('.meu-elemento');

// Ocultar elemento
hide('.meu-elemento');

// Resetar e observar novamente
reset('.meu-elemento');
```

### Eventos Customizados

```javascript
// Executar código quando elemento é revelado
document.addEventListener('reveal', (e) => {
  const element = e.detail.element;
  console.log('Elemento revelado:', element);
  
  // Exemplo: enviar para analytics
  gtag('event', 'scroll_reveal', {
    element_id: element.id
  });
});

// Executar código quando elemento é ocultado (se reset: true)
document.addEventListener('hide', (e) => {
  const element = e.detail.element;
  console.log('Elemento ocultado:', element);
});
```

---

## 💡 Exemplos Práticos

### Hero Section

```html
<section class="hero">
  <h1 data-reveal="fade-down">Título Principal</h1>
  <p data-reveal="fade-up" data-reveal-delay="100">Descrição</p>
  <button data-reveal="fade-up" data-reveal-delay="200">Call to Action</button>
</section>
```

### Cards em Grid

```html
<div class="projects" data-reveal-stagger>
  <div class="card">Projeto 1</div>
  <div class="card">Projeto 2</div>
  <div class="card">Projeto 3</div>
  <div class="card">Projeto 4</div>
</div>
```

### About Section com Layout Split

```html
<section class="about">
  <div class="about__image" data-reveal="fade-left">
    <img src="profile.jpg" alt="Foto">
  </div>
  
  <div class="about__content">
    <h2 data-reveal="fade-right">Sobre Mim</h2>
    <p data-reveal="fade-right" data-reveal-delay="100">Texto 1</p>
    <p data-reveal="fade-right" data-reveal-delay="200">Texto 2</p>
  </div>
</section>
```

### Skills com Barras de Progresso

```html
<div class="skills" data-reveal-stagger>
  <div class="skill">
    <span>HTML/CSS</span>
    <div class="bar"><div class="progress" style="width: 90%"></div></div>
  </div>
  <div class="skill">
    <span>JavaScript</span>
    <div class="bar"><div class="progress" style="width: 85%"></div></div>
  </div>
  <div class="skill">
    <span>React</span>
    <div class="bar"><div class="progress" style="width: 70%"></div></div>
  </div>
</div>
```

---

## 🎨 Combinações Criativas

### Efeito Cascata com Delays Incrementais

```html
<div class="hero">
  <span data-reveal="fade-down" data-reveal-delay="0">Olá! 👋</span>
  <h1 data-reveal="fade-up" data-reveal-delay="100">Título</h1>
  <p data-reveal="fade-up" data-reveal-delay="200">Descrição</p>
  <button data-reveal="fade-up" data-reveal-delay="300">CTA</button>
</div>
```

### Layout Split com Direções Opostas

```html
<div class="split">
  <div class="left" data-reveal="fade-left">
    <img src="image.jpg">
  </div>
  <div class="right" data-reveal="fade-right">
    <h2>Conteúdo</h2>
    <p>Texto</p>
  </div>
</div>
```

### Cards com Zoom e Bounce

```html
<div class="cards">
  <div data-reveal="zoom-in" data-reveal-easing="bounce">Card 1</div>
  <div data-reveal="zoom-in" data-reveal-easing="bounce" data-reveal-delay="100">Card 2</div>
  <div data-reveal="zoom-in" data-reveal-easing="bounce" data-reveal-delay="200">Card 3</div>
</div>
```

---

## 📱 Responsividade

As animações são automaticamente ajustadas para mobile:

- Distâncias de movimento reduzidas pela metade
- Delays encurtados para animações mais rápidas
- Opção de desabilitar completamente no mobile

```javascript
// Desabilitar animações no mobile
const reveal = new ScrollReveal({
  mobile: false  // Revela tudo instantaneamente no mobile
});
```

---

## ♿ Acessibilidade

O sistema respeita automaticamente a preferência do usuário de movimento reduzido:

```css
@media (prefers-reduced-motion: reduce) {
  /* Todas as animações são removidas */
  [data-reveal] {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 🐛 Debug

Para ver logs das animações no console:

```javascript
// Os logs aparecem automaticamente:
// 🎬 Scroll Reveal initialized: 15 elements
// ✨ Revealed: fade-up <div>...</div>
// ✨ Revealed: stagger <div>...</div>
```

---

## 🎯 Performance

- **Intersection Observer API**: Nativo do navegador, super performático
- **Hardware Acceleration**: Usa transform e opacity (GPU)
- **Lazy Loading**: Elementos só são animados quando visíveis
- **Cleanup Automático**: Observer é desconectado após animação (se once: true)

---

## 🔧 Troubleshooting

### Animações não funcionam

1. Verifique se os arquivos CSS e JS estão importados:
   ```css
   @import 'components/scroll-reveal.css';
   ```
   ```javascript
   import ScrollReveal from './animations/scroll-reveal.js';
   ```

2. Verifique se o elemento tem o atributo correto:
   ```html
   <div data-reveal="fade-up">Conteúdo</div>
   ```

3. Verifique no console se há erros

### Elementos aparecem de repente sem animar

- Verifique se o CSS foi carregado antes do conteúdo aparecer
- Elementos devem ter `opacity: 0` por padrão (aplicado pelo CSS)

### Animação não reseta (loop contínuo)

```javascript
const reveal = new ScrollReveal({
  reset: true  // Ativa reset ao sair do viewport
});
```

---

## 📦 Browser Support

- ✅ Chrome 58+
- ✅ Firefox 55+
- ✅ Safari 12.1+
- ✅ Edge 79+
- ✅ Opera 45+

**Polyfill para navegadores antigos:**
```html
<script src="https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver"></script>
```

---

## 📄 Licença

Este sistema de scroll reveal faz parte do Portfolio Neo-Brutalist de Otávio Cruz.

---

**Desenvolvido com ❤️ por Otávio Cruz**
