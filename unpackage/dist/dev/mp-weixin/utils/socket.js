"use strict";
const common_vendor = require("../common/vendor.js");
const server_config = require("../server/config.js");
const websocket = common_vendor.ref();
let isConnection = false;
const websocketInit = () => {
  if (!isConnection) {
    websocket.value = common_vendor.index.connectSocket({
      url: server_config.WS_URL,
      header: { "token": common_vendor.index.getStorageSync("token") },
      success: () => {
        console.log("websocket连接成功");
      },
      fail: () => {
        console.log("websocket连接失败");
        common_vendor.index.showToast({
          title: "websocket连接失败",
          icon: "error",
          duration: 2e3
        });
      }
    });
    websocket.value.onOpen(() => {
      console.log("WebSocket连接正常打开中...！");
      isConnection = true;
    });
    websocket.value.onClose(() => {
      console.log("已经被关闭了");
      isConnection = false;
    });
  }
};
const closeSocket = () => {
  websocket.value.close({
    success(res) {
      console.log("关闭成功", res);
    },
    fail(err) {
      console.log("关闭失败", err);
    }
  });
};
const sendMessage = (value) => {
  console.log("sendMessage(): " + websocket.value.readyState);
  if (websocket.value.readyState === 0) {
    console.log("还在建立连接，请稍等...");
    const interval = setInterval(() => {
      if (websocket.value.readyState === 1) {
        clearInterval(interval);
        websocket.value.send({
          data: value,
          success: () => {
            console.log("消息发送成功");
          }
        });
      }
    }, 1e3);
  } else if (websocket.value.readyState === 1) {
    websocket.value.send({
      data: value,
      success: () => {
        console.log("消息发送成功");
      }
    });
  }
};
exports.closeSocket = closeSocket;
exports.sendMessage = sendMessage;
exports.websocket = websocket;
exports.websocketInit = websocketInit;
