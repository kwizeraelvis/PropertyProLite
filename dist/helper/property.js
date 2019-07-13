"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.properties = exports.deletePropertyHelper = exports.updatePropertyHelper = exports.saveProperty = exports.validateUpdate = exports.strictValidate = exports.validate = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _lodash = _interopRequireDefault(require("lodash"));

var _isUrl = _interopRequireDefault(require("is-url"));

var properties = [];
exports.properties = properties;

var validate = function validate(req) {
  var schema = {
    price: _joi["default"].number().required().min(1000),
    state: _joi["default"].string().required().min(1).max(255),
    city: _joi["default"].string().required().min(1).max(255),
    address: _joi["default"].string().required().min(1).max(255),
    type: _joi["default"].string().required().min(1).max(255),
    image_url: _joi["default"].string().required()
  };
  return _joi["default"].validate(req.body, schema);
};

exports.validate = validate;

var strictValidate = function strictValidate(req) {
  var regex = /^[A-Za-z0-9 ]+$/;
  var keys = Object.keys(req.body);

  for (var _i = 0, _keys = keys; _i < _keys.length; _i++) {
    var key = _keys[_i];

    if (!['price', 'image_url'].includes(key)) {
      if (!regex.test(req.body["".concat(key)])) return {
        error: "".concat(key, " should not have special characters")
      };
      if (!isNaN(req.body["".concat(key)])) return {
        error: "".concat(key, " should not be a number")
      };
    }
  }

  if (req.update) {
    if (req.body.image_url) {
      if (!(0, _isUrl["default"])(req.body.image_url)) return {
        error: 'the url is invalid'
      };
    }
  } else {
    if (!(0, _isUrl["default"])(req.body.image_url)) return {
      error: 'the url is invalid'
    };
  }

  if (req.body.type) {
    for (var _i2 = 0, _properties = properties; _i2 < _properties.length; _i2++) {
      var property = _properties[_i2];

      if (property.type == req.body.type) {
        return {
          error: 'the house already exits'
        };
      }
    }
  }
};

exports.strictValidate = strictValidate;

var validateUpdate = function validateUpdate(req) {
  var schema = {
    price: _joi["default"].number().min(1000),
    state: _joi["default"].string().min(1).max(255),
    city: _joi["default"].string().min(1).max(255),
    address: _joi["default"].string().min(1).max(255),
    type: _joi["default"].string().min(1).max(255),
    image_url: _joi["default"].string()
  };
  return _joi["default"].validate(req.body, schema);
};

exports.validateUpdate = validateUpdate;

var saveProperty = function saveProperty(req) {
  var property = _lodash["default"].pick(req.body, ['price', 'state', 'city', 'address', 'type', 'image_url']);

  property.id = properties.length + 1;
  property.owner = req.user.id;
  property.status = 'available';
  property.created_on = new Date().toLocaleString();
  properties.push(property);
  return property;
};

exports.saveProperty = saveProperty;

var updatePropertyHelper = function updatePropertyHelper(property, req) {
  var keys = Object.keys(property);
  keys.forEach(function (key) {
    if (!['id', 'owner', 'status', 'created_on'].includes(key) && req.body["".concat(key)]) property["".concat(key)] = req.body["".concat(key)];
  });
  return property;
};

exports.updatePropertyHelper = updatePropertyHelper;

var deletePropertyHelper = function deletePropertyHelper(property) {
  var index = properties.indexOf(property);
  properties.splice(index, 1);
  property = {};
  property.message = 'Deleted property successfully';
  return property;
};

exports.deletePropertyHelper = deletePropertyHelper;
//# sourceMappingURL=property.js.map