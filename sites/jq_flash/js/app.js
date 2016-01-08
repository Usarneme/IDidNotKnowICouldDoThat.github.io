// Which card number in the array we're looking at currently; default first 0
var selectedCardNumber = 0;
// The text variables holding the card's front/question and back/answer
var $theQuestion, $theAnswer;
// Tracker variable for whether the answer or question are showing. answer showing = true
var answerShowing = false;
// The total number of cards kept in var for code readability
var totalNumberOfCards = $('.card').length;

function showTheQuestion() {
  // Get the question from the array of card objects
  $(".current_card")[0].textContent = $('.card')[selectedCardNumber].children[0].textContent;
  // Reset the answer var to false as the question is showing
  answerShowing = false;
  // Methods to check if card is the first or last to display prev/next buttons or not
  isFirstQuestion();
  isLastQuestion();
  eventBindings();
}

function showTheAnswer() {
  // Get the answer from the array of card objects
  $(".current_card")[0].textContent = $('.card')[selectedCardNumber].children[1].textContent;
  // Reset the answer var to true as the answer is showing
  answerShowing = true;
  // Methods to check if first or last to display prev/next buttons or not
  isFirstQuestion();
  isLastQuestion();
  eventBindings();
}

function isFirstQuestion() {
  // Reset condition before checking
  $(".previous_card").prop('disabled', false);
  // Show the previous card button by default
  $(".previous_card").show();
  // If the current card is the first...
  if (selectedCardNumber <= 0) {
    // Disable the previous card button element
    $(".previous_card").prop('disabled', true);
  }
}

function isLastQuestion() {
  // Reset condition before checking
  $(".next_card").prop('disabled', false);
  // Show the next card button by default
  $(".next_card").show();
  // If the current card is the last...
  if (selectedCardNumber >= (totalNumberOfCards - 1)) {
    // Disable the next card button element
    $(".next_card").prop('disabled', true);
  }
}

function showNextQuestion() {
  // If there are more cards/questions available
  if (!($(".next_card").prop('disabled'))) {
    // Increment the card number up by one
    selectedCardNumber += 1;
  } else {}
  showTheQuestion();
}

function showPreviousQuestion() {
  // If there are previous cards/questions available
  if (!($(".previous_card").prop('disabled'))) {
    // Decrement the card number down by one
    selectedCardNumber -= 1;
  } else {}
  showTheQuestion();
}

function eventBindings() {
  // The next button increments the selectedCardNumber up by one
  $(".next_card").off();  
  $(".next_card").on("click", showNextQuestion);

  // The previous button decrements the selectedCardNumber down by one
  $(".previous_card").off();
  $(".previous_card").on("click", showPreviousQuestion);

  // If answer is displayed currently...
  if (answerShowing) {
    // Bind the current card element to flip the card and show the question
    $(".current_card").off(); 
    $(".current_card").on("click", showTheQuestion);
  } else { // The question is displayed currently...
      // Bind the current card element to flip the card and show the answer
      $(".current_card").off(); 
      $(".current_card").on("click", showTheAnswer);
  }

  // Toggle to show or hide the set of cards
  $(".btn-link").off();
  $(".btn-link").on("click", function() {
      $("#flashcardCollection").children().toggle();
  });
}

$(document).ready(function() {
  // Initially enable both next and previous buttons
  $(".previous_card").prop('disabled', false);
  $(".next_card").prop('disabled', false);

  // Initially show the first question
  showTheQuestion();

  // Initially hide the flashcard card set
  $("#flashcardCollection").children().hide();
});

// Work in progress for the submit new card form and buttons
// It needs to be able to add a key:value pair to the array "flashcards" below
// e.preventDefault();
// add the card (key:value) to the array
// re-load the DOM so all cards in the array are in the list

// FLashcard key:value array
var flashcards = [
  {'ribera' : 'riverbank or shore'},
  {'posada' : 'inn or lodging'},
  {'señaladas' : 'appointed or posted or marked'},
  {'ventura' : 'risky or dangerous undertaking'},
  {'hallar' : 'find (something lost) or discover or come upon'},
  {'ahondar' : 'deepen or delve into'},
  {'deleite' : 'delight or pleasure'},
  {'alabar' : 'to praise'},
  {'provecho' : 'benefit or profit or advantage'},
  {'animas' : 'soul (in purgatory) or bore (as in cannon)'},
  {'sayete' : 'war tunic'},
  {'truhan' : 'shameless (adj) or rascal (n)'},
  {'loar' : 'to praise or to laud'},
  {'holgar' : 'be idle or be unnecessary'},
  {'maña' : 'knack/aptitude or swindle/hustle'},
  {'aldea' : 'small village or small town'},
  {'molienda' : 'mill'},
];