
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = typeOf;

var _typeof2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/typeof"));

var class2type = {};
var toString = class2type.toString;
"Boolean Number String Function Array Date RegExp Object Error Symbol Set Map NodeList".split(" ").forEach(function (name) {
  return class2type["[object " + name + "]"] = name.toLowerCase();
});

function typeOf(obj) {
  if (obj == null) {
    return obj + "";
  } // Support: Android <=2.3 only (functionish RegExp)


  return (0, _typeof2.default)(obj) === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : (0, _typeof2.default)(obj);
}