/*
 the JavaScript version
*/

const boxes = 1032;

function getNumbers() {
  return 1 + Math.floor(Math.random() * 255);
}

function changeColor() {
  var wrap = document.getElementById('wrapper');
  var wrapChildren = wrap.childNodes;

  for (var i=0; i<wrapChildren.length; i++) {
    var color = 'rgba('+ getNumbers() +','+ getNumbers() +','+ getNumbers() +',0.9)';
    wrapChildren[i].style.backgroundColor = color;
  }
  eventBindings();
}

function makeBoxes() {
  var wrap = document.getElementById('wrapper');

  for(var i=1; i<=boxes; i++) {
    var current = document.createElement('div');
    current.id = i;
    current.className = 'color_card';
    wrap.appendChild(current);
  }
}

function eventBindings() {
  var wrap = document.getElementById('wrapper');

  wrap.onclick = '';
  wrap.onclick = changeColor;
}
