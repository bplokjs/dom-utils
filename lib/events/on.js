
"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var on = function () {
  if (document.addEventListener) return function (node, eventName, handler, capture) {
    return node.addEventListener(eventName, handler, capture || false);
  };else if (document.attachEvent) return function (node, eventName, handler) {
    return node.attachEvent('on' + eventName, function (e) {
      e = e || window.event;
      e.target = e.target || e.srcElement;
      e.currentTarget = node;
      handler.call(node, e);
    });
  };
}();

var _default = on;
exports["default"] = _default;