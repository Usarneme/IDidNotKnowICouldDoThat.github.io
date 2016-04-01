var madlib_pos = []; // working madlib
var pos = ''; // part of speech string
var currentWord = ''; // current word input by the user
var theHtml = ''; // the built up html asking questions of the user

/* Mad Lib functions */

// Gets the raw data (assumed to be json) from a specified URL using an async Promise
// @param url : The url of the requested data file (assumed to be json)
// returns data as a Promise resolve object
function getRawData(url) {
      return new Promise(function(resolve, reject) {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url);
          xhr.onreadystatechange = handleResponse;
          xhr.onerror = function(error) { reject(error); };
          xhr.send();

          function handleResponse() {
              if(this.readyState === this.DONE)
                  if(this.status === 200) {
                      resolve(JSON.parse(this.responseText));
                  } else {
                      reject(this.statusText);
                  }
          } //end of handleRequest
      }); //end of return Promise
} //end of getRawData

// Gets a random passage selected from an array of passages passed as a parameter.
// Returns the passage as a string.
function getRandomPassage(inputArray) {
	var rand = Math.floor((Math.random() * inputArray.length));
	return inputArray[rand];
}

// Gets the next instance of a part of speech keyword identified by {{}} bracket enclosure
// Returns the keyword within the {{}} brackets
function getPartOfSpeech(passage) {
	// find the index of the opening {
	var begin = passage.indexOf('{');
	// find the index of the next } +2 to include the ending curly braces }}
	var end = (passage.indexOf('}') + 2);
	// return the substring
	return passage.substring(begin+2, end-2);
}

// Splits the passage string into an array of words
// Returns the array of words
function splitPassageIntoArray(passage) {
	var wordArray = passage.split(' ');
	return wordArray;
}

// Gets all the {{keys}} and builds a form with text input for each part of speech key
function buildQueryForm(passage) {
	var wordArray = splitPassageIntoArray(passage);
	wordArray.forEach( testForKey );
	// Write the html to the document
	document.getElementById('inputForm').innerHTML += theHtml;
	// Un-hide the submit button
	document.getElementById('submitButton').className = 'visible';
}

// Determines if the input value is a part of speech {{keyword}} 
// and if it is it updates theHtml with inputs for the user to enter their word
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

// Replaces the part of speech {{key}} with the word supplied by the user
function updateMadlib(pos, currentWord) {
	// Build the part of speech up to the key so it matches for replacement
	// i.e.: pos = noun => {{noun}}
	var posWithBrackets = "{{" + pos + "}}";
	// Take the answer submitted by the user and replace the word in the array with it
	madlib_pos = madlib_pos.replace(posWithBrackets, currentWord);
}

// Shows the completed madlib
function showResult() {
	// Hide the user input form
	document.getElementById('queries').className = 'hidden';
	// Set the content of	madlib_holder to the finished madlib
	document.getElementById('madlib_holder').textContent = madlib_pos;
	// Remove the hidden class from the madlib_holder div
	document.getElementById('madlib_holder').className = 'visible';
}

// Starts a new game
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
	// Make the queries div visible on screen
	document.getElementById('queries').className = 'visible';
	// Get the data from the url, returned as an Object
	getRawData('https://raw.githubusercontent.com/IDidNotKnowICouldDoThat/IDidNotKnowICouldDoThat.github.io/master/sites/med_mad/book2.json')
	.then(function(response) {
		madlib_pos = getRandomPassage(response.passages);
		buildQueryForm(madlib_pos);
	});
}

/* Event Handlers */
// New game button starts a new game
document.getElementById('resetButton').addEventListener('click', function(e) {
		startNewGame();
});

// Submit button updates the madlib with the information provided by the user and displays it on screen 
document.getElementById('submitButton').addEventListener('click', function(e) {
	// Get values from all of the items in the form element
	var formChildren = document.getElementById('inputForm').children;
	for (i=0; i<formChildren.length; i++) {
		var userText = formChildren[i].value;
		pos = formChildren[i].id;
		// If the input is valid...
		if (userText != undefined) {
			// Replace the part of speech in the madlib_pos array with the user's word from above
			updateMadlib(pos, userText);
		} else { } //do nothing as the userText is invalid
	} // end of for loop
	showResult();
});
