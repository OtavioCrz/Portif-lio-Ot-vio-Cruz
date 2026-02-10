# Configuração do Formulário de Contato

## ✅ O que JÁ FUNCIONA (sem configuração):

1. **WhatsApp** - Abre conversa automaticamente com a mensagem formatada
2. **Email** - Envia via FormSubmit.co (serviço gratuito)

## 📧 Ativar Email (primeira vez):

O formulário usa o **FormSubmit.co** - serviço gratuito que envia emails sem backend.

**Primeira vez:**
1. Envie o formulário uma vez
2. Você receberá um email em **otaviocruz.dev@gmail.com** com link de confirmação
3. Clique no link para ativar
4. Pronto! A partir daí todos os emails chegarão automaticamente

**Importante:** Verifique a pasta de Spam caso não receba o email de confirmação.

## 📊 Configurar Google Sheets (OPCIONAL):

Se quiser salvar um histórico de todas as mensagens recebidas:

### Passo 1: Preparar a Planilha

1. Abra sua planilha: https://docs.google.com/spreadsheets/d/1k7d2lZNEwTtFkDWSM5O9ajurbxyINdV7PUkABhmjA8k/edit

2. Na primeira linha, crie estas colunas:
   - **A1:** Data/Hora
   - **B1:** Nome
   - **C1:** Email
   - **D1:** Assunto
   - **E1:** Mensagem

### Passo 2: Adicionar o Apps Script

1. Na planilha, vá em: **Extensões → Apps Script**

2. Apague todo o código que aparecer

3. Cole este código:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    var timestamp = new Date();
    
    sheet.appendRow([
      timestamp,
      data.name,
      data.email,
      data.subject,
      data.message
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Clique em **Salvar** (ícone de disquete)

### Passo 3: Implantar

1. Clique em **Implantar → Nova implantação**

2. Configure:
   - Clique na engrenagem ⚙️ ao lado de "Selecionar tipo"
   - Escolha: **Aplicativo da Web**
   - **Executar como:** Eu (seu email)
   - **Quem tem acesso:** Qualquer pessoa
   
3. Clique em **Implantar**

4. **Autorize** o acesso quando solicitar

5. **COPIE A URL** que aparecer (algo como: `https://script.google.com/macros/s/XXXXX/exec`)

### Passo 4: Adicionar no seu site

1. Abra o arquivo: `src/js/config.js`

2. Cole a URL copiada:
```javascript
GOOGLE_SHEETS_URL: 'https://script.google.com/macros/s/XXXXX/exec',
```

3. Salve o arquivo

### ✅ Pronto!

Agora toda mensagem será salva automaticamente na planilha!

---

## 🧪 Testar

1. Abra o index.html no navegador
2. Preencha o formulário
3. Clique em "Enviar Mensagem"
4. Deve abrir WhatsApp E seu cliente de email
5. Se configurou Google Sheets, verifique a planilha

---

## 📱 Como funciona:

**Quando alguém enviar:**
1. ✅ Abre WhatsApp com mensagem formatada
2. ✅ Abre email com mensagem preenchida  
3. ✅ Salva na planilha (se configurou)

Tudo automático! 🚀
