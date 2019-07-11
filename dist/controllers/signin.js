"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _joi = _interopRequireDefault(require("joi"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _user = require("../models/user");

var _result = require("../helper/result");

function validate(req) {
  var schema = {
    email: _joi["default"].string().required().email(),
    password: _joi["default"].string().required()
  };
  return _joi["default"].validate(req.body, schema);
}

var signin =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res) {
    var _validate, error, user, isValid, token;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _validate = validate(req), error = _validate.error;

            if (!error) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.status(400).send((0, _result.results)(_result.ERROR, error.details[0].message)));

          case 3:
            user = _user.users.find(function (user) {
              return user.email === req.body.email;
            });

            if (user) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(400).send((0, _result.results)(_result.ERROR, 'Invalid email')));

          case 6:
            _context.next = 8;
            return _bcrypt["default"].compare(req.body.password, user.password);

          case 8:
            isValid = _context.sent;

            if (isValid) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", res.status(400).send((0, _result.results)(_result.ERROR, 'Invalid password')));

          case 11:
            token = (0, _user.generateAuthToken)(user);
            user.token = token;
            res.header('x-auth-token', token).send((0, _result.results)(_result.SUCCESS, user));

          case 14:
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