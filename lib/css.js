'use strict';

var _contains = require('./contains');

var _contains2 = _interopRequireDefault(_contains);

var _camelCase = require('./util/camelCase');

var _camelCase2 = _interopRequireDefault(_camelCase);

var _typeOf = require('./util/typeOf');

var _typeOf2 = _interopRequireDefault(_typeOf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const div = document.createElement("div");
// Finish early in limited (non-browser) environments
let clearCloneStyle = true;
if (!div.style) {
    div.style.backgroundClip = "content-box";
    div.cloneNode(true).style.backgroundClip = "";
    clearCloneStyle = div.style.backgroundClip === "content-box";
}

const cssNumber = {
    "animationIterationCount": true,
    "columnCount": true,
    "fillOpacity": true,
    "flexGrow": true,
    "flexShrink": true,
    "fontWeight": true,
    "lineHeight": true,
    "opacity": true,
    "order": true,
    "orphans": true,
    "widows": true,
    "zIndex": true,
    "zoom": true
};

module.exports = function css(elem, name, value) {
    if (Array.isArray(name)) {
        let i = 0,
            map = {},
            len = name.length;

        for (; i < len; i++) {
            map[name[i]] = css(elem, name[i]);
        }

        return map;
    }

    if ((0, _typeOf2.default)(name) === 'object') {

        for (let i in name) {
            css(elem, i, name[i]);
        }

        return;
    }

    let type;

    name = (0, _camelCase2.default)(name);

    if (arguments.length < 3) {
        const computed = getComputedStyle(elem, null);
        let ret = computed.getPropertyValue(name) || computed[name];

        if (ret === "" && !(0, _contains2.default)(elem.ownerDocument, elem)) {
            ret = elem.style[name];
        }

        return ret !== undefined ?

        // Support: IE <=9 - 11 only
        // IE returns zIndex value as an integer.
        ret + "" : ret;
    }

    if (value !== undefined) {
        type = typeof value;
        // Make sure that null and NaN values aren't set (#7116)
        if (value == null || value !== value) {
            return;
        }

        // If a number was passed in, add the unit (except for certain CSS properties)
        if (type === "number") {
            value += cssNumber[name] ? "" : "px";
        }

        // background-* props affect original clone's values
        if (!clearCloneStyle && value === "" && name.indexOf("background") === 0) {
            elem.style[name] = "inherit";
        }

        elem.style[name] = value;
    }
};