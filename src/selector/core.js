import {
	lowercase,
	each,
	isDefined,
	NODE_TYPE_TEXT,
	NODE_TYPE_ATTRIBUTE,
	NODE_TYPE_COMMENT
} from './utils';

const BOOLEAN_ATTR = {};
each('multiple,selected,checked,disabled,readOnly,required,open'.split(','), function(i, value) {
	BOOLEAN_ATTR[lowercase(value)] = value;
});

export function attr(element, name, value) {
	let ret;
	const nodeType = element.nodeType;
	if (nodeType === NODE_TYPE_TEXT || nodeType === NODE_TYPE_ATTRIBUTE || nodeType === NODE_TYPE_COMMENT ||
		!element.getAttribute) {
		return;
	}
	
	const lowercasedName = lowercase(name);
	const isBooleanAttr = BOOLEAN_ATTR[lowercasedName];
	
	if (isDefined(value)) {
		// setter
	
		if (value === null || (value === false && isBooleanAttr)) {
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

export function removeAttr(element, name) {
	element.removeAttribute(name);
}

export function prop(element, name, value) {
	if (isDefined(value)) {
		element[name] = value;
	} else {
		return element[name];
	}
}