function onEdit(e) {
  Logger.log(e.range.getA1Notation());
  var dropDown = "DropDownOptions";
  var rangeEdited = e.range; //.getA1Notation() gives String, ex. "A1"
  var downSpreadSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(dropDown);
  //var dataDDSS = downSpreadSheet.getRange(rangeEdited.a1Notation()).getValues();
  Logger.log(downSpreadSheet);
  Logger.log(downSpreadSheet.getRange(rangeEdited.getA1Notation()).getValues());
  //ABOVE LINE PRINTS OUT [RONOY, SARKAR], NEED TO SEPARATE IT BY COMMA AND CHECK IF CELL EDITED IS EQUAL TO ONE OF THOSE (EITHER RONOY OR SARKAR)
  //CHECK DROPDOWN EDITS TO CELL
  //if (downSpreadSheet.getrangeEdited.getA1Notation().getValues() ==  
  
}
  
  
 


function onInstall(){
  createWriteSheet();
}
function onOpen() {
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
      .createMenu('File Options')
      .addItem('Show Prompt', 'showPrompt')
      .addItem('Show Picker', 'showPicker')
      .addToUi();
  SpreadsheetApp.getUi() // dropdown time
      .createMenu('Dropdown Menu Options')
      .addItem('Dropdown Filler', 'addDropDown')
      .addItem('Dropdown Clear', 'clearDropDown')
      .addItem('Dropdown Editer', 'editDropDown')
      .addItem('Dropdown Calendar', 'dropDownCalendar')
      .addToUi();
  SpreadsheetApp.getUi()
      .createMenu('Column Options')
      .addItem('Header Adder', 'addHeader')
      .addToUi();
}
function addColumns(){
  //FILLS ONE CELL
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  // Get Spreadsheet
  var sheet = ss.getActiveSheet();
  sheet.getActiveCell().setValue("Hello");

}
function createWriteSheet() {    
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var newSheet = activeSpreadsheet.insertSheet();
  newSheet.setName("DropDown Options");   
  newSheet.hideSheet();
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
   
function editDropDown(){

   var ss = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var DropDownDatabase=SpreadsheetApp.getActiveSpreadsheet().getSheetByName('DropDown Options')
  var ui = SpreadsheetApp.getUi();
  var activeCell = ss.getCurrentCell();
  
  var options = DropDownDatabase.getRange(2,activeCell.getColumn(),ss.getLastRow(),1).getValue();
  var html = HtmlService.createHtmlOutputFromFile('DowndropTIme')
  ui// Or DocumentApp or SlidesApp or FormApp.
      .showModalDialog(html, 'My custom dialog');
  }
  
function  gatherDropdownOptions(){
Logger.log("yuh");
var ss = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var DropDownDatabase=SpreadsheetApp.getActiveSpreadsheet().getSheetByName('DropDown Options')
  var activeCell = ss.getActiveCell();
  var options = DropDownDatabase.getRange(activeCell.getRow(),activeCell.getColumn()).getValue().toString();
  Logger.log(options);
  return options;
}
  
function Loggingtime(){
Logger.log('object');
}
function addDropDown(){
  var ss = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet(); //actual spreadsheet where all the info is stored
  var DropDownDatabase=SpreadsheetApp.getActiveSpreadsheet().getSheetByName('DropDown Options')
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
    
   //
    
  //var makes = datass.getRange(1, 1, 1, datass.getLastColumn()).getValues();
    
    //var makeIndex = makes[0].indexOf(activeCell.getValue()) + 1;
    
   // if(makeIndex != 0){
       //var validationRange = datass.getRange(3, makeIndex, datass.getLastRow());
  var validationRule = SpreadsheetApp.newDataValidation().requireValueInList(options,true).build();
  ss.getRange(2,activeCell.getColumn(),ss.getLastRow(),1).clearContent().clearDataValidations();
  ss.getRange(2,activeCell.getColumn(),ss.getLastRow(),1).setDataValidation(validationRule);
  Logger.log(text);
  DropDownDatabase.getRange(2,activeCell.getColumn(),ss.getLastRow(),1).setValue(text); //why does this go the whole way down the dropdown
  
   //  }  
      
 // }
  
}
function clearDropDown(){ //NEEDS TO CLEAR COLUMN IN THE DROPDOWN OPTIONS SHEET AS WELL
  var ss = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var activeCell = ss.getCurrentCell();
  ss.getRange(activeCell.getRow(),activeCell.getColumn(),ss.getLastRow(),1).clearContent().clearDataValidations();
  DropDownDatabase.getRange(activeCell.getRow(),activeCell.getColumn(),ss.getLastRow(),1).clear();
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
  formatCol_ToDateTime(); // makes format m/dd/yyyy H:mm:ss
}
function formatCol_ToDateTime() {
  // First select columns of interest (B) and choose
  // Data → Data Validation → Criteria = Date, is valid date.
  // This script then: sets the format to be date and time for the range B2:B
  // after a date is picked in those columns.
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  var sheet = ss.getActiveSheet();
  var c = ss.getActiveCell();
  sheet.getActiveRange().activate();
  sheet.getActiveRangeList().setNumberFormat('M/d/yyyy H:mm:ss');
}



function getOAuthToken() {
  DriveApp.getRootFolder();
  return ScriptApp.getOAuthToken();
}