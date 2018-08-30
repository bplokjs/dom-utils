'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = closest;

var _matches = require('./matches');

var _matches2 = _interopRequireDefault(_matches);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _closest(el, s) {
	do {
		if ((0, _matches2.default)(el, s)) return el;
		el = el.parentElement;
	} while (el !== null);
	return null;
}

function closest(node, selector) {
	if (node.closest && typeof selector === 'string') {
		return node.closest(selector);
	} else {
		return _closest(node, selector);
	}
}