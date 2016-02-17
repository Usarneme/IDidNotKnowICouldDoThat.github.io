// Which card in the flashcard array we're looking at currently; default setting is the first/zeroeth card
var selectedCardNumber = 0;
// Tracker variable for whether the answer or question are showing. If the answer is showing, then it's value is true
var answerShowing = false;

function showTheQuestion() {
  // Display the front/question of the selected card
  document.getElementById("current").textContent = $flashcards[selectedCardNumber].front;
  // Since the question is displayed, the answerShowing var is set to false
  answerShowing = false;
  // If the card is the first in the set, disable the prev button
  isFirstQuestion();
  // If the card is the last in the set, disable the next button
  isLastQuestion();
  // Method to reset the event bindings since the elements on the page changed
  eventBindings();
}

function showTheAnswer() { // Same as showTheQuestion but, you know, for the answer
  document.getElementById("current").textContent = $flashcards[selectedCardNumber].back;
  answerShowing = true;
  isFirstQuestion();
  isLastQuestion();
  eventBindings();
}

function isFirstQuestion() {
  // Reset condition before checking
  $(".previous_card").prop('disabled', false);
  // If the current card is the first...
  if (selectedCardNumber <= 0) {
    // Disable the previous card button element
    $(".previous_card").prop('disabled', true);
  }
}

function isLastQuestion() {
  // Reset condition before checking
  $(".next_card").prop('disabled', false);
  // If the current card is the last...
  if (selectedCardNumber >= ($flashcards.length - 1)) {
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

function addNewFlashcard() {
  $("form").submit(function(evt) {
    evt.preventDefault(); // Shh bby is ok
    $flashcards.push({
      front:document.getElementById("inputNewCardFront").value, 
      back:document.getElementById("inputNewCardBack").value
    }); //end of push
  }); //end of submit

  // TODO show a popup dialog to inform the user their flashcard was added

  // Set the selected card number to the pushed/newly added flashcard's index value
  //TODO Why does it show the length of the $flashcards set before the newly added card increments it's total???
  selectedCardNumber = ($flashcards.length - 1);
  // Show the newly added card's question side
  showTheQuestion();
  // Reset the form contents 
  //TODO Why does it send "" empty strings to the $flashcards set if the reset is after the submit action???
  // $("form")[0].reset();
}

function eventBindings() {
  $(".next_card").off();  
  $(".next_card").on("click", showNextQuestion);

  $(".previous_card").off();
  $(".previous_card").on("click", showPreviousQuestion);

  // If the answer is displayed currently...
  if (answerShowing) {
    // When the button is clicked flip the card and show the question
    $("#current").off(); 
    $("#current").on("click", showTheQuestion);
  } else { 
      // Otherwise the question is showing. Click on the card to flip it and show the answer
      $("#current").off(); 
      $("#current").on("click", showTheAnswer);
  }

  // When the addCard submit button is pressed, run the addNewFlashcard function
  $("#addCardSubmitButton").off();
  $("#addCardSubmitButton").on("click", addNewFlashcard);

} // End of eventBindings

$(document).ready(function() {
  // Initially show the first question
  showTheQuestion();
}); // End of document.ready

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