'use strict';

var _css = require('./css');

var _css2 = _interopRequireDefault(_css);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function scrollPrarent(node, dir = 'y') {
    const position = (0, _css2.default)(node, 'position'),
          excludeStatic = position === 'absolute',
          ownerDoc = node.ownerDocument,
          overflowRegex = /(auto|scroll)/;

    if (position === 'fixed') return ownerDoc || document;

    while ((node = node.parentNode) && node.nodeType !== 9) {

        const isStatic = excludeStatic && (0, _css2.default)(node, 'position') === 'static',
              style = (0, _css2.default)(node, 'overflow') + (0, _css2.default)(node, 'overflow-' + dir);

        if (isStatic) continue;

        const hasScroll = dir === 'y' ? node.scrollHeight - node.clientHeight > 1 : node.scrollWidth - node.clientWidth > 1;

        if (overflowRegex.test(style) && hasScroll) return node;
    }

    return document;
};