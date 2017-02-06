"use strict";

function getColors() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { "message": "get_colors" }, function(response) {
            var palette = document.getElementById("cont");
            var colors = response.colors;
            colors.forEach(function(e) {
                var swatch = document.createElement("div");
                swatch.classList.add("swatch");
                swatch.style.backgroundColor = e;
                palette.append(swatch);
            })
        });
    });
}

document.addEventListener("DOMContentLoaded", function() {
    getColors();
});
