
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

function DOMtoString(document_root) {
  var html = '',
  node = document_root.firstChild;
  while (node) {
    switch (node.nodeType) {
      case Node.ELEMENT_NODE:
        html += node.outerHTML;
        break;
        case Node.TEXT_NODE:
          html += node.nodeValue;
          break;
          case Node.CDATA_SECTION_NODE:
            html += '<![CDATA[' + node.nodeValue + ']]>';
            break;
            case Node.COMMENT_NODE:
              html += '<!--' + node.nodeValue + '-->';
              break;
              case Node.DOCUMENT_TYPE_NODE:
                // (X)HTML documents are identified by public identifiers
                html += "<!DOCTYPE " + node.name + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') + (!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>\n';
                break;
              }
              node = node.nextSibling;
            }
            return html;
          }

// find publisher script in head
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

//returns iframe elements
function getAdFrames() {
  var iframes = document.getElementsByTagName("iframe");
  return iframes;
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


//send message to adFrame.js
chrome.runtime.sendmessage({
  action: "getFrames",
  source: getAdFrames()
})
