"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

var _admin = _interopRequireDefault(require("../middleware/admin"));

var _property = require("../controllers/property");

var router = _express["default"].Router();

router.get('/', _property.getAllProperties);
router.get('/:id', _property.getPropertyById);
router.post('/', [_auth["default"]], _property.postProperty);
router.patch('/:id', _auth["default"], _property.updateProperty);
router.patch('/:id/sold', _auth["default"], _property.propertySold);
router["delete"]('/:id', [_auth["default"], _admin["default"]], _property.deleteProperty);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=property.js.map