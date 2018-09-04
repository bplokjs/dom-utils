import css from './css';
import getOffset from './offset/getOffset';
import scrollTop from './util/scrollTop';
import scrollLeft from './util/scrollLeft';

export default function position(elem) {
    var offsetParent, offset, doc,
        parentOffset = { top: 0, left: 0 };

    // position:fixed elements are offset from the viewport, which itself always has zero offset
    if (css(elem, "position") === "fixed") {

        // Assume position:fixed implies availability of getBoundingClientRect
        offset = elem.getBoundingClientRect();

    } else {
        offset = getOffset(elem);

        // Account for the *real* offset parent, which can be the document or its root element
        // when a statically positioned element is identified
        doc = elem.ownerDocument;
        offsetParent = elem.offsetParent || doc.documentElement;
        while (offsetParent &&
            (offsetParent === doc.body || offsetParent === doc.documentElement) &&
            css(offsetParent, "position") === "static") {

            offsetParent = offsetParent.parentNode;
        }

        if (offsetParent && offsetParent !== elem && offsetParent.nodeType === 1) {

            // Incorporate borders into its offset, since they are outside its content origin
            parentOffset = getOffset(offsetParent);
            parentOffset.top += parseFloat(css(offsetParent, "borderTopWidth")) || 0 - scrollTop(offsetParent) || 0;
            parentOffset.left += parseFloat(css(offsetParent, "borderLeftWidth")) || 0 - scrollLeft(offsetParent) || 0;
        }
    }

    // Subtract parent offsets and element margins
    return {
        top: offset.top - parentOffset.top - (parseFloat(css(elem, "marginTop")) || 0),
        left: offset.left - parentOffset.left - (parseFloat(css(elem, "marginLeft")) || 0)
    };
}