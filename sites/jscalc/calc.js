/**************
* global vars *
**************/

let displayMessage = ''; // what shows in the result field

/********************************************************
* functions to update the display and calculate answers *
********************************************************/

displayElement = (elementId) => {
	if (elementId == 'equals') {
		displayEquals();
	} else if (elementId == 'clear') {
		clearAll();
	} else if (elementId == 'backspace') {
		backSpace();
	} else if (elementId == 'calculator') {
		// do nothing if the user clicks on part of the screen that is not on a button
	} else {
	    displayMessage += elementId;
	    const elMsg = document.getElementById('answer');
	    elMsg.textContent = displayMessage;
	}
}

clearAll = () => {
	displayMessage = '';
	const elMsg = document.getElementById('answer');
	elMsg.textContent = displayMessage;
}

backSpace = () => {
	displayMessage = displayMessage.substring(0, (displayMessage.length-1));
	const elMsg = document.getElementById('answer');
	elMsg.textContent = displayMessage;
}

displayEquals = () => {
	let resultArray, result; // to contain the left and right side of the operation and result
	if (displayMessage.indexOf('+') != -1) {
		resultArray = displayMessage.split('+');
		result = (parseFloat(resultArray[0]) + parseFloat(resultArray[1]));
	} else if (displayMessage.indexOf('-') != -1) {
		resultArray = displayMessage.split('-');
		result = (parseFloat(resultArray[0]) - parseFloat(resultArray[1]));
	} else if (displayMessage.indexOf('*') != -1) {
		resultArray = displayMessage.split('*');
		result = (parseFloat(resultArray[0]) * parseFloat(resultArray[1]));
	} else if (displayMessage.indexOf('/') != -1) {
		resultArray = displayMessage.split('/');
		result = (parseFloat(resultArray[0]) / parseFloat(resultArray[1]));
	} else {
		resultArray = displayMessage.split('%');
		result = (parseFloat(resultArray[0]) % parseFloat(resultArray[1]));
	}
	const elMsg = document.getElementById('answer');
	elMsg.textContent += ' = '+result;
}

/****************************************
* event listener for button clicks      *
****************************************/

const answerEl = document.getElementById('calculator');
answerEl.addEventListener('click', (event) => {
    displayElement(event.target.id)
    event.stopPropagation()
}, false);
