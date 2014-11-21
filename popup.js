
// listen for messages
chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "countAds") {
    message.innerText = request.source;
  }
});

function onWindowLoad() {

  var message = document.querySelector('#message');

  chrome.tabs.executeScript(null, {
    file: "findScript.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.extension.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.extension.lastError.message;
    }
  });
}

window.onload = onWindowLoad;

//
// // listens for message
// chrome.runtime.onMessage.addListener(function(request, sender) {
//   if (request.action == "findScript") {
//     count = request.source;
//     if (count > 0)
//       updateBadge("#0F0");
//       else
//         // page does not contain publisher script
//         updateBadge("#F00");
//         return count;
//       }
//     });
//
// window.onload = onWindowLoad;
