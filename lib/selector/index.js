'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utils = require('./utils');

var utils = _interopRequireWildcard(_utils);

var _domReady = require('./domReady');

var _domReady2 = _interopRequireDefault(_domReady);

var _parseHTML = require('./parseHTML');

var _parseHTML2 = _interopRequireDefault(_parseHTML);

var _find = require('./find');

var _find2 = _interopRequireDefault(_find);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

let rootjQuery;
const rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;

function init(selector, context, root) {
	if (!(this instanceof init)) {
		return new init(selector, context, root);
	}

	if (selector instanceof init) {
		return selector;
	}

	let match, elem;

	// HANDLE: $(""), $(null), $(undefined), $(false)
	if (!selector) {
		//dont call this.constructor(...) !!!
		return this;
	}

	// Method init() accepts an alternate rootjQuery
	// so migrate can support jQuery.sub (gh-2101)
	root = root || rootjQuery;

	// Handle HTML strings
	if (typeof selector === "string") {
		if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {

			// Assume that strings that start and end with <> are HTML and skip the regex check
			match = [null, selector, null];
		} else {
			match = rquickExpr.exec(selector);
		}

		// Match html or make sure no context is specified for #id
		if (match && (match[1] || !context)) {

			// HANDLE: $(html) -> $(array)
			if (match[1]) {
				context = context instanceof init ? context[0] : context;

				// Option to run scripts is true for back-compat
				// Intentionally let the error be thrown if parseHTML is not present
				utils.merge(this, (0, _parseHTML2.default)(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));

				return this;

				// HANDLE: $(#id)
			} else {
				elem = document.getElementById(match[2]);

				if (elem) {

					// Inject the element directly into the jQuery object
					this[0] = elem;
					this.length = 1;
				}
				return this;
			}

			// HANDLE: $(expr, $(...))
		} else if (!context) {
			return root.find(selector);

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
		} else {
			return init(context).find(selector);
		}

		// HANDLE: $(DOMElement)
	} else if (selector.nodeType) {
		this[0] = selector;
		this.length = 1;
		return this;

		// HANDLE: $(function)
		// Shortcut for document ready
	} else if (utils.isFunction(selector)) {
		(0, _domReady2.default)(selector);
	}

	return utils.makeArray(selector, this);
}

init.prototype = {
	constructor: init,
	length: 0,
	push: utils.push,
	sort: [].sort,
	splice: [].splice,
	find: function (selector) {
		let i,
		    ret,
		    len = this.length,
		    self = this;

		ret = this.pushStack([]);

		for (i = 0; i < len; i++) {
			(0, _find2.default)(selector, self[i], ret);
		}

		return ret; //len > 1 ? jQuery.uniqueSort( ret ) : ret;	
	},
	pushStack: function (elems) {
		// Build a new jQuery matched element set
		const ret = utils.merge(init(), elems);

		// Add the old object onto the stack (as a reference)
		//ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	}
};

rootjQuery = new init(document);

exports.default = init;