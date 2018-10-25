'use strict';

var _css = require('./css');

var _css2 = _interopRequireDefault(_css);

var _getOffset = require('./offset/getOffset');

var _getOffset2 = _interopRequireDefault(_getOffset);

var _scrollTop = require('./util/scrollTop');

var _scrollTop2 = _interopRequireDefault(_scrollTop);

var _scrollLeft = require('./util/scrollLeft');

var _scrollLeft2 = _interopRequireDefault(_scrollLeft);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function position(elem) {
    var offsetParent,
        offset,
        doc,
        parentOffset = { top: 0, left: 0 };

    // position:fixed elements are offset from the viewport, which itself always has zero offset
    if ((0, _css2.default)(elem, "position") === "fixed") {

        // Assume position:fixed implies availability of getBoundingClientRect
        offset = elem.getBoundingClientRect();
    } else {
        offset = (0, _getOffset2.default)(elem);

        // Account for the *real* offset parent, which can be the document or its root element
        // when a statically positioned element is identified
        doc = elem.ownerDocument;
        offsetParent = elem.offsetParent || doc.documentElement;
        while (offsetParent && (offsetParent === doc.body || offsetParent === doc.documentElement) && (0, _css2.default)(offsetParent, "position") === "static") {

            offsetParent = offsetParent.parentNode;
        }

        if (offsetParent && offsetParent !== elem && offsetParent.nodeType === 1) {

            // Incorporate borders into its offset, since they are outside its content origin
            parentOffset = (0, _getOffset2.default)(offsetParent);
            parentOffset.top += parseFloat((0, _css2.default)(offsetParent, "borderTopWidth")) || 0 - (0, _scrollTop2.default)(offsetParent) || 0;
            parentOffset.left += parseFloat((0, _css2.default)(offsetParent, "borderLeftWidth")) || 0 - (0, _scrollLeft2.default)(offsetParent) || 0;
        }
    }

    // Subtract parent offsets and element margins
    return {
        top: offset.top - parentOffset.top - (parseFloat((0, _css2.default)(elem, "marginTop")) || 0),
        left: offset.left - parentOffset.left - (parseFloat((0, _css2.default)(elem, "marginLeft")) || 0)
    };
};