"use strict";
const common_vendor = require("../../common/vendor.js");
const server_user = require("../../server/user.js");
const useUserStore = common_vendor.defineStore("user", {
  state: () => {
    return {
      userInfo: {},
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
    }
  }
});
exports.useUserStore = useUserStore;
