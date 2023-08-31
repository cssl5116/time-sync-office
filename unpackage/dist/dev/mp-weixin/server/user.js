"use strict";
const utils_request = require("../utils/request.js");
const login = () => utils_request.request.get("/test/sayHello", { name: "张三" });
exports.login = login;
