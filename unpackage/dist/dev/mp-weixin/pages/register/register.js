"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_user_index = require("../../stores/user/index.js");
const server_config = require("../../server/config.js");
const utils_utils = require("../../utils/utils.js");
require("../../server/user.js");
require("../../utils/request.js");
const _sfc_main = {
  __name: "register",
  setup(__props) {
    const userStore = stores_user_index.useUserStore();
    const status = common_vendor.ref(false);
    const userInfo = common_vendor.reactive({
      photo: server_config.IMG_URL + "user/132.jpeg",
      nickName: "",
      registerCode: "",
      code: ""
    });
    const register = () => {
      if (userInfo.registerCode == null || userInfo.registerCode.length == 0) {
        utils_utils.toast("邀请码不能为空", "error");
        return;
      } else if (!/^[0-9]{6}$/.test(userInfo.registerCode)) {
        utils_utils.toast("请规范填写邀请码", "error");
        return;
      }
      common_vendor.index.login({
        provider: "weixin",
        //使用微信登录
        success: function(resp) {
          userInfo.code = resp.code;
          status.value = true;
        }
      });
    };
    const chooseavatar = (res) => {
      userInfo.photo = res.detail.avatarUrl;
    };
    const nameInput = (e) => {
      userInfo.nickName = e.detail.value;
    };
    const saveUserInfo = () => {
      console.log(userInfo);
      userStore.register(userInfo);
      status.value = false;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(server_config.IMG_URL) + "logo-2.png",
        b: userInfo.registerCode,
        c: common_vendor.o(($event) => userInfo.registerCode = $event.detail.value),
        d: common_vendor.o(($event) => register()),
        e: userInfo.photo,
        f: common_vendor.o(chooseavatar),
        g: userInfo.nickName,
        h: common_vendor.o(nameInput),
        i: common_vendor.o(nameInput),
        j: common_vendor.o(saveUserInfo),
        k: common_vendor.n(status.value ? "show" : "")
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/86185/Desktop/团队项目代码/time-sync-office/pages/register/register.vue"]]);
wx.createPage(MiniProgramPage);
