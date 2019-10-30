
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _matches = _interopRequireDefault(require("./matches"));

function _closest(el, s) {
  do {
    if ((0, _matches.default)(el, s)) return el;
    el = el.parentElement;
  } while (el !== null);

  return null;
}

module.exports = function closest(node, selector) {
  if (node.closest && typeof selector === 'string') {
    return node.closest(selector);
  } else {
    return _closest(node, selector);
  }
};