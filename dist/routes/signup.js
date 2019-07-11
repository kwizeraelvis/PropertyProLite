"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _signup = _interopRequireDefault(require("../controllers/signup"));

var router = _express["default"].Router();

router.post('/', _signup["default"]);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=signup.js.map