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
        console.log(successData);
        if (successData.statusCode == 200) {
          const res2 = successData.data;
          utils_utils.toast("请求成功", "success");
          reslove(res2);
        } else if (successData.statusCode == 500) {
          utils_utils.toast(res);
        } else if (successData.statusCode == 401) {
          utils_utils.useRouter("/pages/login/login", "redirectTo");
        } else {
          utils_utils.toast("请求失败", "error");
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
