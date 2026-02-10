// Google Apps Script - VERSÃO SIMPLIFICADA
// Cole este código e reimplante!

function doPost(e) {
  try {
    // Pegar a primeira aba da planilha
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Página1');
    
    // Se não encontrar, usar a primeira aba disponível
    if (!sheet) {
      sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    }
    
    // Parsear dados JSON
    var data = JSON.parse(e.postData.contents);
    
    // Adicionar linha com os dados
    sheet.appendRow([
      new Date(),
      data.name,
      data.email,
      data.subject,
      data.message
    ]);
    
    // Retornar sucesso com headers CORS
    var output = ContentService.createTextOutput(JSON.stringify({ 
      status: 'success', 
      message: 'Dados salvos!' 
    }));
    output.setMimeType(ContentService.MimeType.JSON);
    
    return output;
    
  } catch(error) {
    // Retornar erro
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// IMPORTANTE: Não esqueça de REIMPLANTAR após colar este código!
