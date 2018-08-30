import matches from './matches';

function _closest(el, s){
	do {
		if (matches(el, s)) return el;
		el = el.parentElement;
	} while (el !== null); 
	return null;
}

export default function closest(node, selector){
	if( node.closest && typeof selector === 'string') {
		return node.closest(selector);	
	} else {
		return _closest(node, selector);	
	}
}