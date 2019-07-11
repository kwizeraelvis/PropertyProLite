"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _helmet = _interopRequireDefault(require("helmet"));

var _compression = _interopRequireDefault(require("compression"));

var _default = function _default(app) {
  app.use((0, _helmet["default"])());
  app.use((0, _compression["default"])());
};

exports["default"] = _default;
//# sourceMappingURL=prod.js.map