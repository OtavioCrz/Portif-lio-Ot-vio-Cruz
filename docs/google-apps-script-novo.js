// Google Apps Script para receber dados do formulário de contato
// INSTRUÇÕES: Cole este código no Apps Script da sua planilha Google Sheets

function doPost(e) {
  try {
    // Log para debug
    Logger.log('Requisição recebida');
    Logger.log('Dados brutos: ' + e.postData.contents);
    
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse dos dados JSON
    var data = JSON.parse(e.postData.contents);
    
    // Data/hora atual
    var timestamp = new Date();
    
    // Adicionar nova linha com os dados
    sheet.appendRow([
      Utilities.formatDate(timestamp, Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm:ss'),
      data.name || '',
      data.email || '',
      data.subject || '',
      data.message || ''
    ]);
    
    Logger.log('Dados salvos com sucesso');
    
    // Retornar sucesso
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'success',
        'message': 'Dados salvos com sucesso'
      }))
      .setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    Logger.log('Erro: ' + error.toString());
    
    // Retornar erro
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'error',
        'message': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Função de teste (para executar manualmente)
function testarFormulario() {
  var dadosTeste = {
    postData: {
      contents: JSON.stringify({
        name: 'Teste',
        email: 'teste@email.com',
        subject: 'Assunto Teste',
        message: 'Mensagem de teste'
      })
    }
  };
  
  var resultado = doPost(dadosTeste);
  Logger.log('Resultado do teste: ' + resultado.getContent());
}
