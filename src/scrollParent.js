import css from './css';

module.exports = function scrollPrarent(node, dir = 'y') {
    const position = css(node, 'position')
        , excludeStatic = position === 'absolute'
        , ownerDoc = node.ownerDocument
        , overflowRegex = /(auto|scroll)/;

    if (position === 'fixed')
        return ownerDoc || document;

    while ((node = node.parentNode) && node.nodeType !== 9) {

        const isStatic = excludeStatic && css(node, 'position') === 'static'
            , style = css(node, 'overflow')
                + css(node, 'overflow-' + dir);


        if (isStatic) continue;

        const hasScroll = dir === 'y' ?
            node.scrollHeight - node.clientHeight > 1 :
            node.scrollWidth - node.clientWidth > 1;

        if (overflowRegex.test(style) && hasScroll)
            return node;
    }

    return document;
}
