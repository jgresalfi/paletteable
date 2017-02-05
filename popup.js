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
});
