function onOpen() {
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
      .createMenu('Link File')
      .addItem('Show prompt', 'showPrompt')
      .addToUi();
   SpreadsheetApp.getUi() // the file picker
      .createMenu('File Picker')
      .addItem('Show Picker', 'showPicker')
      .addToUi();
  SpreadsheetApp.getUi() // dropdown time
      .createMenu('New Column')
      .addItem('DROPDOWN FILLER', 'addDropDown')
      .addToUi();
}
function addColumns(){
  //FILLS ONE CELL
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  // Get Spreadsheet
  var sheet = ss.getActiveSheet();
  sheet.getActiveCell().setValue("Hello");

}

function addHeader(){
  var tabLists = "lists";
  var ss = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var datass = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(tabLists);
  var ui = SpreadsheetApp.getUi();
  var activeCell = ss.getCurrentCell();
  var result = ui.prompt(
      'New Header',
    'Enter header name: ',
      ui.ButtonSet.OK_CANCEL);
  var button = result.getSelectedButton();
  //Where my boi clicked
  var text = result.getResponseText();
  //what my boi put in the text box
  if (button == ui.Button.OK) {
    // User clicked "OK".
    ui.alert('New column header created - ' + text + '.');
    //sends alert to user of what will be entered in the first cell of the last column
    ss.insertColumnAfter(ss.getLastColumn());
    //adds a column after the last column with content in it
    SpreadsheetApp.getActiveSheet().getRange(1,ss.getLastColumn()+1).setValue(text);
    // sets column header to value in textbox
  } else if (button == ui.Button.CANCEL) {
    // User clicked "Cancel".
    ui.alert('Ending Program');
  } else if (button == ui.Button.CLOSE) {
    // User clicked X in the title bar.
    ui.alert('You closed the dialog.');
  }
 // if(activeCell.getColumn() == 1 && activeCell.getRow() > 1){
    
   //activeCell.offset(0, 1).clearContent().clearDataValidations();
    
  //var makes = datass.getRange(1, 1, 1, datass.getLastColumn()).getValues();
    
    //var makeIndex = makes[0].indexOf(activeCell.getValue()) + 1;
    
   // if(makeIndex != 0){
       //var validationRange = datass.getRange(3, makeIndex, datass.getLastRow())
  
   //  }  
      
 // }
  
}
function addDropDown(){
  var tabLists = "lists";
  var ss = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var ui = SpreadsheetApp.getUi();
  var activeCell = ss.getCurrentCell();
  var result = ui.prompt(
      'New DropDown Menu',
    'Enter DropDown Menu Options: ',
      ui.ButtonSet.OK_CANCEL);
  var button = result.getSelectedButton();
  //Where my boi clicked
  var text = result.getResponseText();
  //what my boi put in the text box
  if (button == ui.Button.OK) {
    // User clicked "OK".
    ui.alert('These are your options ' + text + '.');
    //User is notified about options
  } else if (button == ui.Button.CANCEL) {
    // User clicked "Cancel".
    ui.alert('Ending Program');
  } else if (button == ui.Button.CLOSE) {
    // User clicked X in the title bar.
    ui.alert('You closed the dialog.');
  }
  var options = text.split(',');
 // if(activeCell.getColumn() == 1 && activeCell.getRow() > 1){
    
   //activeCell.offset(0, 1).clearContent().clearDataValidations();
    
  //var makes = datass.getRange(1, 1, 1, datass.getLastColumn()).getValues();
    
    //var makeIndex = makes[0].indexOf(activeCell.getValue()) + 1;
    
   // if(makeIndex != 0){
       //var validationRange = datass.getRange(3, makeIndex, datass.getLastRow());
  var validationRule = SpreadsheetApp.newDataValidation().requireValueInList(options,true).build();
       activeCell.getColumn().setDataValidation(validationRule);
  
   //  }  
      
 // }
  
}
function showPrompt() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  // Get Spreadsheet
  var sheet = ss.getSheets()[1];
  // Gets second sheet in spreadsheet
  var ui = SpreadsheetApp.getUi(); // Same variations.
  //uses UI
  var result = ui.prompt(
      'Yeehaw',
      'Enter filename',
      ui.ButtonSet.OK_CANCEL);
  //Prompts user to respond 
  // Process the user's response.
  var button = result.getSelectedButton();
  //Where my boi clicked
  var text = result.getResponseText();
  //what my boi put in the text box
  if (button == ui.Button.OK) {
    // User clicked "OK".
    ui.alert('Your filename is ' + text + '!');
    //sends alert to user of what will be entered in cell D6
    var files = DriveApp.getFilesByName(text);
    var file = files.next();
    var cell = sheet.getRange(4,6);
    // gets cell D6
    var fileurl = file.getUrl()
    cell.setValue('=HYPERLINK("'+fileurl+'","'+ text+'")');
    // sets D6 to value in textbox
  } else if (button == ui.Button.CANCEL) {
    // User clicked "Cancel".
    ui.alert('I didn\'t get your name.');
  } else if (button == ui.Button.CLOSE) {
    // User clicked X in the title bar.
    ui.alert('You closed the dialog.');
  }
}

// code.gs

// See: https://developers.google.com/picker/


/**
 * Displays an HTML-service dialog in Google Sheets that contains client-side
 * JavaScript code for the Google Picker API.
 */
function showPicker() {
  var html = HtmlService.createHtmlOutputFromFile('Picker.html')
      .setWidth(600)
      .setHeight(425)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  SpreadsheetApp.getUi().showModalDialog(html, 'Select Folder');
}

function filePickerAdder(theURL) {
  Logger.log("I was clled hedss");
  //FILLS ONE CELL
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  // Get Spreadsheet
   var sheet = ss.getActiveSheet();
   if (sheet.getCurrentCell() == null) { //This probably never gets called because there is always a cell highlighted
    var ui = SpreadsheetApp.getUi();
    ul.alert("Error, you have not selected a cell. Please select a cell.");
    
  }
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var currentRow = sheet.getCurrentCell().getRow();
  var currentColumn = sheet.getCurrentCell().getColumn();
  var totalString = data[currentRow-1][0] + data[currentRow-1][1] + data[0][currentColumn-1];
  sheet.getCurrentCell().setValue('=HYPERLINK("'+theURL+'","'+ totalString+'")');
}

var isDate = SpreadsheetApp.newDataValidation().requireDate().build();

function dropDownCalendar(){ //Double click to set a date from the drop down calendar. Can also type m/d/y
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  sheet.getActiveCell().setDataValidation(isDate); //Will flag an error if not formatted as a valid date
  sheet.getActiveCell().setNumberFormat("MM/dd/yyyy"); // makes format m/dd/yyyy
}
function getOAuthToken() {
  DriveApp.getRootFolder();
  return ScriptApp.getOAuthToken();
}