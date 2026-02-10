# 🔒 Sistema de Segurança - Portfólio Neo-Brutalist

## 🛡️ Medidas de Segurança Implementadas

### 1. **Rate Limiting** (Controle de Taxa)
- **Máximo**: 3 envios por hora
- **Cooldown**: 10 minutos entre cada envio
- Previne spam e sobrecarga
- Usa localStorage para rastrear submissões

### 2. **Honeypot** (Armadilha para Bots)
- Campo invisível que só bots preenchem
- Humanos não veem o campo
- Bots tentam preencher todos os campos
- Submissão é bloqueada se honeypot estiver preenchido

### 3. **Validação de Conteúdo**
- **Limites de tamanho**:
  - Nome: máx. 100 caracteres
  - Mensagem: 10-1000 caracteres
- **Detecção de spam**:
  - Palavras suspeitas (viagra, casino, etc)
  - Links excessivos (máx. 2 URLs)
  - Caracteres repetidos em excesso

### 4. **Sanitização de Entrada**
- Remove tags HTML (`<>`)
- Remove JavaScript inline (`javascript:`, `onclick`, etc)
- Remove event handlers maliciosos
- Previne XSS (Cross-Site Scripting)

### 5. **Detecção de Duplicatas**
- Compara nova mensagem com a anterior
- Usa algoritmo de similaridade (Levenshtein)
- Bloqueia mensagens 80%+ similares
- Previne envios repetitivos

### 6. **Proteção contra Injeção**
- Filtra caracteres perigosos
- Remove tags script
- Previne SQL Injection
- Previne Command Injection

## 📊 Como Funciona

### Fluxo de Validação:

```
Usuário preenche formulário
         ↓
1. Verificar honeypot (bot?)
         ↓
2. Verificar rate limit (muitos envios?)
         ↓
3. Sanitizar inputs (remover código malicioso)
         ↓
4. Validar conteúdo (spam? muito longo?)
         ↓
5. Verificar duplicata (já enviou isso?)
         ↓
6. Validação padrão (campos obrigatórios, email válido)
         ↓
7. Enviar formulário
         ↓
8. Registrar submissão (para rate limiting)
```

## 🎯 Benefícios

### Para Você:
- ✅ Menos spam no WhatsApp
- ✅ Menos emails desnecessários
- ✅ Planilha organizada sem lixo
- ✅ Proteção contra ataques
- ✅ Controle total sobre quem envia

### Para Usuários Legítimos:
- ✅ Formulário rápido e responsivo
- ✅ Mensagens de erro claras
- ✅ Feedback visual do rate limit
- ✅ Experiência sem fricção

## ⚙️ Configurações

Edite em `src/js/utils/security.js`:

```javascript
this.MAX_SUBMISSIONS_PER_HOUR = 3;     // Mudar limite por hora
this.COOLDOWN_MINUTES = 10;            // Mudar cooldown
this.MAX_MESSAGE_LENGTH = 1000;        // Tamanho máx da mensagem
this.MIN_MESSAGE_LENGTH = 10;          // Tamanho mín da mensagem
```

Adicionar palavras à blacklist:

```javascript
this.suspiciousPatterns = [
  /viagra/i,
  /casino/i,
  /sua-palavra/i,  // Adicione aqui
  // ...
];
```

## 🧪 Testando

### Ver relatório de segurança no Console:

```javascript
// No console do navegador (F12)
// Cole este código:
const security = new SecurityManager();
console.log(security.getSecurityReport());
```

Retorna:
```json
{
  "submissionsInLastHour": 2,
  "maxSubmissionsPerHour": 3,
  "remainingSubmissions": 1,
  "lastSubmissionTime": "2026-02-10T14:30:00",
  "nextAllowedSubmission": null,
  "cooldownMinutes": 10
}
```

### Limpar dados de segurança (para testes):

```javascript
// No console
const security = new SecurityManager();
security.clearSecurityData();
console.log('✅ Dados de segurança limpos!');
```

## 🚨 Tipos de Bloqueio

### 1. Bot Detectado
```
"Erro de validação. Tente novamente."
```
**Causa**: Honeypot foi preenchido

### 2. Rate Limit
```
"Aguarde X minuto(s) antes de enviar outra mensagem."
```
**Causa**: Enviou muito rápido (dentro de 10 min)

```
"Limite de 3 mensagens por hora atingido."
```
**Causa**: Já enviou 3 vezes na última hora

### 3. Conteúdo Suspeito
```
"Conteúdo suspeito detectado."
```
**Causa**: Mensagem contém palavras da blacklist

### 4. Tamanho Inválido
```
"Mensagem muito longa (máx. 1000 caracteres)."
"Mensagem muito curta (mín. 10 caracteres)."
```

### 5. Links Excessivos
```
"Muitos links na mensagem."
```
**Causa**: Mais de 2 URLs na mensagem

### 6. Mensagem Duplicada
```
"Esta mensagem é muito similar à anterior."
```
**Causa**: Mensagem 80%+ igual à última

## 📈 Monitoramento

### Ver histórico de submissões:

No localStorage do navegador:
- Chave: `portfolio_form_security`
- Contém: timestamps de envios, última mensagem

### Logs no Console:

```
🔒 Submissão registrada no sistema de segurança
⏱️ Rate limit atingido: Aguarde X minuto(s)
🤖 Bot detectado via honeypot
⚠️ Conteúdo inválido: [razão]
🔄 Mensagem duplicada detectada
```

## 🔐 Segurança vs. Usabilidade

| Medida | Impacto no Usuário | Efetividade |
|--------|-------------------|-------------|
| Rate Limiting | ⭐⭐ Baixo | ⭐⭐⭐⭐⭐ Alta |
| Honeypot | ⭐ Nenhum | ⭐⭐⭐⭐ Alta |
| Validação Conteúdo | ⭐⭐ Baixo | ⭐⭐⭐⭐ Alta |
| Sanitização | ⭐ Nenhum | ⭐⭐⭐⭐⭐ Alta |
| Detecção Duplicata | ⭐⭐ Baixo | ⭐⭐⭐ Média |

## 💡 Próximas Melhorias (Opcional)

### Google reCAPTCHA v3
- Proteção invisível contra bots
- Sem impacto na experiência
- Requer chave de API

### IP-based Rate Limiting
- Rastrear por IP (requer backend)
- Mais robusto que localStorage
- Previne múltiplos navegadores

### E-mail Verification
- Confirmar email antes de enviar
- Reduz spam significativamente
- Adiciona fricção ao processo

## 🎮 Interface de Usuário

O sistema mostra ao usuário:

```
✅ Você pode enviar mais 2 mensagem(ns) na próxima hora
```

Ou, quando em cooldown:

```
⏱️ Aguarde 8 minuto(s) para enviar nova mensagem
```

Ou, quando limite atingido:

```
⚠️ Limite de envios atingido. Tente novamente em 1 hora.
```

---

**🛡️ Seu portfólio agora está protegido contra spam e ataques!**
