import typeOf from '../util/typeOf'
import contains from '../contains'
import qsa from '../querySelectorAll'

export default function filterEvents(selector, handler) {
  return function filterHandler(e) {
    let top = e.currentTarget
      , target = e.target
	  , type = typeOf(selector)
      , matches = type === 'string' ? qsa(top, selector) : (type === 'array' || type === 'nodelist') ? [].slice.call(selector) : [selector];
	let length = matches.length;
	while( length && length-- ) {
		const match = matches[length];
		if( contains(match, target) ) {
			handler.call(match, e)
		}
	}
  }
}
