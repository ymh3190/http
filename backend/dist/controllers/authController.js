"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signup = exports.signin = void 0;
var _errors = require("../errors");
var signup = exports.signup = function signup(req, res) {
  var _req$body = req.body,
    username = _req$body.username,
    password = _req$body.password;
  if (!username || !password) {
    throw new _errors.BadRequestError("Provide username and password");
  }
};
var signin = exports.signin = function signin(req, res) {};