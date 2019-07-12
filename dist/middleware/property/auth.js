"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _result = require("../../helper/result");

var _default = function _default(req, res, next) {
  var token = req.header('x-auth-token');

  try {
    var decoded = _jsonwebtoken["default"].verify(token, process.env.JWT_PRIVATE_KEY);

    req.user = decoded;
    next();
  } catch (ex) {
    next();
  }
};

exports["default"] = _default;
//# sourceMappingURL=auth.js.map