"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(req, res, next) {
  var isAdmin = req.user.isAdmin;
  if (!isAdmin) return res.status(403).send('Access denied, you are not an Admin');
  next();
};

exports["default"] = _default;
//# sourceMappingURL=admin.js.map