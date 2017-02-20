"use strict";

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

function colorBlob(c) {
    //
    var blob = new Blob(c, { "type": "text" });
    return blob;
}

function colorExport(blob) {
    //New filereader has an onload listener that will fire its callback when readAsText method is complete
    //readAsText fires a 'load' event to tell the FileReader object to fire its callback
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

function pageColors() {
    //Getting colors off page and building array of rgba values
    var pageEls = Array.from(document.querySelectorAll('*'));
    var colorArr = pageEls.map(getColor)
        .filter(filterWhite)
        .sort();
    return killDupes(colorArr);
};

function grabFile(file) {
    download(file, "test.txt", "text/plain");
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === "get_colors") {
        var colors = pageColors();
        sendResponse({
            "message": "got_the_colors",
            colors: colors
        });
    } else if (request.message === "download-palette") {
        var colors = pageColors();
        var blob = colorBlob(colors);
        var file = blobToFile(blob, "my-color-palette.txt");
        grabFile(file);
        sendResponse({
            "message": "file-downloaded"
        });
    }
});
