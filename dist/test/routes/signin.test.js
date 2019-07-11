"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("config"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _user = require("../../models/user");

var _index = _interopRequireDefault(require("../../index"));

_chai["default"].use(_chaiHttp["default"]);

var expect = _chai["default"].expect,
    request = _chai["default"].request;
describe('auth/signin', function () {
  describe('POST /', function () {
    var user;

    var exec = function exec() {
      return request(_index["default"]).post('/api/v1/auth/signin').send(user);
    };

    beforeEach(function () {
      user = {
        email: 'email@gmail.com',
        password: '123456'
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
              user = {};
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
    it('should return 400 if email is invalid',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2() {
      var user, res;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              user = {
                email: 'a@gmail.com'
              };

              _user.users.push(user);

              _context2.next = 4;
              return exec();

            case 4:
              res = _context2.sent;
              expect(res.status).to.equal(400);

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    it('should return 400 if password is invalid',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee3() {
      var res;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _user.users.push(user);

              _context3.next = 3;
              return exec();

            case 3:
              res = _context3.sent;
              expect(res.status).to.equal(400);

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    it('should return 200 if user is logged in successfully',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee4() {
      var user, salt, res, decoded;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              user = {
                email: 'email@gmail.com',
                password: '123456',
                id: 1,
                isAdmin: true
              };
              _context4.next = 3;
              return _bcrypt["default"].genSalt(10);

            case 3:
              salt = _context4.sent;
              _context4.next = 6;
              return _bcrypt["default"].hash(user.password, salt);

            case 6:
              user.password = _context4.sent;

              _user.users.push(user);

              _context4.next = 10;
              return exec();

            case 10:
              res = _context4.sent;
              decoded = _jsonwebtoken["default"].verify(res.body.data.token, _config["default"].get('jwtPrivateKey'));
              expect(res.status).to.equal(200);
              expect(decoded).to.have.property('isAdmin');

            case 14:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
  });
});
//# sourceMappingURL=signin.test.js.map