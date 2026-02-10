# ✅ Checklist - Google Sheets

Siga este checklist para garantir que o Google Sheets está configurado corretamente:

## 📋 Passo a Passo

### 1. Abrir o Apps Script

1. Abra sua planilha: https://docs.google.com/spreadsheets/d/1k7d2iZNEwTtFkDWSM5O9ajurbxyINdV7PUkABhmjA8k/
2. Clique em **Extensões** → **Apps Script**

### 2. Verificar o Código

Cole este código exatamente (substitua tudo que estiver lá):

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

### 3. Salvar

- Pressione **Ctrl+S** ou clique no ícone de disquete
- Dê um nome pro projeto (ex: "Formulário Portfólio")

### 4. Implantar

**ATENÇÃO: Este é o passo mais importante!**

1. Clique em **Implantar** → **Nova implantação**
2. Clique no ícone de engrenagem ⚙️ ao lado de "Selecione o tipo"
3. Selecione **Aplicativo da Web**
4. Configure:
   - **Descrição**: "Formulário de contato"
   - **Executar como**: **Eu** (seu email)
   - **Quem tem acesso**: **Qualquer pessoa**
5. Clique em **Implantar**
6. Autorize o acesso quando solicitado:
   - Clique em **Autorizar acesso**
   - Escolha sua conta Google
   - Clique em **Avançado**
   - Clique em **Acessar <nome do projeto> (não seguro)**
   - Clique em **Permitir**

### 5. Copiar URL

- Após implantar, aparecerá uma **URL de implantação**
- Exemplo: `https://script.google.com/macros/s/AKfycbx.../exec`
- **COPIE ESSA URL TODA!** (até o /exec no final)

### 6. Colar no config.js

1. Abra o arquivo: `src/js/config.js`
2. Cole a URL no campo `GOOGLE_SHEETS_URL`
3. Deve ficar assim:

```javascript
const CONFIG = {
  GOOGLE_SHEETS_URL: 'https://script.google.com/macros/s/AKfycbx.../exec',
  EMAIL: 'otaviocruz.dev@gmail.com',
  WHATSAPP_NUMBER: '5585988528359'
};
```

### 7. Preparar Cabeçalhos da Planilha

Na primeira linha da planilha (linha 1), coloque:

| A1 | B1 | C1 | D1 | E1 |
|---|---|---|---|---|
| Data/Hora | Nome | Email | Assunto | Mensagem |

### 8. Testar

1. Recarregue o site (F5)
2. Abra o Console (F12)
3. Envie o formulário
4. Veja os logs no Console
5. **Verifique se apareceu uma nova linha na planilha**

## 🔍 Verificar se está funcionando

Após enviar o formulário, você deve ver no Console:

```
📊 Tentando enviar para Google Sheets...
📤 Preparando envio para Google Sheets...
🔗 URL completa: https://script.google.com/macros/s/.../exec
📦 Payload: {...}
📬 Requisição POST enviada para Google Sheets
✅ Requisição enviada para Google Sheets
```

E na planilha deve aparecer uma nova linha com os dados.

## ⚠️ Problemas Comuns

### Não aparece nada na planilha

1. Verifique se a URL em `config.js` é a URL de **implantação** (termina com /exec)
2. Verifique se implantou como **Aplicativo da Web**
3. Verifique se "Quem tem acesso" está como **Qualquer pessoa**
4. Tente reimplantar:
   - Vá em **Implantar** → **Gerenciar implantações**
   - Clique no ícone de lápis (editar)
   - Clique em **Nova versão**
   - Clique em **Implantar**
   - Copie a nova URL

### "Authorization required"

- Você precisa autorizar o script a acessar a planilha
- Siga os passos de autorização no item 4 acima

### Dados aparecem em ordem errada

- Verifique se os cabeçalhos estão na ordem correta (veja item 7)

## 📱 Lembrando

Mesmo que o Google Sheets não funcione, o formulário já está enviando para:
- ✅ WhatsApp (abre automaticamente)
- ✅ Email (via FormSubmit - você já recebeu)

O Google Sheets é apenas para **histórico** das mensagens!
