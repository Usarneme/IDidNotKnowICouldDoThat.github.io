// local storage functionality from the html5 local storage api
// defaults look like:

// localStorage.setItem('key', 'value');

// var keyValue = localStorage.key;    
// sets keyValue to the value stored using the key above

// var items = localStorage.length;

// var jsonFormattedString = jsObject.stringify();
// from JS Object to JSON Format

// var jsObject = jsonFormattedString.parse();
// from JSON Format to JS Object



// Check to see if functionality exists in the browser, tease users who don't support it
if (window.localStorage) {
	var outgoingJSON = $flashcards.stringify();

	for (i=0; i<$flashcards.length; i++) {
		localStorage.setItem($flashcards[i].front, $flashcards[i].back);
	}

	var incomingJSObject;
	for (i=0; i<$flashcards.length; i++) {
		incomingJSObject += { $flashcards[i], localStorage.getItem($flashcards[i]) };
	}
} else {
	document.write("<h1>Why is your browser so old?</h1><br /><p> Get with it, homey.</p>");
}