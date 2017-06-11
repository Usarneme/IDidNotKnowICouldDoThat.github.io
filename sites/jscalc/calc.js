/**************
* global vars *
**************/

var displayMessage = ''; // what shows in the result field
var sigFig = 2; // how many decimal places in the result

/********************************************************
* functions to update the display and calculate answers *
********************************************************/

function displayElement(el) {
	if (el == '=') {
		displayEquals();
	} else if (el == 'clear') {
		clearAll();
	} else if (el == 'backspace') {
		backSpace();
	} else if (el == 'numpad') {
		// do nothing if the user clicks on part of the screen that is not on a button
	} else if (el == 'dec0') {
		sigFig = 0;
	} else if (el == 'dec1') {
		sigFig = 1;
	} else if (el == 'dec2') {
		sigFig = 2;
	} else if (el == 'dec3') {
		sigFig = 3;
	} else if (el == 'dec4') {
		sigFig = 4;
	} else if (el == 'dec5') {
		sigFig = 5;
	} else {
	    displayMessage += el;
	    var elMsg = document.getElementById('answer');
	    elMsg.textContent = displayMessage;
	}
}

function clearAll() {
	displayMessage = '';
	var elMsg = document.getElementById('answer');
	elMsg.textContent = displayMessage;
}

function backSpace() {
	displayMessage = displayMessage.substring(0, (displayMessage.length-1));
	var elMsg = document.getElementById('answer');
	elMsg.textContent = displayMessage;
}

function displayEquals() {
	var resultArray, result; // to contain the left and right side of the operation and result
	if (displayMessage.indexOf('+') != -1) {
		resultArray = displayMessage.split('+');
		result = (parseFloat(resultArray[0]) + parseFloat(resultArray[1])).toFixed(sigFig);
	} else if (displayMessage.indexOf('-') != -1) {
		resultArray = displayMessage.split('-');
		result = (parseFloat(resultArray[0]) - parseFloat(resultArray[1])).toFixed(sigFig);
	} else if (displayMessage.indexOf('*') != -1) {
		resultArray = displayMessage.split('*');
		result = (parseFloat(resultArray[0]) * parseFloat(resultArray[1])).toFixed(sigFig);
	} else if (displayMessage.indexOf('/') != -1) {
		resultArray = displayMessage.split('/');
		result = (parseFloat(resultArray[0]) / parseFloat(resultArray[1])).toFixed(sigFig);
	} else {
		resultArray = displayMessage.split('%');
		result = (parseFloat(resultArray[0]) % parseFloat(resultArray[1])).toFixed(sigFig);
	}
	var elMsg = document.getElementById('answer');
	elMsg.textContent += ' = '+result;
}

/****************************************
* event listener for button clicks      *
****************************************/

var answerEl = document.getElementById('numpad');
answerEl.addEventListener('click', function(event) {

    displayElement(event.target.id)
    event.stopPropagation()

}, false);
