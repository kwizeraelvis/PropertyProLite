"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = _interopRequireDefault(require("../middleware/user/auth"));

var _admin = _interopRequireDefault(require("../middleware/user/admin"));

var _property = require("../controllers/property");

var _validate = _interopRequireDefault(require("../middleware/property/validate"));

var _strict_validate = _interopRequireDefault(require("../middleware/property/strict_validate"));

var _search_property = _interopRequireDefault(require("../middleware/property/search_property"));

var _check_property_id = _interopRequireDefault(require("../middleware/property/check_property_id"));

var _upload = _interopRequireDefault(require("../middleware/property/upload"));

var _validate_update = _interopRequireDefault(require("../middleware/property/validate_update"));

var _auth2 = _interopRequireDefault(require("../middleware/property/auth"));

var router = _express["default"].Router();

router.get('/', [_auth2["default"], _search_property["default"]], _property.getAllProperties);
router.get('/:id', [_check_property_id["default"]], _property.getPropertyById);
router.post('/', [_auth["default"], _validate["default"], _strict_validate["default"], _upload["default"]], _property.postProperty);
router.patch('/:id', [_auth["default"], _validate_update["default"], _strict_validate["default"], _check_property_id["default"]], _property.updateProperty);
router.patch('/:id/sold', [_auth["default"], _check_property_id["default"]], _property.propertySold);
router["delete"]('/:id', [_auth["default"], _admin["default"], _check_property_id["default"]], _property.deleteProperty);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=property.js.map