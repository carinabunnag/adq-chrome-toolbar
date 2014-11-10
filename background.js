// This file is responsible for changing the icons


//green = #0F0
//red = #F00
//default = #485A5E

var color = "";

// update icon
function updateBadge(badge_background_color) {
  chrome.browserAction.setBadgeBackgroundColor({color: badge_background_color});
  chrome.browserAction.setBadgeText({text: " "});
}

// listens for message
chrome.runtime.onMessage.addListener(function(request, sender) {

  if (request.action == "findScript") {
    color = request.source;
    updateBadge(color);
  }
});


function onWindowLoad() {
  chrome.tabs.executeScript(null, {
    file: "findScript.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      updateBadge("#FF0");
    }
  });
};

window.onload = onWindowLoad;

chrome.browserAction.onClicked.addListener(onWindowLoad);
