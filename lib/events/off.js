'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

let off = function () {
	if (document.addEventListener) return (node, eventName, handler, capture) => node.removeEventListener(eventName, handler, capture || false);else if (document.attachEvent) return (node, eventName, handler) => node.detachEvent('on' + eventName, handler);
}();

exports.default = off;