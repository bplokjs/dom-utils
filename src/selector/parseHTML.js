import * as utils from './utils';

const SINGLE_TAG_REGEXP = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/;
const HTML_REGEXP = /<|&#?\w+;/;
const TAG_NAME_REGEXP = /<([\w:-]+)/;
const XHTML_TAG_REGEXP = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi;

const wrapMap = {
  'option': [1, '<select multiple="multiple">', '</select>'],

  'thead': [1, '<table>', '</table>'],
  'col': [2, '<table><colgroup>', '</colgroup></table>'],
  'tr': [2, '<table><tbody>', '</tbody></table>'],
  'td': [3, '<table><tbody><tr>', '</tr></tbody></table>'],
  '_default': [0, '', '']
};

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function jqLiteIsTextNode(html) {
	return !HTML_REGEXP.test(html);
}

function jqLiteBuildFragment(html, context) {
	let tmp, tag, wrap,
			fragment = context.createDocumentFragment(),
			nodes = [], i;

	if (jqLiteIsTextNode(html)) {
		// Convert non-html into a text node
		nodes.push(context.createTextNode(html));
	} else {
		// Convert html into DOM nodes
		tmp = fragment.appendChild(context.createElement('div'));
		tag = (TAG_NAME_REGEXP.exec(html) || ['', ''])[1].toLowerCase();
		wrap = wrapMap[tag] || wrapMap._default;
		tmp.innerHTML = wrap[1] + html.replace(XHTML_TAG_REGEXP, '<$1></$2>') + wrap[2];

		// Descend through wrappers to the right content
		i = wrap[0];
		while (i--) {
			tmp = tmp.lastChild;
		}

		nodes = utils.merge(nodes, tmp.childNodes);

		tmp = fragment.firstChild;
		tmp.textContent = '';
	}

	// Remove wrapper from fragment
	fragment.textContent = '';
	fragment.innerHTML = ''; // Clear inner HTML
	utils.each(nodes, function(i, node) {
		fragment.appendChild(node);
	});

	return fragment;
}

export default function parseHTML(data, context/*, keepScripts*/){
	if ( typeof data !== "string" ) {
		return [];
	}
	
	context = context || window.document;
	let parsed;
	
	if ((parsed = SINGLE_TAG_REGEXP.exec(data))) {
		return [context.createElement(parsed[1])];
	}
	
	if ((parsed = jqLiteBuildFragment(data, context))) {
		return utils.merge( [], parsed.childNodes );
	}
	
	return [];
}