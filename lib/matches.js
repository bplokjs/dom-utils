
"use strict";

module.exports = function matches(node, selector) {
  if (node === selector) return true;
  var matches = node.matches || node.matchesSelector || node.msMatchesSelector || node.webkitMatchesSelector || node.mozMatchesSelector;

  if (matches) {
    return matches.call(node, selector);
  }

  return null;
};