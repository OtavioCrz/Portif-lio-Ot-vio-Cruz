// Security Layer - Neo-Brutalist Portfolio
// Proteção contra spam, bots e ataques

export class SecurityManager {
  constructor() {
    this.MAX_SUBMISSIONS_PER_HOUR = 3; // Máximo de 3 envios por hora
    this.COOLDOWN_MINUTES = 10; // 10 minutos entre cada envio
    this.MAX_MESSAGE_LENGTH = 1000;
    this.MAX_NAME_LENGTH = 100;
    this.MIN_MESSAGE_LENGTH = 10;
    
    // Palavras/padrões suspeitos (expandir conforme necessário)
    this.suspiciousPatterns = [
      /viagra/i,
      /casino/i,
      /bitcoin/i,
      /crypto/i,
      /loan/i,
      /click here/i,
      /winner/i,
      /congratulations/i,
      /<script/i,
      /javascript:/i,
      /onclick/i,
      /onerror/i,
      /<iframe/i,
      /eval\(/i,
      /base64/i
    ];
    
    this.storageKey = 'portfolio_form_security';
  }
  
  // Verificar se usuário pode enviar formulário
  canSubmit() {
    const data = this.getSecurityData();
    const now = Date.now();
    
    // Verificar cooldown
    if (data.lastSubmission) {
      const timeSinceLastSubmission = now - data.lastSubmission;
      const cooldownMs = this.COOLDOWN_MINUTES * 60 * 1000;
      
      if (timeSinceLastSubmission < cooldownMs) {
        const remainingMinutes = Math.ceil((cooldownMs - timeSinceLastSubmission) / 60000);
        return {
          allowed: false,
          reason: `Aguarde ${remainingMinutes} minuto(s) antes de enviar outra mensagem.`,
          type: 'cooldown'
        };
      }
    }
    
    // Limpar submissões antigas (mais de 1 hora)
    const oneHourAgo = now - (60 * 60 * 1000);
    data.submissions = data.submissions.filter(time => time > oneHourAgo);
    
    // Verificar limite por hora
    if (data.submissions.length >= this.MAX_SUBMISSIONS_PER_HOUR) {
      return {
        allowed: false,
        reason: `Limite de ${this.MAX_SUBMISSIONS_PER_HOUR} mensagens por hora atingido. Tente novamente mais tarde.`,
        type: 'rate_limit'
      };
    }
    
    return { allowed: true };
  }
  
  // Registrar nova submissão
  recordSubmission() {
    const data = this.getSecurityData();
    const now = Date.now();
    
    data.lastSubmission = now;
    data.submissions.push(now);
    
    // Manter apenas submissões da última hora
    const oneHourAgo = now - (60 * 60 * 1000);
    data.submissions = data.submissions.filter(time => time > oneHourAgo);
    
    this.saveSecurityData(data);
  }
  
  // Validar conteúdo do formulário
  validateContent(formData) {
    const { name, email, subject, message } = formData;
    
    // Verificar tamanhos
    if (name.length > this.MAX_NAME_LENGTH) {
      return {
        valid: false,
        reason: `Nome muito longo (máx. ${this.MAX_NAME_LENGTH} caracteres).`,
        field: 'name'
      };
    }
    
    if (message.length > this.MAX_MESSAGE_LENGTH) {
      return {
        valid: false,
        reason: `Mensagem muito longa (máx. ${this.MAX_MESSAGE_LENGTH} caracteres).`,
        field: 'message'
      };
    }
    
    if (message.length < this.MIN_MESSAGE_LENGTH) {
      return {
        valid: false,
        reason: `Mensagem muito curta (mín. ${this.MIN_MESSAGE_LENGTH} caracteres).`,
        field: 'message'
      };
    }
    
    // Verificar padrões suspeitos
    const allText = `${name} ${email} ${subject} ${message}`.toLowerCase();
    
    for (const pattern of this.suspiciousPatterns) {
      if (pattern.test(allText)) {
        return {
          valid: false,
          reason: 'Conteúdo suspeito detectado. Se isso foi um erro, tente reformular sua mensagem.',
          field: 'general'
        };
      }
    }
    
    // Verificar se mensagem tem URL excessivo (possível spam)
    const urlCount = (message.match(/https?:\/\//g) || []).length;
    if (urlCount > 2) {
      return {
        valid: false,
        reason: 'Muitos links na mensagem. Por favor, limite o número de URLs.',
        field: 'message'
      };
    }
    
    // Verificar se mensagem é repetitiva (caracteres repetidos)
    if (this.hasExcessiveRepetition(message)) {
      return {
        valid: false,
        reason: 'Mensagem com padrão suspeito de repetição.',
        field: 'message'
      };
    }
    
    return { valid: true };
  }
  
  // Detectar repetição excessiva de caracteres
  hasExcessiveRepetition(text) {
    // Detectar mais de 5 caracteres iguais seguidos
    const repetitionPattern = /(.)\1{5,}/;
    return repetitionPattern.test(text);
  }
  
  // Sanitizar entrada (remover scripts e HTML perigoso)
  sanitizeInput(input) {
    return input
      .replace(/[<>]/g, '') // Remover < e >
      .replace(/javascript:/gi, '') // Remover javascript:
      .replace(/on\w+=/gi, '') // Remover event handlers (onclick, onerror, etc)
      .trim();
  }
  
  // Verificar honeypot (campo invisível para detectar bots)
  checkHoneypot(honeypotValue) {
    // Se honeypot foi preenchido, é um bot
    return honeypotValue === '' || honeypotValue === undefined;
  }
  
  // Verificar se mensagem é muito similar à última
  isDuplicate(message) {
    const data = this.getSecurityData();
    
    if (!data.lastMessage) return false;
    
    // Calcular similaridade simples
    const similarity = this.calculateSimilarity(
      message.toLowerCase(),
      data.lastMessage.toLowerCase()
    );
    
    // Se mais de 80% similar, considerar duplicata
    return similarity > 0.8;
  }
  
  // Calcular similaridade entre duas strings (Levenshtein simplificado)
  calculateSimilarity(str1, str2) {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    const editDistance = this.getEditDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
  }
  
  // Distância de edição (simplificada)
  getEditDistance(str1, str2) {
    const costs = [];
    for (let i = 0; i <= str1.length; i++) {
      let lastValue = i;
      for (let j = 0; j <= str2.length; j++) {
        if (i === 0) {
          costs[j] = j;
        } else if (j > 0) {
          let newValue = costs[j - 1];
          if (str1.charAt(i - 1) !== str2.charAt(j - 1)) {
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          }
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
      if (i > 0) costs[str2.length] = lastValue;
    }
    return costs[str2.length];
  }
  
  // Salvar última mensagem
  saveLastMessage(message) {
    const data = this.getSecurityData();
    data.lastMessage = message;
    this.saveSecurityData(data);
  }
  
  // Obter dados de segurança do localStorage
  getSecurityData() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Erro ao ler dados de segurança:', e);
    }
    
    return {
      submissions: [],
      lastSubmission: null,
      lastMessage: null
    };
  }
  
  // Salvar dados de segurança
  saveSecurityData(data) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (e) {
      console.warn('Erro ao salvar dados de segurança:', e);
    }
  }
  
  // Limpar dados de segurança (para testes)
  clearSecurityData() {
    localStorage.removeItem(this.storageKey);
  }
  
  // Gerar relatório de segurança
  getSecurityReport() {
    const data = this.getSecurityData();
    const now = Date.now();
    
    let nextAllowedSubmission = null;
    if (data.lastSubmission) {
      const cooldownMs = this.COOLDOWN_MINUTES * 60 * 1000;
      const timeSinceLastSubmission = now - data.lastSubmission;
      if (timeSinceLastSubmission < cooldownMs) {
        nextAllowedSubmission = new Date(data.lastSubmission + cooldownMs);
      }
    }
    
    return {
      submissionsInLastHour: data.submissions.length,
      maxSubmissionsPerHour: this.MAX_SUBMISSIONS_PER_HOUR,
      remainingSubmissions: Math.max(0, this.MAX_SUBMISSIONS_PER_HOUR - data.submissions.length),
      lastSubmissionTime: data.lastSubmission ? new Date(data.lastSubmission) : null,
      nextAllowedSubmission: nextAllowedSubmission,
      cooldownMinutes: this.COOLDOWN_MINUTES
    };
  }
}

export default SecurityManager;
