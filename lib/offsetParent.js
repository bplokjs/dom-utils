'use strict';

var _css = require('./css');

var _css2 = _interopRequireDefault(_css);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (elem) {
    let doc = elem.ownerDocument,
        offsetParent = elem.offsetParent;

    while (offsetParent && (0, _css2.default)(offsetParent, 'position') === 'static') {
        offsetParent = offsetParent.offsetParent;
    }

    return offsetParent || doc.documentElement;
};