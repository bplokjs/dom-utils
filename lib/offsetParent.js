
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _css = _interopRequireDefault(require("./css"));

module.exports = function (elem) {
  var doc = elem.ownerDocument,
      offsetParent = elem.offsetParent;

  while (offsetParent && (0, _css["default"])(offsetParent, 'position') === 'static') {
    offsetParent = offsetParent.offsetParent;
  }

  return offsetParent || doc.documentElement;
};