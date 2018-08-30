"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = camelCase;
const rmsPrefix = /^-ms-/,
      rdashAlpha = /-([a-z])/g,

// Used by camelCase as callback to replace()
fcamelCase = function (all, letter) {
	return letter.toUpperCase();
};

function camelCase(string) {
	return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
}