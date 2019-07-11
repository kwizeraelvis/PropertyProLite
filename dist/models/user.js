"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = validate;
exports.generateAuthToken = generateAuthToken;
exports.users = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("config"));

var users = [];
exports.users = users;

function validate(req) {
  var schema = {
    email: _joi["default"].string().required().email(),
    first_name: _joi["default"].string().required().min(1).max(255),
    last_name: _joi["default"].string().required().min(1).max(255),
    password: _joi["default"].string().required().min(6).max(255),
    phoneNumber: _joi["default"].string().required().min(1).max(25),
    address: _joi["default"].string().required().min(1).max(255),
    isAdmin: _joi["default"]["boolean"]()
  };
  return _joi["default"].validate(req.body, schema);
}

function generateAuthToken(user) {
  return _jsonwebtoken["default"].sign({
    id: user.id,
    isAdmin: user.isAdmin
  }, _config["default"].get('jwtPrivateKey'));
}
//# sourceMappingURL=user.js.map