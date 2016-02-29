// Variable to track whose turn it is
var isXTurn = true;

function changeTurn() {
	if (isXTurn === true) { 
		isXTurn = false;
	} else { 
		isXTurn = true;
	}
} // end of changeTurn function

function updateSquare(e) { 
	var element = document.getElementById(e.target.id);
	if (isXTurn) {
		element.firstChild.innerHTML = 'x';
		element.className = "btn btn-default col-xs-4 disabled";
		changeTurn();
	} else {
		element.firstChild.innerHTML = 'o';
		element.className = "btn btn-default col-xs-4 disabled";
		changeTurn();
	}
} // end of updateSquare function

$(document).ready(function() {

	document.getElementById('x').addEventListener('click', function(e) {
		document.getElementById('o').className = "btn btn-default col-xs-3";
		document.getElementById('x').className = "btn btn-default col-xs-3 col-xs-offset-3 selected";
		isXTurn = true;
	}); 

	document.getElementById('o').addEventListener('click', function(e) {
		document.getElementById('x').className = "btn btn-default col-xs-3 col-xs-offset-3";
		document.getElementById('o').className = "btn btn-default col-xs-3 selected";
		isXTurn = false;
	}); 

	document.getElementById('gameBoard').addEventListener( 'click', function(e) { 
		updateSquare(e);
	}); 

}); // end of document.ready