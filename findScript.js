/* Check if publisher script is in header */
function hasScript() {
  var head = document.head.outerHTML;
  if (head.match(/cdn\.adjs\.net\/publisher\.ad\.min\.js/))
    return 1;
  else
    return 0;
}

/* Ad scenario: googlesyndication script WITH publisher append script */
  // TEST:
function gtest(doc) {
  var div_array = [];
  // get all divs in document
  var divs = doc.getElementsByTagName('div');
  var i;
  for (i = 0; i < divs.length; i++) {
      var attr = divs[i].getAttribute('id');
  }
}

/* returns an array we need to append to */
//want to return 'divs'. right now for testing, we return 'div_array'
function main(doc) {
  var div_array = [];
  var has_script = 0; //indicated whether we have append script or not
  // get all divs in document
  var divs = doc.getElementsByTagName('div');
  var i;
  for (i = 0; i < divs.length; i++) {

    //check if document has advman div
    // var attr = divs[i].getAttribute('id');
    // if (attr != null && attr.match(/^advman-ad-\d/)) { //cannot match empty string
    //   //delete from divs
    //   divs[i].remove();
    // }
    // div_array[div_array.length] = attr + "~~~~~~~~> ";
    // else {
      //check if leftover divs have a Google script
    var goog_scripts = divs[i].getElementsByTagName('script');
    // var j;
    // for (j = 0; j < goog_scripts.length; j++) {
    //
    //   /*~~~ this code only works when googlesyndication script is one level in the div (works for correbh) ~~~*/
    //   if (goog_scripts[j].outerHTML.match(/\/\/pagead2\.googlesyndication\.com\/pagead\//)) {
    //     // check if append script exists
    //     var k = j + 1;
    //     while (k < goog_scripts.length) {
    //       // correbh
    //       if (goog_scripts[k].outerHTML.match(/cdn\.adjs\.net\/publisher\.append\.ad\.min\.js/)) {
    //         //keep track of divs we want to add the script to
    //         has_script = 1;
    //         // div_array[div_array.length] = k + goog_scripts[k].outerHTML;
    //       }
    //       k++;
    //     }
    //     //no script exists, append
    //     if (has_script == 1) {
    //       var s = document.createElement("script");
    //       s.type = "text/javascript";
    //       s.src = "THIS-IS-TEST-SCRIPT";
    //       divs[i].appendChild(s);
    //     }
    //   }
    // }

    //check if leftover dics have an Amazon iframe
    var amaz_iframes = divs[i].getElementsByTagName('iframe');
    var l;
    for (l = 0; l < amaz_iframes.length; l++) {
      if (amaz_iframes[l].outerHTML.match(/http:\/\/rcm-na\.amazon-adsystem\.com\/e\/cm\?t=/)) {
        //check if append script exists
        // div_array[div_array.length] = divs[i].outerHTML;
        var m;
        for (m = 0; m < goog_scripts.length; m++) {
          if (goog_scripts[m].outerHTML.match(/cdn\.adjs\.net\/publisher\.append\.ad\.min\.js/)) {
            has_script = 1;
            // div_array[div_array.length] = divs[i].outerHTML;
          }
        }
        if (has_script == 1) {
          var scr = document.createElement("script");
          scr.type = "text/javascript";
          scr.src = "THIS-IS-TEST-SCRIPT";
          divs[i].appendChild(scr);
        }
      }
    }
    // }
  }

  // TEST
  var t;
  for (t = 0; t < divs.length; t++) {
    div_array[div_array.length] = divs[t].outerHTML;
  }
  // var count = ha
  // return hasScript();
  // return divs;
  return div_array;
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
function checkDivsGoog(doc) {
  var dArray = [];
  var divs = doc.getElementsByTagName('div');
  var i;
  for (i = 0; i < divs.length; i++) {
    //find Google scripts in div
    var div_scripts = divs[i].getElementsByTagName('script');
    var j;
    for (j = 0; j < div_scripts.length; j++) {
      /*~~~ this code only works when googlesyndication script is one level in the div (works for correbh) ~~~*/
      if (div_scripts[j].outerHTML.match(/\/\/pagead2\.googlesyndication\.com\/pagead\//)) {
        dArray[dArray.length] = j + 'what does this read?';
        //check for publisher script
        /* is this k cluster supposed to be nested or AFTER? */
        // var k = j + 1;
        // if (k < div_scripts.length) {
        //   if (!div_scripts[k].outerHTML.match(/cdn\.adjs\.net\/publisher\.append\.ad\.min\.js/)) {
        //     dArray[dArray.length] = k + 'NEED TO APPEND SCRIPT HERE';
        //   }
        // }
      }
    }
  }
  return dArray;
}

/* ~~ NEED TO FIND A SITE THAT CONTAINS THIS AD ~~*/
/*~~ CURRENTLY NOT BEING USED ~~*/
function checkDivsAmaz(doc) {
  var dArray = [];
  var count = 0;
  var divs = doc.getElementsByTagName('div');
  var i;
  for (i = 0; i < divs.length; i++) {
    //find Google scripts in div
    var div_scripts = divs[i].getElementsByTagName('iframe');
    var j;
    for (j = 0; j < div_scripts.length; j++) {
      /*~~~ this code only works when googlesyndication script is one level in the div (works for correbh) ~~~*/
      if (div_scripts[j].outerHTML.match(/http:\/\/rcm-na\.amazon-adsystem\.com\/e\/cm\?t=/)) {
        dArray[dArray.length] = j + div_scripts[j].outerHTML;
        //check for publisher script
        /* is this k cluster supposed to be nested or AFTER? */
        var k = j + 1;
        if (k < div_scripts.length) {
          // if (div_scripts[k].outerHTML.match(/cdn\.adjs\.net\/html\/adjsframe\.html/)) {
          if (div_scripts[k].outerHTML.match(/cdn\.adjs\.net\/publisher\.append\.ad\.min\.js/)) {
            dArray[dArray.length] = k + div_scripts[k].outerHTML;
          }
        }
      }
    }
  }
  return dArray;
}

function combine(doc) {
  // get arrays
  var goog = checkDivsGoog(doc);
  var amaz = checkDivsAmaz(doc);
  var total = goog.concat(amaz);
  return total;
}

// function getScripts(doc) {
//   var attr = '', sArray = [];
//   var scripts = doc.getElementsByTagName('script');
//   var i;
//   for (i = 0; i < scripts.length; i++) {
//     attr = scripts[i].getAttribute('src');
//     if (attr != null && attr.match(/\/\/pagead2\.googlesyndication\.com\/pagead\//)) {
//       sArray[sArray.length] = scripts[i].outerHTML;
//     }
//   }
//   return sArray;
// }

/* Gets array of all iframes in document and returns another array of ONLY amazon iframes */
// function getIframes(doc) {
//   var attr = '', fArray = [];
//   var iframes = doc.getElementsByTagName('iframe');
//   var i;
//   for (i = 0; i < iframes.length; i++) {
//     attr = iframes[i].getAttribute('src');
//     if (attr != null
//       && attr.match(/^http:\/\/rcm-na\.amazon-adsystem\.com\/e\/cm\?t=/)) {
//       fArray[fArray.length] = iframes[i].outerHTML;
//     }
//   }
//   return fArray;
// }


/* Get an array for all ads.
   Hierarchy: div, google script, amazon iframe
*/
// function getAllAds(doc) {
//   var ads = [];
//   var div = getDivs(doc); //array of divs
//   var script = getScripts(doc); //array of scripts
//   var iframe = getIframes(doc); //array of iframes
//   var i, j, k;
//
//   //go through divs first
//   for (i = 0; i < div.length; i++) {
//     //check for google script
//     for (j = 0; j < script.length; j++) {
//       if (div[i].indexOf(script[j]) > -1) { //google script is contained in div
//         script[j] = null; //remove from script array
//         ads[ads.length] = div[i];//add div to main array
//       }
//     }
//     //check for amazon iframe
//     for (k = 0; k < iframe.length; k++) {
//       if (div[i].indexOf(iframe[k]) > -1) { //amazon iframe is contained in div
//         iframe[k] = null; //remove from iframe array
//         ads[ads.length] = div[i];
//       }
//     }
//   }
//
//   //go through scripts
//   for (j = 0; j < script.length; j++) {
//     if (script[j] != null) {
//       ads[ads.length] = script[j];
//     }
//   }
//   //go through iframes
//   for (k = 0; k < iframe.length; k++) {
//     if (iframe[k] != null){
//       ads[ads.length] = iframe[k];
//     }
//   }
//   return ads;
// }



//send message to background.js
chrome.runtime.sendMessage({
  action: "findScript",
  source: hasScript()
});

//send message to popup.js
chrome.runtime.sendMessage({
  action: "appendScript",
  source: main(document)
});
