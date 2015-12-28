// Menu Section
  //Create a select and append to #menu
  var $select = $("<select></select>");
  $("#menu").append($select);

  //Cycle over menu links
  $("#menu a").each(function(){
    var $anchor = $(this);
    //Create an option
    var $option = $("<option></option>");

    //Deal with selected options depending on current page
    if($anchor.parent().hasClass("selected")) {
      $option.prop("selected", true);
    }
    //option's value is the href
    $option.val($anchor.attr("href"));
    //option's text is the text of link
    $option.text($anchor.text());
    //append option to select
    $select.append($option);
  });

  //Bind change listener to the select
  $select.change(function(){
    //Go to select's location
    window.location = $select.val();
  });
// END of menu section 


// Which card number in the array we're looking at currently; default first 0 TODO
var selectedCardNumber = 4;
// The text variables holding the card's front/question and back/answer
var $theQuestion, $theAnswer;
// Tracker variable for whether the answer or question are showing. answer showing = true
var answerShowing = false;
// The total number of cards
var totalNumberOfCards = $('.card').length;

function showTheQuestion() {
  // Get the question from the array of card objects
  $(".current_card")[0].textContent = $('.card')[selectedCardNumber].children[0].textContent;
  // Reset the answer var to false as the question is showing
  answerShowing = false;
  // Methods to check if first or last to display prev/next buttons or not
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
  $(".previous_card").show();
  // If the current card is the first
  if (selectedCardNumber <= 0) {
    // hide the previous button element
    $(".previous_card").hide();
  }
}

function isLastQuestion() {
  $(".next_card").show();
  // If the current card is the last
  if (selectedCardNumber >= (totalNumberOfCards - 1)) {
    // hide the next button element
    $(".next_card").hide();
  }   
}

function showNextQuestion() {
  // Increment the card number up by one
  selectedCardNumber += 1;
  showTheQuestion();
}

function showPreviousQuestion() {
  // Decrement the card number down by one
  selectedCardNumber -= 1;
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

  // Toggle to show or hide the flashcard collection's card collection of flashcard cards
  $("#flashcardCollection").off();
  $("#flashcardCollection").on("click", function() {
      $("#flashcardCollection").children().toggle();
  });
}

$(document).ready(function() {
  // Initially show the first question
  showTheQuestion();
  // Initially hide the flashcard card set
  $("#flashcardCollection").children().hide();
});