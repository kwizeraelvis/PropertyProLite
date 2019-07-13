"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = require("../../helper/user");

var _result = require("../../helper/result");

var _default = function _default(req, res, next) {
  var user = _user.users.find(function (user) {
    return user.email === req.body.email;
  });

  if (!user) return res.status(400).send((0, _result.results)(400, _result.ERROR, 'Invalid email'));
  req.user = user;
  next();
};

exports["default"] = _default;
//# sourceMappingURL=validate_email_login.js.map