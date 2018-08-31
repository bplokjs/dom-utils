import contains from './contains';
import camelCase from './util/camelCase';
import typeOf from './util/typeOf';

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

export default function css(elem, name, value) {
	if (Array.isArray(name)) {
		let i = 0, map = {}, len = name.length;

		for (; i < len; i++) {
			map[name[i]] = css(elem, name[i]);
		}

		return map;
	}

	if (typeOf(name) === 'object') {

		for (let i in name) {
			css(elem, i, name[i]);
		}

		return;
	}

	let type;

	name = camelCase(name);

	if (arguments.length < 3) {
		const computed = getComputedStyle(elem, null);
		let ret = computed.getPropertyValue(name) || computed[name];

		if (ret === "" && !contains(elem.ownerDocument, elem)) {
			ret = elem.style[name];
		}

		return ret !== undefined ?

			// Support: IE <=9 - 11 only
			// IE returns zIndex value as an integer.
			ret + "" :
			ret;
	}

	if (value !== undefined) {
		type = typeof value;
		// Make sure that null and NaN values aren't set (#7116)
		if (value == null || value !== value) {
			return;
		}

		// If a number was passed in, add the unit (except for certain CSS properties)
		if (type === "number") {
			value += (cssNumber[name] ? "" : "px");
		}

		// background-* props affect original clone's values
		if (!clearCloneStyle && value === "" && name.indexOf("background") === 0) {
			elem.style[name] = "inherit";
		}

		elem.style[name] = value;
	}
}