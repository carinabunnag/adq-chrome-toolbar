

// get HTML source, check if script is there, return array of scripts,
// or empty array if there's no script
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

// count how many scripts there are
function countScripts() {
  var scripts = DOMtoString(document).match(/cdn+\.+adjs+\.+net\/publisher/);
  if (scripts)
    return scripts.length;
  else
    return 0;
};

//send message to background.js
chrome.runtime.sendMessage({
  action: "findScript",
  source: countScripts()
});
