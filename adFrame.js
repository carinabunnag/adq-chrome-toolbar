
//declare array for pointer

//listen for messages from findScript
chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getFrames") {
     count = request.source;
     return count;
  }
});

// find ad frames in body
// counts how many ads have publisher append script attached to it.
function findAds(ad_count) {
  var count = 0,
  iframes = document.getElementsByTagName("iframe");
  for (var i = 0; i < iframes.length; i++) {
    // find ad frames with width and height (ads would be i, the adjs fram should be i+1)
    if (i < iframes.length-1 && iframes[i].hasAttribute("width")
      && iframes[i].hasAttribute("height")) {
        var width = iframes[i].getAttribute("width");
        var height = iframes[i].getAttribute("height");
        //check for 468x60, 300x250
        if ((width == 468 && height == 60) || (width == 300 && height == 250)) {
          // iframe contains ad, so next iframe should have adjs iframe
          var adjs_frame = "" + iframes[i+1].getAttribute("src");
          if (adjs_frame.match(/cdn+\.+adjs+\.+net\/html\/adjsframe+\.+html/))
            count++;
          }
        }
        else if (i == iframes.length-1) {
          var adjs_frame = "" + iframes[i].getAttribute("src");
          if (adjs_frame.match(/cdn+\.+adjs+\.+net\/html\/adjsframe+\.+html/))
            count++;
          }
        }
        return count;
    }


//send message to popup.js
chrome.runtime.sendMessage({
  action: "toPopup",
  source:
});
