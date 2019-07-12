"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _search = require("../../helper/search");

var _result = require("../../helper/result");

var _default = function _default(req, res, next) {
  var keys = Object.keys(req.query);

  if (keys.length > 0) {
    var specificProperties = (0, _search.searchPropertiesByType)(keys, req);
    if (specificProperties) return specificProperties.length > 0 ? res.send((0, _result.results)(200, _result.SUCCESS, specificProperties)) : res.status(404).send((0, _result.results)(404, _result.ERROR, 'Properties with the given type cannot be found'));
  }

  next();
};

exports["default"] = _default;
//# sourceMappingURL=search_property.js.map