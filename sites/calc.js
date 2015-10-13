/**************
* global vars *
**************/

var displayMessage = ''; // what shows in the result field
var sigFig = 2; // how many decimal places in the result

/**********************************
* functions to update the display *
**********************************/

function displayElement(el) {
	if (el == '=') {
		displayEquals();
	} else if (el == 'clear') {
		clearAll();
	} else if (el == 'backspace') {
		backspace();
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

var clearEl = document.getElementById('clear');
clearEl.addEventListener('click', clearAll, false);

function backSpace() {
	displayMessage = displayMessage.substring(0, (displayMessage.length-1));
	var elMsg = document.getElementById('answer');
	elMsg.textContent = displayMessage;
}

var backspaceEl = document.getElementById('backspace');
backspaceEl.addEventListener('click', backSpace, false);


function displayEquals() {
	var resultArray, result; // to contain the left and right side of the operation and result
	if (displayMessage.contains('+')) {
		resultArray = displayMessage.split('+');
		result = (parseFloat(resultArray[0]) + parseFloat(resultArray[1])).toFixed(sigFig);
	} else if (displayMessage.contains('-')) {
		resultArray = displayMessage.split('-');
		result = (parseFloat(resultArray[0]) - parseFloat(resultArray[1])).toFixed(sigFig);
	} else if (displayMessage.contains('*')) {
		resultArray = displayMessage.split('*');
		result = (parseFloat(resultArray[0]) * parseFloat(resultArray[1])).toFixed(sigFig);
	} else if (displayMessage.contains('/')) {
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




/*************************
* Decimal place chooser. *
*************************/

function decimalZero() {
	sigFig = 0;
}

var answerEl = document.getElementById('dec0');
answerEl.addEventListener('click', decimalZero, false);

function decimalOne() {
	sigFig = 1;
}

var answerEl = document.getElementById('dec1');
answerEl.addEventListener('click', decimalOne, false);

function decimalTwo() {
	sigFig = 2;
}

var answerEl = document.getElementById('dec2');
answerEl.addEventListener('click', decimalTwo, false);

function decimalThree() {
	sigFig = 3;
}

var answerEl = document.getElementById('dec3');
answerEl.addEventListener('click', decimalThree, false);

function decimalFour() {
	sigFig = 4;
}

var answerEl = document.getElementById('dec4');
answerEl.addEventListener('click', decimalFour, false);

function decimalFive() {
	sigFig = 5;
}

var answerEl = document.getElementById('dec5');
answerEl.addEventListener('click', decimalFive, false);