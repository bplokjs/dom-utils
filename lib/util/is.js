'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.isWindow = isWindow;
exports.isNumeric = isNumeric;
exports.isPlainObject = isPlainObject;
exports.isEmptyObject = isEmptyObject;
exports.isVisible = isVisible;

var _typeOf = require('./typeOf');

var _typeOf2 = _interopRequireDefault(_typeOf);

var _css = require('../css');

var _css2 = _interopRequireDefault(_css);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getProto = Object.getPrototypeOf;
const toString = Object.prototype.toString;
const hasOwn = Object.prototype.hasOwnProperty;
const fnToString = hasOwn.toString;
const ObjectFunctionString = fnToString.call(Object);

function isWindow(elem) {
	return elem === elem.window ? elem : elem.nodeType === 9 ? elem.defaultView || elem.parentWindow : false;
}

function isNumeric(obj) {
	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = (0, _typeOf2.default)(obj);
	return (type === "number" || type === "string") &&

	// parseFloat NaNs numeric-cast false positives ("")
	// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
	// subtraction forces infinities to NaN
	!isNaN(obj - parseFloat(obj));
}

function isPlainObject(obj) {
	var proto, Ctor;

	// Detect obvious negatives
	// Use toString instead of jQuery.type to catch host objects
	if (!obj || toString.call(obj) !== "[object Object]") {
		return false;
	}

	proto = getProto(obj);

	// Objects with no prototype (e.g., `Object.create( null )`) are plain
	if (!proto) {
		return true;
	}

	// Objects with prototype are plain iff they were constructed by a global Object function
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
		let display = (0, _css2.default)(elem, 'display');
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