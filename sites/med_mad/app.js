// The working madlib (with the parts of speech), and completed madlib
var madlib_pos = [];
// To hold the json data containing the madlibs
var json = "";

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
	return JSON.parse(client.responseText);
}

// Gets a random passage selected from an array passed as a parameter.
// Returns the passage as a string.
function getRandomPassage(inputArray) {
	var rand = Math.floor((Math.random() * inputArray.passages.length));
	return inputArray.passages[rand];
}

// Finds the next instance of a keyword identified by {{}} bracket enclosure
// Returns the keyword within the {{}} brackets
function getPartOfSpeech() {
	// find the index of the opening {
	var begin = madlib_pos.indexOf('{');
	// find the index of the next } +2 to include the ending curly braces
	var end = (madlib_pos.indexOf('}') + 2);
	// remove the hidden class to show the part of speech question
//	document.getElementById('queries').className = "";
	// return the substring
	return madlib_pos.substring(begin+2, end-2);
};

function queryUserForWord(pos) {
	// Ask the user for a word to replace the part of speech provided
	var userAnswer = prompt("Please input a " + pos + ": ");
	if (userAnswer != null) {
		return userAnswer;
	} else {
		alert("Please answer the question, Dave.");
		queryUserForWord();
	}
};

// This function replaces the part of speech {{key}} with the word supplied by the user
function updateMadlib(pos, currentWord) {
	// Build the part of speech up to the key so it matches for replacement
	// i.e.: pos = noun => {{noun}}
	var posWithBrackets = "{{" + pos + "}}";
	// Take the answer submitted by the user and replace the word in the array with it
	madlib_pos = madlib_pos.replace(posWithBrackets, currentWord);
	// Testing log
	console.log(pos + "replaced with " + currentWord);
};

function showResult() {
	document.getElementById('madlib_holder').textContent = madlib_pos;
	document.getElementById('madlib_holder').className = "";
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

$(document).ready(function() {
	// Get the data from the url, returned as an Object
	var rawDataObject = getRawData('https://raw.githubusercontent.com/IDidNotKnowICouldDoThat/IDidNotKnowICouldDoThat.github.io/master/sites/med_mad/book2.json');
	// Pick a random passage from the raw data, assign it to the working / in-game array
	madlib_pos = getRandomPassage(rawDataObject);
	// while the parts of speech holding madlib contains {{keys}}...
	while (madlib_pos.indexOf('}') != -1) {
		// Pull the next part of speech from the madlib_pos array
		var pos = getPartOfSpeech();
		// Query the user for a word to replace the above-gotten part of speech
		var currentWord = queryUserForWord(pos);
		// Replace the part of speech in the madlib_pos array with the user's word from above
		updateMadlib(pos, currentWord);
		// This repeats until there are no more instances of {{whatever}} in madlib_pos
		// At which point we escape the loop
	}
	// Display the resulting madlib
	showResult();
});
