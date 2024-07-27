"use strict";

require("dotenv/config");
var _express = _interopRequireDefault(require("express"));
require("express-async-errors");
var _helmet = _interopRequireDefault(require("helmet"));
var _cors = _interopRequireDefault(require("cors"));
var _authRoutes = _interopRequireDefault(require("./routes/authRoutes"));
var _imageRoutes = _interopRequireDefault(require("./routes/imageRoutes"));
var _videoRoutes = _interopRequireDefault(require("./routes/videoRoutes"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var app = (0, _express["default"])();
app.set("trust proxy", 1);
app.use((0, _helmet["default"])());
app.use((0, _cors["default"])());
app.use(_express["default"].json());
app.use("/api/v1/auth", _authRoutes["default"]);
app.use("/api/v1/videos", _videoRoutes["default"]);
app.use("/api/v1/images", _imageRoutes["default"]);
var port = process.env.PORT || 4999;
app.listen(port, function () {
  console.log("Server is listening port ".concat(port));
});