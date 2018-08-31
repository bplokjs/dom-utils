import getScrollParent from './scrollParent';
import offset from './offset';

export default function scrollIntoView(el, scrollParent) {
    const scrollview = scrollParent || getScrollParent(el);

    const pOffset = offset(scrollview);
    const tOffset = offset(el);

    const pTop = pOffset.top,
        pLeft = pOffset.left,
        pBottom = pOffset.top + scrollview.offsetHeight,
        pRight = pOffset.left + scrollview.offsetWidth,
        tTop = tOffset.top,
        tLeft = tOffset.left;

    const sTop = scrollview.scrollTop,
        sLeft = scrollview.scrollLeft;

    if (pTop > tTop) {
        scrollview.scrollTop = sTop - (pTop - tTop);
    } else if (pBottom < (tTop + el.offsetHeight)) {
        scrollview.scrollTop = sTop + tTop - pBottom + Math.min(el.offsetHeight, scrollview.clientHeight);
    }

    if (pLeft > tLeft) {
        scrollview.scrollLeft = sLeft - (pLeft - tLeft);
    } else if (pRight < (tLeft + el.offsetWidth)) {
        scrollview.scrollLeft = sLeft + tLeft - pRight + Math.min(el.offsetWidth, scrollview.clientWidth);
    }
}
