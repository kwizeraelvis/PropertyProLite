"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _winston = _interopRequireDefault(require("winston"));

require("express-async-errors");

var _default = function _default() {
  _winston["default"].handleExceptions(new _winston["default"].transports.Console({
    colorize: true,
    prettyPrint: true
  }), new _winston["default"].transports.File({
    filename: 'node_exceptions.log'
  })); // process.on('unhandledRejection', (ex) => {
  //     throw ex;
  // });


  try {
    _winston["default"].add(_winston["default"].transports.File, {
      filename: 'express_exceptions.log'
    });
  } catch (ex) {}
};

exports["default"] = _default;
//# sourceMappingURL=logging.js.map