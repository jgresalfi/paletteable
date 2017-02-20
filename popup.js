"use strict";

function getColors() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { "message": "get_colors" }, function(response) {
            var palette = document.getElementById("cont");
            var colors = response.colors;
            colors.forEach(function(e) {
                var swatch = document.createElement("div");
                swatch.classList.add("swatch", "hint--top", "hint--rounded", "hint--small");
                swatch.setAttribute("aria-label", e);
                swatch.style.backgroundColor = e;
                palette.append(swatch);
            });
        });
    });
}

function fileDownload() {
    var download = document.getElementById("download");
    download.onclick = function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { "message": "download-palette" }, function(response) {
                console.log(response);
            });
        });
    };
}

document.addEventListener("DOMContentLoaded", function() {
    getColors();
    fileDownload();
});
