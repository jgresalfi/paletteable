chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "clicked_browser_action") {
      //Snippet code goes here
      chrome.runtime.sendMessage({
        "message": "open_new_tab",
        //More stuff here...
      });
    }
  });
