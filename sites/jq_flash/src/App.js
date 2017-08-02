import React, { Component } from 'react';
import logo from './logo.svg';

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav className="navbar">
          <header>
            <h1>Projects of Great Interest</h1>
          </header>
        </nav>

        <main role="main"> 
          <article id="wrapper">
            <div className="header">
              This project utilizes JavaScript, Facebook's React.js, CRA, Node.js and npm, a package.json config file, HTML5 and CSS3 to create a Flashcards web application.
            </div>

            <div id="flashcards">
              Click on the card to show the reverse side

              <div id="scoreboard">
                <p>
                Correct: <span id="correctAnswerCount">0</span>
                Wrong: <span id="wrongAnswerCount">0</span>
                </p>
              </div>

              <div id="current_card" className="card" onClick={flipCard}>
                Loading...
              </div>

              <div id="buckets" className="hidden">
                <button id="bucketWrong" className="btn">No</button>
                <div>
                  Did you get the flashcard right?
                </div>
                <button id="bucketRight" className="btn">Yes</button>
              </div>

              <button id="previous_card" className="btn">
                <span className="sr-only">Prev.</span>
              </button>

              <button id="next_card" className="btn">
                <span className="sr-only">Next</span>
              </button>
            </div>

            <div id="new_card">
              Add new flashcards
              <div className="input_toggle">
                <button id="singleShowing" className="btn">One at a time</button>
                <button id="multipleShowing" className="btn">Many at a time</button>
              </div>

              <div id="singleAdd">
                <input type="text" className="form-control" id="inputNewCardFront" placeholder="New card front..." />
                <input type="text" className="form-control" id="inputNewCardBack" placeholder="New card back..." />
                <button id="addCardSubmitButton" className="btn">Add flashcard!</button>
              </div>

              <div id="multipleAdd" className="hidden">
                <input type="text" className="form-control" id="inputManyNewCards" placeholder="Add multiple cards here..." />
                <p>Add as many cards as you like separated by a comma such as: question1, answer1, house, casa, question3, answer3.</p>
                <button id="addManyCardsSubmitButton" className="btn">Add flashcards!</button>
              </div>
            </div>
          </article>
        </main>
      </div>
    );
  }
}

// Which card in the flashcard array we're looking at currently; default setting is the first/zeroeth card
var selectedCardNumber = 0;
// Tracker variable for whether the front (the question side) is showing.
var frontShowing = Boolean(true);

function showASideOfTheCard() {
  if ($flashcards.length > 0) { // if there are any flashcards remaining in the array
    if (frontShowing) { // If the front of the card is showing...
      // ..then show the front
      document.getElementById('current_card').innerHTML = "<h5>"+$flashcards[selectedCardNumber].front+"</h5>";
      frontShowing = true;
    } else { // If the back of the card is showing...
      // ...then show the back
      document.getElementById('current_card').innerHTML = "<h5>"+$flashcards[selectedCardNumber].back+"</h5>";
      frontShowing = false;
    }
    // Disable the next and previous buttons if there are no more cards before or after the current card
    isFirstQuestion();
    isLastQuestion();
  } else {
    console.log('Out of flashcards. '+$flashcards);
    document.getElementById('current_card').innerHTML = "You completed the whole set of cards. Reload or add more cards below. ";
    document.getElementById('current_card').disabled = true;
  }
}

function isFirstQuestion() {
  console.log('In isFirst with selectedCardNumber = '+selectedCardNumber);
  // If the current card is the first...
  if (selectedCardNumber === 0) {
    // Disable the previous card button element
    document.getElementById('previous_card').disabled = true;
  } else {
    document.getElementById('previous_card').disabled = false;
  }
}

function isLastQuestion() {
  // If the current card is the last...
  if (selectedCardNumber === ($flashcards.length - 1)) {
    // Disable the next card button element
    document.getElementById('next_card').disabled = true;
  } else {
    document.getElementById('next_card').disabled = false;
  }
}

function showNextQuestion() {
  // If there are more cards/questions available
  if ( !(document.getElementById('next_card').disabled) ) {
    // Increment the card number up by one
    selectedCardNumber += 1;
  } else {}
  showASideOfTheCard();
}

function showPreviousQuestion() {
  // If there are previous cards/questions available
  if (!(document.getElementById('previous_card').disabled)) {
    // Decrement the card number down by one
    selectedCardNumber -= 1;
  } else {}
  showASideOfTheCard();
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

function addToWrongBucket() {
  // Push the current card to the flashcardsWrong bucket
  $flashcardsWrong.push( $flashcards.splice(selectedCardNumber,1) ); // end of push 
  // Update the count of the cards in the wrong bucket
  document.getElementById('wrongAnswerCount').innerHTML = $flashcardsWrong.length;
  // Show a different flashcard
  selectedCardNumber = ($flashcards.length - 1);
  flipCard();
  showASideOfTheCard();
}

function addToRightBucket() {
  // Push the current card to the flashcardsRight bucket
  $flashcardsRight.push( $flashcards.splice(selectedCardNumber,1) ); // end of push 
  // Update the count of the cards in the right bucket
  document.getElementById('correctAnswerCount').innerHTML = $flashcardsRight.length;
  selectedCardNumber = ($flashcards.length - 1);
  flipCard();
  showASideOfTheCard();
}

function addNewFlashcard() {
  var frontValue = document.getElementById('inputNewCardFront').value,
      backValue = document.getElementById('inputNewCardBack').value;
  console.log('Adding front: '+frontValue+' and back: '+backValue+' to $flashcards: '+JSON.stringify($flashcards));
  $flashcards.push({
    front: frontValue, 
    back: backValue
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
  var newCardsString = document.getElementById('inputManyNewCards').value,
  // Split into an array by comma
      pairArray = newCardsString.split(',');
  for (let i = 0; i < pairArray.length; i+=2) { 
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
}

document.addEventListener("DOMContentLoaded", function(event) { 

  // Press the next card button, run the next card function 
  document.getElementById('next_card').addEventListener('click', function(e) {
    showNextQuestion();
  });

  // Press the previous card button, run the previous card function
  document.getElementById('previous_card').addEventListener('click', function(e) {
    showPreviousQuestion();
  });

  document.getElementById('bucketWrong').addEventListener('click', function(e) {
    addToWrongBucket();
  });

  document.getElementById('bucketRight').addEventListener('click', function(e) {
    addToRightBucket();
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

  // Toggle between displaying the add multiple and add single flashcard tabs
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
});

var $flashcardsRight = [],
    $flashcardsWrong = [],
    $flashcards = [ // Array of flashcard objects each with a front and back
  { 
    "front" : "ribera",
    "back" : "riverbank or shore"
  },
  // { 
  //   "front" : "posada",
  //   "back" : "inn or lodging"
  // },
  // { 
  //   "front" : "señaladas",
  //   "back" : "appointed, posted or marked"
  // },
  // { 
  //   "front" : "ventura",
  //   "back" : "risky or dangerous undertaking"
  // },
  // { 
  //   "front" : "hallar",
  //   "back" : "find (something lost), discover, or come upon"
  // },
  // { 
  //   "front" : "ahondar",
  //   "back" : "deepen, delve into"
  // },
  // { 
  //   "front" : "deleite",
  //   "back" : "delight, pleasure"
  // },
  // { 
  //   "front" : "alabar",
  //   "back" : "to praise"
  // },
  // { 
  //   "front" : "provecho",
  //   "back" : "benefit, profit, advantage"
  // },
  // { 
  //   "front" : "animas",
  //   "back" : "soul (in purgatory), bore (as in cannon)"
  // },
  // { 
  //   "front" : "sayete",
  //   "back" : "war tunic"
  // },
  // { 
  //   "front" : "truhan",
  //   "back" : "shameless (adj), rascal (n)"
  // },
  // { 
  //   "front" : "loar",
  //   "back" : "to praise, to laud"
  // },
  // { 
  //   "front" : "holgar",
  //   "back" : "to be idle or unnecessary"
  // },
  // { 
  //   "front" : "maña",
  //   "back" : "knack/aptitude, swindle/hustle"
  // },
  // { 
  //   "front" : "aldea",
  //   "back" : "village or small town"
  // },

  // { 
  //   "front" : "molienda",
  //   "back" : "mill"
  // },

  // { 
  //   "front" : "caldero",
  //   "back" : "cauldron"
  // },
  
  // { 
  //   "front" : "mozuelo",
  //   "back" : "lad (f. gal)"
  // },
  
  { 
    "front" : "agudeza",
    "back" : "sharp (both for blade or quick wit)"
  }
];

export default App;
