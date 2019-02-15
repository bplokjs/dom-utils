
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _scrollParent = _interopRequireDefault(require("./scrollParent"));

var _offset = _interopRequireDefault(require("./offset"));

module.exports = function scrollIntoView(el, scrollParent) {
  var scrollview = scrollParent || (0, _scrollParent.default)(el);
  var pOffset = (0, _offset.default)(scrollview);
  var tOffset = (0, _offset.default)(el);
  var pTop = pOffset.top,
      pLeft = pOffset.left,
      pBottom = pOffset.top + scrollview.clientHeight,
      pRight = pOffset.left + scrollview.clientWidth,
      tTop = tOffset.top,
      tLeft = tOffset.left;
  var sTop = scrollview.scrollTop,
      sLeft = scrollview.scrollLeft;
  var left = sLeft,
      top = sTop;

  if (pTop > tTop) {
    top = sTop - (pTop - tTop);
  } else if (pBottom < tTop + el.offsetHeight) {
    top = sTop + tTop - pBottom + Math.min(el.offsetHeight, scrollview.clientHeight);
  }

  if (pLeft > tLeft) {
    left = sLeft - (pLeft - tLeft);
  } else if (pRight < tLeft + el.offsetWidth) {
    left = sLeft + tLeft - pRight + Math.min(el.offsetWidth, scrollview.clientWidth);
  }

  if (top !== sTop) {
    scrollview.scrollTop = top;
  }

  if (left !== sLeft) {
    scrollview.scrollLeft = left;
  }

  return {
    left: left,
    top: top
  };
};