// The working madlib (with the parts of speech)
var madlib_pos = [];
// To hold the json data containing the madlibs, the part of speech, and current user input word
var json = "";
var pos = "";
var currentWord = "";

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

function queryUserForWord(pos) {
	var theForm = document.getElementById('queries');
	theForm.className = 'visible';
	// A noun, an adverb, etc.
	if (pos.substring(0, 1) === 'a') {
		theForm.innerHTML += 'Please enter an ' + pos;

		console.log('444');

	} else {
		theForm.innerHTML += 'Please enter a ' + pos;

		console.log('555');

	}
}

// Pull out all the {{keys}} and build a form with text input for each
function buildQueryForm(passage) {
	var theHtml = '';
	var wordArray = splitPassageIntoArray(passage);
	wordArray.foreach( testForKey(value, index, array, theHtml) );
	// Write the html to the document
	document.getElementById('inputForm').innerHTML += theHtml;
};

function testForKey(value, index, array, theHtml) {
		// If the first character is a bracker
		if (value.substring(0, 1) === '{') {
			// Then it's a key and should be included in the query form
			theHtml += '<input type="text" id="' + index + '">';
			// A noun, an adverb, etc.
			if (value.substring(2, 3) === 'a') {
				// Update html with the word without the brackets
				theHtml += 'Please enter an ' + value.substring(2, value.length-2);
			} else {
				theForm.innerHTML += 'Please enter a ' + value.substring(2, value.length-2);
			} //end of else
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

/*
// event listener for when a user enters a madlib answer word
document.getElementById('toSubmit').addEventListener('submit', function(e) {
	e.preventDefault();
	e.stopPropagation();
	console.log(e);
	// Get the part of speech from the madlib_pos array AND
	//
//	updateMadlib(getPartOfSpeech(), currentAnswer);
});
*/

// Event handlers
document.getElementById('resetButton').addEventListener('click', function(e) {
		startNewGame();
});

document.getElementById('submitButton').addEventListener('click', function(e) {
//	e.preventDefault();
//	e.stopPropagation();
	var userText = document.getElementById('userText').value;
	console.log('The button was clicked and submitted this word: ' + userText);
	// Replace the part of speech in the madlib_pos array with the user's word from above
	updateMadlib(pos, userText);
});

function startNewGame() {
	// Get the data from the url, returned as an Object
	var rawDataObject = getRawData('https://raw.githubusercontent.com/IDidNotKnowICouldDoThat/IDidNotKnowICouldDoThat.github.io/master/sites/med_mad/book2.json');
	console.log('getRawData completed.');

	// Pick a random passage from the raw data, assign it to the working / in-game array
	madlib_pos = getRandomPassage(rawDataObject);
	console.log('getRandomPassge completed. ');
	var i = 0;
	for (var prop in madlib_pos) {
		i++;
	}
	numberOfKeys = i;

	// Display the resulting madlib
	showResult();
}
