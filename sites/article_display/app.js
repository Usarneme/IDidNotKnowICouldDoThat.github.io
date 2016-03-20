// String holder for json data
var json = "";

// Parse the file contents so I can work with them
var client = new XMLHttpRequest();
client.open('GET', '/book2.json');
client.onreadystatechange = function() {
	json = $.parseJSON(client.responseText)
}
client.send();

// Event listener to request a random article when the button is clicked
document.getElementById('getNewArticle').addEventListener('click', function(e) {
	e.preventDefault();
	e.stopPropagation();
	var rand = Math.floor((Math.random() * json.length));
	document.getElementById('madlib_holder').textContent = json[rand][(rand+1)];
	document.getElementById('madlib_holder').className = "";
});
