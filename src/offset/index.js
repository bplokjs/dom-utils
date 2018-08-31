import getOffset from './getOffset';
import setOffset from './setOffset';

export default function offset(elem, options) {
	if (arguments.length < 2) {
		return getOffset(elem);
	} else {
		setOffset(elem, options);
	}
}