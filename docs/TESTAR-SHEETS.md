# 🔧 Teste do Google Sheets - Passo a Passo

## ⚠️ IMPORTANTE: URL já está configurada corretamente!

A URL do Apps Script já está correta em `src/js/config.js`:
```
https://script.google.com/macros/s/AKfycbwOMhY8EGyvlkEKSeXPf1JisDBgFrhhAZUCDHLRQ2NZesyVGUWx2CRmZj8WPxei_tfCoA/exec
```

## 🧪 Vamos testar o Apps Script

### Passo 1: Substituir o código do Apps Script

1. Abra o Apps Script: **Extensões → Apps Script**

2. **DELETE TODO O CÓDIGO** que está lá

3. Cole o código do arquivo `docs/google-apps-script-novo.js`

4. **Salve**: Ctrl+S ou clique no ícone de disquete

### Passo 2: Testar manualmente no Apps Script

1. No Apps Script, selecione a função `testarFormulario` no menu dropdown (ao lado do botão ▶️)

2. Clique no botão **▶️ Executar**

3. Se pedir autorização:
   - Clique em **Analisar permissões**
   - Escolha sua conta Google
   - Clique em **Avançado**
   - Clique em **Acessar [nome do projeto] (não seguro)**
   - Clique em **Permitir**

4. Aguarde a execução

5. Verifique a **planilha** - deve aparecer uma linha com:
   ```
   Data/Hora | Teste | teste@email.com | Assunto Teste | Mensagem de teste
   ```

6. Se aparecer a linha: ✅ **O script está funcionando!**

### Passo 3: Reimplantar

Mesmo que já tenha implantado antes, vamos reimplantar com o novo código:

1. Clique em **Implantar** → **Gerenciar implantações**

2. Clique no ícone de **lápis** (editar) na implantação existente

3. Clique em **Nova versão**

4. Clique em **Implantar**

5. Copie a URL (deve ser a mesma que já está no config.js)

### Passo 4: Testar do site

1. Abra seu portfólio no navegador

2. Pressione **F12** para abrir o Console

3. Preencha o formulário com dados de teste

4. Clique em **Enviar Mensagem**

5. Observe no Console:

```
🚀 Iniciando envio do formulário...
📊 Tentando enviar para Google Sheets...
📤 Preparando envio para Google Sheets...
🔗 URL completa: https://script.google.com/macros/s/.../exec
📦 Payload: {...}
📬 Requisição POST enviada para Google Sheets
✅ Requisição enviada para Google Sheets
```

6. **Aguarde 5-10 segundos** e verifique a planilha

7. Deve aparecer uma nova linha com seus dados

## 🔍 Se ainda não funcionar

### Verificação 1: Permissões

No Apps Script, verifique em **Implantar → Gerenciar implantações**:

- **Executar como**: Eu (seu email)
- **Quem tem acesso**: **Qualquer pessoa**

Se estiver diferente, edite e mude.

### Verificação 2: Aba correta

Verifique se está adicionando dados na aba correta:
- Os cabeçalhos estão na **primeira linha** da **primeira aba**?
- A aba está visível e não oculta?

### Verificação 3: Logs do Apps Script

1. No Apps Script, vá em **Execuções** (ícone de relógio na barra lateral)

2. Veja se aparecem execuções quando você envia o formulário

3. Clique em uma execução para ver os logs

### Verificação 4: Teste via cURL (avançado)

Abra o PowerShell e execute:

```powershell
$url = "https://script.google.com/macros/s/AKfycbwOMhY8EGyvlkEKSeXPf1JisDBgFrhhAZUCDHLRQ2NZesyVGUWx2CRmZj8WPxei_tfCoA/exec"
$body = @{
    name = "Teste PowerShell"
    email = "teste@email.com"
    subject = "Teste"
    message = "Mensagem teste"
} | ConvertTo-Json

Invoke-WebRequest -Uri $url -Method POST -Body $body -ContentType "application/json"
```

Depois verifique se apareceu na planilha.

## 📋 Checklist Final

- [ ] Código do Apps Script atualizado com google-apps-script-novo.js
- [ ] Função testarFormulario executada com sucesso
- [ ] Linha de teste apareceu na planilha
- [ ] Reimplantado como Web app
- [ ] Permissões: "Executar como: Eu" + "Quem tem acesso: Qualquer pessoa"
- [ ] Cabeçalhos na linha 1: Data/Hora | Nome | Email | Assunto | Mensagem
- [ ] Teste do site mostra logs no Console
- [ ] Aguardou 5-10 segundos após enviar
- [ ] Linha com dados do teste apareceu na planilha

## 💡 Nota Importante

O modo `no-cors` é necessário mas impede ver a resposta do servidor. Por isso:

- ✅ Os logs mostram "Requisição enviada"
- ❌ Mas não conseguimos ver se deu erro ou sucesso
- 📊 A única forma de confirmar é **olhar a planilha**

Por isso precisamos garantir que o script está funcionando testando manualmente primeiro!
