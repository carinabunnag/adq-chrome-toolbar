/* Check if append script is in header */
function hasScript() {
  var head = document.head.outerHTML;
  if (head.match(/cdn\.adjs\.net\/publisher\.ad\.min\.js/))
    return 1;
  else
    return 0;
}

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

function hasAppend(elem) {
  var scripts = doc.getElementsByTagName('script');
  var i;
  for (i = 0; i < scripts.length; i++) {
    attr = scripts[i].getAttribute('src');
    if (attr != null && attr.match(/cdn\.adjs\.net\/publisher\.append\.ad\.min\.js/)) {
      return 1;
    }
  }
  return 0;
}

function divScripts(elem) {
  var attr = '', array = [];
  var scripts = elem.getElementsByTagName('script');
  var i;
  for (i = 0; i < scripts.length; i++) {
    attr = scripts[i].getAttribute('src');
    if (attr != null && attr.match(/\/\/pagead2\.googlesyndication\.com\/pagead\//)) {
      array[array.length] = scripts[i].outerHTML;
    }
  }
  return array.length;
}

/* this function will be placed in background.js */
function createScript() {
  var s = document.createElement("script");
  s.type = "text/javascript";
  s.src = "//cdn.adjs.net/publisher.append.ad.min.js";
  return s.outerHTML; //s is an element
}

// check divs for scripts and iframes
//CAN WE APPEND HERE? AND RETURN WHETHER OR NOT HEAD HAS THE PUBLISHER SCRIPT
//IN THE SAME METHOD....?
/* ~~~USED WHEN PAGE HAS NO ADVMAN DIV NAME */
function checkDivs(doc) {
  var dArray = [];
  var count = 0;
  var divs = doc.getElementsByTagName('div');
  var i;
  for (i = 0; i < divs.length; i++) {
    //find Google scripts in div
    var div_scripts = divs[i].getElementsByTagName('script');
    var j;
    for (j = 0; j < div_scripts.length; j++) {
      /*~~~ this code only works when googlesyndication script is one level in the div (works for correbh but not for gameofwarrealtips) ~~~*/
      if (div_scripts[j].outerHTML.match(/\/\/pagead2\.googlesyndication\.com\/pagead\//)) {
        dArray[dArray.length] = j + div_scripts[j].outerHTML;
      }
      //check for publisher script
      var k;
      if (k < div_scripts.length) {
        if (div_scripts[k].outerHTML.match(/cdn\.adjs\.net\/publisher\.append\.ad\.min\.js/)) {
          // dArray[dArray.length] = k + div_scripts[k].outerHTML;
        }
      }
    }
  }
  return dArray;
}

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
function getAllAds(doc) {
  var ads = [];
  var div = getDivs(doc); //array of divs
  var script = getScripts(doc); //array of scripts
  var iframe = getIframes(doc); //array of iframes
  var i, j, k;

  //go through divs first
  for (i = 0; i < div.length; i++) {
    //check for google script
    for (j = 0; j < script.length; j++) {
      if (div[i].indexOf(script[j]) > -1) { //google script is contained in div
        script[j] = null; //remove from script array
        ads[ads.length] = div[i];//add div to main array
      }
    }
    //check for amazon iframe
    for (k = 0; k < iframe.length; k++) {
      if (div[i].indexOf(iframe[k]) > -1) { //amazon iframe is contained in div
        iframe[k] = null; //remove from iframe array
        ads[ads.length] = div[i];
      }
    }
  }

  //go through scripts
  for (j = 0; j < script.length; j++) {
    if (script[j] != null) {
      ads[ads.length] = script[j];
    }
  }
  //go through iframes
  for (k = 0; k < iframe.length; k++) {
    if (iframe[k] != null){
      ads[ads.length] = iframe[k];
    }
  }
  return ads;
}

/* this function will eventually be placed in background.js
   appends publisher script
*/
// function append() {
//   var node_names = '';
//   var ads = getAllAds(document);
//   if (ads.length > 0) {
//     var i;
//     for (i = 0; i < ads.length; i++) {
//       if (ads[i].match(/div/)) {
//
//       }
//       else if (ads[i].match(/script/)) {
//
//       }
//       else if (ads.[i].match(/script/)) {
//
//       }
//     }
//   }
//   return node_names;
// }


//send message
chrome.runtime.sendMessage({
  action: "findScript",
  source: checkDivs(document)
});
