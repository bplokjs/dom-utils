
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = typeOf;
var class2type = {};
var toString = class2type.toString;
"Boolean Number String Function Array Date RegExp Object Error Symbol Set Map NodeList".split(" ").forEach(function (name) {
  return class2type["[object " + name + "]"] = name.toLowerCase();
});

function typeOf(obj) {
  if (obj == null) {
    return obj + "";
  } // Support: Android <=2.3 only (functionish RegExp)


  return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj;
}