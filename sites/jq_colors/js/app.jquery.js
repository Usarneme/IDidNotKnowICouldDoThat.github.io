/*
 the jQuery version
*/

function getNumbers() {
  return 1 + Math.floor(Math.random() * 255);
};

function changeColor() {
  $('.color_card').each(function() {
    $(this).css('background-color', 'rgba('+ getNumbers() + ',' + getNumbers() + ',' + getNumbers() + ',0.9)');
  });
  eventBindings();
};

function eventBindings() {
  $('.color_card').off();
  $('.color_card').on("click", changeColor);
};

$(document).ready(function() {
  for(var i=1; i<=980; i++) {
    $('div.theWrapper').append('<div id=\"'+i+'\"></div>');
  }
  $('div.theWrapper').children().addClass('color_card');

  // Begin with a random color
  changeColor();
});
