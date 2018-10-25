import css from './css';

module.exports = function (elem) {
    let doc = elem.ownerDocument
        , offsetParent = elem.offsetParent;

    while (offsetParent && css(offsetParent, 'position') === 'static') {
        offsetParent = offsetParent.offsetParent;
    }

    return offsetParent || doc.documentElement;
}
