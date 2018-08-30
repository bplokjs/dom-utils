'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = offset;

var _getOffset = require('./getOffset');

var _getOffset2 = _interopRequireDefault(_getOffset);

var _setOffset = require('./setOffset');

var _setOffset2 = _interopRequireDefault(_setOffset);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function offset(elem, options) {
	if (arguments.length < 2) {
		return (0, _getOffset2.default)(elem);
	} else {
		(0, _setOffset2.default)(elem, options);
	}
}