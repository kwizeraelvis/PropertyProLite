"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteProperty = exports.propertySold = exports.updateProperty = exports.postProperty = exports.getPropertyById = exports.getAllProperties = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _lodash = _interopRequireDefault(require("lodash"));

var _user = require("../models/user");

var _property = require("../models/property");

var _result = require("../helper/result");

var _cloudinary = _interopRequireDefault(require("../startup/cloudinary"));

var getAllProperties = function getAllProperties(req, res) {
  var keys = Object.keys(req.query);

  if (keys.length > 0) {
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

    return specificProperties.length > 0 ? res.status(200).send((0, _result.results)(200, specificProperties)) : res.status(404).send((0, _result.results)(404, 'Properties with the given type cannot be found'));
  }

  _property.properties.forEach(function (property) {
    var _users$find = _user.users.find(function (user) {
      return user.id === property.owner;
    }),
        email = _users$find.email,
        phoneNumber = _users$find.phoneNumber;

    property.ownerEmail = email;
    property.ownerPhoneNumber = phoneNumber;
  });

  _property.properties.length > 0 ? res.send((0, _result.results)(200, _property.properties)) : res.status(404).send((0, _result.results)(404, 'No properties available'));
};

exports.getAllProperties = getAllProperties;

var getPropertyById = function getPropertyById(req, res) {
  var property = _property.properties.find(function (p) {
    return p.id === parseInt(req.params.id, 10);
  });

  if (!property) return res.status(404).send((0, _result.results)(404, 'Property with the given id does not exists'));

  var _users$find2 = _user.users.find(function (user) {
    return user.id === property.owner;
  }),
      email = _users$find2.email,
      phoneNumber = _users$find2.phoneNumber;

  property.ownerEmail = email;
  property.ownerPhoneNumber = phoneNumber;
  return res.send((0, _result.results)(200, property));
};

exports.getPropertyById = getPropertyById;

var postProperty =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res) {
    var file, _validate, error, property;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!req.files) {
              _context.next = 5;
              break;
            }

            file = req.files.photo;

            _cloudinary["default"].v2.uploader.upload(file.tempFilePath, function (err, result) {
              if (err) res.status(500).send(err);
              res.send(result);
            });

            _context.next = 15;
            break;

          case 5:
            _validate = (0, _property.validate)(req), error = _validate.error;

            if (!error) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", res.status(400).send((0, _result.results)(_result.ERROR, error.details[0].message)));

          case 8:
            property = _lodash["default"].pick(req.body, ['price', 'state', 'city', 'address', 'type', 'image_url']);
            property.id = _property.properties.length + 1;
            property.owner = req.user.id;
            property.status = 'available';
            property.created_on = new Date().toLocaleString();

            _property.properties.push(property);

            res.send((0, _result.results)(_result.SUCCESS, property));

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function postProperty(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.postProperty = postProperty;

var updateProperty =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(req, res) {
    var property, keys;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            property = _property.properties.find(function (p) {
              return p.id === parseInt(req.params.id, 10);
            });

            if (property) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", res.status(404).send((0, _result.results)(_result.ERROR, 'Property with the given id does not exists')));

          case 3:
            keys = Object.keys(property);
            keys.forEach(function (key) {
              if (!['id', 'owner', 'status', 'created_on'].includes(key) && req.body["".concat(key)]) property["".concat(key)] = req.body["".concat(key)];
            });
            res.send((0, _result.results)(_result.SUCCESS, property));

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function updateProperty(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.updateProperty = updateProperty;

var propertySold =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(req, res) {
    var property;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            property = _property.properties.find(function (p) {
              return p.id === parseInt(req.params.id, 10);
            });

            if (property) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return", res.status(404).send((0, _result.results)(_result.ERROR, 'Property with the given id does not exists')));

          case 3:
            property.status = 'sold';
            res.send((0, _result.results)(_result.SUCCESS, property));

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function propertySold(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.propertySold = propertySold;

var deleteProperty =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(req, res) {
    var property, index;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            property = _property.properties.find(function (p) {
              return p.id === parseInt(req.params.id, 10);
            });

            if (property) {
              _context4.next = 3;
              break;
            }

            return _context4.abrupt("return", res.status(404).send((0, _result.results)(_result.ERROR, 'Property with the given id does not exists')));

          case 3:
            index = _property.properties.indexOf(property);

            _property.properties.splice(index, 1);

            property = {};
            property.message = 'Deleted property successfully';
            res.send((0, _result.results)(_result.SUCCESS, property));

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function deleteProperty(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.deleteProperty = deleteProperty;
//# sourceMappingURL=property.js.map