'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = filterEvents;

var _typeOf = require('../util/typeOf');

var _typeOf2 = _interopRequireDefault(_typeOf);

var _contains = require('../contains');

var _contains2 = _interopRequireDefault(_contains);

var _querySelectorAll = require('../querySelectorAll');

var _querySelectorAll2 = _interopRequireDefault(_querySelectorAll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function filterEvents(selector, handler) {
	return function filterHandler(e) {
		let top = e.currentTarget,
		    target = e.target,
		    type = (0, _typeOf2.default)(selector),
		    matches = type === 'string' ? (0, _querySelectorAll2.default)(top, selector) : type === 'array' || type === 'nodelist' ? [].slice.call(selector) : [selector];
		let length = matches.length;
		while (length && length--) {
			const match = matches[length];
			if ((0, _contains2.default)(match, target)) {
				handler.call(match, e);
			}
		}
	};
}