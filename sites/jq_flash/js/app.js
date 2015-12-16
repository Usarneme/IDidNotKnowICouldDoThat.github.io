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
var $overlay = $('<div id="overlay"></div>');
var $displayedCard = "";

//An currently displayed card to the overlay
$overlay.append($displayedCard);

//Add overlay to the html body
$("body").append($overlay);
  //A caption

//Capture the click event on a link to a flashcard list item
$("#flashcardCollection li").click(function(event){
  event.preventDefault();
  $displayedCard = "<div class='displayed_flashcard'>" + $(this).text() + "</div>";
  $overlay.html($displayedCard);

  //Show the overlay.
  $overlay.show();
  
});

//When overlay is clicked
$overlay.click(function(){
  //Hide the overlay
  $overlay.hide();
});

// END of flashcard section
