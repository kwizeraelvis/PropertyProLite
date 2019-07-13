"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchPropertyById = exports.searchProperties = exports.searchPropertiesByType = void 0;

var _property = require("./property");

var _user = require("./user");

var searchPropertiesByType = function searchPropertiesByType(keys, req) {
  var specificProperties = [];
  var isValid = false;

  _property.properties.forEach(function (property) {
    for (var i = 0; i < keys.length; i++) {
      if (property["".concat(keys[i])].toString() === req.query["".concat(keys[i])]) isValid = true;else {
        isValid = false;
        break;
      }
    }

    if (isValid) specificProperties.push(property);
  });

  return specificProperties;
};

exports.searchPropertiesByType = searchPropertiesByType;

var searchProperties = function searchProperties(user) {
  if (user) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      var _loop = function _loop() {
        var property = _step.value;

        var _users$find = _user.users.find(function (user) {
          return user.id === property.owner;
        }),
            email = _users$find.email,
            phoneNumber = _users$find.phoneNumber;

        property.ownerEmail = email;
        property.ownerPhoneNumber = phoneNumber;
      };

      for (var _iterator = _property.properties[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        _loop();
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return _property.properties;
  } else {
    var freshProperties = [];
    freshProperties.length = 0;
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = _property.properties[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var property = _step2.value;
        if (property.status == 'available') freshProperties.push(property);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
          _iterator2["return"]();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    return freshProperties;
  }
};

exports.searchProperties = searchProperties;

var searchPropertyById = function searchPropertyById(property) {
  var _users$find2 = _user.users.find(function (user) {
    return user.id === property.owner;
  }),
      email = _users$find2.email,
      phoneNumber = _users$find2.phoneNumber;

  property.ownerEmail = email;
  property.ownerPhoneNumber = phoneNumber;
  return property;
};

exports.searchPropertyById = searchPropertyById;
//# sourceMappingURL=search.js.map