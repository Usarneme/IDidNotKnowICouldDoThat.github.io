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
	if ( 
	(document.getElementById('1').firstChild.innerHTML == currPlayer) &&
	(document.getElementById('5').firstChild.innerHTML == currPlayer) &&
	(document.getElementById('9').firstChild.innerHTML == currPlayer) 
	) 
	{
		console.log('1-5-9 win by: '+ currentPlayer); 
		displaySuccess();
		return;
	} else {}

	if ( 
	(document.getElementById('3').firstChild.innerHTML == currPlayer) &&
	(document.getElementById('5').firstChild.innerHTML == currPlayer) &&
	(document.getElementById('7').firstChild.innerHTML == currPlayer) 
	) 
	{
		console.log('3-5-7 win by: '+ currentPlayer); 
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
		console.log('1-2-3 win by: '+ currentPlayer); 
		displaySuccess();
		return;
	} else {}

	if ( 
	(document.getElementById('4').firstChild.innerHTML == currPlayer) &&
	(document.getElementById('5').firstChild.innerHTML == currPlayer) &&
	(document.getElementById('6').firstChild.innerHTML == currPlayer) 
	) 
	{
		console.log('4-5-6 win by: '+ currentPlayer); 
		displaySuccess();
		return;
	} else {}

	if ( 
	(document.getElementById('7').firstChild.innerHTML == currPlayer) &&
	(document.getElementById('8').firstChild.innerHTML == currPlayer) &&
	(document.getElementById('9').firstChild.innerHTML == currPlayer) 
	) 
	{
		console.log('7-8-9 win by: '+ currentPlayer); 
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
		console.log('1-4-7 win by: '+ currentPlayer); 
		displaySuccess();
		return;
	} else {}

	if ( 
	(document.getElementById('2').firstChild.innerHTML == currPlayer) &&
	(document.getElementById('5').firstChild.innerHTML == currPlayer) &&
	(document.getElementById('8').firstChild.innerHTML == currPlayer) 
	) 
	{
		console.log('2-5-8 win by: '+ currentPlayer); 
		displaySuccess();
		return;
	} else {}

	if ( 
	(document.getElementById('3').firstChild.innerHTML == currPlayer) &&
	(document.getElementById('6').firstChild.innerHTML == currPlayer) &&
	(document.getElementById('9').firstChild.innerHTML == currPlayer) 
	) 
	{
		console.log('3-6-9 win by: '+ currentPlayer); 
		displaySuccess();
		return;
	} else {}
} // end of checkForWin function

function displaySuccess() { 
	if (document.getElementById('victory').className != "hidden") {
		// do nothing since victory was previously achieved in this game
	} else {
		var theElement = document.getElementById('victory');
		theElement.innerHTML += "<p>" + currentPlayer.toUpperCase() + " has won! Great job, " + currentPlayer.toUpperCase() + "!</p>";
		theElement.className = "success";

		document.getElementById('resetWin').addEventListener('click', function(e) { 
			location.reload(false);
		}); // end of event listener
	} // end of else
} // end of displaySuccess function

function displayLoss() { 
	if (document.getElementById('victory').className != "hidden") {
		// do nothing since victory was achieved with a full game board
	} else {
		var theElement = document.getElementById('loss');
		theElement.innerHTML += "<p>Nobody has won.</p>";
		theElement.className = "success";
		document.getElementById('resetLoss').addEventListener('click', function(e) { 
			location.reload(false);
		});
	}
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

}); // end of document.ready