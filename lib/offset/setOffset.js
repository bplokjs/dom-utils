
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setOffset;

var _parseFloat2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/parse-float"));

var _css = _interopRequireDefault(require("../css"));

var _getOffset = _interopRequireDefault(require("./getOffset"));

var _position = _interopRequireDefault(require("../position"));

function setOffset(elem, options) {
  var curPosition,
      curLeft,
      curCSSTop,
      curTop,
      curOffset,
      curCSSLeft,
      calculatePosition,
      positionState = (0, _css.default)(elem, "position"),
      curElem = elem,
      props = {}; // Set position first, in-case top/left are set even on static elem

  if (positionState === "static") {
    elem.style.position = "relative";
  }

  curOffset = (0, _getOffset.default)(curElem);
  curCSSTop = (0, _css.default)(elem, "top");
  curCSSLeft = (0, _css.default)(elem, "left");
  calculatePosition = (positionState === "absolute" || positionState === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1; // Need to be able to calculate position if either
  // top or left is auto and position is either absolute or fixed

  if (calculatePosition) {
    curPosition = (0, _position.default)(curElem);
    curTop = curPosition.top;
    curLeft = curPosition.left;
  } else {
    curTop = (0, _parseFloat2.default)(curCSSTop) || 0;
    curLeft = (0, _parseFloat2.default)(curCSSLeft) || 0;
  }

  if (options.top != null) {
    props.top = options.top - curOffset.top + curTop;
  }

  if (options.left != null) {
    props.left = options.left - curOffset.left + curLeft;
  }

  if ("using" in options) {
    options.using.call(elem, props);
  } else {
    (0, _css.default)(curElem, props);
  }
}