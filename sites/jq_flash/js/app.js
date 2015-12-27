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


// Array of flashcard objects, each card contains a question and answer
var $flashCardsByClass = $('.card');
// Which card number in the array we're looking at currently; default first 0
var selectedCardNumber = 0;
// The text variables holding the card's front/question and back/answer
var $theQuestion, $theAnswer;

function showTheQuestion() {
  $("#cardHolder")[0].textContent = $flashCardsByClass[selectedCardNumber].children[0].textContent;

  $("#cardHolder").off(); 
  $("#cardHolder").on("click", showTheAnswer);

  // Methods to check if first or last to display prev/next buttons or not
  isFirstQuestion();
  isLastQuestion();
}

function showTheAnswer() {
  $("#cardHolder")[0].textContent = $flashCardsByClass[selectedCardNumber].children[1].textContent;

  $("#cardHolder").off(); 
  $("#cardHolder").on("click", showTheQuestion);

  // Methods to check if first or last to display prev/next buttons or not
  isFirstQuestion();
  isLastQuestion();
}

function isFirstQuestion() {
  // If the current card is the first
  if (selectedCardNumber <= 0) {
    // hide the previous button element
    $("#previous").hide();
    // And bind the next button to the next card in the array
    $("#next").on("click", showNextQuestion);
  } else { } // Do nothing
}

function isLastQuestion() {
  // If the current card is the last
  if (selectedCardNumber >= $flashCardsByClass.length) {
    // hide the next button element
    $("#next").hide();
    // And bind the previous button to the previous card in the array
    $("#previous").on("click", showPreviousQuestion);
  } else { } // Do nothing   
}

function showNextQuestion() {
  // Increment the card number by +1
  selectedCardNumber++;
  showTheQuestion();
}

function showPreviousQuestion() {
  // Increment the card number by -1
  selectedCardNumber--;
  showTheQuestion();
}

// Initially show the question
$(document).ready(function() {
  showTheQuestion();
  $("#flashcards").html($theQuestion);
});

// Hide all of them but the currently showing
// $("#flashcards").children().hide();
// Show the currently showing question card
// $(flashCardsByClass)[selectedCardNumber].show();

// card is clicked, answer is shown
// right button is clicked, next card is shown
// left button, previous card is shown