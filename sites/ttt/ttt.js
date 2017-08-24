// Variable to track whose turn it is
var currentPlayer = 'x';

function updateSquare(e) { 
	var element = document.getElementById(e.target.id);
	// if the Gameboard (not a button on the board) is clicked...
	if (e.target.id == 'gameBoard') { 
		// ...do nothing 
	// if the button clicked is already disabled
	} else if ( element.classList.toString().indexOf('disabled') != -1 ) {
		// ...do nothing
	} else {
		if (currentPlayer == 'x') {
			element.innerHTML = 'x';
			element.className = "btn btn-default col-xs-4 disabled";
			element.disabled = true;
			document.getElementById('x').className = "col-xs-1 col-xs-offset-5";
			document.getElementById('o').className = "col-xs-1 selected";
		} else {
			element.innerHTML = 'o';
			element.className = "btn btn-default col-xs-4 disabled";
			element.disabled = true;
			document.getElementById('x').className = "col-xs-1 col-xs-offset-5 selected";
			document.getElementById('o').className = "col-xs-1";
		}
	}
	if ( checkForWin(currentPlayer) ) {
		//someone has won
		return;
	} else {
		checkIfBoardIsFull();
		changeTurn();	
	}
} // end of updateSquare function

function changeTurn() {
	if (currentPlayer === 'x') { 
		currentPlayer = 'o';
	} else { 
		currentPlayer = 'x';
	}
} // end of changeTurn function

function checkIfBoardIsFull() { 
	var counter = 0;
	for (var i=1; i<10; i++) { 
		if (document.getElementById(i).innerHTML != '') { 
			counter++;
		} else { }
	}
	if (counter >= 9) { 
		displayLoss();
		return;
	}
} // end of check if board is full function

// You can wind diagonally two ways, vertically three ways, and horizontally three ways (8 total)
function checkForWin(currPlayer) { 
	// look for diagonal win
	if ( 
	(document.getElementById('1').innerHTML == currPlayer) &&
	(document.getElementById('5').innerHTML == currPlayer) &&
	(document.getElementById('9').innerHTML == currPlayer) 
	) 
	{
		document.getElementById('1').style.background = '#7cff00';
		document.getElementById('5').style.background = '#7cff00';
		document.getElementById('9').style.background = '#7cff00';
		displaySuccess();
		return true;
	} 
	if ( 
	(document.getElementById('3').innerHTML == currPlayer) &&
	(document.getElementById('5').innerHTML == currPlayer) &&
	(document.getElementById('7').innerHTML == currPlayer) 
	) 
	{
		document.getElementById('3').style.background = '#7cff00';
		document.getElementById('5').style.background = '#7cff00';
		document.getElementById('7').style.background = '#7cff00';
		displaySuccess();
		return true;
	} 
	// look for horizontal win
	if ( 
	(document.getElementById('1').innerHTML == currPlayer) &&
	(document.getElementById('2').innerHTML == currPlayer) &&
	(document.getElementById('3').innerHTML == currPlayer) 
	) 
	{
		document.getElementById('1').style.background = '#7cff00';
		document.getElementById('2').style.background = '#7cff00';
		document.getElementById('3').style.background = '#7cff00';
		displaySuccess();
		return true;
	} 
	if ( 
	(document.getElementById('4').innerHTML == currPlayer) &&
	(document.getElementById('5').innerHTML == currPlayer) &&
	(document.getElementById('6').innerHTML == currPlayer) 
	) 
	{
		document.getElementById('4').style.background = '#7cff00';
		document.getElementById('5').style.background = '#7cff00';
		document.getElementById('6').style.background = '#7cff00';
		displaySuccess();
		return true;
	} 
	if ( 
	(document.getElementById('7').innerHTML == currPlayer) &&
	(document.getElementById('8').innerHTML == currPlayer) &&
	(document.getElementById('9').innerHTML == currPlayer) 
	) 
	{
		document.getElementById('7').style.background = '#7cff00';
		document.getElementById('8').style.background = '#7cff00';
		document.getElementById('9').style.background = '#7cff00';
		displaySuccess();
		return true;
	} 
	// look for vertical win 
	if ( 
	(document.getElementById('1').innerHTML == currPlayer) &&
	(document.getElementById('4').innerHTML == currPlayer) &&
	(document.getElementById('7').innerHTML == currPlayer) 
	) 
	{
		document.getElementById('1').style.background = '#7cff00';
		document.getElementById('4').style.background = '#7cff00';
		document.getElementById('7').style.background = '#7cff00';
		displaySuccess();
		return true;
	}
	if ( 
	(document.getElementById('2').innerHTML == currPlayer) &&
	(document.getElementById('5').innerHTML == currPlayer) &&
	(document.getElementById('8').innerHTML == currPlayer) 
	) 
	{
		document.getElementById('2').style.background = '#7cff00';
		document.getElementById('5').style.background = '#7cff00';
		document.getElementById('8').style.background = '#7cff00';
		displaySuccess();
		return true;
	} 
	if ( 
	(document.getElementById('3').innerHTML == currPlayer) &&
	(document.getElementById('6').innerHTML == currPlayer) &&
	(document.getElementById('9').innerHTML == currPlayer) 
	) 
	{
		document.getElementById('9').style.background = '#7cff00';
		document.getElementById('6').style.background = '#7cff00';
		document.getElementById('3').style.background = '#7cff00';
		displaySuccess();
		return true;
	} 
	// no winner was found
	return false;
} // end of checkForWin function

function displaySuccess() { 
	// If the victory div is displayed
	if (document.getElementById('victory').className != "hidden") {
		// do nothing as the game was won previously
	} else {
		var theElement = document.getElementById('victory');
		theElement.innerHTML = '<p>'+currentPlayer.toUpperCase() + " has won! Great job, " + currentPlayer.toUpperCase() + "!"+'</p>';
		theElement.className = "jumbotron success";

		var resetWin = document.getElementById('resetWin');
		theElement.appendChild(resetWin);
		resetWin.className = "btn btn-default reset";

		// Disabled all of the remaining squares in the gameboard
		var buttons = document.getElementById('gameBoard').children;
		for (var i=0; i<buttons.length; i++) {
			buttons[i].disabled = true;
		}

		resetWin.addEventListener('click', function(e) { 
			// TODO Reset values without reloading the page
			location.reload(false);
		}); // end of event listener
	} // end of else
} // end of displaySuccess function

function displayLoss() { 
	var theElement = document.getElementById('loss');
	theElement.innerHTML = "<p>Nobody has won.</p>";
	theElement.className = "jumbotron success";

	var resetLoss = document.getElementById('resetLoss');
	theElement.appendChild(resetLoss);
	resetLoss.className = "btn btn-default reset";

	resetLoss.addEventListener('click', function(e) { 
		// TODO recode reload
		location.reload(false);
	});
} // end of displayLoss function

$(document).ready(function() {
	document.getElementById('gameBoard').addEventListener('click', function(e) { 
		updateSquare(e);
	}); 

}); // end of document.ready