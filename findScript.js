
/* Gets array of all div elements in document and returns another array of ONLY advman divs */
function getDivs(doc) {
  var attr = '', dArray = [];
  var divs = doc.getElementsByTagName('div');
  var i;
  for (i = 0; i < divs.length; i++) {
    attr = divs[i].getAttribute('id');
    if (attr != null && attr.match(/^advman-ad-\d/)) { //cannot match empty string
      dArray[dArray.length] = divs[i].outerHTML;
    }
  }
  return dArray;
}

/* Gets array of all iframes in document and returns another array of ONLY google script */
function getScripts(doc) {
  var attr = '', sArray = [];
  var scripts = doc.getElementsByTagName('script');
  var i;
  for (i = 0; i < scripts.length; i++) {
    attr = scripts[i].getAttribute('src');
    if (attr != null && attr.match(/\/\/pagead2\.googlesyndication\.com\/pagead\//)) {
      sArray[sArray.length] = scripts[i].outerHTML;
    }
  }
  return sArray;
}

/* Gets array of all iframes in document and returns another array of ONLY amazon iframes */
function getIframes(doc) {
  var attr = '', fArray = [];
  var iframes = doc.getElementsByTagName('iframe');
  var i;
  for (i = 0; i < iframes.length; i++) {
    attr = iframes[i].getAttribute('src');
    if (attr != null
      && attr.match(/^http:\/\/rcm-na\.amazon-adsystem\.com\/e\/cm\?t=/)) {
      fArray[fArray.length] = iframes[i].outerHTML;
    }
  }
  return fArray;
}

/* Get an array for all ads.
   Hierarchy: div, google script, amazon iframe
*/
function ads() {
  var d = getDivs(); //array of divs
  var s = getScripts(); //array of scripts
  var f = getIframes(); //array of iframes
  var i;

}

//send message
chrome.runtime.sendMessage({
  action: "findScript",
  source: getDivs(document)
});
