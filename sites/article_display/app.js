// String holder for json data
var json2, json3;

// Parse the file contents so I can work with them
var client2 = new XMLHttpRequest();
client2.open('GET', 'https://raw.githubusercontent.com/IDidNotKnowICouldDoThat/IDidNotKnowICouldDoThat.github.io/master/sites/article_display/book2.json');
client2.onreadystatechange = function() {
	json2 = $.parseJSON(client2.responseText)
}
client2.send();

// Parse the file contents so I can work with them
var client3 = new XMLHttpRequest();
client3.open('GET', 'https://raw.githubusercontent.com/IDidNotKnowICouldDoThat/IDidNotKnowICouldDoThat.github.io/master/sites/article_display/book3.json');
client3.onreadystatechange = function() {
	json3 = $.parseJSON(client3.responseText)
}
client3.send();

// Event listener to request a random article when the button is clicked
document.getElementById('getNewArticle').addEventListener('click', function(e) {
	e.preventDefault();
	e.stopPropagation();
	var rand = Math.floor((Math.random() * json2.length));
	document.getElementById('madlib_holder').textContent = json2[rand][(rand+1)];
	document.getElementById('madlib_holder').className = "";
});
