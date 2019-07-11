"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _config = _interopRequireDefault(require("config"));

// import configFile from '../../config/test';
var _default = function _default() {
  if (!_config["default"].get('jwtPrivateKey')) {
    throw new Error('jwtPrivateKey is not defined');
  }
};

exports["default"] = _default;
//# sourceMappingURL=config.js.map