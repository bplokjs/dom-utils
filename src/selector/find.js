import matchesSelector from '../matches';
import {
	merge,
	NODE_TYPE_ELEMENT,
	NODE_TYPE_DOCUMENT
} from './utils';

function find( selector, context, results, seed ) {
	let elem, nodeType,
		i = 0;

	results = results || [];
	context = context || document;

	// Same basic safeguard as Sizzle
	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	// Early return if context is not an element or document
	if ( ( nodeType = context.nodeType ) !== NODE_TYPE_ELEMENT && nodeType !== NODE_TYPE_DOCUMENT ) {
		return [];
	}

	if ( seed ) {
		while ( ( elem = seed[ i++ ] ) ) {
			if ( matchesSelector( elem, selector ) ) {
				results.push( elem );
			}
		}
	} else {
		merge( results, context.querySelectorAll( selector ) );
	}

	return results;
}

export default find;