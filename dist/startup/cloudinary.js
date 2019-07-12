"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _cloudinary = _interopRequireDefault(require("cloudinary"));

_cloudinary["default"].config({
  cloud_name: 'propertyprolite',
  api_key: '239973726994226',
  api_secret: 'PZXi92so5wK9PMPmFUpQ708yjX0'
});

var _default = _cloudinary["default"];
exports["default"] = _default;
//# sourceMappingURL=cloudinary.js.map