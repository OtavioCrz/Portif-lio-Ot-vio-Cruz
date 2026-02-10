# Guia de Estilo - Portfólio Neo-Brutalist

## Paleta de Cores

### Cores Principais
- **Primary (Amarelo)**: `#FFE500` - Usado para destaques, botões principais e elementos interativos
- **Secondary (Cian)**: `#00F0FF` - Usado para acentos secundários e elementos de suporte
- **Accent (Rosa)**: `#FF006E` - Usado para CTAs importantes e elementos de destaque
- **Highlight (Verde)**: `#00FF94` - Usado para sucessos e elementos de validação

### Cores Neutras
- **Black**: `#000000` - Bordas e texto principal
- **White**: `#FFFFFF` - Fundos e texto em fundos escuros
- **Gray Light**: `#F5F5F5` - Fundos alternativos
- **Gray Dark**: `#2A2A2A` - Fundos de imagens e elementos de contraste

## Tipografia

### Fonte
- **Família**: Space Grotesk (Google Fonts)
- **Fallback**: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif

### Tamanhos
- **4XL**: 4rem (64px) - Títulos hero
- **3XL**: 3rem (48px) - Títulos de seção
- **2XL**: 2.5rem (40px) - Subtítulos grandes
- **XL**: 2rem (32px) - Títulos de cards
- **LG**: 1.5rem (24px) - Subtítulos
- **MD**: 1.25rem (20px) - Corpo destacado
- **SM**: 1rem (16px) - Corpo normal
- **XS**: 0.875rem (14px) - Texto pequeno

### Pesos
- **Normal**: 400
- **Medium**: 500
- **Bold**: 700
- **Black**: 900

## Bordas e Sombras

### Bordas
- **Padrão**: 4px solid #000000
- **Grossa**: 6px solid #000000
- **Raio**: 0 (sem arredondamento)

### Sombras Neo-Brutalist
- **SM**: 4px 4px 0px #000000
- **MD**: 6px 6px 0px #000000
- **LG**: 8px 8px 0px #000000
- **XL**: 12px 12px 0px #000000

## Espaçamento

- **XS**: 0.5rem (8px)
- **SM**: 1rem (16px)
- **MD**: 1.5rem (24px)
- **LG**: 2rem (32px)
- **XL**: 3rem (48px)
- **2XL**: 4rem (64px)
- **3XL**: 6rem (96px)

## Componentes

### Botões
- Padding: 1rem 2rem
- Border: 4px solid #000000
- Box-shadow: 6px 6px 0px #000000
- Transform on hover: translate(2px, 2px)
- Transform on active: translate(6px, 6px)

### Cards
- Background: #FFFFFF
- Border: 4px solid #000000
- Box-shadow: 8px 8px 0px #000000
- Padding: 2rem

### Inputs
- Border: 4px solid #000000
- Padding: 1rem
- Focus: Border-color accent + box-shadow

## Animações

### Transições
- **Fast**: 0.15s ease
- **Normal**: 0.3s ease
- **Slow**: 0.5s ease

### Efeitos Comuns
- **Hover em botões**: Redução de sombra + movimento
- **Hover em cards**: Inclinação sutil + redução de sombra
- **Scroll reveal**: Opacidade + translateY

## Breakpoints

- **SM**: 640px
- **MD**: 768px
- **LG**: 1024px
- **XL**: 1280px

## Princípios de Design

1. **Ousadia**: Use cores vibrantes sem medo
2. **Contraste**: Sempre preto + cores vibrantes
3. **Geometria**: Formas retas, sem curvas
4. **Sombras duras**: Sem blur, apenas offset
5. **Tipografia bold**: Sempre em caixa alta para títulos
6. **Interatividade clara**: Feedbacks visuais evidentes

## Exemplos de Uso

### Título de Seção
```css
font-size: 3rem;
font-weight: 900;
text-transform: uppercase;
background: #FFE500;
padding: 1rem 1.5rem;
border: 4px solid #000000;
box-shadow: 8px 8px 0px #000000;
transform: rotate(-1deg);
```

### Card de Projeto
```css
background: #FFFFFF;
border: 4px solid #000000;
box-shadow: 8px 8px 0px #000000;
transition: all 0.3s ease;
```

### Botão CTA
```css
background: #FF006E;
color: #FFFFFF;
border: 4px solid #000000;
padding: 1rem 2rem;
font-weight: 700;
text-transform: uppercase;
box-shadow: 6px 6px 0px #000000;
```
