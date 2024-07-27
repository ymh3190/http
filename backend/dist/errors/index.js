"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _badRequest = require("./bad-request");
Object.keys(_badRequest).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _badRequest[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _badRequest[key];
    }
  });
});
var _notFound = require("./not-found");
Object.keys(_notFound).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _notFound[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _notFound[key];
    }
  });
});
var _unauthenticated = require("./unauthenticated");
Object.keys(_unauthenticated).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _unauthenticated[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _unauthenticated[key];
    }
  });
});
var _unauthorized = require("./unauthorized");
Object.keys(_unauthorized).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _unauthorized[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _unauthorized[key];
    }
  });
});