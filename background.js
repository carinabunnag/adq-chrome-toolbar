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
      // page does not contain publisher script
      updateBadge("#F00");
    return count;
  }
});

function onTabUpdate() {
  chrome.tabs.query({active: true}, function(tab) {
    chrome.tabs.executeScript(null, {
      file: "findScript.js"
      }, function() {
        if (chrome.runtime.lastError)
          updateBadge("#FF0");
    });
  });
}

function onIconClick() {
  if (count == 0) {
    chrome.tabs.executeScript(null, {
      file: "addScript.js"
    }, function() {
      if (chrome.runtime.lastError)
        alert("Error: CANNOT inject publisher script!");
    });
  }
}

//listen for new tab to be activated
chrome.tabs.onActivated.addListener(onTabUpdate);
//listen for current tab to be changed
chrome.tabs.onUpdated.addListener(onTabUpdate);

//inject script when toolbar icon is clicked
chrome.browserAction.onClicked.addListener(onIconClick);
