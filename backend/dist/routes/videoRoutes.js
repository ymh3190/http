"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _videoController = require("../controllers/videoController");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.route("/").post(_videoController.createVideo).get(_videoController.getVideos);
router.route("/:id").get(_videoController.getVideo);
var _default = exports["default"] = router;