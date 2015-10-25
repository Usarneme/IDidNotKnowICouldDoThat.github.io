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

// IMAGE GALLERY section 


var $overlay = $('<div id="overlay"></div>');
var $image = $("<img>");

//An image to overlay
$overlay.append($image);

//Add overlay
$("body").append($overlay);
  //A caption

//Capture the click event on a link to an image
$("#imageGallery a").click(function(event){
  event.preventDefault();
  var imageLocation = $(this).attr("href");
  //Update overlay with the image linked in the link
  $image.attr("src", imageLocation);
  
  //Show the overlay.
  $overlay.show();
  
  //Get child's alt attribute and set caption


});

//When overlay is clicked
$overlay.click(function(){
  //Hide the overlay
  $overlay.hide();
});

// END of image gallery section





