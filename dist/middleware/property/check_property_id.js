"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _property = require("../../helper/property");

var _result = require("../../helper/result");

var _default = function _default(req, res, next) {
  var property = _property.properties.find(function (p) {
    return p.id === parseInt(req.params.id, 10);
  });

  if (!property) return res.status(404).send((0, _result.results)(404, _result.ERROR, 'Property with the given id does not exists'));
  req.property = property;
  next();
};

exports["default"] = _default;
//# sourceMappingURL=check_property_id.js.map