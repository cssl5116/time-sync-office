"use strict";
const utils_request = require("../utils/request.js");
const login = (code) => utils_request.request.post("/user/login", { "code": code });
const register = (userInfo) => utils_request.request.post("/user/register", userInfo);
exports.login = login;
exports.register = register;
