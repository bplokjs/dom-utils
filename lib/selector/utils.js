"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.toType = toType;
exports.noop = noop;
exports.isWindow = isWindow;
exports.isPlainObject = isPlainObject;
exports.isFunction = isFunction;
exports.makeArray = makeArray;
exports.merge = merge;
exports.each = each;
exports.extend = extend;
exports.isObject = isObject;
exports.isUndefined = isUndefined;
exports.isDefined = isDefined;
exports.isString = isString;
exports.lowercase = lowercase;
const push = exports.push = Array.prototype.push;
const toString = exports.toString = Object.prototype.toString;
const hasOwn = exports.hasOwn = Object.prototype.hasOwnProperty;
const fnToString = exports.fnToString = hasOwn.toString;
const ObjectFunctionString = exports.ObjectFunctionString = fnToString.call(Object);

const getProto = exports.getProto = Object.getPrototypeOf;

const class2type = {};

each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (i, name) {
	class2type["[object " + name + "]"] = name.toLowerCase();
});

function toType(obj) {
	if (obj == null) {
		return obj + "";
	}

	return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj;
}

function isArrayLike(obj) {

	let length = !!obj && "length" in obj && obj.length,
	    type = toType(obj);

	if (isFunction(obj) || isWindow(obj)) {
		return false;
	}

	return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
}

function noop() {}

function isWindow(obj) {
	return obj != null && obj === obj.window;
}

function isPlainObject(obj) {
	let proto, Ctor;

	if (!obj || toString.call(obj) !== "[object Object]") {
		return false;
	}

	proto = getProto(obj);

	if (!proto) {
		return true;
	}

	Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
	return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
}

function isFunction(obj) {
	return typeof obj === "function" && typeof obj.nodeType !== "number";
}

function makeArray(arr, results) {
	let ret = results || [];

	if (arr != null) {
		if (isArrayLike(Object(arr))) {
			merge(ret, typeof arr === "string" ? [arr] : arr);
		} else {
			push.call(ret, arr);
		}
	}

	return ret;
}

function merge(first, second) {
	let len = +second.length,
	    j = 0,
	    i = first.length;

	for (; j < len; j++) {
		first[i++] = second[j];
	}

	first.length = i;

	return first;
}

function each(obj, callback) {
	let length,
	    i = 0;

	if (isArrayLike(obj)) {
		length = obj.length;
		for (; i < length; i++) {
			if (callback.call(obj[i], i, obj[i]) === false) {
				break;
			}
		}
	} else {
		for (i in obj) {
			if (callback.call(obj[i], i, obj[i]) === false) {
				break;
			}
		}
	}

	return obj;
}

function extend() {
	let options,
	    name,
	    src,
	    copy,
	    copyIsArray,
	    clone,
	    target = arguments[0] || {},
	    i = 1,
	    length = arguments.length,
	    deep = false;

	// Handle a deep copy situation
	if (typeof target === "boolean") {
		deep = target;

		// Skip the boolean and the target
		target = arguments[i] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if (typeof target !== "object" && !isFunction(target)) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if (i === length) {
		target = this;
		i--;
	}

	for (; i < length; i++) {

		// Only deal with non-null/undefined values
		if ((options = arguments[i]) != null) {

			// Extend the base object
			for (name in options) {
				src = target[name];
				copy = options[name];

				// Prevent never-ending loop
				if (target === copy) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if (deep && copy && (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {

					if (copyIsArray) {
						copyIsArray = false;
						clone = src && Array.isArray(src) ? src : [];
					} else {
						clone = src && isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[name] = extend(deep, clone, copy);

					// Don't bring in undefined values
				} else if (copy !== undefined) {
					target[name] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
}

const NODE_TYPE_ELEMENT = exports.NODE_TYPE_ELEMENT = 1;
const NODE_TYPE_ATTRIBUTE = exports.NODE_TYPE_ATTRIBUTE = 2;
const NODE_TYPE_TEXT = exports.NODE_TYPE_TEXT = 3;
const NODE_TYPE_COMMENT = exports.NODE_TYPE_COMMENT = 8;
const NODE_TYPE_DOCUMENT = exports.NODE_TYPE_DOCUMENT = 9;
const NODE_TYPE_DOCUMENT_FRAGMENT = exports.NODE_TYPE_DOCUMENT_FRAGMENT = 11;

function isObject(value) {
	return value !== null && typeof value === 'object';
}

function isUndefined(value) {
	return typeof value === 'undefined';
}

function isDefined(value) {
	return typeof value !== 'undefined';
}

function isString(value) {
	return typeof value === 'string';
}

function lowercase(string) {
	return isString(string) ? string.toLowerCase() : string;
}