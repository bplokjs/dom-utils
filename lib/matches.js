"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = matches;
function matches(node, selector) {
	if (node === selector) return true;

	const matches = node.matches || node.matchesSelector || node.msMatchesSelector || node.webkitMatchesSelector || node.mozMatchesSelector;
	if (matches) {
		return matches.call(node, selector);
	}

	return null;
}