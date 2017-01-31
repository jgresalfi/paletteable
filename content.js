chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.message === "clicked_browser_action") {
            (function() {
                //Getting colors off page and building array of rgba values
                const pageEls = Array.from(document.querySelectorAll('*'));

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

                function killDupes(arr) {
                    let finalArr = [];
                    for (let i = 0; i < arr.length; i++) {
                        if (arr[i] !== (arr[i + 1])) {
                            finalArr.push(arr[i]);
                        }
                    }
                    // return finalArr;
                    console.log(finalArr);
                }

                const colorArr = pageEls.map(getColor)
                    .filter(filterWhite)
                    .sort();

                killDupes(colorArr);

            }());

            chrome.runtime.sendMessage({
                "message": "open_new_tab",
                //More stuff here...
            });
        }
    });
