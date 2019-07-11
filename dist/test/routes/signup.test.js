"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _chai = _interopRequireDefault(require("chai"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("config"));

var _user = require("../../models/user");

var _index = _interopRequireDefault(require("../../index"));

_chai["default"].use(_chaiHttp["default"]);

var expect = _chai["default"].expect,
    request = _chai["default"].request;
describe('auth/signup', function () {
  describe('POST /', function () {
    var user;

    var exec = function exec() {
      return request(_index["default"]).post('/api/v1/auth/signup').send(user);
    };

    beforeEach(function () {
      user = {
        email: 'email@gmail.com',
        first_name: 'a',
        last_name: 'a',
        password: '123456',
        phoneNumber: '1',
        address: 'a',
        isAdmin: true
      };
      _user.users.length = 0;
    });
    it('should return 400 if input is invalid',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee() {
      var res;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              user.password = '1';
              _context.next = 3;
              return exec();

            case 3:
              res = _context.sent;
              expect(res.status).to.equal(400);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    it('should return 400 if user is already registered',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2() {
      var res;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _user.users.push(user);

              _context2.next = 3;
              return exec();

            case 3:
              res = _context2.sent;
              expect(res.status).to.equal(400);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    it('should return 200 if user is registered successfully',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee3() {
      var res, decoded;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return exec();

            case 2:
              res = _context3.sent;
              decoded = _jsonwebtoken["default"].verify(res.body.data.token, _config["default"].get('jwtPrivateKey'));
              expect(res.status).to.equal(200);
              expect(decoded).to.have.property('isAdmin');

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
  });
});
//# sourceMappingURL=signup.test.js.map