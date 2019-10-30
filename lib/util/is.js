
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isWindow = isWindow;
exports.isNumeric = isNumeric;
exports.isPlainObject = isPlainObject;
exports.isEmptyObject = isEmptyObject;
exports.isVisible = isVisible;

var _typeOf = _interopRequireDefault(require("./typeOf"));

var _css = _interopRequireDefault(require("../css"));

var getProto = Object.getPrototypeOf;
var toString = Object.prototype.toString;
var hasOwn = Object.prototype.hasOwnProperty;
var fnToString = hasOwn.toString;
var ObjectFunctionString = fnToString.call(Object);

function isWindow(elem) {
  return elem === elem.window ? elem : elem.nodeType === 9 ? elem.defaultView || elem.parentWindow : false;
}

function isNumeric(obj) {
  // As of jQuery 3.0, isNumeric is limited to
  // strings and numbers (primitives or objects)
  // that can be coerced to finite numbers (gh-2662)
  var type = (0, _typeOf.default)(obj);
  return (type === "number" || type === "string") && // parseFloat NaNs numeric-cast false positives ("")
  // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
  // subtraction forces infinities to NaN
  !isNaN(obj - parseFloat(obj));
}

function isPlainObject(obj) {
  var proto, Ctor; // Detect obvious negatives
  // Use toString instead of jQuery.type to catch host objects

  if (!obj || toString.call(obj) !== "[object Object]") {
    return false;
  }

  proto = getProto(obj); // Objects with no prototype (e.g., `Object.create( null )`) are plain

  if (!proto) {
    return true;
  } // Objects with prototype are plain iff they were constructed by a global Object function


  Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
  return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
}

function isEmptyObject(obj) {
  /* eslint-disable no-unused-vars */
  // See https://github.com/eslint/eslint/issues/6125
  var name;

  for (name in obj) {
    return false;
  }

  return true;
}

function isVisible(elem) {
  do {
    var display = (0, _css.default)(elem, 'display');

    if (display === 'none') {
      return false;
    } else {
      elem = elem.parentNode;

      if (elem === document.body) {
        return true;
      }
    }
  } while (elem !== null);

  return true;
}