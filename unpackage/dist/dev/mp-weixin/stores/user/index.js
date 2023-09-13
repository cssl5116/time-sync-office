"use strict";
const common_vendor = require("../../common/vendor.js");
const server_user = require("../../server/user.js");
const server_config = require("../../server/config.js");
const utils_utils = require("../../utils/utils.js");
const useUserStore = common_vendor.defineStore("user", {
  state: () => {
    return {
      token: "",
      message: "默认信息"
    };
  },
  getters: {
    // 示例返回大写字符
    capName(state) {
      return state.userInfo.name.toUpperCase();
    }
  },
  actions: {
    async setUserInfo() {
      const res = await server_user.login();
      this.message = res.message;
    },
    async register(userInfo) {
      const res = await server_user.register(userInfo);
      common_vendor.index.uploadFile({
        url: server_config.BASE_URL + "/user/upload/img",
        filePath: userInfo.photo,
        name: "file",
        header: { "token": res.token },
        success(resp) {
          console.log(resp);
          common_vendor.index.navigateTo({
            url: "/pages/login/login"
          });
        },
        fail(err) {
          console.log(err);
          utils_utils.toast("注册失败", "error");
        }
      });
    },
    async login(code) {
      await server_user.login(code);
      common_vendor.index.switchTab({
        url: "/pages/index/index"
      });
    }
  }
});
exports.useUserStore = useUserStore;
