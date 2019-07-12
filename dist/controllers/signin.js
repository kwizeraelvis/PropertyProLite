"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _result = require("../helper/result");

var _user = require("../helper/user");

var _lodash = _interopRequireDefault(require("lodash"));

var signin =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            req.user.token = (0, _user.generateAuthToken)(req.user);
            req.user = _lodash["default"].pick(req.user, ['token']);
            res.header('x-auth-token', req.user.token).send((0, _result.results)(200, _result.SUCCESS, req.user));

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function signin(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = signin;
exports["default"] = _default;
//# sourceMappingURL=signin.js.map