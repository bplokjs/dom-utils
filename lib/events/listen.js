'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = listen;

var _on = require('./on');

var _on2 = _interopRequireDefault(_on);

var _off = require('./off');

var _off2 = _interopRequireDefault(_off);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function listen(node, eventName, handler, capture) {
    (0, _on2.default)(node, eventName, handler, capture);
    return () => {
        (0, _off2.default)(node, eventName, handler, capture);
    };
}