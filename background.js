// This file is responsible for changing the icons

var count = 0;

// update icon
function updateBadge(badge_color) {
  chrome.browserAction.setBadgeBackgroundColor({color: badge_color});
  chrome.browserAction.setBadgeText({text: " "});
}

// inject publisher script to publisher webpage head
function addPub() {
  var s = document.createElement("script");
  s.type = "text/javascript";
  s.src = "//cdn.adjs.net/publisher.ad.min.js";
  document.getElementsByTagName("head")[0].appendChild(s);
  // alert("Injected publisher script!");
}

// inject publisher append script after ad
function addPubAppend() {
  var s = document.createElement("script");
  s.type = "text/javascript";
  s.src = "//cdn.adjs.net/publisher.append.ad.min.js";
  //find specific location to insert (right after first iframe, in same div)
  document.getElementsByTagName("head")[0].appendChild(s);
  // alert("Injected publisher append script!");
}

var ads = [];

// chrome.runtime.onMessage.addListener(function(request, sender){
//   if (request.action == "findScript") {
//     ads = request.source;
//     if (ads.length > 0) { //there are ads on the page
//       var i;
//       for (i = 0; i < ads.length; i++) {
//
//       }
//     }
//   }
// });

// listens for message
chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "findScript") {
    count = request.source;
    if (count > 0)
      updateBadge("#0F0");
    else {
      // page does not contain publisher script
      updateBadge("#F00");
      inject();
    }
    return count;
  }
});

//function to execute scripts
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

//listen for new tab to be activated
chrome.tabs.onActivated.addListener(onTabUpdate);
//listen for current tab to be changed
chrome.tabs.onUpdated.addListener(onTabUpdate);
