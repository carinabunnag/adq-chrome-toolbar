
// get HTML source
function DOMtoString(document_root) {
  var html = "",
    node = document_root.firstChild;
  while(node) {
    html += node.outerHTML;
    node = node.nextSibling;
  }
  return html;
};


// find AdQ script and return it
function hasScript() {
  if (DOMtoString(document).match(/cdn+\.+adjs+\.+net\/publisher/)){
    return "#0F0";
  }
  else {
    return "#F00";
  }
};

chrome.runtime.sendMessage({
    action: "findScript",
    source: hasScript()
});
