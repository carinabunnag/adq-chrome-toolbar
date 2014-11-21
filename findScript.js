// get HTML source and return as string
function DOMtoString(document_root) {
  var html = "",
    node = document_root.firstChild;
  while(node) {
    html += node.outerHTML;
    if (node.hasChildNodes()) {
      var new_root = node.firstChild;
      DOMtoString(new_root);
    }
    node = node.nextSibling;
  }
  return html;
};

// find publisher script in header
function hasScript() {
  var script = DOMtoString(document.head).match(/cdn+\.+adjs+\.+net\/publisher+\.+ad+\.+min+\.+js/);
  if (script)
    return 1;
  else
    return 0;
}

//find publisher append script
function findAppend() {
  var scripts = document.getElementsByTagName("script");
  var is_match =
        DOMtoString(scripts).match(/cdn+\.+adjs+\.+net\/publisher+\.+append+\.+ad+\.+min+\.+js/);
  if (is_match)
    return 1; //there is an append script in page
  else
    return 0;
}

// find ad frames in body
function findAds() {
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
        var adjs_frame = iframes[i+1].getAttribute("src");
        if (adjs_frame.match(/cdn+\.+adjs+\.+net\/html\/adjsframe+\.+html/))
          count++;
      }
    }
  }

}

/* default ad sizes:
[“120x60”,
“120x600”,
“160x600”,
“180x150”,
“300x1050”,
“300x250”,
“300x600”,
“468x60”,
“550x480”,
“728x90”,
“88x31”,
“970x250”,
“970x66”,
“970x90”]
*/

//send message to background.js
chrome.runtime.sendMessage({
  action: "findScript",
  source: hasScript()
});

//send message to addScript.js
chrome.runtime.sendMessage({
  action: "addScript",
  source: hasScript()
});
