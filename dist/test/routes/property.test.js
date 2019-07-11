"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _user = require("../../models/user");

var _property = require("../../models/property");

var _index = _interopRequireDefault(require("../../index"));

_chai["default"].use(_chaiHttp["default"]);

var expect = _chai["default"].expect,
    request = _chai["default"].request;
describe('api/property', function () {
  describe('GET /', function () {
    var user;
    var property;
    var stringQuery;

    var exec = function exec() {
      return request(_index["default"]).get("/api/v1/property".concat(stringQuery));
    };

    beforeEach(function () {
      _user.users.length = 0;
      _property.properties.length = 0;
      user = {
        id: 1,
        email: 'a',
        phoneNumber: '1'
      };
      property = {
        id: 1,
        owner: 1,
        type: 'type',
        state: 'state'
      };

      _user.users.push(user);

      _property.properties.push(property);
    });
    it('should return 200 with a property of a given type it it exists',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee() {
      var res;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              stringQuery = '?type=type&&state=state';
              _context.next = 3;
              return exec();

            case 3:
              res = _context.sent;
              expect(res.status).to.equal(200);
              expect(res.body.data[0]).to.deep.equal(property);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    it('should return 404 if property of a given type does not exists',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2() {
      var res;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              stringQuery = '?type=new';
              _context2.next = 3;
              return exec();

            case 3:
              res = _context2.sent;
              expect(res.status).to.equal(404);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    it('should return all properties ',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee3() {
      var res;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              stringQuery = '';
              _context3.next = 3;
              return exec();

            case 3:
              res = _context3.sent;
              expect(res.status).to.equal(200);
              expect(res.body.data[0].id).to.equal(_property.properties[0].id);

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    it('should return 404 if no properties founded ',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee4() {
      var res;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              stringQuery = '';
              _property.properties.length = 0;
              _context4.next = 4;
              return exec();

            case 4:
              res = _context4.sent;
              expect(res.status).to.equal(404);

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
  });
  describe('GET/:ID /', function () {
    var user;
    var property;

    var exec = function exec() {
      return request(_index["default"]).get('/api/v1/property/1');
    };

    beforeEach(function () {
      _user.users.length = 0;
      _property.properties.length = 0;
      user = {
        id: 1,
        email: 'a',
        phoneNumber: '1'
      };
      property = {
        id: 1,
        owner: 1
      };

      _user.users.push(user);

      _property.properties.push(property);
    });
    it('should return 404 if property with given id is not found',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee5() {
      var res;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _property.properties.length = 0;
              _context5.next = 3;
              return exec();

            case 3:
              res = _context5.sent;
              expect(res.status).to.equal(404);

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
    it('should return property with given id',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee6() {
      var res;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return exec();

            case 2:
              res = _context6.sent;
              expect(res.status).to.equal(200);
              expect(res.body.data.id).to.equal(property.id);

            case 5:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    })));
  });
  describe('POST /', function () {
    var token;
    var property;
    var user;

    var exec = function exec() {
      return request(_index["default"]).post('/api/v1/property').set('x-auth-token', token).send(property);
    };

    beforeEach(function () {
      property = {
        price: 100,
        state: 'New york',
        city: 'Queens',
        address: 'Street 397 PK',
        type: '6 bedrooms',
        image_url: 'some url'
      };
      user = {
        id: 1,
        isAdmin: true
      };
      token = (0, _user.generateAuthToken)(user);
      _property.properties.length = 0;
    });
    it('should return 401 if no token is provided',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee7() {
      var res;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              token = '';
              _context7.next = 3;
              return exec();

            case 3:
              res = _context7.sent;
              expect(res.status).to.equal(401);

            case 5:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    })));
    it('should return 400 if token is invalid',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee8() {
      var res;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              token = 'a';
              _context8.next = 3;
              return exec();

            case 3:
              res = _context8.sent;
              expect(res.status).to.equal(500);

            case 5:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    })));
    it('should return 400 if input is invalid',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee9() {
      var res;
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              property = {};
              _context9.next = 3;
              return exec();

            case 3:
              res = _context9.sent;
              expect(res.status).to.equal(400);

            case 5:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    })));
    it('should return a property if it is saved successfully',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee10() {
      var res;
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return exec();

            case 2:
              res = _context10.sent;
              expect(res.status).to.equal(200);
              expect(res.body.data).to.have.property('id');

            case 5:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    })));
  });
  describe('PATCH/:ID /', function () {
    var token;
    var property;
    var user;

    var exec = function exec() {
      return request(_index["default"]).patch('/api/v1/property/1').set('x-auth-token', token).send(property);
    };

    beforeEach(function () {
      property = {
        price: 1,
        state: 'new state',
        city: 'city',
        address: 'address',
        type: 'type',
        image_url: 'image_url'
      };
      user = {
        id: 1,
        isAdmin: true
      };
      token = (0, _user.generateAuthToken)(user);
      _property.properties.length = 0;
    });
    it('should return 401 if user is not logged in',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee11() {
      var res;
      return _regenerator["default"].wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              token = '';
              _context11.next = 3;
              return exec();

            case 3:
              res = _context11.sent;
              expect(res.status).to.equal(401);

            case 5:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    })));
    it('should return 404 if property with given id is not found',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee12() {
      var res;
      return _regenerator["default"].wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              property = {};
              _context12.next = 3;
              return exec();

            case 3:
              res = _context12.sent;
              expect(res.status).to.equal(404);

            case 5:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    })));
    it('should return updated property if input is valid',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee13() {
      var property, res;
      return _regenerator["default"].wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              property = {
                id: 1,
                state: 'state'
              };

              _property.properties.push(property);

              _context13.next = 4;
              return exec();

            case 4:
              res = _context13.sent;
              expect(res.status).to.equal(200);
              expect(property.state).to.equal('new state');

            case 7:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    })));
  });
  describe('PATCH/:id/sold /', function () {
    var token;
    var property;
    var user;

    var exec = function exec() {
      return request(_index["default"]).patch('/api/v1/property/1/sold').set('x-auth-token', token).send(property);
    };

    beforeEach(function () {
      property = {
        price: 1,
        state: 'new state',
        city: 'city',
        address: 'address',
        type: 'type',
        image_url: 'image_url'
      };
      user = {
        id: 1,
        isAdmin: true
      };
      token = (0, _user.generateAuthToken)(user);
      _property.properties.length = 0;
    });
    it('should return 401 if user is not logged in',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee14() {
      var res;
      return _regenerator["default"].wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              token = '';
              _context14.next = 3;
              return exec();

            case 3:
              res = _context14.sent;
              expect(res.status).to.equal(401);

            case 5:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14);
    })));
    it('should return 404 if property with given id is not found',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee15() {
      var res;
      return _regenerator["default"].wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              property = {};
              _context15.next = 3;
              return exec();

            case 3:
              res = _context15.sent;
              expect(res.status).to.equal(404);

            case 5:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15);
    })));
    it('should return property with sold status',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee16() {
      var property, res;
      return _regenerator["default"].wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              property = {
                id: 1,
                status: 'available'
              };

              _property.properties.push(property);

              _context16.next = 4;
              return exec();

            case 4:
              res = _context16.sent;
              expect(res.status).to.equal(200);
              expect(property.status).to.equal('sold');

            case 7:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16);
    })));
  });
  describe('DELETE /', function () {
    var token;
    var property;
    var user;

    var exec = function exec() {
      return request(_index["default"])["delete"]('/api/v1/property/1').set('x-auth-token', token).send(property);
    };

    beforeEach(function () {
      property = {
        price: 1,
        state: 'new state',
        city: 'city',
        address: 'address',
        type: 'type',
        image_url: 'image_url'
      };
      user = {
        id: 1,
        isAdmin: true
      };
      token = (0, _user.generateAuthToken)(user);
      _property.properties.length = 0;
    });
    it('should return 401 if user is not logged in',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee17() {
      var res;
      return _regenerator["default"].wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              token = '';
              _context17.next = 3;
              return exec();

            case 3:
              res = _context17.sent;
              expect(res.status).to.equal(401);

            case 5:
            case "end":
              return _context17.stop();
          }
        }
      }, _callee17);
    })));
    it('should return 403 if user is not an admin',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee18() {
      var res;
      return _regenerator["default"].wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              user.isAdmin = false;
              token = (0, _user.generateAuthToken)(user);
              _context18.next = 4;
              return exec();

            case 4:
              res = _context18.sent;
              expect(res.status).to.equal(403);

            case 6:
            case "end":
              return _context18.stop();
          }
        }
      }, _callee18);
    })));
    it('should return 404 if property with given id is not found',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee19() {
      var res;
      return _regenerator["default"].wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              property = {};
              _context19.next = 3;
              return exec();

            case 3:
              res = _context19.sent;
              expect(res.status).to.equal(404);

            case 5:
            case "end":
              return _context19.stop();
          }
        }
      }, _callee19);
    })));
    it('should return deleted property',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee20() {
      var property, res;
      return _regenerator["default"].wrap(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              property = {
                id: 1
              };

              _property.properties.push(property);

              _context20.next = 4;
              return exec();

            case 4:
              res = _context20.sent;
              expect(res.status).to.equal(200);
              expect(_property.properties).to.have.length.lessThan(1);

            case 7:
            case "end":
              return _context20.stop();
          }
        }
      }, _callee20);
    })));
  });
});
//# sourceMappingURL=property.test.js.map