// Contact Form Component - Neo-Brutalist Portfolio
import CONFIG from '../config.js';
import SecurityManager from '../utils/security.js';

// Inicializar gerenciador de seguranca
const security = new SecurityManager();

export function initContactForm() {
  const form = document.querySelector('.contact__form');
  
  if (!form) return;
  
  // Adicionar campo honeypot (invisível para usuários, visível para bots)
  addHoneypotField(form);
  
  form.addEventListener('submit', handleFormSubmit);
  
  // Real-time validation
  const inputs = form.querySelectorAll('.form__input, .form__textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => clearError(input));
  });
  
  // Mostrar informações de rate limit (opcional)
  showRateLimitInfo();
}

// Adicionar campo honeypot (trap para bots)
function addHoneypotField(form) {
  const honeypot = document.createElement('input');
  honeypot.type = 'text';
  honeypot.name = 'website'; // Nome que bots costumam preencher
  honeypot.className = 'form__honeypot';
  honeypot.tabIndex = -1;
  honeypot.autocomplete = 'off';
  honeypot.setAttribute('aria-hidden', 'true');
  
  form.appendChild(honeypot);
}

async function handleFormSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  
  // === VERIFICAÇÕES DE SEGURANÇA ===
  
  // 1. Verificar honeypot (detectar bots)
  if (!security.checkHoneypot(data.website)) {
    console.warn('🤖 Bot detectado via honeypot');
    showNotification('Erro de validação. Tente novamente.', 'error');
    return;
  }
  
  // 2. Verificar rate limiting
  const canSubmit = security.canSubmit();
  if (!canSubmit.allowed) {
    console.warn('⏱️ Rate limit atingido:', canSubmit.reason);
    showNotification(canSubmit.reason, 'error');
    return;
  }
  
  // 3. Sanitizar inputs (remover código malicioso)
  data.name = security.sanitizeInput(data.name);
  data.email = security.sanitizeInput(data.email);
  data.subject = security.sanitizeInput(data.subject);
  data.message = security.sanitizeInput(data.message);
  
  // 4. Validar conteúdo
  const contentValidation = security.validateContent(data);
  if (!contentValidation.valid) {
    console.warn('⚠️ Conteúdo inválido:', contentValidation.reason);
    showNotification(contentValidation.reason, 'error');
    
    if (contentValidation.field && contentValidation.field !== 'general') {
      const input = form.querySelector(`[name="${contentValidation.field}"]`);
      if (input) {
        showError(input, contentValidation.reason);
      }
    }
    return;
  }
  
  // 5. Verificar mensagem duplicada
  if (security.isDuplicate(data.message)) {
    console.warn('🔄 Mensagem duplicada detectada');
    showNotification('Esta mensagem é muito similar à anterior. Por favor, modifique sua mensagem.', 'error');
    return;
  }
  
  // === VALIDAÇÃO PADRÃO DOS CAMPOS ===
  
  const inputs = form.querySelectorAll('.form__input, .form__textarea');
  let isValid = true;
  
  inputs.forEach(input => {
    if (!validateField(input)) {
      isValid = false;
    }
  });
  
  if (!isValid) {
    showNotification('Por favor, corrija os erros no formulário', 'error');
    return;
  }
  
  // Show loading popup
  showLoadingPopup();
  
  // Show loading state on button
  const submitBtn = form.querySelector('.form__submit');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Enviando...';
  submitBtn.disabled = true;
  
  try {
    console.log('🚀 Iniciando envio do formulário...');
    console.log('📋 Dados capturados:', data);
    console.log('⚙️ Configuração:', {
      sheetsURL: CONFIG.GOOGLE_SHEETS_URL,
      email: CONFIG.EMAIL,
      whatsapp: CONFIG.WHATSAPP_NUMBER
    });
    
    // 1. ABRIR WHATSAPP PRIMEIRO (antes de qualquer coisa)
    console.log('📱 Abrindo WhatsApp...');
    openWhatsApp(data);
    
    // Simular delay para mostrar o loading
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // 2. Enviar para Google Sheets (se configurado)
    let sheetsSent = false;
    if (CONFIG.GOOGLE_SHEETS_URL && CONFIG.GOOGLE_SHEETS_URL.trim() !== '') {
      console.log('📊 Tentando enviar para Google Sheets...');
      try {
        await sendToGoogleSheets(data);
        sheetsSent = true;
        console.log('✅ Requisição enviada para Google Sheets');
      } catch (sheetError) {
        console.error('❌ Erro ao enviar para Sheets:', sheetError);
      }
    } else {
      console.warn('⚠️ URL do Google Sheets não configurada');
    }
    
    // 3. Enviar email usando FormSubmit
    let emailSent = false;
    try {
      await sendToEmail(data);
      emailSent = true;
      console.log('✅ Email enviado via FormSubmit');
    } catch (emailError) {
      console.error('❌ Erro ao enviar email:', emailError);
    }
    
    // Hide loading popup
    hideLoadingPopup();
    
    // === REGISTRAR SUBMISSÃO BEM-SUCEDIDA ===
    security.recordSubmission();
    security.saveLastMessage(data.message);
    
    console.log('🔒 Submissão registrada no sistema de segurança');
    
    // Mostrar status de envio
    let message = '✅ WhatsApp aberto!';
    if (sheetsSent) message += ' | 📊 Sheets';
    if (emailSent) message += ' | 📧 Email';
    
    showNotification(message, 'success');
    
    // Atualizar informações de rate limit
    showRateLimitInfo();
    
    // Limpar formulário após 3 segundos
    setTimeout(() => {
      form.reset();
    }, 3000);
    
  } catch (error) {
    console.error('Form submission error:', error);
    hideLoadingPopup();
    
    // Garantir que WhatsApp abre mesmo se houver erro
    console.log('⚠️ Erro detectado - tentando abrir WhatsApp de qualquer forma...');
    openWhatsApp(data);
    
    showNotification('WhatsApp aberto! 📱', 'success');
  } finally {
    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 3000);
  }
}

// Mostrar loading popup
function showLoadingPopup() {
  const popup = document.getElementById('loadingPopup');
  if (popup) {
    popup.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

// Esconder loading popup
function hideLoadingPopup() {
  const popup = document.getElementById('loadingPopup');
  if (popup) {
    popup.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Enviar para Google Sheets
async function sendToGoogleSheets(data) {
  console.log('📤 Preparando envio para Google Sheets...');
  console.log('🔗 URL completa:', CONFIG.GOOGLE_SHEETS_URL);
  
  const payload = {
    name: data.name,
    email: data.email,
    subject: data.subject,
    message: data.message
  };
  
  console.log('📦 Payload:', JSON.stringify(payload, null, 2));
  
  try {
    const response = await fetch(CONFIG.GOOGLE_SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
    
    console.log('📬 Requisição POST enviada para Google Sheets');
    console.log('ℹ️ Modo no-cors: não é possível ler a resposta, mas os dados foram enviados');
    console.log('✅ Verifique a planilha para confirmar que os dados foram salvos!')
    
  } catch (error) {
    console.error('❌ Erro ao enviar para Sheets:', error);
    throw error;
  }
}

// Enviar Email usando FormSubmit.co (serviço gratuito)
async function sendToEmail(data) {
  console.log('📧 Enviando email via FormSubmit...');
  
  const formData = new FormData();
  formData.append('_subject', `[Portfólio] ${data.subject}`);
  formData.append('name', data.name);
  formData.append('email', data.email);
  formData.append('subject', data.subject);
  formData.append('message', data.message);
  formData.append('_captcha', 'false');
  formData.append('_template', 'table');
  
  const response = await fetch(`https://formsubmit.co/${CONFIG.EMAIL}`, {
    method: 'POST',
    body: formData,
    mode: 'no-cors'
  });
  
  console.log('📬 Email enviado via FormSubmit');
  return response;
}

// Abrir WhatsApp
// Abrir WhatsApp
function openWhatsApp(data) {
  console.log('📱 Preparando mensagem do WhatsApp...');
  console.log('Número:', CONFIG.WHATSAPP_NUMBER);
  
  const message = `*Nova mensagem do Portfólio!*\n\n` +
    `*Nome:* ${data.name}\n` +
    `*Email:* ${data.email}\n` +
    `*Assunto:* ${data.subject}\n\n` +
    `*Mensagem:*\n${data.message}`;
  
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodedMessage}`;
  
  console.log('🔗 URL do WhatsApp:', whatsappUrl);
  
  try {
    const opened = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    
    if (opened && !opened.closed) {
      console.log('✅ WhatsApp aberto com sucesso!');
    } else {
      console.warn('⚠️ Popup pode ter sido bloqueado');
    }
  } catch (error) {
    console.error('Erro ao abrir WhatsApp:', error);
  }
}

function validateField(input) {
  const value = input.value.trim();
  const type = input.type;
  const name = input.name;
  
  clearError(input);
  
  // Required validation
  if (!value) {
    showError(input, 'Este campo é obrigatório');
    return false;
  }
  
  // Email validation
  if (type === 'email' || name === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      showError(input, 'Email inválido');
      return false;
    }
  }
  
  // Name validation
  if (name === 'name' && value.length < 2) {
    showError(input, 'Nome deve ter pelo menos 2 caracteres');
    return false;
  }
  
  // Message validation
  if (name === 'message' && value.length < 10) {
    showError(input, 'Mensagem deve ter pelo menos 10 caracteres');
    return false;
  }
  
  input.classList.add('valid');
  return true;
}

// Mostrar informações de rate limit
function showRateLimitInfo() {
  const report = security.getSecurityReport();
  const infoElement = document.querySelector('.form__rate-limit-info');
  
  if (!infoElement) {
    // Criar elemento de informação se não existir
    const form = document.querySelector('.contact__form');
    if (!form) return;
    
    const info = document.createElement('div');
    info.className = 'form__rate-limit-info';
    info.style.cssText = `
      margin-top: var(--spacing-md);
      padding: var(--spacing-sm);
      font-size: var(--font-size-xs);
      color: var(--color-gray-dark);
      text-align: center;
    `;
    
    form.appendChild(info);
    updateRateLimitDisplay(info, report);
  } else {
    updateRateLimitDisplay(infoElement, report);
  }
}

// Atualizar display de rate limit
function updateRateLimitDisplay(element, report) {
  const { remainingSubmissions, cooldownMinutes, nextAllowedSubmission } = report;
  
  if (nextAllowedSubmission) {
    const minutes = Math.ceil((nextAllowedSubmission - new Date()) / 60000);
    element.textContent = `⏱️ Aguarde ${minutes} minuto(s) para enviar nova mensagem`;
    element.style.color = 'var(--color-accent)';
  } else if (remainingSubmissions === 0) {
    element.textContent = '⚠️ Limite de envios atingido. Tente novamente em 1 hora.';
    element.style.color = 'var(--color-accent)';
  } else {
    element.textContent = `✅ Você pode enviar mais ${remainingSubmissions} mensagem(ns) na próxima hora`;
    element.style.color = 'var(--color-gray-dark)';
  }
}

function showError(input, message) {
  input.classList.add('error');
  
  let errorEl = input.parentElement.querySelector('.form__error');
  if (!errorEl) {
    errorEl = document.createElement('span');
    errorEl.className = 'form__error';
    errorEl.style.cssText = `
      display: block;
      color: var(--color-accent);
      font-size: var(--font-size-xs);
      font-weight: var(--font-weight-bold);
      margin-top: var(--spacing-xs);
      text-transform: uppercase;
    `;
    input.parentElement.appendChild(errorEl);
  }
  
  errorEl.textContent = message;
  input.style.borderColor = 'var(--color-accent)';
}

function clearError(input) {
  input.classList.remove('error', 'valid');
  input.style.borderColor = '';
  
  const errorEl = input.parentElement.querySelector('.form__error');
  if (errorEl) {
    errorEl.remove();
  }
}

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification--${type}`;
  notification.textContent = message;
  
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    padding: var(--spacing-md) var(--spacing-lg);
    background: ${type === 'success' ? 'var(--color-highlight)' : 'var(--color-accent)'};
    color: ${type === 'success' ? 'var(--color-black)' : 'var(--color-white)'};
    border: var(--border-width) solid var(--color-black);
    box-shadow: var(--shadow-lg);
    font-weight: var(--font-weight-bold);
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
  
  // Add animations
  if (!document.querySelector('#notification-animations')) {
    const style = document.createElement('style');
    style.id = 'notification-animations';
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(400px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      @keyframes slideOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(400px);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
}
