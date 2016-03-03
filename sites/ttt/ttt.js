// Variable to track whose turn it is
var currentPlayer = 'x';

function updateSquare(e) { 
	var element = document.getElementById(e.target.id);
	if (e.target.id == 'gameBoard') { //do nothing 
	} else {
		if (currentPlayer == 'x') {
			element.firstChild.innerHTML = 'x';
			element.className = "btn btn-default col-xs-4 disabled";
			document.getElementById('x').className = "col-xs-1 col-xs-offset-5";
			document.getElementById('o').className = "col-xs-1 selected";
		} else {
			element.firstChild.innerHTML = 'o';
			element.className = "btn btn-default col-xs-4 disabled";
			document.getElementById('x').className = "col-xs-1 col-xs-offset-5 selected";
			document.getElementById('o').className = "col-xs-1";
		}
	}
	checkForWin(currentPlayer);
	checkIfBoardIsFull();
	changeTurn();
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
	for (i=1; i<10; i++) { 
		if (document.getElementById(i).firstChild.innerHTML != '') { 
			counter++;
		} else { }
	}
	if (counter >= 9) { 
		displayLoss();
		return;
	}
} // end of check if board is full function

function checkForWin(currPlayer) { 
	// look for diagonal win
	if ( 
	(document.getElementById('1').firstChild.innerHTML == currPlayer) &&
	(document.getElementById('5').firstChild.innerHTML == currPlayer) &&
	(document.getElementById('9').firstChild.innerHTML == currPlayer) 
	) 
	{
		document.getElementById('1').style.background = '#7cff00';
		document.getElementById('5').style.background = '#7cff00';
		document.getElementById('9').style.background = '#7cff00';
		displaySuccess();
		return;
	} else {}

	if ( 
	(document.getElementById('3').firstChild.innerHTML == currPlayer) &&
	(document.getElementById('5').firstChild.innerHTML == currPlayer) &&
	(document.getElementById('7').firstChild.innerHTML == currPlayer) 
	) 
	{
		document.getElementById('3').style.background = '#7cff00';
		document.getElementById('5').style.background = '#7cff00';
		document.getElementById('7').style.background = '#7cff00';
		displaySuccess();
		return;
	} else {}

	// look for horizontal win
	if ( 
	(document.getElementById('1').firstChild.innerHTML == currPlayer) &&
	(document.getElementById('2').firstChild.innerHTML == currPlayer) &&
	(document.getElementById('3').firstChild.innerHTML == currPlayer) 
	) 
	{
		document.getElementById('1').style.background = '#7cff00';
		document.getElementById('2').style.background = '#7cff00';
		document.getElementById('3').style.background = '#7cff00';
		displaySuccess();
		return;
	} else {}

	if ( 
	(document.getElementById('4').firstChild.innerHTML == currPlayer) &&
	(document.getElementById('5').firstChild.innerHTML == currPlayer) &&
	(document.getElementById('6').firstChild.innerHTML == currPlayer) 
	) 
	{
		document.getElementById('4').style.background = '#7cff00';
		document.getElementById('5').style.background = '#7cff00';
		document.getElementById('6').style.background = '#7cff00';
		displaySuccess();
		return;
	} else {}

	if ( 
	(document.getElementById('7').firstChild.innerHTML == currPlayer) &&
	(document.getElementById('8').firstChild.innerHTML == currPlayer) &&
	(document.getElementById('9').firstChild.innerHTML == currPlayer) 
	) 
	{
		document.getElementById('7').style.background = '#7cff00';
		document.getElementById('8').style.background = '#7cff00';
		document.getElementById('9').style.background = '#7cff00';
		displaySuccess();
		return;
	} else {}

	// look for vertical win 
	if ( 
	(document.getElementById('1').firstChild.innerHTML == currPlayer) &&
	(document.getElementById('4').firstChild.innerHTML == currPlayer) &&
	(document.getElementById('7').firstChild.innerHTML == currPlayer) 
	) 
	{
		document.getElementById('1').style.background = '#7cff00';
		document.getElementById('4').style.background = '#7cff00';
		document.getElementById('7').style.background = '#7cff00';
		displaySuccess();
		return;
	} else {}

	if ( 
	(document.getElementById('2').firstChild.innerHTML == currPlayer) &&
	(document.getElementById('5').firstChild.innerHTML == currPlayer) &&
	(document.getElementById('8').firstChild.innerHTML == currPlayer) 
	) 
	{
		document.getElementById('2').style.background = '#7cff00';
		document.getElementById('5').style.background = '#7cff00';
		document.getElementById('8').style.background = '#7cff00';
		displaySuccess();
		return;
	} else {}

	if ( 
	(document.getElementById('3').firstChild.innerHTML == currPlayer) &&
	(document.getElementById('6').firstChild.innerHTML == currPlayer) &&
	(document.getElementById('9').firstChild.innerHTML == currPlayer) 
	) 
	{
		document.getElementById('9').style.background = '#7cff00';
		document.getElementById('6').style.background = '#7cff00';
		document.getElementById('3').style.background = '#7cff00';
		displaySuccess();
		return;
	} else {}
} // end of checkForWin function

function displaySuccess() { 
	if (document.getElementById('victory').className != "hidden") {
		// do nothing since victory was previously achieved in this game
	} else {
		var theElement = document.getElementById('victory');
		theElement.innerHTML = currentPlayer.toUpperCase() + " has won! Great job, " + currentPlayer.toUpperCase() + "!";
		theElement.className = "jumbotron success";

		var resetWin = document.getElementById('resetWin');
		resetWin.className = "btn btn-default reset";
		resetWin.addEventListener('click', function(e) { 
			location.reload(false);
		}); // end of event listener
	} // end of else
} // end of displaySuccess function

function displayLoss() { 
	if (document.getElementById('victory').className != "hidden") {
		// do nothing since victory was achieved with a full game board
	} else {
		var theElement = document.getElementById('loss');
		theElement.innerHTML = "Nobody has won.";
		theElement.className = "jumbotron success";

		var resetLoss = document.getElementById('resetLoss');
		resetLoss.className = "btn btn-default reset";
		resetLoss.addEventListener('click', function(e) { 
			location.reload(false);
		});
	}
} // end of displayLoss function

$(document).ready(function() {
	document.getElementById('gameBoard').addEventListener('click', function(e) { 
		updateSquare(e);
	}); 

}); // end of document.ready