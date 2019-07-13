"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressFileupload = _interopRequireDefault(require("express-fileupload"));

var _signup = _interopRequireDefault(require("../routes/signup"));

var _signin = _interopRequireDefault(require("../routes/signin"));

var _property = _interopRequireDefault(require("../routes/property"));

var _error = _interopRequireDefault(require("../middleware/user/error"));

var _default = function _default(app) {
  app.use(_express["default"].json());
  app.use(_express["default"].urlencoded({
    extended: true
  }));
  app.use((0, _expressFileupload["default"])({
    useTempFiles: true
  }));
  app.use('/api/v1/auth/signup', _signup["default"]);
  app.use('/api/v1/auth/signin', _signin["default"]);
  app.use('/api/v1/property', _property["default"]);
  app.use(_error["default"]);
};

exports["default"] = _default;
//# sourceMappingURL=routes.js.map