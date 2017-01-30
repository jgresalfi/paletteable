//Getting colors off page and building array of rgba values

var pageEls = Array.from(document.querySelectorAll('*'));

function getColor(e) {
    let color = window.getComputedStyle(e, null)
							          .getPropertyValue('background-color');
    return color;
}

function filterWhite(e) {
	if (e !== 'rgba(0, 0, 0, 0)' && 'rgb(0, 0, 0, 0)') {
		return e;
	}
}

function killDupes() {}

var colorArr = pageEls.map(getColor).filter(filterWhite);

console.log(colorArr);