"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ERROR = exports.SUCCESS = exports.results = void 0;
var SUCCESS = 'success';
exports.SUCCESS = SUCCESS;
var ERROR = 'error';
exports.ERROR = ERROR;

var results = function results(status, message, data) {
  return [SUCCESS, 200].includes(status) ? {
    status: status,
    message: message,
    data: data
  } : {
    status: status,
    message: message,
    error: data
  };
};

exports.results = results;
//# sourceMappingURL=result.js.map