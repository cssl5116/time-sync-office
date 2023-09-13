"use strict";
const common_vendor = require("../../common/vendor.js");
const server_config = require("../../server/config.js");
const stores_user_index = require("../../stores/user/index.js");
require("../../server/user.js");
require("../../utils/request.js");
require("../../utils/utils.js");
const _sfc_main = {
  __name: "login",
  setup(__props) {
    const userStore = stores_user_index.useUserStore();
    const toRegister = () => {
      common_vendor.index.navigateTo({
        url: "/pages/register/register"
      });
    };
    common_vendor.onMounted(() => {
      if (common_vendor.index.getStorageSync("token")) {
        common_vendor.index.switchTab({
          url: "/pages/index/index"
        });
      }
    });
    const login = () => {
      common_vendor.index.login({
        success(resp) {
          userStore.login(resp.code);
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(server_config.IMG_URL) + "logo-1.png",
        b: common_vendor.o(($event) => login()),
        c: common_vendor.o(($event) => toRegister())
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/fishx/Desktop/team/time-sync-office/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
