# 🌐 Entendendo o Erro de CORS

## O que é CORS?

CORS (Cross-Origin Resource Sharing) é uma segurança do navegador que bloqueia requisições de um site para outro domínio diferente.

## Por que dá erro com Google Apps Script?

O Google Apps Script **não retorna automaticamente** os cabeçalhos CORS necessários (`Access-Control-Allow-Origin`), então o navegador bloqueia a resposta.

## ✅ Solução: Modo `no-cors`

Usamos `mode: 'no-cors'` na requisição. Isso significa:

- ✅ **A requisição É ENVIADA** para o Google Sheets
- ✅ **Os dados SÃO SALVOS** na planilha
- ❌ **A resposta NÃO PODE SER LIDA** (mas isso não importa!)

## 🔍 Como verificar se está funcionando?

### **A ÚNICA forma confiável é verificar a planilha!**

1. Envie o formulário
2. Aguarde 3-5 segundos
3. Abra ou recarregue sua planilha
4. Veja se apareceu uma nova linha

### No Console você verá:

```
🚀 Iniciando envio do formulário...
📊 Tentando enviar para Google Sheets...
📤 Preparando envio para Google Sheets...
🔗 URL completa: https://script.google.com/...
📦 Payload: {...}
📬 Requisição POST enviada para Google Sheets
ℹ️ Modo no-cors: não é possível ler a resposta, mas os dados foram enviados
✅ Verifique a planilha para confirmar que os dados foram salvos!
```

## 🧪 Teste Completo

1. **Recarregue** [docs/teste-google-sheets.html](docs/teste-google-sheets.html)
2. **Envie** o formulário
3. Você verá: "✅ Requisição enviada com sucesso!"
4. **ABRA SUA PLANILHA**
5. Uma nova linha deve aparecer com os dados!

## 📋 Verificação no Apps Script

Para ter certeza de que o script está recebendo as requisições:

1. Abra o Apps Script da planilha
2. Clique em **Execuções** (⏰) na barra lateral
3. Envie o formulário
4. **Atualize** a página de Execuções
5. Deve aparecer uma nova execução!
6. Clique nela para ver os logs

## 🎯 Resumo

| Método | Funciona? | Vê resposta? |
|--------|-----------|--------------|
| **Sem mode** | ❌ Erro CORS | ❌ Bloqueado |
| **mode: 'no-cors'** | ✅ Funciona | ❌ Não vê (mas OK!) |

**Conclusão:** Use `no-cors` e verifique a planilha manualmente!

## 💡 Por que não podemos ver a resposta?

Quando usamos `mode: 'no-cors'`:
- O navegador envia a requisição normalmente
- O servidor (Google) processa e responde
- Mas o navegador **esconde a resposta** do JavaScript por segurança
- **MAS** os dados **já foram salvos** no servidor!

É como enviar uma carta pelo correio sem recibo de confirmação - a carta chega, mas você não tem como confirmar sem ir ver o destinatário!

No caso do formulário:
- 📮 Carta = Dados do formulário
- 🏢 Destinatário = Google Sheets  
- ✅ Confirmação = Verificar a planilha manualmente

---

**🚀 Agora teste e verifique sua planilha!**
