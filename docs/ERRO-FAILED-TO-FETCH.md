# ⚠️ ERRO: Failed to fetch

Este erro significa que o Google Apps Script não está aceitando a requisição.

## 🔧 SOLUÇÃO - Siga exatamente estes passos:

### 1️⃣ Abrir o Apps Script

1. Abra sua planilha: https://docs.google.com/spreadsheets/d/1k7d2lZNEwTtFkDWSM5O9ajurbxyINdV7PUkABhmjA8k/
2. **Extensões** → **Apps Script**

### 2️⃣ Substituir TODO o código

1. **Selecione TUDO** (Ctrl+A)
2. **Delete** (Delete)
3. Copie o código do arquivo `docs/google-apps-script-SIMPLIFICADO.js`
4. **Cole** no editor do Apps Script
5. **SALVE** (Ctrl+S ou ícone de disquete)

### 3️⃣ REIMPLANTAR (MUITO IMPORTANTE!)

**⚠️ Este é o passo que provavelmente está faltando!**

1. Clique em **Implantar** (botão azul, canto superior direito)

2. Escolha **Gerenciar implantações**

3. Você verá uma implantação existente. Clique no **ícone de LÁPIS** ✏️ ao lado dela

4. Clique em **NOVA VERSÃO** (não apenas "Implantar"!)

5. Em "Configuração":
   - **Descrição**: "Formulário de contato v2"
   - **Executar como**: **Eu** (seu email)
   - **Quem tem acesso**: **Qualquer pessoa**

6. Clique em **IMPLANTAR**

7. **COPIE A URL** que aparecer (deve ser a mesma de antes)

### 4️⃣ Verificar a URL

A URL deve ser EXATAMENTE:
```
https://script.google.com/macros/s/AKfycbwOMhY8EGyvlkEKSeXPf1JisDBgFrhhAZUCDHLRQ2NZesyVGUWx2CRmZj8WPxei_tfCoA/exec
```

Se for diferente, atualize em `src/js/config.js`

### 5️⃣ Testar novamente

1. Feche a página `teste-google-sheets.html`
2. Abra novamente
3. Envie o formulário
4. **Verifique a planilha!**

## 🎯 Checklist de Verificação:

- [ ] Código atualizado no Apps Script
- [ ] SALVO (Ctrl+S)
- [ ] Reimplantado com NOVA VERSÃO
- [ ] "Executar como": **Eu**
- [ ] "Quem tem acesso": **Qualquer pessoa**
- [ ] URL copiada corretamente
- [ ] Testado novamente

## 💡 Dica Extra

Se ainda não funcionar, tente:

1. No Apps Script, vá em **Implantar** → **Gerenciar implantações**
2. Clique no ícone de **🗑️ LIXEIRA** para ARQUIVAR a implantação antiga
3. Clique em **Nova implantação**
4. Selecione tipo: **Aplicativo da Web**
5. Configure:
   - **Executar como**: Eu
   - **Quem tem acesso**: Qualquer pessoa
6. Clique em **Implantar**
7. **AUTORIZE** quando pedir (importante!)
8. Copie a NOVA URL
9. Atualize em `src/js/config.js` se mudou

## 🔍 Como verificar se está funcionando

Após reimplantar, no Apps Script:

1. Vá em **Execuções** (ícone de relógio ⏰ na barra lateral esquerda)
2. Envie o formulário novamente
3. Deve aparecer uma nova execução na lista
4. Clique nela para ver os logs
5. Se aparecer "Dados salvos!", está funcionando!
6. Verifique a planilha!

---

**LEMBRE-SE**: Sempre que alterar o código, precisa REIMPLANTAR com NOVA VERSÃO!
