"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _lodash = _interopRequireDefault(require("lodash"));

var _result = require("../helper/result");

var _user = require("../helper/user");

var signup =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res) {
    var user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _user.save)(req);

          case 2:
            user = _context.sent;
            res.header('x-auth-token', user.token).send((0, _result.results)(200, _result.SUCCESS, user));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function signup(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = signup;
exports["default"] = _default;
//# sourceMappingURL=signup.js.map