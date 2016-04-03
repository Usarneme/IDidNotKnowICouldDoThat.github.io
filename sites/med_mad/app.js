var workingMadlib = ''; // working madlib
var theHtml = ''; // holder for html to be inserted into the dom

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
}; //end of getRawData

// Gets a random passage selected from an array of passages passed as a parameter.
// Returns the passage as a string.
function getRandomPassage(inputArray) {
	var rand = Math.floor((Math.random() * inputArray.length));
	return inputArray[rand];
};

// Gets the next instance of a part of speech keyword identified by {{}} bracket enclosure
// Returns the keyword within the {{}} brackets
function getPartOfSpeech(passage) {
	// find the index of the opening {
	var begin = passage.indexOf('{');
	// find the index of the next } +2 to include the ending curly braces }}
	var end = (passage.indexOf('}') + 2);
	// return the substring
	return passage.substring(begin+2, end-2);
};

// Gets all the {{keys}} and builds a form with text input for each part of speech key
function buildQueryForm(passage) {
	var wordArray = passage.split(' ');
	wordArray.forEach( testForKey );
	// Write the html to the document
	document.getElementById('inputForm').innerHTML += theHtml;
	// Un-hide the submit button
	document.getElementById('submitButton').className = 'visible';
};

// Determines if the input value is a part of speech {{keyword}}
// and if it is this updates theHtml with inputs for the user to enter their word
function testForKey(value, index, array) {
		// If the first character is a bracket
		if (value.substring(0, 1) === '{') {
			var cleanValue = '';
			var noBracketValue = value.substring(2, (value.length-2));
			if (noBracketValue.indexOf('_') != -1) {
				cleanValue = noBracketValue.replace('_', ' ');
			} else {
				cleanValue = noBracketValue;
				}
			// A noun, an adverb, etc.
			if (value.substring(2, 3) === 'a') {
				// Update html with the word without the brackets
				theHtml += ('Please enter an ' + cleanValue + ' ' + '<input type="text" id="' + noBracketValue + '">' + '<br />');
			} else {
				theHtml += ('Please enter a ' + cleanValue + ' ' + '<input type="text" id="' + noBracketValue + '">' + '<br />');
			} //end of else
		} //end of if starts with bracket
		else { // do nothing as the selected word is not a key
    }
};

// Replaces the part of speech {{key}} with the word supplied by the user
function replaceWord(partOfSpeech, userText) {
	// Build the part of speech up to the key so it matches for replacement
	// i.e.: partOfSpeech = noun => {{noun}}
	var partOfSpeechWithBrackets = "{{" + partOfSpeech + "}}";
	// Take the answer submitted by the user and replace the word in the array with it
	workingMadlib = workingMadlib.replace(partOfSpeechWithBrackets, userText);
};

// Shows the completed madlib
function renderMadlib() {
	// Hide the user input form
	document.getElementById('queries').className = 'hidden';
	// Set the content of	madlib_holder to the finished madlib
	document.getElementById('madlib_holder').textContent = workingMadlib;
	// Remove the hidden class from the madlib_holder div
	document.getElementById('madlib_holder').className = 'visible';
};

// Starts a new game
function startNewGame() {
	// Reset game elements to blank
  workingMadlib = '';
  theHtml = '';

	document.getElementById('madlib_holder').className = 'hidden';
	document.getElementById('madlib_holder').innerHTML = '';
	// Remove all the inputs generated in previous madlib games from the queries div
	var myNode = document.getElementById("inputForm");
	while (myNode.firstChild) {
	    myNode.removeChild(myNode.firstChild);
	}
	// Make the queries div visible on screen
	document.getElementById('queries').className = 'visible';
	// Get the data from the url, returned as a Promise
	getRawData('https://raw.githubusercontent.com/IDidNotKnowICouldDoThat/IDidNotKnowICouldDoThat.github.io/master/sites/med_mad/book2.json')
	.then(function(response) {
    // Once data is available, set the workingMadlib to a random passage from the passages Array
		workingMadlib = getRandomPassage(response.passages);
    // build the html form asking the user for keywords from the workingmadlib
		buildQueryForm(workingMadlib);
	});
};

/* Event Handlers */

// New game button starts a new game
document.getElementById('newGameButton').addEventListener('click', function(e) {
		startNewGame();
});

// Submit button updates the madlib with the information provided by the user and displays it on screen
document.getElementById('submitButton').addEventListener('click', function(e) {
	// Get values from all of the items in the form element
	var formChildren = document.getElementById('inputForm').children;
	for (i=0; i<formChildren.length; i++) {
		var userText = formChildren[i].value;
		var partOfSpeech = formChildren[i].id;
		// If the input is valid...
		if (userText != undefined) {
			// Replace the part of speech in the workingMadlib array with the user's word from above
			replaceWord(partOfSpeech, userText);
		} else { } //do nothing as the userText is invalid
	} // end of for loop
	renderMadlib();
});
