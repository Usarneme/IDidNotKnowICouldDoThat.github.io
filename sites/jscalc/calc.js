/*********************************************
* DOM Element References reused in functions *
*********************************************/

const CALC = document.getElementById('calculator'),
	  RESULTELEMENT = document.getElementById('result'),
  	  SIGFIGELEMENT = document.getElementById('sigFigInput'),
	  SIGFIG = document.getElementById('sigFig');

/*******************
* Global variables *
*******************/

let currentDisplayValues = '', // what shows in the result field
	decimalPlaces = 2; // to hold how many decimal places show in the result, default 2

/********************************************************
* Functions to update the display and calculate results *
********************************************************/

/* ACCESS KEY REFERENCE: 
// ELEMENTS
m				: (m)ain element, calculator
r				: (r)esult element, where the answer displays
s				: significant figure slider (decimal places to display selector)
// BUTTONS
0-9 			: 0-9 
d				: ad(d)
t				: subtrac(t)
y				: multipl(y)
e				: divid(e)
l				: resu(l)t
p				: (p)eriod
b				: (b)ackspace 
c				: (c)lear 
*/

// Handles what happens when different elements on the page are clicked 
handleClick = (element) => {
	// Elements' access keys are used as a numeric element ID (0-9 buttons) requires special
	// escaping (even when string wrapped) to utilize CSS's querySelectorAll function which I 
	// am unable to provide for automated testing tools such as Chrome's PWA Lighthouse Extension
	const elementAccessKey = element.accessKey;
	if (elementAccessKey == 'l') {
		if(currentDisplayValues === '') {
			// do nothing if no numbers have been input yet
		} else {
		// make all buttons but clear un-clickable
		disableButtons(['.num', '.dot', '.equals', '.operator', '.backspace']);
		// determine the operator in use and update the display with the result
		displayResult( determineOperator() );
		}
	} else if (elementAccessKey == 'c') {
		// make all buttons clickable again
		enableButtons(['.num', '.dot', '.equals', '.operator', '.backspace']);
		// clear out the display
		clearAll();
	} else if (elementAccessKey == 'b') {
		backSpace();
	} else if (elementAccessKey == 'd' || elementAccessKey == 't' || elementAccessKey == 'y' || elementAccessKey == 'e') {
		// an operator was clicked: disable operator buttons and enable the dot button
		disableButtons('.operator');
		enableButtons('.dot');
		currentDisplayValues += element.id;
		RESULTELEMENT.textContent = currentDisplayValues;
	} else if (elementAccessKey == 'p') {
		disableButtons('.dot');
	    currentDisplayValues += element.id;
	    RESULTELEMENT.textContent = currentDisplayValues;
	} else if (elementAccessKey == 'calculator' || elementAccessKey == 'result') { 
		// do nothing if the user clicks on part of the screen that is not on a button
	} else { 
		// a number was clicked...
		console.log('Appending '+elementAccessKey+' to currentDisplayValues: '+currentDisplayValues);
	    currentDisplayValues += elementAccessKey;
	    RESULTELEMENT.textContent = currentDisplayValues;
	}
}

// Clears out the display and stored values
clearAll = () => {
	currentDisplayValues = '';
	RESULTELEMENT.textContent = currentDisplayValues;
}

// Deletes the previously entered value
backSpace = () => {
	const previousCharacter = currentDisplayValues[currentDisplayValues.length-1];
	// If the previous character to be deleted is an operator or period
	if (previousCharacter == '+' 
	|| previousCharacter == '-' 
	|| previousCharacter == '*' 
	|| previousCharacter == '/') {
		// re-enable the operator buttons
		enableButtons('.operator');
	}
	// If it was a dot
	if (previousCharacter === '.') {
		// re-enable the dot
		enableButtons('.dot');
	}
	currentDisplayValues = currentDisplayValues.substring(0, (currentDisplayValues.length-1));
	RESULTELEMENT.textContent = currentDisplayValues;
}

// Display the resulting value using the provided operator on the generated operands
displayResult = (operator) => {
	const resultArray = currentDisplayValues.split(operator),	
		  leftOperand = parseFloat(resultArray[0]) || 0,
		  rightOperand = parseFloat(resultArray[1]) || 0;
	let   result; 
	switch (operator) {
		case '+': result = (leftOperand + rightOperand); break;
		case '-': result = (leftOperand - rightOperand); break;
		case '*': result = (leftOperand * rightOperand); break;
		case '/': result = (leftOperand / rightOperand); break;
	}
	// Limit the significant figures
	result = result.toFixed(decimalPlaces);
	// the result field can hold about 19 characters, limit the result to that
	RESULTELEMENT.textContent += ' = '+result.toString().substring(0,20);
}

// Determines and returns as a string the type of operator 
// used in the current expression to be evaluated
determineOperator = () => {
		   if (currentDisplayValues.indexOf('+') != -1) { return '+';
	} else if (currentDisplayValues.indexOf('-') != -1) { return '-';
	} else if (currentDisplayValues.indexOf('*') != -1) { return '*';
	} else if (currentDisplayValues.indexOf('/') != -1) { return '/';
	} 
}

// Disables all button types in the provided list (such as operators +-*/, numbers 0-9, .)
disableButtons = (listOfTypes) => {
	listOfTypes = [listOfTypes];
	for(let i=0; i<listOfTypes.length; i++) {
		const toBeDisabled = document.querySelectorAll(listOfTypes[i]);
		for(let j=0; j<toBeDisabled.length; j++) {
			toBeDisabled[j].disabled = true;
		}
	}
}

// Enables a provided type of buttons to be pressed again
enableButtons = (ofType) => {
	const toBeEnabled = document.querySelectorAll(ofType);
	for(let i=0; i<toBeEnabled.length; i++) {
		toBeEnabled[i].disabled = false;
	}
}

/****************************************
* Event Listeners                       *
****************************************/

CALC.addEventListener('click', (event) => {
	handleClick(event.target),
    event.stopPropagation()
}, false);

SIGFIGELEMENT.addEventListener('input', () => {
	SIGFIG.textContent = SIGFIGELEMENT.value+' decimal places';
	decimalPlaces = SIGFIGELEMENT.value;
}, false);