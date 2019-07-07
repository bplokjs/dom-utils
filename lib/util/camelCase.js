
"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = camelCase;

var rmsPrefix = /^-ms-/,
    rdashAlpha = /-([a-z])/g,
    // Used by camelCase as callback to replace()
fcamelCase = function fcamelCase(all, letter) {
  return letter.toUpperCase();
};

function camelCase(string) {
  return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
}