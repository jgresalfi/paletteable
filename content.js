"use strict";

function pageColors() {
    //Getting colors off page and building array of rgba values
    var pageEls = Array.from(document.querySelectorAll('*'));

    function getColor(e) {
        var color = window.getComputedStyle(e, null)
            .getPropertyValue('background-color');
        return color;
    }

    function filterWhite(e) {
        if (e !== 'rgba(0, 0, 0, 0)' && 'rgb(0, 0, 0, 0)') {
            return e;
        }
    }

    function killDupes(arr) {
        var finalArr = [];
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] !== (arr[i + 1])) {
                finalArr.push(arr[i]);
            }
        }
        return finalArr;
    }

    var colorArr = pageEls.map(getColor)
        .filter(filterWhite)
        .sort();

    return killDupes(colorArr);

};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var colors;
    if (request.message === "get_colors") {
      console.log(request);
        colors = pageColors();
        console.log(colors);
        sendResponse({
            "message": "got_the_colors",
            colors: colors
        });
        return true;
    }
});
