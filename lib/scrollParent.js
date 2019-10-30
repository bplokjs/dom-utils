
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _css = _interopRequireDefault(require("./css"));

module.exports = function scrollPrarent(node, dir) {
  if (dir === void 0) {
    dir = 'y';
  }

  var position = (0, _css.default)(node, 'position'),
      excludeStatic = position === 'absolute',
      ownerDoc = node.ownerDocument,
      overflowRegex = /(auto|scroll)/;
  if (position === 'fixed') return (ownerDoc || document).documentElement;

  while ((node = node.parentNode) && node.nodeType !== 9) {
    var isStatic = excludeStatic && (0, _css.default)(node, 'position') === 'static',
        style = (0, _css.default)(node, 'overflow') + (0, _css.default)(node, 'overflow-' + dir);
    if (isStatic) continue;
    var hasScroll = dir === 'y' ? node.scrollHeight - node.clientHeight > 1 : node.scrollWidth - node.clientWidth > 1;
    if (overflowRegex.test(style) && hasScroll) return node;
  }

  return document.documentElement;
};