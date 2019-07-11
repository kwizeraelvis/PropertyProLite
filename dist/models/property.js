"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = validate;
exports.properties = void 0;

var _joi = _interopRequireDefault(require("joi"));

var properties = [];
exports.properties = properties;

function validate(req) {
  var schema = {
    price: _joi["default"].number().required().min(0),
    state: _joi["default"].string().required().min(1).max(255),
    city: _joi["default"].string().required().min(1).max(255),
    address: _joi["default"].string().required().min(1).max(255),
    type: _joi["default"].string().required().min(1).max(255),
    image_url: _joi["default"].string().required()
  };
  return _joi["default"].validate(req.body, schema);
}
//# sourceMappingURL=property.js.map