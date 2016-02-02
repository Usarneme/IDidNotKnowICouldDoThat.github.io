// Which card number in the array we're looking at currently; default first 0
var selectedCardNumber = 0;
// The text variables holding the card's front/question and back/answer
var $theQuestion, $theAnswer;
// Tracker variable for whether the answer or question are showing. answer showing = true
var answerShowing = false;
// The total number of cards kept in var for code readability
var totalNumberOfCards = $('.card').length;
// The built up set of html styled flashcards from the array of javascript objects
var theHtml = "";

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

function addNewFlashcard() {
  $("form").submit(function(evt) {
    evt.preventDefault();
    var url = $(this).attr("action"); // There is no action attribute at this time
    var formData = $(this).serialize(); // JSON data won't work without a webserver
    $.post(url, formData, function(response) {
      buildFlashcardSet();
    }); //end of post 
  }); //end of submit
}

function buildFlashcardSet() {
  theHtml = ""; // reset the variable so cards aren't duplicated over and over
  $.each($flashcards, function(index, value) { // for each object in the $flashcards array
    theHtml += '<li class="card col-xs-12 col-sm-6 col-md-4 alert"><div class="question">';
    theHtml += $flashcards[index].front;
    theHtml += '</div><div class="answer">';
    theHtml += $flashcards[index].back;
    theHtml += '</div></li>';
    // console log test condition
    console.log($flashcards[index].front, $flashcards[index].back);
  }); // end of each
  $("#js_ul").html(theHtml);
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
  $(".clo").off();
  $(".clo").on("click", function() {
    $("#flashcardCollection").children().toggle();
  });

  // Toggle to show or hide the set of generated flashcards (generated from e.g.: the object being updated with a new card)
  $(".clo2").off();
  $(".clo2").on("click", function() {
    $("#js_ul").children().toggle();
  });

  // If the addCard submit button is pressed, add this new card to the $flashcard set array
  $("#addCardSubmitButton").off();
  $("#addCardSubmitButton").on("click", addNewFlashcard() );
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
// $flashcards.push();


// FLashcard key:value array
var $flashcards = [
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