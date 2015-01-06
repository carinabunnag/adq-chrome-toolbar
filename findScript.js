
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
//check for google script and return array of scripts
function google_script() {
  var goog = document.scripts,
    gArray = [];
  var i;
  for (i = 0; i < goog.length; i++) {
    var googStr = DOMtoString(goog[i]);
    if (googStr.match(/pagead2+\.+googlesyndication+\.+com\/pagead/))
      gArray[gArray.length] = goog[i];
  }
  return gArray;
}

//THIRD TEST
// check for amazon iframe and return array of iframes
function amazon_iframe() {
  //get all divs
  var divs = document.getElementsByTagName("div");
  //search each div for iframes
  var node = divs.item(); //first element in divs array
  while (node) {
    if (node.hasChildNodes()) {
      var new_root = node.firstChild;
      if (new_root.nodeType == 1) {

      }
    }
    node = node.nextSibling();
  }

  /* NOT SURE IF CODE BELOW WORKS */
  // for (i = 0; i < div.length; i++) {
  //   if (div[i].hasChildNodes()) {
  //
  //   }
  // }
}


//find ad frames and returns an array of iframes
function get_iframes() {
  var iframes = document.getElementsByTagName("iframe");
  return iframes;
}

// function findAdFrame() {
//   var adframes =
// }


//returns array of all ads on the page
function ads() {
  var ads = [];
  var divs = div_name(),
    gscripts = google_script();
  if (divs)
    ads = ads.concat(divs);
  if (gscripts)
    ads = ads.concat(gscripts);
  return ads;
}

//returns number of all ads on the page
function adCount() {
  var ads = ads();
  return ads.length;
}

//use ads() to find check if publisher append script is there
function findAppend() {
  var ads = ad();
  var scripts = document.getElementsByTagName("script");
  var is_match =
    DOMtoString(scripts).match(/cdn+\.+adjs+\.+net\/publisher+\.+append+\.+ad+\.+min+\.+js/);
  if (is_match)
    return 1; //there is an append script in page
  else
    return 0;
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
