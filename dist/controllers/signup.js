"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _lodash = _interopRequireDefault(require("lodash"));

var _user = require("../models/user");

var _result = require("../helper/result");

var signup =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res) {
    var _validate, error, user, token, salt;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _validate = (0, _user.validate)(req), error = _validate.error;

            if (!error) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.status(400).send((0, _result.results)(_result.ERROR, error.details[0].message)));

          case 3:
            user = _user.users.find(function (user) {
              return user.email === req.body.email;
            });

            if (!user) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(400).send((0, _result.results)(_result.ERROR, 'user already registered.')));

          case 6:
            user = _lodash["default"].pick(req.body, ['first_name', 'last_name', 'email', 'password', 'phoneNumber', 'address', 'isAdmin']);
            user.id = _user.users.length + 1;
            token = (0, _user.generateAuthToken)(user);
            user.token = token;
            _context.next = 12;
            return _bcrypt["default"].genSalt(10);

          case 12:
            salt = _context.sent;
            _context.next = 15;
            return _bcrypt["default"].hash(user.password, salt);

          case 15:
            user.password = _context.sent;

            _user.users.push(user);

            res.header('x-auth-token', token).send((0, _result.results)(_result.SUCCESS, user));

          case 18:
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