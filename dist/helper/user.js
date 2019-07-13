"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.users = exports.save = exports.hashPassword = exports.generateAuthToken = exports.validateLogin = exports.strictValidate = exports.validateSignup = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _joi = _interopRequireDefault(require("joi"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _lodash = _interopRequireDefault(require("lodash"));

var users = [];
exports.users = users;

var validateSignup = function validateSignup(req) {
  var schema = {
    email: _joi["default"].string().required().email(),
    first_name: _joi["default"].string().required().min(1).max(255),
    last_name: _joi["default"].string().required().min(1).max(255),
    password: _joi["default"].string().required().min(6).max(255),
    phoneNumber: _joi["default"].number().required().min(10),
    address: _joi["default"].string().required().min(1).max(255),
    isAdmin: _joi["default"]["boolean"]()
  };
  return _joi["default"].validate(req.body, schema);
};

exports.validateSignup = validateSignup;

var strictValidate = function strictValidate(req) {
  var regex = /^[A-Za-z0-9 ]+$/;
  var keys = Object.keys(req.body);

  for (var _i = 0, _keys = keys; _i < _keys.length; _i++) {
    var key = _keys[_i];

    if (!['email', 'password', 'phoneNumber', 'isAdmin'].includes(key)) {
      if (!regex.test(req.body["".concat(key)])) return {
        error: "".concat(key, " should not have special characters")
      };
      if (!isNaN(req.body["".concat(key)])) return {
        error: "".concat(key, " should not be a number")
      };
    }
  }
};

exports.strictValidate = strictValidate;

var validateLogin = function validateLogin(req) {
  var schema = {
    email: _joi["default"].string().required().email(),
    password: _joi["default"].string().required()
  };
  return _joi["default"].validate(req.body, schema);
};

exports.validateLogin = validateLogin;

var generateAuthToken = function generateAuthToken(user) {
  return _jsonwebtoken["default"].sign({
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    isAdmin: user.isAdmin
  }, process.env.JWT_PRIVATE_KEY);
};

exports.generateAuthToken = generateAuthToken;

var hashPassword =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(user) {
    var salt;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _bcrypt["default"].genSalt(10);

          case 2:
            salt = _context.sent;
            _context.next = 5;
            return _bcrypt["default"].hash(user.password, salt);

          case 5:
            return _context.abrupt("return", _context.sent);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function hashPassword(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.hashPassword = hashPassword;

var save =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(req) {
    var user, token;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            user = _lodash["default"].pick(req.body, ['first_name', 'last_name', 'email', 'password', 'phoneNumber', 'address', 'isAdmin']);
            user.id = users.length + 1;
            token = generateAuthToken(user);
            user.token = token;
            _context2.next = 6;
            return hashPassword(user);

          case 6:
            user.password = _context2.sent;
            users.push(user);
            return _context2.abrupt("return", _lodash["default"].pick(user, ['token']));

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function save(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.save = save;
//# sourceMappingURL=user.js.map