"use strict";
const utils_request = require("../utils/request.js");
const loadMessageList = (page) => utils_request.request.post("/message/searchMessageByPage", page, false);
const searchMessageById = (id) => utils_request.request.post(
  "/message/searchMessageById",
  { "id": id },
  false,
  { "Content-Type": "application/x-www-form-urlencoded" }
);
const deleteMessageRefById = (id) => utils_request.request.post(
  "/message/deleteMessageRefById",
  { "id": id },
  false,
  { "Content-Type": "application/x-www-form-urlencoded" }
);
const updateUnreadMessage = (id) => utils_request.request.post(
  "/message/updateUnreadMessage",
  { "id": id },
  false,
  { "Content-Type": "application/x-www-form-urlencoded" }
);
exports.deleteMessageRefById = deleteMessageRefById;
exports.loadMessageList = loadMessageList;
exports.searchMessageById = searchMessageById;
exports.updateUnreadMessage = updateUnreadMessage;
