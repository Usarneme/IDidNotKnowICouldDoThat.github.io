// to hold the before, parts of speech, and after madlibs
var madlib_raw = [];
var madlib_pos = [];
var madlib_complete = [];

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

function updateMadlib(currentQuestion, currentAnswer) {
	//take the answer submitted by the user and replace the word in the array with it
	madlib_pos = madlib_pos.replace(currentQuestion, currentAnswer);
};

function showResult() {
	document.getElementById('madlib_holder').textContent = madlib_raw;
	document.getElementById('madlib_holder').className = "";
};

// event listener for when a user enters a madlib answer word
document.getElementById('toSubmit').addEventListener('submit', function(e) {
	e.preventDefault();
	e.stopPropagation();
	console.log(e);
//	updateMadlib(getPartOfSpeech(), currentAnswer);
});

$(document).ready(function() {
	madlib_pos = madlib_raw;
	// while the parts of speech holding madlib contains {{keys}}...
//	while (madlib_pos.indexOf('}') != -1) {
		// query the user for a part of speech word
		getPartOfSpeech();
//	}
});

/**************************
* The array containing the
* Mad Libs with their parts
* of speech words identified.
***************************/

madlib_raw = "Remember how long thou hast already put off these things, and how often a certain {{noun}} and {{noun}} as it were, having been {{verb}} unto thee by the {{noun}}, thou hast neglected it. It is high time for thee to {{verb}} the true nature both of the {{noun}}, whereof thou art a part; and of that {{noun}} and {{noun}} of the world, from whom, as a channel from the spring, thou thyself didst {{verb}}; and that there is but a certain limit of {{noun}} appointed unto thee, which if thou shalt not make use of to {{verb}} and {{verb}} the many distempers of thy {{noun}}, it will pass away and thou with it, and never after {{verb}}.";
