/**********
global vars
**********/

var displayMessage = '';
var sigFig = 2;
var numpad = document.getElementById('numpad');

/***********
functions to
update the
display
***********/

function displayZero() {
	displayMessage += 0;
	var elMsg = document.getElementById('answer');
	elMsg.textContent = displayMessage;
}
function displayOne() {
	displayMessage += 1;
	var elMsg = document.getElementById('answer');
	elMsg.textContent = displayMessage;
}
function displayTwo() {
	displayMessage += 2;
	var elMsg = document.getElementById('answer');
	elMsg.textContent = displayMessage;
}
function displayThree() {
	displayMessage += 3;
	var elMsg = document.getElementById('answer');
	elMsg.textContent = displayMessage;
}
function displayFour() {
	displayMessage += 4;
	var elMsg = document.getElementById('answer');
	elMsg.textContent = displayMessage;
}
function displayFive() {
	displayMessage += 5;
	var elMsg = document.getElementById('answer');
	elMsg.textContent = displayMessage;
}
function displaySix() {
	displayMessage += 6;
	var elMsg = document.getElementById('answer');
	elMsg.textContent = displayMessage;
}
function displaySeven() {
	displayMessage += 7;
	var elMsg = document.getElementById('answer');
	elMsg.textContent = displayMessage;
}
function displayEight() {
	displayMessage += 8;
	var elMsg = document.getElementById('answer');
	elMsg.textContent = displayMessage;
}
function displayNine() {
	displayMessage += 9;
	var elMsg = document.getElementById('answer');
	elMsg.textContent = displayMessage;
}
function displayDecimal() {
	displayMessage += '.';
	var elMsg = document.getElementById('answer');
	elMsg.textContent = displayMessage;
}
function displayModulus() {
	displayMessage += '%';
	var elMsg = document.getElementById('answer');
	elMsg.textContent = displayMessage;
}

function displayAdd() {
	displayMessage += '+';
	var elMsg = document.getElementById('answer');
	elMsg.textContent = displayMessage;
}
function displaySubtract() {
	displayMessage += '-';
	var elMsg = document.getElementById('answer');
	elMsg.textContent = displayMessage;
}
function displayMultiply() {
	displayMessage += '*';
	var elMsg = document.getElementById('answer');
	elMsg.textContent = displayMessage;
}
function displayDivide() {
	displayMessage += '/';
	var elMsg = document.getElementById('answer');
	elMsg.textContent = displayMessage;
}

function displayEquals() {
	var resultArray, result;
	if (displayMessage.includes('+')) {
		resultArray = displayMessage.split('+');
		result = (parseFloat(resultArray[0]) + parseFloat(resultArray[1])).toFixed(sigFig);
	} else if (displayMessage.includes('-')) {
		resultArray = displayMessage.split('-');
		result = (parseFloat(resultArray[0]) - parseFloat(resultArray[1])).toFixed(sigFig);
	} else if (displayMessage.includes('*')) {
		resultArray = displayMessage.split('*');
		result = (parseFloat(resultArray[0]) * parseFloat(resultArray[1])).toFixed(sigFig);
	} else if (displayMessage.includes('/')) {
		resultArray = displayMessage.split('/');
		result = (parseFloat(resultArray[0]) / parseFloat(resultArray[1])).toFixed(sigFig);
	} else {
		resultArray = displayMessage.split('%');
		result = (parseFloat(resultArray[0]) % parseFloat(resultArray[1])).toFixed(sigFig);
	}
	var elMsg = document.getElementById('answer');
	elMsg.textContent += ' = '+result;
}

function displayElement(el) {

    displayMessage += el;

    var elMsg = document.getElementById('answer');
    elMsg.textContent = displayMessage;
}


/*****************
event listener for
button clicks
*****************/

numpad.addEventListener('click', function(event) {

    displayElement(event.target.id)
    event.stopPropagation()

});

var answerEl = document.getElementById('.');
answerEl.addEventListener('click', displayDecimal, false);

var answerEl = document.getElementById('%');
answerEl.addEventListener('click', displayModulus, false);

var answerEl = document.getElementById('add');
answerEl.addEventListener('click', displayAdd, false);

var answerEl = document.getElementById('subtract');
answerEl.addEventListener('click', displaySubtract, false);

var answerEl = document.getElementById('multiply');
answerEl.addEventListener('click', displayMultiply, false);

var answerEl = document.getElementById('divide');
answerEl.addEventListener('click', displayDivide, false);

var answerEl = document.getElementById('equals');
answerEl.addEventListener('click', displayEquals, false);


/**************
clear/backspace
functions and 
event listeners
**************/

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

/***************
Decimal place 
chooser. 
***************/

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
/**********
global vars
**********/

var displayMessage = '';
var sigFig = 2;
var numpad = document.getElementById('numpad');

/***********
functions to
update the
display
***********/

function displayZero() {
	displayMessage += 0;
	var elMsg = document.getElementById('answer');
	elMsg.textContent = displayMessage;
}
function displayOne() {
	displayMessage += 1;
	var elMsg = document.getElementById('answer');
	elMsg.textContent = displayMessage;
}
function displayTwo() {
	displayMessage += 2;
	var elMsg = document.getElementById('answer');
	elMsg.textContent = displayMessage;
}
function displayThree() {
	displayMessage += 3;
	var elMsg = document.getElementById('answer');
	elMsg.textContent = displayMessage;
}
function displayFour() {
	displayMessage += 4;
	var elMsg = document.getElementById('answer');
	elMsg.textContent = displayMessage;
}
function displayFive() {
	displayMessage += 5;
	var elMsg = document.getElementById('answer');
	elMsg.textContent = displayMessage;
}
function displaySix() {
	displayMessage += 6;
	var elMsg = document.getElementById('answer');
	elMsg.textContent = displayMessage;
}
function displaySeven() {
	displayMessage += 7;
	var elMsg = document.getElementById('answer');
	elMsg.textContent = displayMessage;
}
function displayEight() {
	displayMessage += 8;
	var elMsg = document.getElementById('answer');
	elMsg.textContent = displayMessage;
}
function displayNine() {
	displayMessage += 9;
	var elMsg = document.getElementById('answer');
	elMsg.textContent = displayMessage;
}
function displayDecimal() {
	displayMessage += '.';
	var elMsg = document.getElementById('answer');
	elMsg.textContent = displayMessage;
}
function displayModulus() {
	displayMessage += '%';
	var elMsg = document.getElementById('answer');
	elMsg.textContent = displayMessage;
}

function displayAdd() {
	displayMessage += '+';
	var elMsg = document.getElementById('answer');
	elMsg.textContent = displayMessage;
}
function displaySubtract() {
	displayMessage += '-';
	var elMsg = document.getElementById('answer');
	elMsg.textContent = displayMessage;
}
function displayMultiply() {
	displayMessage += '*';
	var elMsg = document.getElementById('answer');
	elMsg.textContent = displayMessage;
}
function displayDivide() {
	displayMessage += '/';
	var elMsg = document.getElementById('answer');
	elMsg.textContent = displayMessage;
}

function displayEquals() {
	var resultArray, result;
	if (displayMessage.includes('+')) {
		resultArray = displayMessage.split('+');
		result = (parseFloat(resultArray[0]) + parseFloat(resultArray[1])).toFixed(sigFig);
	} else if (displayMessage.includes('-')) {
		resultArray = displayMessage.split('-');
		result = (parseFloat(resultArray[0]) - parseFloat(resultArray[1])).toFixed(sigFig);
	} else if (displayMessage.includes('*')) {
		resultArray = displayMessage.split('*');
		result = (parseFloat(resultArray[0]) * parseFloat(resultArray[1])).toFixed(sigFig);
	} else if (displayMessage.includes('/')) {
		resultArray = displayMessage.split('/');
		result = (parseFloat(resultArray[0]) / parseFloat(resultArray[1])).toFixed(sigFig);
	} else {
		resultArray = displayMessage.split('%');
		result = (parseFloat(resultArray[0]) % parseFloat(resultArray[1])).toFixed(sigFig);
	}
	var elMsg = document.getElementById('answer');
	elMsg.textContent += ' = '+result;
}

function displayElement(el) {

    displayMessage += el;

    var elMsg = document.getElementById('answer');
    elMsg.textContent = displayMessage;
}


/*****************
event listener for
button clicks
*****************/

numpad.addEventListener('click', function(event) {

    displayElement(event.target.id)
    event.stopPropagation()

});

var answerEl = document.getElementById('.');
answerEl.addEventListener('click', displayDecimal, false);

var answerEl = document.getElementById('%');
answerEl.addEventListener('click', displayModulus, false);

var answerEl = document.getElementById('add');
answerEl.addEventListener('click', displayAdd, false);

var answerEl = document.getElementById('subtract');
answerEl.addEventListener('click', displaySubtract, false);

var answerEl = document.getElementById('multiply');
answerEl.addEventListener('click', displayMultiply, false);

var answerEl = document.getElementById('divide');
answerEl.addEventListener('click', displayDivide, false);

var answerEl = document.getElementById('equals');
answerEl.addEventListener('click', displayEquals, false);


/**************
clear/backspace
functions and 
event listeners
**************/

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

/***************
Decimal place 
chooser. 
***************/

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
