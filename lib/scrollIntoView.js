'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = scrollIntoView;

var _scrollParent = require('./scrollParent');

var _scrollParent2 = _interopRequireDefault(_scrollParent);

var _offset = require('./offset');

var _offset2 = _interopRequireDefault(_offset);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function scrollIntoView(el, scrollParent) {
    const scrollview = scrollParent || (0, _scrollParent2.default)(el);

    const pOffset = (0, _offset2.default)(scrollview);
    const tOffset = (0, _offset2.default)(el);

    const pTop = pOffset.top,
          pLeft = pOffset.left,
          pBottom = pOffset.top + scrollview.clientHeight,
          pRight = pOffset.left + scrollview.clientWidth,
          tTop = tOffset.top,
          tLeft = tOffset.left;

    const sTop = scrollview.scrollTop,
          sLeft = scrollview.scrollLeft;

    let left, top;

    if (pTop > tTop) {
        top = sTop - (pTop - tTop);
    } else if (pBottom < tTop + el.offsetHeight) {
        top = sTop + tTop - pBottom + Math.min(el.offsetHeight, scrollview.clientHeight);
    }

    if (pLeft > tLeft) {
        left = sLeft - (pLeft - tLeft);
    } else if (pRight < tLeft + el.offsetWidth) {
        left = sLeft + tLeft - pRight + Math.min(el.offsetWidth, scrollview.clientWidth);
    }

    scrollview.scrollTop = top;
    scrollview.scrollLeft = left;

    return { left, top };
}