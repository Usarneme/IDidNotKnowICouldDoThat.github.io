// The working madlib (with the parts of speech)
var madlib_pos = [];
// To hold the json data containing the madlibs, the part of speech, and current user input word
var json = "";
var pos = "";
var currentWord = "";
var theHtml = '';

// @param xmlhrAddress : The url of the requested data file (assumed to be json)
// returns data as an object
function getRawData(xmlhrAddress) {
	var client = new XMLHttpRequest();
	client.open('GET', xmlhrAddress, false);
// Async code
//	client.onreadystatechange = function() {
//		json = JSON.parse(client.responseText);
//	}
	client.send();
	// Sync code
	console.log('111');
	return JSON.parse(client.responseText);
}

// Gets a random passage selected from an array passed as a parameter.
// Returns the passage as a string.
function getRandomPassage(inputArray) {
	var rand = Math.floor((Math.random() * inputArray.passages.length));
	console.log('222');
	return inputArray.passages[rand];
}

// Finds the next instance of a keyword identified by {{}} bracket enclosure
// Returns the keyword within the {{}} brackets
function getPartOfSpeech(passage) {
	// find the index of the opening {
	var begin = passage.indexOf('{');
	// find the index of the next } +2 to include the ending curly braces
	var end = (passage.indexOf('}') + 2);
	// remove the hidden class to show the part of speech question
//	document.getElementById('queries').className = "";
	// return the substring
	console.log( 'Exit getPOS returning: ' + passage.substring(begin+2, end-2) );
	return passage.substring(begin+2, end-2);
};

// Split the passage string into an array of words
function splitPassageIntoArray(passage) {
	var wordArray = passage.split(' ');
	console.log(wordArray);
	return wordArray;
}

// Pull out all the {{keys}} and build a form with text input for each
function buildQueryForm(passage) {
	var wordArray = splitPassageIntoArray(passage);
	wordArray.forEach( testForKey );
	// Write the html to the document
	document.getElementById('inputForm').innerHTML += theHtml;
	// Un-hide the submit button
	document.getElementById('submitButton').className = 'vidible';
};

function testForKey(value, index, array) {
		// If the first character is a bracket
		if (value.substring(0, 1) === '{') {
			var cleanValue = '';
			var noBracketValue = value.substring(2, (value.length-2));
			if (noBracketValue.indexOf('_') != -1) {
				cleanValue = noBracketValue.replace('_', ' ');
			} else {
				cleanValue = noBracketValue
				}
			// A noun, an adverb, etc.
			if (value.substring(2, 3) === 'a') {
				// Update html with the word without the brackets
				theHtml += 'Please enter an ' + cleanValue + ' ';
			} else {
				theHtml += 'Please enter a ' + cleanValue + ' ';
			} //end of else
			theHtml += '<input type="text" id="' + noBracketValue + '">' + '<br />';
		} //end of if starts with bracket
		else {} // do nothing as the selected word is not a key
}

// This function replaces the part of speech {{key}} with the word supplied by the user
function updateMadlib(pos, currentWord) {
	// Build the part of speech up to the key so it matches for replacement
	// i.e.: pos = noun => {{noun}}
	var posWithBrackets = "{{" + pos + "}}";
	// Take the answer submitted by the user and replace the word in the array with it
	madlib_pos = madlib_pos.replace(posWithBrackets, currentWord);
	// Testing log
	console.log(pos + " replaced with " + currentWord);
};

function showResult() {
	// Hide the user input form
	document.getElementById('queries').className = 'hidden';
	// Set the content of	madlib_holder to the finished madlib
	document.getElementById('madlib_holder').textContent = madlib_pos;
	// Remove the hidden class from the madlib_holder div
	document.getElementById('madlib_holder').className = 'visible';

	console.log('showResult completed');

};

// Event handlers
document.getElementById('resetButton').addEventListener('click', function(e) {
		startNewGame();
});

document.getElementById('submitButton').addEventListener('click', function(e) {
//	e.preventDefault();
//	e.stopPropagation();
console.log('Submit button clicked.');
	// Get values from all of the items in the form element
	var formChildren = document.getElementById('inputForm').children;
	for (i=0; i<formChildren.length; i++) {
		var userText = formChildren[i].value;
		pos = formChildren[i].id;
		console.log(i + ' formChild is: ' + formChildren[i].value + ' with id: ' + formChildren[i].id);
		// If the input is valid...
		if (userText != undefined) {
			// Replace the part of speech in the madlib_pos array with the user's word from above
			updateMadlib(pos, userText);
		} else { } //do nothing as the userText is invalid
	} // end of for loop
	console.log('End of submit button click actions, now displaying completed madlib');
	showResult();
});

function startNewGame() {
	// Reset game elements to blank
	madlib_pos = '';
	document.getElementById('madlib_holder').className = 'hidden';
	document.getElementById('madlib_holder').innerHTML = '';
	// Remove all the inputs generated in previous madlib games from the queries div
	var myNode = document.getElementById("inputForm");
	while (myNode.firstChild) {
	    myNode.removeChild(myNode.firstChild);
	}
	theHtml = '';
	// Make the queries div visible on screen
	document.getElementById('queries').className = 'visible';
	// Get the data from the url, returned as an Object
	var rawDataObject = getRawData('https://raw.githubusercontent.com/IDidNotKnowICouldDoThat/IDidNotKnowICouldDoThat.github.io/master/sites/med_mad/book2.json');
	// Pick a random passage from the raw data, assign it to the working / in-game array
	madlib_pos = getRandomPassage(rawDataObject);
	// Build up an html form for the user to input the words correlated to the parts of speech needed in the madlib_pos string
	buildQueryForm(madlib_pos);
}
