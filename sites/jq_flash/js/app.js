// Which card in the flashcard array we're looking at currently; default setting is the first/zeroeth card
var selectedCardNumber = 0;
// Tracker variable for whether the front (the question side) is showing.
var frontShowing = true;

function showASideOfTheCard() {
  if (frontShowing) { // If the front of the card is showing...
    // ..then show the front
    document.getElementById('current_card').innerHTML = $flashcards[selectedCardNumber].front;
    frontShowing = true;
  } else { // If the back of the card is showing...
    // ...then show the back
    document.getElementById('current_card').innerHTML = $flashcards[selectedCardNumber].back;
    frontShowing = false;
  }
  // Disable the next and previous buttons if there are no more cards before or after the current card
  isFirstQuestion();
  isLastQuestion();
}

function flipCard() {
  if (frontShowing) {
    frontShowing = false;
    document.getElementById('buckets').className = "row";
  } else {
    frontShowing = true;
    document.getElementById('buckets').className = "row hidden";
  }
  showASideOfTheCard();
}

function isFirstQuestion() {
  // If the current card is the first...
  if (selectedCardNumber <= 0) {
    // Disable the previous card button element
    document.getElementById('previous_card').className = "disabled col-xs-1 col-sm-2 btn";
  } else {
    document.getElementById('previous_card').className = "col-xs-1 col-sm-2 btn";
  }
}

function isLastQuestion() {
  // If the current card is the last...
  if (selectedCardNumber >= ($flashcards.length - 1)) {
    // Disable the next card button element
    document.getElementById('next_card').className = "disabled col-xs-1 col-sm-2 btn";
  } else {
    document.getElementById('next_card').className = "col-xs-1 col-sm-2 btn";
  }
}

function showNextQuestion() {
  // If there are more cards/questions available
  if (!(document.getElementById('next_card').classList[0] == 'disabled')) {
    // Increment the card number up by one
    selectedCardNumber += 1;
  } else {}
  showASideOfTheCard();
}

function showPreviousQuestion() {
  // If there are previous cards/questions available
  if (!(document.getElementById('previous_card').classList[0] == 'disabled')) {
    // Decrement the card number down by one
    selectedCardNumber -= 1;
  } else {}
  showASideOfTheCard();
}

function addNewFlashcard() {
  $flashcards.push({
    front:document.getElementById('inputNewCardFront').value, 
    back:document.getElementById('inputNewCardBack').value
    }); //end of push
    // Reset the form contents 
    document.getElementById('inputNewCardFront').value = '';
    document.getElementById('inputNewCardBack').value = '';
    // Set the selected card number to the pushed/newly added flashcard's index value
    selectedCardNumber = ($flashcards.length - 1);
    // Show the newly added card's question side
    frontShowing = true;
    showASideOfTheCard();
    // Reset the focus to the FrontCard field
    document.getElementById('inputNewCardFront').focus();
}

function addNewFlashcards() {
  console.log('Beginning of addNewFlashcards method');
  var newCardsString = document.getElementById('inputManyNewCards').value;
  // Split into an array by newline
  var pairArray = newCardsString.split(',');
  for (i = 0; i < pairArray.length; i+=2) { 
    $flashcards.push({
      front: pairArray[i],
      back: pairArray[i+1]
    }); // end of push
  } // end of for loop
  // Reset the field contents 
  document.getElementById('inputManyNewCards').value = '';
  // Set the selected card number to the pushed/newly added flashcard's index value
  selectedCardNumber = ($flashcards.length - 1);
  // Show the newly added card's question side
  frontShowing = true;
  showASideOfTheCard();
  // Reset the focus to the FrontCard field
  document.getElementById('inputManyNewCards').focus();
  console.log('End of addNewFlashcards method');
}

$(document).ready(function() {

  // Press the next card button, run the next card function 
  document.getElementById('next_card').addEventListener('click', function(e) {
    showNextQuestion();
  });

  // Press the previous card button, run the previous card function
  document.getElementById('previous_card').addEventListener('click', function(e) {
    showPreviousQuestion();
  });

  // When the current card div is pressed, flip the card
  document.getElementById('current_card').addEventListener('click', function(e) {
    flipCard();
  });

  // When the addCard submit button is pressed, run the addNewFlashcard function
  document.getElementById('addCardSubmitButton').addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    addNewFlashcard();
  }); 

  // When the addManyCards submit button is pressed, run the addNewFlashcards function
  document.getElementById('addManyCardsSubmitButton').addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    addNewFlashcards();
  }); 

  document.getElementById('singleShowing').addEventListener('click', function(e) {
    document.getElementById('singleAdd').className = 'visible';
    document.getElementById('multipleAdd').className = 'hidden';
  });

  document.getElementById('multipleShowing').addEventListener('click', function(e) {
    document.getElementById('multipleAdd').className = 'visible';
    document.getElementById('singleAdd').className = 'hidden';
  });

  // Initially show the front of the first card
  showASideOfTheCard();

}); // End of document.ready



$flashcardsRight = [];

$flashcardsWrong = [];

$flashcards = [ // Array of flashcard objects each with a front and back
  { 
    "front" : "ribera",
    "back" : "riverbank or shore"
  },
  { 
    "front" : "posada",
    "back" : "inn or lodging"
  },
  { 
    "front" : "señaladas",
    "back" : "appointed, posted or marked"
  },
  { 
    "front" : "ventura",
    "back" : "risky or dangerous undertaking"
  },
  { 
    "front" : "hallar",
    "back" : "find (something lost), discover, or come upon"
  },
  { 
    "front" : "ahondar",
    "back" : "deepend, delve into"
  },
  { 
    "front" : "deleite",
    "back" : "delight, pleasure"
  },
  { 
    "front" : "alabar",
    "back" : "to praise"
  },
  { 
    "front" : "provecho",
    "back" : "benefit, profit, advantage"
  },
  { 
    "front" : "animas",
    "back" : "soul (in purgatory), bore (as in cannon)"
  },
  { 
    "front" : "sayete",
    "back" : "war tunic"
  },
  { 
    "front" : "truhan",
    "back" : "shameless (adj), rascal (n)"
  },
  { 
    "front" : "loar",
    "back" : "to praise, to laud"
  },
  { 
    "front" : "holgar",
    "back" : "to be idle or unnecessary"
  },
  { 
    "front" : "maña",
    "back" : "knack/aptitude, swindle/hustle"
  },
  { 
    "front" : "aldea",
    "back" : "village or small town"
  },

  { 
    "front" : "molienda",
    "back" : "mill"
  },

  { 
    "front" : "caldero",
    "back" : "cauldron"
  },
  
  { 
    "front" : "mozuelo",
    "back" : "lad (f. gal)"
  },
  
  { 
    "front" : "agudeza",
    "back" : "sharp (both for blade or quick wit)"
  },

];