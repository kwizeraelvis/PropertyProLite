"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _result = require("../../helper/result");

var _cloudinary = _interopRequireDefault(require("../../startup/cloudinary"));

var _default = function _default(req, res, next) {
  if (req.files) {
    var file = req.files.photo;

    _cloudinary["default"].v2.uploader.upload(file.tempFilePath, function (err, result) {
      if (err) res.status(500).send((0, _result.results)(500, _result.ERROR, err));
      req.body.image_url = result.secure_url;
      next();
    });
  } else {
    next();
  }
};

exports["default"] = _default;
//# sourceMappingURL=upload.js.map