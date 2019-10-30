
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _contains = _interopRequireDefault(require("./contains"));

var _camelCase = _interopRequireDefault(require("./util/camelCase"));

var _typeOf = _interopRequireDefault(require("./util/typeOf"));

var div = document.createElement("div"); // Finish early in limited (non-browser) environments

var clearCloneStyle = true;

if (!div.style) {
  div.style.backgroundClip = "content-box";
  div.cloneNode(true).style.backgroundClip = "";
  clearCloneStyle = div.style.backgroundClip === "content-box";
}

var cssNumber = {
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
    var i = 0,
        map = {},
        len = name.length;

    for (; i < len; i++) {
      map[name[i]] = css(elem, name[i]);
    }

    return map;
  }

  if ((0, _typeOf.default)(name) === 'object') {
    for (var _i in name) {
      css(elem, _i, name[_i]);
    }

    return;
  }

  var type;
  name = (0, _camelCase.default)(name);

  if (arguments.length < 3) {
    var computed = getComputedStyle(elem, null);
    var ret = computed.getPropertyValue(name) || computed[name];

    if (ret === "" && !(0, _contains.default)(elem.ownerDocument, elem)) {
      ret = elem.style[name];
    }

    return ret !== undefined ? // Support: IE <=9 - 11 only
    // IE returns zIndex value as an integer.
    ret + "" : ret;
  }

  if (value !== undefined) {
    type = typeof value; // Make sure that null and NaN values aren't set (#7116)

    if (value == null || value !== value) {
      return;
    } // If a number was passed in, add the unit (except for certain CSS properties)


    if (type === "number") {
      value += cssNumber[name] ? "" : "px";
    } // background-* props affect original clone's values


    if (!clearCloneStyle && value === "" && name.indexOf("background") === 0) {
      elem.style[name] = "inherit";
    }

    elem.style[name] = value;
  }
};