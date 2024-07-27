"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _imageController = require("../controllers/imageController");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.route("/").post(_imageController.createImage).get(_imageController.getImages);
router.route("/:id").get(_imageController.getImage);
var _default = exports["default"] = router;