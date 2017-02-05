"use strict";

function init() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { "message": "get_colors" }, function(response) {
            console.log(response);
        });
    });
}

document.addEventListener("DOMContentLoaded", function() {
    init();
    // chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // 	console.log("Popup listener is GO.");
    //     if (request.message === "got_the_colors") {
    //         console.log(response);
    //         //receive colors via JSON object from background.js and write colors to popup.html
    //         console.log("I'm popup.js and got: " + response.message + " from content.js. The colors: ");
    //         console.log(response.colors);
    //     }
    // });
});
