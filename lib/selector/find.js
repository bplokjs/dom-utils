'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _matches = require('../matches');

var _matches2 = _interopRequireDefault(_matches);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function find(selector, context, results, seed) {
	let elem,
	    nodeType,
	    i = 0;

	results = results || [];
	context = context || document;

	// Same basic safeguard as Sizzle
	if (!selector || typeof selector !== "string") {
		return results;
	}

	// Early return if context is not an element or document
	if ((nodeType = context.nodeType) !== _utils.NODE_TYPE_ELEMENT && nodeType !== _utils.NODE_TYPE_DOCUMENT) {
		return [];
	}

	if (seed) {
		while (elem = seed[i++]) {
			if ((0, _matches2.default)(elem, selector)) {
				results.push(elem);
			}
		}
	} else {
		(0, _utils.merge)(results, context.querySelectorAll(selector));
	}

	return results;
}

exports.default = find;