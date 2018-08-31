import css from './css';

export default function offsetParent(elem) {
	let doc = elem.ownerDocument
		, offsetParent = elem.offsetParent;

	while (offsetParent && css(offsetParent, 'position') === 'static') {
		offsetParent = offsetParent.offsetParent;
	}

	return offsetParent || doc.documentElement;
}
