
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = listen;

var _on = _interopRequireDefault(require("./on"));

var _off = _interopRequireDefault(require("./off"));

function listen(node, eventName, handler, capture) {
  (0, _on["default"])(node, eventName, handler, capture);
  return function () {
    (0, _off["default"])(node, eventName, handler, capture);
  };
}