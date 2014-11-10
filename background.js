// This file is responsible for changing the icons

var color = "";
// update icon
function updateIcon(icon_color) {
  chrome.browserAction.setIcon({path: icon_color + ".png"});
};


// listens for message
chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "findScript") {
    color = request.source;
    updateIcon(color);
  }
});


function onWindowLoad() {

  chrome.tabs.executeScript(null, {
    file: "findScript.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      // alert("icon should be YELLOW");
      updateIcon("yellow");
    }
  });
};

window.onload = onWindowLoad;

//Since toolbar does not refresh automatically, we must click the icon to update.
chrome.browserAction.onClicked.addListener(onWindowLoad);
