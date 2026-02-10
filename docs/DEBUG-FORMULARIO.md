# 🐛 Guia de Debug do Formulário

## Como verificar se está funcionando

### 1️⃣ Abrir Console do Navegador
- Pressione **F12** ou **Ctrl+Shift+I**
- Clique na aba **Console**

### 2️⃣ Testar o Formulário
Preencha o formulário e clique em "Enviar Mensagem"

### 3️⃣ Verificar Logs no Console

Você deve ver mensagens assim:

```
🚀 Iniciando envio do formulário...
📋 Dados capturados: {name: "...", email: "...", ...}
⚙️ Configuração: {sheetsURL: "...", email: "...", whatsapp: "..."}
📊 Tentando enviar para Google Sheets...
📤 Preparando envio para Google Sheets...
🔗 URL completa: https://script.google.com/...
📦 Payload: {...}
📬 Requisição POST enviada para Google Sheets
ℹ️ Nota: modo no-cors não retorna resposta - verifique a planilha manualmente
✅ Requisição enviada para Google Sheets
📧 Enviando email via FormSubmit...
📬 Email enviado via FormSubmit
✅ Email enviado via FormSubmit
✅ WhatsApp aberto
```

## 🔍 Problemas Comuns

### ❌ Google Sheets não está salvando

**Verifique:**

1. **URL está correta?**
   - Abra `src/js/config.js`
   - Verifique se `GOOGLE_SHEETS_URL` tem a URL de implantação (não do editor)
   - Deve começar com: `https://script.google.com/macros/s/...`

2. **Apps Script está implantado corretamente?**
   - No Google Sheets, vá em: **Extensões → Apps Script**
   - Clique em **Implantar → Nova implantação**
   - Tipo: **Aplicativo da Web**
   - **Executar como**: Eu (seu email)
   - **Quem tem acesso**: Qualquer pessoa
   - Copie a **URL da implantação**

3. **Código do Apps Script está correto?**
   - Copie o código de `docs/google-apps-script.js`
   - Cole no Apps Script
   - Salve (Ctrl+S)
   - Implante novamente

4. **Cabeçalhos da planilha estão corretos?**
   - Na linha 1 da planilha, adicione:
   ```
   Data/Hora | Nome | Email | Assunto | Mensagem
   ```

### ❌ Email não está chegando

O formulário usa **FormSubmit.co** (serviço gratuito):

**Na primeira vez:**
1. Envie o formulário uma vez
2. Você receberá um **email de confirmação** em `otaviocruz.dev@gmail.com`
3. Clique no link de confirmação
4. A partir daí, todos os emails chegarão automaticamente

**Se não receber email de confirmação:**
- Verifique a pasta de **Spam/Lixo Eletrônico**
- Verifique se o email em `src/js/config.js` está correto

### ❌ WhatsApp não está abrindo

1. Verifique se permite popups no navegador
2. Olhe ao lado da barra de endereço - pode ter um ícone de popup bloqueado
3. Clique e permita popups para o site

## 📝 Teste Manual do Google Sheets

Se quiser testar se o Apps Script está funcionando, abra o Console e digite:

```javascript
// Testar envio manual
const testData = {
  name: "Teste",
  email: "teste@email.com",
  subject: "Assunto Teste",
  message: "Mensagem de teste"
};

fetch('SUA_URL_DO_GOOGLE_SHEETS_AQUI', {
  method: 'POST',
  mode: 'no-cors',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(testData)
}).then(() => console.log('✅ Teste enviado - verifique a planilha'));
```

Depois verifique se apareceu uma nova linha na planilha.

## 📞 Ordem de Envio

Quando você submete o formulário:

1. **Validação** dos campos
2. **Loading popup** aparece (1 segundo)
3. **Google Sheets** - envia dados para salvar
4. **Email** - envia via FormSubmit.co
5. **Loading fecha**
6. **WhatsApp abre** (300ms depois)
7. **Notificação** mostra status
8. **Formulário limpa** (3 segundos depois)

## 🎯 URLs Importantes

- **FormSubmit**: https://formsubmit.co/
- **Google Apps Script**: https://script.google.com/
- **Sua Planilha**: https://docs.google.com/spreadsheets/d/1k7d2iZNEwTHftDWsM5O9ajurbvyiNdV7PUkABhmjA8k/

## 💡 Dica

O modo `no-cors` é necessário para evitar problemas de CORS, mas não retorna resposta. Por isso:
- ✅ Não confie apenas nos logs do console
- ✅ **Sempre verifique a planilha manualmente** após enviar
- ✅ Verifique sua caixa de email
