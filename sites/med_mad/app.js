// to hold the before (with {}s), the parts of speech (in process), and completed madlib
var madlib_raw = [];
var madlib_pos = [];
var madlib_complete = [];
// To hold the json data containing the madlibs
var json = "";

function selectRandomMadlib() {
	var client = new XMLHttpRequest();
	client.open('GET', 'https://raw.githubusercontent.com/IDidNotKnowICouldDoThat/IDidNotKnowICouldDoThat.github.io/master/sites/med_mad/book2.json');
	client.onreadystatechange = function() {
		console.log("Response type: " + client.responseType);
		json = JSON.parse(client.response)
	}
	client.send();

	var rand = Math.floor((Math.random() * json.length));
	var theText = json[rand][(rand+1)];
	document.getElementById('madlib_holder').textContent = theText;
	return theText;
}

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

function updateMadlib(pos, currentWord) {
	var posWithBrackets = "{{" + pos + "}}";
	//take the answer submitted by the user and replace the word in the array with it
	madlib_pos = madlib_pos.replace(posWithBrackets, currentWord);
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
	madlib_pos = selectRandomMadlib();
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
	// Display the resulting madlib_complete
	showResult();
});

/**************************
* The array containing the
* Mad Libs with their parts
* of speech words identified.
***************************/

madlib_raw = "Remember how long thou hast already put off these things, and how often a certain {{noun}} and {{noun}} as it were, having been {{verb}} unto thee by the {{noun}}, thou hast neglected it. It is high time for thee to {{verb}} the true nature both of the {{noun}}, whereof thou art a part; and of that {{noun}} and {{noun}} of the world, from whom, as a channel from the spring, thou thyself didst {{verb}}; and that there is but a certain limit of {{noun}} appointed unto thee, which if thou shalt not make use of to {{verb}} and {{verb}} the many distempers of thy {{noun}}, it will pass away and thou with it, and never after {{verb}}.";
