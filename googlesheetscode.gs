  var sheetId = '1cCHKoy-whMqB8oz45PaYuTQc1EjU5s1P2tRfc6R9-v8';

function searchInSheet(text) {
 
  var sheet = SpreadsheetApp.openById(sheetId).getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var results = [];

  text = text.toLowerCase();

  for (var i = 1; i < data.length; i++) {
    var value = data[i][0].toString().toLowerCase();
    if (value.indexOf(text) !== -1) {
      results.push({ 'Sawal': data[i][1], 'Answer link': data[i][2], 'Maulana': data[i][3] });
    }
  }

  return ContentService.createTextOutput(JSON.stringify(results)).setMimeType(ContentService.MimeType.JSON);
}

function getUniqueValues() {
  var sheet = SpreadsheetApp.openById(sheetId).getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var uniqueValues = [];

  for (var i = 1; i < data.length; i++) {
    var value = data[i][0].toString().toLowerCase();
    if (value && uniqueValues.indexOf(value) === -1) {
      uniqueValues.push(value);
    }
  }

  return ContentService.createTextOutput(JSON.stringify(uniqueValues)).setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  var endpoint = e.parameter.endpoint;
  var searchText = e.parameter.text;

  if (endpoint === 'search') {
    return searchInSheet(searchText);
  } else if (endpoint === 'options') {
    return getUniqueValues();
  }

  return ContentService.createTextOutput('Invalid endpoint');
}
