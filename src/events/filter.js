import contains from '../contains';
import qsa from '../querySelectorAll';

export default function filterEvents(selector, handler) {
	return function filterHandler(e) {
		let top = e.currentTarget
			, target = e.target
			, matches = qsa(top, selector);

		if (matches.some(match => contains(match, target)))
			handler.call(this, e)
	}
}

