var pageEls = document.querySelectorAll('*');
var colorArr = [];

for (var i = 0; i < pageEls.length; i++) {
	var getColor = window.getComputedStyle(pageEls[i], null)
												.getPropertyValue('background-color');
	colorArr.push(getColor);
}

var newArr = colorArr.filter(function(el) {
	return el !== "rgba(0, 0, 0, 0)";
});