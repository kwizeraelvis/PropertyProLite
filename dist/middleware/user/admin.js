"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _result = require("../../helper/result");

var _default = function _default(req, res, next) {
  var isAdmin = req.user.isAdmin;
  if (!isAdmin) return res.status(403).send((0, _result.results)(403, _result.ERROR, 'Access denied, you are not an Admin'));
  next();
};

exports["default"] = _default;
//# sourceMappingURL=admin.js.map