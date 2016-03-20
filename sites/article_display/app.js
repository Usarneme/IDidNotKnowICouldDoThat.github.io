// String holder for json data
var json2, json3, json4;
var coin = 0;

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

// Parse the file contents so I can work with them
var client4 = new XMLHttpRequest();
client4.open('GET', 'https://raw.githubusercontent.com/IDidNotKnowICouldDoThat/IDidNotKnowICouldDoThat.github.io/master/sites/article_display/book4.json');
client4.onreadystatechange = function() {
	json4 = $.parseJSON(client4.responseText)
}
client4.send();

// Event listener to request a random article when the button is clicked
document.getElementById('getNewArticle').addEventListener('click', function(e) {
	e.preventDefault();
	e.stopPropagation();
	if (coin === 0) {
		coin = 2;
		var rand = Math.floor((Math.random() * json2.length));
		document.getElementById('madlib_holder').textContent = json2[rand][(rand+1)];
	} else if (coin > 1) {
			coin = 1;
			var rand = Math.floor((Math.random() * json3.length));
			document.getElementById('madlib_holder').textContent = json3[rand][(rand+1)];
			} else {
					coin = 0;
					var rand = Math.floor((Math.random() * json4.length));
					document.getElementById('madlib_holder').textContent = json4[rand][(rand+1)];
			}
	document.getElementById('madlib_holder').className = "";
});
