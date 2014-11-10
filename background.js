// This file is responsible for changing the icons

var color = "";
// update icon
function updateIcon(color) {
  chrome.browserAction.setIcon({path: color + ".png"});
}


// listens for message
chrome.extension.onMessage.addListener(function(request, sender) {
  if (request.action == "findScript") {
    color = request.source;
    updateIcon(color);
  }
});


function onWindowLoad() {

  chrome.tabs.executeScript(null, {
    file: "getPagesSource.js"
  }, function() {
    if (chrome.extension.lastError) {
      alert("icon should be YELLOW");
      updateIcon("yellow");
    }
  });

}

window.onload = onWindowLoad;


//********** WORKS, BUT ONLY WHEN WE REFRESH THE TOOLBAR ON THE PAGE WE WANT OUR TOOLBAR TO READ.
// USING DEVELOPER TOOL WINDOW, WE RELOAD THE TOOLBAR AND THE PAGE WILL APPEAR WITH THE ICON WE WANT.
