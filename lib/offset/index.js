
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _getOffset = _interopRequireDefault(require("./getOffset"));

var _setOffset = _interopRequireDefault(require("./setOffset"));

module.exports = function offset(elem, options) {
  if (arguments.length < 2) {
    return (0, _getOffset.default)(elem);
  } else {
    (0, _setOffset.default)(elem, options);
  }
};