// String holder for json data
var json2, json3, json4, coin = 0;

// Parse the file contents so I can work with them
var client2 = new XMLHttpRequest();
client2.open('GET', 'https://raw.githubusercontent.com/IDidNotKnowICouldDoThat/IDidNotKnowICouldDoThat.github.io/master/sites/article_display/book2.json');
client2.onreadystatechange = function() {
	json2 = $.parseJSON(client2.responseText);
}
client2.send();

// Parse the file contents so I can work with them
var client3 = new XMLHttpRequest();
client3.open('GET', 'https://raw.githubusercontent.com/IDidNotKnowICouldDoThat/IDidNotKnowICouldDoThat.github.io/master/sites/article_display/book3.json');
client3.onreadystatechange = function() {
	json3 = $.parseJSON(client3.responseText);
}
client3.send();

// Parse the file contents so I can work with them
var client4 = new XMLHttpRequest();
client4.open('GET', 'https://raw.githubusercontent.com/IDidNotKnowICouldDoThat/IDidNotKnowICouldDoThat.github.io/master/sites/article_display/book4.json');
client4.onreadystatechange = function() {
	json4 = $.parseJSON(client4.responseText)
}
client4.send();

// Event listener to request a random article when the button is clicked
document.getElementById('get-new-article-button').addEventListener('click', function(e) {
	var articleDivElement = document.getElementById('article-holding-div');
	e.preventDefault();
	e.stopPropagation();
	if (coin === 0) {
		coin = 2;
		var $rand = Math.floor((Math.random() * json2.length));
		articleDivElement.textContent = json2[$rand][$rand+1];
	} else if (coin > 1) {
			coin = 1;
			var $rand = Math.floor((Math.random() * json3.length));
			articleDivElement.textContent = json3[$rand][$rand+1];
			} else {
				coin = 0;
				var $rand = Math.floor((Math.random() * json4.length));
				articleDivElement.textContent = json4[$rand][$rand+1];
			}
	// adds the CSS styles to the newly created element
	articleDivElement.className = 'article';
	// Increases the button size to full screen so the user can click anywhere on screen (excluding header)
	// and have a new article displayed on screen
	document.getElementById('get-new-article-button').className = 'after-click';
});
