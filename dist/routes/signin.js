"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _signin = _interopRequireDefault(require("../controllers/signin"));

var router = _express["default"].Router();

router.post('/', _signin["default"]);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=signin.js.map