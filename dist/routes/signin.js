"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _signin = _interopRequireDefault(require("../controllers/signin"));

var _validate_login = _interopRequireDefault(require("../middleware/user/validate_login"));

var _validate_email_login = _interopRequireDefault(require("../middleware/user/validate_email_login"));

var _validate_password = _interopRequireDefault(require("../middleware/user/validate_password"));

var router = _express["default"].Router();

router.post('/', [_validate_login["default"], _validate_email_login["default"], _validate_password["default"]], _signin["default"]);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=signin.js.map