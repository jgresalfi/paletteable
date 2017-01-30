//First go...

var pageEls = Array.from(document.querySelectorAll('*'));

// var newArr = colorArr.filter(function(el) {
// 	return el !== "rgba(0, 0, 0, 0)";
// });

function getColor(e) {
    var color = window.getComputedStyle(e, null)
							          .getPropertyValue('background-color');
    return color;
}

function filterWhite(e) {
	if (e !== 'rgba(0, 0, 0, 0)' || 'rgb(0, 0, 0, 0)') {
		return e;
	}
}

function killDupes() {}

var colorArr = pageEls.map(getColor).filter(filterWhite);

console.log(colorArr);
