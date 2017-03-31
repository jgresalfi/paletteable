// JS for Palettable Chrome Extension - by Jason Gresalfi - released under MIT License - 2017

"use strict";

//Workaround for restriction on accessing external styles by using Window.getComputedStyle method
function getColor(e) {
    var color = window.getComputedStyle(e, null)
        .getPropertyValue('background-color');
    return color;
}

//This filters out default background colors of elements - browser sets default to rgba black with full transparency
function filterBlack(e) {
    if (e !== 'rgba(0, 0, 0, 0)' && 'rgb(0, 0, 0)') {
        return e;
    }
}

//After pageColors() sorts the color list - killDupes() removes any duplicate background colors when multiple elements are assigned the same color
function killDupes(arr) {
    var finalArr = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] !== (arr[i + 1])) {
            finalArr.push(arr[i]);
        }
    }
    return finalArr;
}

function colorBlob(c) {
    var blob = new Blob(c, { "type": "text" });
    return blob;
}

function colorExport(blob) {
    var reader = new FileReader();
    reader.onload = function(e) {
        return e.target.result;
    };
    reader.readAsText(blob);
}

function blobToFile(blob, fileName) {
    blob.lastModifiedDate = new Date();
    blob.name = fileName;
    return blob;
}

//Grabs all elements from a page (a little sledgehammery) - Web API's CSSStyleSheet.cssRules interface restricted by CORS
function pageColors() {
    var pageEls = Array.from(document.querySelectorAll('*'));
    var colorArr = pageEls.map(getColor)
        .filter(filterBlack)
        .sort();
    return killDupes(colorArr);
};

function formatColors(colors) {
  var arr = colors.map(function(e) {
    return "{ color: " + e + " }" + "\n";
  });
  return arr;
}

function grabFile(file) {
    download(file, "color-palette.css", "text/plain");
}


//Listener set for the message coming from popup.js - function arg 'sender' is ID of extension generated when packaged
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === "get_colors") {
        var colors = pageColors();
        sendResponse({
            "message": "got_the_colors",
            colors: colors
        });
    } else if (request.message === "download-palette") {
        var colors = pageColors();
        var formattedColors = formatColors(colors);
        var blob = colorBlob(formattedColors);
        var file = blobToFile(blob, "color-palette.css");
        grabFile(file);
        sendResponse({
            "message": "file-downloaded"
        });
    }
});
