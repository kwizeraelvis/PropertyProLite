"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _winston = _interopRequireDefault(require("winston"));

var _result = require("../../helper/result");

// eslint-disable-next-line no-unused-vars
var _default = function _default(err, req, res, next) {
  _winston["default"].error(err.message);

  res.status(500).send((0, _result.results)(500, _result.ERROR, err));
};

exports["default"] = _default;
//# sourceMappingURL=error.js.map