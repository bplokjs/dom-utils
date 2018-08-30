'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.attr = attr;
exports.removeAttr = removeAttr;
exports.prop = prop;

var _utils = require('./utils');

const BOOLEAN_ATTR = {};
(0, _utils.each)('multiple,selected,checked,disabled,readOnly,required,open'.split(','), function (i, value) {
	BOOLEAN_ATTR[(0, _utils.lowercase)(value)] = value;
});

function attr(element, name, value) {
	let ret;
	const nodeType = element.nodeType;
	if (nodeType === _utils.NODE_TYPE_TEXT || nodeType === _utils.NODE_TYPE_ATTRIBUTE || nodeType === _utils.NODE_TYPE_COMMENT || !element.getAttribute) {
		return;
	}

	const lowercasedName = (0, _utils.lowercase)(name);
	const isBooleanAttr = BOOLEAN_ATTR[lowercasedName];

	if ((0, _utils.isDefined)(value)) {
		// setter

		if (value === null || value === false && isBooleanAttr) {
			element.removeAttribute(name);
		} else {
			element.setAttribute(name, isBooleanAttr ? lowercasedName : value);
		}
	} else {
		// getter

		ret = element.getAttribute(name);

		if (isBooleanAttr && ret !== null) {
			ret = lowercasedName;
		}
		// Normalize non-existing attributes to undefined (as jQuery).
		return ret === null ? undefined : ret;
	}
}

function removeAttr(element, name) {
	element.removeAttribute(name);
}

function prop(element, name, value) {
	if ((0, _utils.isDefined)(value)) {
		element[name] = value;
	} else {
		return element[name];
	}
}