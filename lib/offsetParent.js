'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = offsetParent;

var _css = require('./css');

var _css2 = _interopRequireDefault(_css);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function offsetParent(elem) {
	let doc = elem.ownerDocument,
	    offsetParent = elem && elem.offsetParent;

	while (offsetParent && (0, _css2.default)(offsetParent, 'position') === 'static') {
		offsetParent = offsetParent.offsetParent;
	}

	return offsetParent || doc.documentElement;
}