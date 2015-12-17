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

// START of flashcard section 
  var $displayedCard = $('<div class="displayed_flashcard">');

  //Add displayedCard to the html body
  $("body").append($displayedCard);

  //Capture the click event on a link to a flashcard list item
  $("#flashcardCollection li").click(function(event){
    event.preventDefault();

    //If a previous li element exists i.e. another flashcard is in the list before the current card...
    if($(this).prev().is('li')) {
      // Show the previous/last button
      $displayedCard.append("<div class='previous_card'>Prev</div>");
    } else {}

    // Set the html with the clicked-on card's text inside it
    $displayedCard.append($(this).text());

    //If another li element exists i.e. another flashcard is in the list after the current cart...
    if($(this).next().is('li')) {
      // Show the next/right button
      $displayedCard.append("<div class='next_card'>Next</div></div>"); //Second ending div for displayed_flashcard opening
    } else { $displayedCard.append("</div>"); } //Closing div for displayed_flashcard opening

    //Show the displayed card.
    $displayedCard.show();
  });

  //TODO: Button on the displayed card that "flips" the card to alternate hide/show the word/definition

  //When displayedcard is clicked
  $displayedCard.click(function(){
    //Hide the displayedCard
    $displayedCard.hide();
    $displayedCard.empty();
  });
// END of flashcard section


//TODO: Section for adding a new card, fields for word, definition, and submit/set button

