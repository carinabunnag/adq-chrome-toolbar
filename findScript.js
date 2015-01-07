
/* Gets array of all div elements in document and returns another array of ONLY advman divs */
function getDivs() {
  var attr = '', dArray = [];
  var divs = document.getElementsByTagName('div');
  var i;
  for (i = 0; i < divs.length; i++) {
    attr = divs[i].getAttribute('id');
    if (attr != null && attr.match(/^advman-ad-\d/)) { //cannot match empty string
      dArray[dArray.length] = attr;
    }
  }
  return dArray;
}

/* Gets array of all iframes in document and returns another array of ONLY amazon iframes */
function getIframes() {
  var attr = '', fArray = [];
  var iframes = document.getElementsByTagName('iframe');
  var i;
  for (i = 0; i < iframes.length; i++) {
    attr = iframes[i].getAttribute('src');
    if (attr != null
      && attr.match(/^http:\/\/rcm-na\.amazon-adsystem\.com\/e\/cm\?t=/)) {
      fArray[fArray.length] = attr;
    }
  }
  return fArray;
}

/* Gets array of all iframes in document and returns another array of ONLY google script */
function getScripts() {
  var attr = '', sArray = [];
  var scripts = document.getElementsByTagName('script');
  var i;
  for (i = 0; i < scripts.length; i++) {
    attr = scripts[i].getAttribute('src');
    if (attr != null && attr.match(/\/\/pagead2\.googlesyndication\.com\/pagead\//)) {
      sArray[sArray.length] = scripts[i].outerHTML;
    }
  }
  return sArray;
}

//send message 
chrome.runtime.sendMessage({
  action: "findScript",
  source: getDivs()
});
