/**************
* global vars *
**************/

let displayMessage = '', // what shows in the result field
	decimalPlaces = 2; // to hold how many decimal places show in the result, default 2

/********************************************************
* functions to update the display and calculate answers *
********************************************************/

displayElement = (elementId) => {
	if (elementId == 'equals') {
		// make the operator and number buttons un-clickable
		disableNumbers();
		disableOperators();
		// update the display with the answer
		displayEquals();
	} else if (elementId == 'clear') {
		// make operator and number buttons clickable
		enableOperators();
		enableNumbers();
		// clear out the display
		clearAll();
	} else if (elementId == 'backspace') {
		backSpace();
	} else if (elementId == '+' || elementId == '-' || elementId == '*' || elementId == '/') {
		// an operator was clicked...
		disableOperators();
		displayMessage += elementId;
	    const elMsg = document.getElementById('answer');
	    elMsg.textContent = displayMessage;
	} else if (elementId == 'calculator' || elementId == 'answer') { 
		// do nothing if the user clicks on part of the screen that is not on a button
	} else { // a number was clicked...
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
	// If the previous character to be deleted is an operator...
	if (displayMessage[displayMessage.length-1] == '+' 
	|| displayMessage[displayMessage.length-1] == '-' 
	|| displayMessage[displayMessage.length-1] == '*' 
	|| displayMessage[displayMessage.length-1] == '/') {
		// re-enable the operators
		enableOperators();
	}
	displayMessage = displayMessage.substring(0, (displayMessage.length-1));
	const elMsg = document.getElementById('answer');
	elMsg.textContent = displayMessage;
}

displayEquals = () => {
	let resultArray, result; // to contain the left and right side of the operation and result
	if (displayMessage.indexOf('+') != -1) {
		resultArray = displayMessage.split('+');
		result = (parseFloat(resultArray[0]) + parseFloat(resultArray[1])).toFixed(decimalPlaces);
	} else if (displayMessage.indexOf('-') != -1) {
		resultArray = displayMessage.split('-');
		result = (parseFloat(resultArray[0]) - parseFloat(resultArray[1])).toFixed(decimalPlaces);
	} else if (displayMessage.indexOf('*') != -1) {
		resultArray = displayMessage.split('*');
		result = (parseFloat(resultArray[0]) * parseFloat(resultArray[1])).toFixed(decimalPlaces);
	} else if (displayMessage.indexOf('/') != -1) {
		resultArray = displayMessage.split('/');
		result = (parseFloat(resultArray[0]) / parseFloat(resultArray[1])).toFixed(decimalPlaces);
	} 
	const elMsg = document.getElementById('answer');
	// the answer field can hold about 19 characters, so limit the result to that
	elMsg.textContent += ' = '+result.toString().substring(0,20);
	document.getElementById('equals').disabled = true;
}

disableOperators = () => {
	const operators = document.querySelectorAll('.operator');
	for(let i=0; i<operators.length; i++) {
		operators[i].disabled = true;
	}
}

enableOperators = () => {
	const operators = document.querySelectorAll('.operator');
	for(let i=0; i<operators.length; i++) {
		operators[i].disabled = false;
	}
	document.getElementById('equals').disabled = false;
}

disableNumbers = () => {
	const numbers = document.querySelectorAll('.num');
	for(let i=0; i<numbers.length; i++) {
		numbers[i].disabled = true;
	}
}

enableNumbers = () => {
	const numbers = document.querySelectorAll('.num');
	for(let i=0; i<numbers.length; i++) {
		numbers[i].disabled = false;
	}
}

/****************************************
* event listeners                       *
****************************************/

const answerEl = document.getElementById('calculator');
answerEl.addEventListener('click', (event) => {
    displayElement(event.target.id),
    event.stopPropagation()
}, false);

const sigFigInput = document.getElementById('sigFigInput'),
	sigFig = document.getElementById('sigFig');
sigFigInput.addEventListener('input', () => {
	sigFig.textContent = sigFigInput.value+' decimal places';
	decimalPlaces = sigFigInput.value;
}, false);