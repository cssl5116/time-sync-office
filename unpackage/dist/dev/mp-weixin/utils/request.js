"use strict";
const common_vendor = require("../common/vendor.js");
const utils_utils = require("./utils.js");
const server_config = require("../server/config.js");
const baseRequest = async (url, method = "GET", data = {}, loading = true) => {
  return new Promise((reslove, reject) => {
    loading && common_vendor.index.showLoading({ title: "loading..." });
    common_vendor.index.request({
      url: server_config.BASE_URL + url,
      method,
      header: { "token": common_vendor.index.getStorageSync("token") || "" },
      data,
      success: (successData) => {
        const res = successData.data;
        console.log(successData);
        if (successData.statusCode == 401) {
          common_vendor.index.redirectTo({
            url: "@/pages/login/login"
          });
        } else if (successData.statusCode == 200 && successData.data.code == 200) {
          if (res.hasOwnProperty("token")) {
            let token = res.token;
            console.log(token);
            common_vendor.index.setStorageSync("token", token);
          }
          utils_utils.toast("请求成功", "success");
          reslove(res);
        } else {
          utils_utils.toast(res, "error");
        }
      },
      fail: (msg) => {
        utils_utils.toast("网络连接失败,请稍后重试", "error");
      }
    });
  });
};
const request = {};
["options", "get", "post", "put", "head", "delete", "trace", "connect"].forEach((method) => {
  request[method] = (api, data, loading) => baseRequest(api, method, data, loading);
});
exports.request = request;
