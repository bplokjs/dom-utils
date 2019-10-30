
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var off = function () {
  if (document.addEventListener) return function (node, eventName, handler, capture) {
    return node.removeEventListener(eventName, handler, capture || false);
  };else if (document.attachEvent) return function (node, eventName, handler) {
    return node.detachEvent('on' + eventName, handler);
  };
}();

var _default = off;
exports.default = _default;