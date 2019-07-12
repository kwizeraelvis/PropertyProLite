"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = require("../../helper/user");

var _result = require("../../helper/result");

var _default = function _default(req, res, next) {
  var error = (0, _user.strictValidate)(req);
  if (error) return res.status(400).send((0, _result.results)(400, _result.ERROR, error));
  next();
};

exports["default"] = _default;
//# sourceMappingURL=strict_validate.js.map