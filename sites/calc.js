/**********
global vars
**********/

var displayMessage = '';


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
		result = parseInt(resultArray[0]) + parseInt(resultArray[1]);
	} else if (displayMessage.includes('-')) {
		resultArray = displayMessage.split('-');
		result = parseInt(resultArray[0]) - parseInt(resultArray[1]);
	} else if (displayMessage.includes('*')) {
		resultArray = displayMessage.split('*');
		result = parseInt(resultArray[0]) * parseInt(resultArray[1]);
	} else if (displayMessage.includes('/')) {
		resultArray = displayMessage.split('/');
		result = parseInt(resultArray[0]) / parseInt(resultArray[1]);
	} else {
		resultArray = displayMessage.split('%');
		result = parseInt(resultArray[0]) % parseInt(resultArray[1]);
	}

	var elMsg = document.getElementById('answer');
	elMsg.textContent += ' = '+result;
}


/*****************
event listener for 
button clicks:
0-9, ., +, -, /, *, =
******************/

var answerEl = document.getElementById('zero');
answerEl.addEventListener('click', displayZero, false);

var answerEl = document.getElementById('one');
answerEl.addEventListener('click', displayOne, false);

var answerEl = document.getElementById('two');
answerEl.addEventListener('click', displayTwo, false);

var answerEl = document.getElementById('three');
answerEl.addEventListener('click', displayThree, false);

var answerEl = document.getElementById('four');
answerEl.addEventListener('click', displayFour, false);

var answerEl = document.getElementById('five');
answerEl.addEventListener('click', displayFive, false);

var answerEl = document.getElementById('six');
answerEl.addEventListener('click', displaySix, false);

var answerEl = document.getElementById('seven');
answerEl.addEventListener('click', displaySeven, false);

var answerEl = document.getElementById('eight');
answerEl.addEventListener('click', displayEight, false);

var answerEl = document.getElementById('nine');
answerEl.addEventListener('click', displayNine, false);

var answerEl = document.getElementById('decimal');
answerEl.addEventListener('click', displayDecimal, false);

var answerEl = document.getElementById('modulus');
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
