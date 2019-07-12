"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _signup = _interopRequireDefault(require("../controllers/signup"));

var _validate_signup = _interopRequireDefault(require("../middleware/user/validate_signup"));

var _strict_validate = _interopRequireDefault(require("../middleware/user/strict_validate"));

var _validate_email = _interopRequireDefault(require("../middleware/user/validate_email"));

var router = _express["default"].Router();

router.post('/', [_validate_signup["default"], _strict_validate["default"], _validate_email["default"]], _signup["default"]);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=signup.js.map