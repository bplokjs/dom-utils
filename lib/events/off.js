
"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var off = function () {
  if (document.addEventListener) return function (node, eventName, handler, capture) {
    return node.removeEventListener(eventName, handler, capture || false);
  };else if (document.attachEvent) return function (node, eventName, handler) {
    return node.detachEvent('on' + eventName, handler);
  };
}();

var _default = off;
exports["default"] = _default;