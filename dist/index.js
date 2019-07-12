"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _logging = _interopRequireDefault(require("./startup/logging"));

var _config = _interopRequireDefault(require("./startup/config"));

var _routes = _interopRequireDefault(require("./startup/routes"));

var _prod = _interopRequireDefault(require("./startup/prod"));

var app = (0, _express["default"])();
(0, _logging["default"])();
(0, _config["default"])();
(0, _routes["default"])(app);
(0, _prod["default"])(app);
var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
  return console.log("listening to port ".concat(port, "...."));
});
var _default = server; // TO DO: uncomment logging unhandled rejection

exports["default"] = _default;
//# sourceMappingURL=index.js.map