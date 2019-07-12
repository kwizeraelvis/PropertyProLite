"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = require("../../helper/user");

var _result = require("../../helper/result");

var _default = function _default(req, res, next) {
  var _validateSignup = (0, _user.validateSignup)(req),
      error = _validateSignup.error;

  if (error) return res.status(400).send((0, _result.results)(400, _result.ERROR, error.details[0].message));
  next();
};

exports["default"] = _default;
//# sourceMappingURL=validate_signup.js.map