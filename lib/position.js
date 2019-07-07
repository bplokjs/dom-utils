
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _parseFloat2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/parse-float"));

var _css = _interopRequireDefault(require("./css"));

var _getOffset = _interopRequireDefault(require("./offset/getOffset"));

var _scrollTop = _interopRequireDefault(require("./util/scrollTop"));

var _scrollLeft = _interopRequireDefault(require("./util/scrollLeft"));

module.exports = function position(elem) {
  var offsetParent,
      offset,
      doc,
      parentOffset = {
    top: 0,
    left: 0
  }; // position:fixed elements are offset from the viewport, which itself always has zero offset

  if ((0, _css["default"])(elem, "position") === "fixed") {
    // Assume position:fixed implies availability of getBoundingClientRect
    offset = elem.getBoundingClientRect();
  } else {
    offset = (0, _getOffset["default"])(elem); // Account for the *real* offset parent, which can be the document or its root element
    // when a statically positioned element is identified

    doc = elem.ownerDocument;
    offsetParent = elem.offsetParent || doc.documentElement;

    while (offsetParent && (offsetParent === doc.body || offsetParent === doc.documentElement) && (0, _css["default"])(offsetParent, "position") === "static") {
      offsetParent = offsetParent.parentNode;
    }

    if (offsetParent && offsetParent !== elem && offsetParent.nodeType === 1) {
      // Incorporate borders into its offset, since they are outside its content origin
      parentOffset = (0, _getOffset["default"])(offsetParent);
      parentOffset.top += (0, _parseFloat2["default"])((0, _css["default"])(offsetParent, "borderTopWidth")) || 0 - (0, _scrollTop["default"])(offsetParent) || 0;
      parentOffset.left += (0, _parseFloat2["default"])((0, _css["default"])(offsetParent, "borderLeftWidth")) || 0 - (0, _scrollLeft["default"])(offsetParent) || 0;
    }
  } // Subtract parent offsets and element margins


  return {
    top: offset.top - parentOffset.top - ((0, _parseFloat2["default"])((0, _css["default"])(elem, "marginTop")) || 0),
    left: offset.left - parentOffset.left - ((0, _parseFloat2["default"])((0, _css["default"])(elem, "marginLeft")) || 0)
  };
};