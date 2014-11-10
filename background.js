// This file is responsible for changing the icons


//green = #0F0
//red = #F00
//default = #485A5E

var count = 0;

// update icon
function updateBadge(badge_color) {
  chrome.browserAction.setBadgeBackgroundColor({color: badge_color});
  chrome.browserAction.setBadgeText({text: " "});
}

// listens for message
chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "findScript") {
    count = request.source;
    if (count > 0)
      updateBadge("#0F0");
    else
      updateBadge("#F00");
  }
});


function onWindowLoad() {
  chrome.tabs.executeScript(null, {
    file: "findScript.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError)
      updateBadge("#FF0");
  });
};

window.onload = onWindowLoad;

chrome.browserAction.onClicked.addListener(onWindowLoad);
