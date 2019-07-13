"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteProperty = exports.propertySold = exports.updateProperty = exports.postProperty = exports.getPropertyById = exports.getAllProperties = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _lodash = _interopRequireDefault(require("lodash"));

var _result = require("../helper/result");

var _property = require("../helper/property");

var _search = require("../helper/search");

var getAllProperties = function getAllProperties(req, res) {
  var properties = (0, _search.searchProperties)(req.user);
  properties.length > 0 ? res.send((0, _result.results)(200, _result.SUCCESS, properties)) : res.status(404).send((0, _result.results)(404, _result.ERROR, 'No properties available'));
};

exports.getAllProperties = getAllProperties;

var getPropertyById = function getPropertyById(req, res) {
  var property = (0, _search.searchPropertyById)(req.property);
  return res.send((0, _result.results)(200, _result.SUCCESS, property));
};

exports.getPropertyById = getPropertyById;

var postProperty =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res) {
    var property;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            property = (0, _property.saveProperty)(req);
            res.send((0, _result.results)(200, _result.SUCCESS, property));

          case 2:
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
    var property;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            property = (0, _property.updatePropertyHelper)(req.property, req);
            res.send((0, _result.results)(200, _result.SUCCESS, property));

          case 2:
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
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            req.property.status = 'sold';
            res.send((0, _result.results)(200, _result.SUCCESS, req.property));

          case 2:
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
    var property;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            property = (0, _property.deletePropertyHelper)(req.property);
            res.send((0, _result.results)(200, _result.SUCCESS, property));

          case 2:
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