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
  if (!token) return res.status(401).send((0, _result.results)(401, _result.ERROR, 'Access denied, No token provided'));

  try {
    var decoded = _jsonwebtoken["default"].verify(token, process.env.JWT_PRIVATE_KEY);

    req.user = decoded;
    next();
  } catch (ex) {
    // res.status(400).send('Invalid token');
    throw new Error('Invalid token');
  }
};

exports["default"] = _default;
//# sourceMappingURL=auth.js.map