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

var $displayedCard;
var $flashCardsByClass = $('.question');
$("#flashcards").html($flashCardsByClass);

$(document).ready(function() {
  initializeHandlers();
});

function initializeHandlers() {
  // Remove all handlers from the set of all flashcards 
  $("#flashcardCollection li").off(); 
  $("#prevC").off(); 
  $("#currentC").off(); 
  $("#nextC").off(); 

  // Function to create html elements for the chosen/clicked on flashcard
  function buildFlashcard() {
    $displayedCard = $('<div id="currentC" class="displayed_flashcard">');

    //If a previous li element exists i.e. another flashcard is in the list before the current card...
    if($(this).prev().is('li')) {
      // Show the previous/last button
      $displayedCard.append("<div id='prevC' class='previous_card'>Prev</div>");
    } else { /*Do nothing*/ }

    // Set the html with the clicked-on card's text inside it
    $displayedCard.append($(this).text());

    //If another li element exists i.e. another flashcard is in the list after the current card...
    if($(this).next().is('li')) {
      // Show the next/right button
      $displayedCard.append("<div id='nextC' class='next_card'>Next</div></div>"); //Second ending div for displayed_flashcard opening
    } else { $displayedCard.append("</div>"); } //Closing div for displayed_flashcard opening

    //Run next function -- append newly created div to the html body
    appendToBody();
  }

  function appendToBody() {
    //Add displayedCard to the html body
    $("body").append($displayedCard);  

    //Run next function -- add event listeners
    flashcardListeners();
  }

  // Add event handler for flashcard from the set of all cards
  $("#flashcardCollection li").on("click", function(event) {
    event.preventDefault();
    //When displayedcard is clicked on
    $displayedCard.on("click", function() {
      //Hide the displayedCard
      $displayedCard.hide();
      //Remove the contents of the variable to prevent accretion.
      $displayedCard.empty();
    });
    //Show the displayed card.
    $displayedCard.show();
  });

  // Add event handler for previous card button prevC 
  $("#prevC").on("click", function(event) {
    event.preventDefault();
    //Show the previous card
    buildFlashcard(event.prev());
  });

  // Add event handler for previous card button currently opened card currentC
  $("#currentC").on("click", function(event) {
    event.preventDefault();
    //Show the other side/flip the card
    $(this).$('.question').hide();
    $(this).$('.answer').show();
  });

                        $('.question').on('click', function() {
                          $('.answer p').show();
                        });


  // Add event handler for next card button nextC
  $("#nextC").on("click", function(event) {
    event.preventDefault();
    //Show the next card
    buildFlashcard(event.next());
  });
}

//TODO: Section for adding a new card, fields for word, definition, and submit/set button


/* ORDER: 
Build card  
  Open div with class and/or id
  Previous button (if needed)
  Flashcard
    Back of flashcard
  Next button (if needed)
  Closing div tag

Click binding 
  Previous button (if needed)
  Flip button
  Next button
  On-screen but off flashcard to "put it down"

Append to body
*/