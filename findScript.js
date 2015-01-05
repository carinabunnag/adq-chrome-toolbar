
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

// find publisher script in head
function hasScript() {
  var script = DOMtoString(document.head).match(/cdn+\.+adjs+\.+net\/publisher+\.+ad+\.+min+\.+js/);
  if (script)
    return 1;
  else
    return 0;
}

/* find ads on webpage */

//FIRST TEST
//check for div name "advman-ad-" and return array of names
function div_name() {
  var count = 1,
    name = [];
  while (document.getElementById("advman-ad-" + count)) {
    name[name.length] = document.getElementById("advman-ad-" + count);
    count++;
  }
  return name;
}


//SECOND TEST
//check for google script
function google_script() {
  var script = document.getElementByTagName("script");

}

//find ad frames and returns an array of iframes
function get_iframes() {
  var iframes = document.getElementsByTagName("iframe");
  return iframes;
}

// function findAdFrame() {
//   var adframes =
// }

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

//returns array of all ads on the page
// function ads() {
//   var ads = [];
//   var divs = div_name();
//   if (divs)
//      ads = ads.concat(divs);
//   if
//
//   return ads;
// }

//returns number of all ads on the page
function adCount() {
  var ads = ads();
  return ads.length;
}


//send message to background.js
chrome.runtime.sendMessage({
  action: "findScript",
  source: hasScript()
});


//send message to adFrame.js
chrome.runtime.sendmessage({
  action: "getFrames",
  source: getAdFrames()
})
