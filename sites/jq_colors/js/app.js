
function getNumbers() {
  return 1 + Math.floor(Math.random() * 255);
}

function changeColor() {
  $('.color_card').each(function() {
    // Change the color to the new values
    $(this).css('background-color', 'rgba('+ getNumbers() + ',' + getNumbers() + ',' + getNumbers() + ',0.9)');
  });
  eventBindings();
}


function eventBindings() {
  // The next button increments the selectedCardNumber up by one
  $('.color_card').off();  
  $('.color_card').on("click", changeColor);
}


$(document).ready(function() {
  // Begin with a random color
  changeColor();
});

