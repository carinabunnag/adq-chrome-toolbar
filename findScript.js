/* Check if publisher script is in header */
function hasScript() {
  var head = document.head.outerHTML;
  if (head.match(/cdn\.adjs\.net\/publisher\.ad\.min\.js/))
    return 1;
  else
    return 0;
}

/* this function will be placed in background.js */
function createScript() {
  var s = document.createElement("script");
  s.type = "text/javascript";
  // s.src = "//cdn.adjs.net/publisher.append.ad.min.js";
  s.src = 'THIS-IS-THE-TEST-SCRIPT';
  return s; //s is an element
}

/* returns an array we need to append to */
//want to return 'divs'. right now for testing, we return 'div_array'
function main(doc) {
  var div_array = [];
  var has_script = 0; //indicate whether we have append script or not

  // get all divs in document
  var divs = doc.getElementsByTagName('div');
  var i;
  for (i = 0; i < divs.length; i++) {

    var attr = divs[i].getAttribute('id');
    /* advman-ad- divs already have publisher script appended */
    if (attr != null && !attr.match(/^advman-ad-\d/)) {
      var scripts = divs[i].getElementsByTagName('script');

      var j;
      for (j = 0; j < scripts.length; j++) {

        /*~~~ this code only works when googlesyndication script is one level in the div (works for correbh) ~~~*/
        //check for google ad
        if (scripts[j].outerHTML.match(/\/\/pagead2\.googlesyndication\.com\/pagead\//)) {
          // check if append script exists
          var k;
          for (k = j+1; k < scripts.length; k++) {
            // correbh
            if (scripts[k].outerHTML.match(/cdn\.adjs\.net\/publisher\.append\.ad\.min\.js/)) {
              //keep track of divs we want to add the script to
              has_script = 1;
              // div_array[div_array.length] = k + goog_scripts[k].outerHTML;
            }
          }
          //no script exists, append
          if (has_script == 0) {
            var s = createScript();
            divs[i].appendChild(s);
          }
        }
      }

      //check if leftover dics have an Amazon iframe
      var amaz_iframes = divs[i].getElementsByTagName('iframe');
      var l;
      for (l = 0; l < amaz_iframes.length; l++) {
        if (amaz_iframes[l].outerHTML.match(/http:\/\/rcm-na\.amazon-adsystem\.com\/e\/cm\?t=/)) {
          //check if append script exists
          // div_array[div_array.length] = divs[i].outerHTML;
          var m;
          for (m = 0; m < scripts.length; m++) {
            if (scripts[m].outerHTML.match(/cdn\.adjs\.net\/publisher\.append\.ad\.min\.js/)) {
              has_script = 1;
              // div_array[div_array.length] = divs[i].outerHTML;
            }
          }
          if (has_script == 0) {
            var s = createScript();
            divs[i].appendChild(s);
          }
        }
      }
    }
  }

  // TEST
  var t;
  for (t = 0; t < divs.length; t++) {
    div_array[div_array.length] = divs[t].outerHTML;
  }
  
  return div_array;
}

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
