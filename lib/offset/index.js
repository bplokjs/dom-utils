'use strict';

var _getOffset = require('./getOffset');

var _getOffset2 = _interopRequireDefault(_getOffset);

var _setOffset = require('./setOffset');

var _setOffset2 = _interopRequireDefault(_setOffset);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function offset(elem, options) {
    if (arguments.length < 2) {
        return (0, _getOffset2.default)(elem);
    } else {
        (0, _setOffset2.default)(elem, options);
    }
};