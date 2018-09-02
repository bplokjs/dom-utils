import getScrollParent from './scrollParent';
import offset from './offset';

export default function scrollIntoView(el, scrollParent) {
    const scrollview = scrollParent || getScrollParent(el);

    const pOffset = offset(scrollview);
    const tOffset = offset(el);

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
    } else if (pBottom < (tTop + el.offsetHeight)) {
        top = sTop + tTop - pBottom + Math.min(el.offsetHeight, scrollview.clientHeight);
    }

    if (pLeft > tLeft) {
        left = sLeft - (pLeft - tLeft);
    } else if (pRight < (tLeft + el.offsetWidth)) {
        left = sLeft + tLeft - pRight + Math.min(el.offsetWidth, scrollview.clientWidth);
    }

    scrollview.scrollTop = top;
    scrollview.scrollLeft = left;

    return { left, top };
}
