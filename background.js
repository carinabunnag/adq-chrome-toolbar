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



function onTabUpdate() {
  chrome.tabs.query({active: true}, function (tab) {
    chrome.tabs.executeScript(null, {
      file: "findScript.js"
    }, function() {
      if (chrome.runtime.lastError)
        updateBadge("#FF0");
    });
  });
};

window.onload = onTabUpdate;

//listen for new tab to be activated
chrome.tabs.onActivated.addListener(onTabUpdate);

//listen for current tab to be changed
chrome.tabs.onUpdated.addListener(onTabUpdate);
