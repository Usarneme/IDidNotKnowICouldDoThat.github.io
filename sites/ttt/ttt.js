// Variable to track whose turn it is
var currentPlayer = 'x';

function changeTurn() {
	if (currentPlayer === 'x') { 
		currentPlayer = 'o';
	} else { 
		currentPlayer = 'x';
	}
} // end of changeTurn function

function updateSquare(e) { 
	var element = document.getElementById(e.target.id);
	if (e.target.id == 'gameBoard') { //do nothing 
	} else {
		if (currentPlayer === 'x') {
			element.firstChild.innerHTML = 'x';
			element.className = "btn btn-default col-xs-4 disabled";
			document.getElementById('x').className = "btn btn-default col-xs-3 col-xs-offset-3";
			document.getElementById('o').className = "btn btn-default col-xs-3 selected";
		} else {
			element.firstChild.innerHTML = 'o';
			element.className = "btn btn-default col-xs-4 disabled";
			document.getElementById('x').className = "btn btn-default col-xs-3 col-xs-offset-3 selected";
			document.getElementById('o').className = "btn btn-default col-xs-3";
		}
	}
	checkForWin(currentPlayer);
	checkIfBoardIsFull();
	changeTurn();
} // end of updateSquare function

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
	if ( (document.getElementById('1').firstChild.innerHTML &
	document.getElementById('5').firstChild.innerHTML &
	document.getElementById('9').firstChild.innerHTML) == currPlayer ) 
	{ 
		displaySuccess();
		return;
	} else {}

	if ( (document.getElementById('3').firstChild.innerHTML &
	document.getElementById('5').firstChild.innerHTML &
	document.getElementById('7').firstChild.innerHTML) == currPlayer ) 
	{ 
		displaySuccess();
		return;
	} else {}

	// look for horizontal win
	if ( (document.getElementById('1').firstChild.innerHTML &
	document.getElementById('2').firstChild.innerHTML &
	document.getElementById('3').firstChild.innerHTML) == currPlayer ) 
	{ 
		displaySuccess();
		return;
	} else {}

	if ( (document.getElementById('4').firstChild.innerHTML &
	document.getElementById('5').firstChild.innerHTML &
	document.getElementById('6').firstChild.innerHTML) == currPlayer )
	{ 
		displaySuccess();
		return;
	} else {}

	if ( (document.getElementById('7').firstChild.innerHTML &
	document.getElementById('8').firstChild.innerHTML &
	document.getElementById('9').firstChild.innerHTML) == currPlayer )
	{ 
		displaySuccess();
		return;
	} else {}

	// look for vertical win 
	if ( (document.getElementById('1').firstChild.innerHTML &
	document.getElementById('4').firstChild.innerHTML &
	document.getElementById('7').firstChild.innerHTML) == currPlayer ) 
	{ 
		displaySuccess();
		return;
	} else {}

	if ( (document.getElementById('2').firstChild.innerHTML &
	document.getElementById('5').firstChild.innerHTML &
	document.getElementById('8').firstChild.innerHTML) == currPlayer ) 
	{ 
		displaySuccess();
		return;
	} else {}

	if ( (document.getElementById('3').firstChild.innerHTML &
	document.getElementById('6').firstChild.innerHTML &
	document.getElementById('9').firstChild.innerHTML) == currPlayer )
 	{ 
		displaySuccess();
		return;
	} else {}
} // end of checkForWin function

function displaySuccess() { 
	var theElement = document.getElementById('victory');
	theElement.innerHTML += "<p>" + currentPlayer.toUpperCase() + " has won! Great job, " + currentPlayer.toUpperCase() + "!</p>";
	theElement.className = "success";
} // end of displaySuccess function

function displayLoss() { 
	var theElement = document.getElementById('loss');
	theElement.innerHTML += "<p>Nobody has won.</p>";
	theElement.className = "success";
} // end of displayLoss function

$(document).ready(function() {

	document.getElementById('x').addEventListener('click', function(e) {
		document.getElementById('o').className = "btn btn-default col-xs-3";
		document.getElementById('x').className = "btn btn-default col-xs-3 col-xs-offset-3 selected";
		changeTurn();
	}); 

	document.getElementById('o').addEventListener('click', function(e) {
		document.getElementById('x').className = "btn btn-default col-xs-3 col-xs-offset-3";
		document.getElementById('o').className = "btn btn-default col-xs-3 selected";
		changeTurn();
	}); 

	document.getElementById('gameBoard').addEventListener('click', function(e) { 
		if (e.target.id == 'gameBoard') { 
			// do nothing
		} else { 
		updateSquare(e);
		}
	}); 

	document.getElementById('resetWin').addEventListener('click', function(e) { 
		location.reload(); 
	});

	document.getElementById('resetLoss').addEventListener('click', function(e) { 
		location.reload();
	});

}); // end of document.ready