"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_user_index = require("../../stores/user/index.js");
require("../../server/user.js");
require("../../utils/request.js");
require("../../utils/utils.js");
require("../../server/config.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const modalName = common_vendor.ref("");
    common_vendor.ref("你好哇,再试试");
    const userStore = stores_user_index.useUserStore();
    const { message } = common_vendor.storeToRefs(userStore);
    function showOrHideModal(e) {
      modalName.value = e;
    }
    function login() {
      common_vendor.index.redirectTo({
        url: "../login/login"
      });
    }
    const getData = () => {
      userStore.setUserInfo();
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => showOrHideModal("bottomModal")),
        b: common_vendor.o(login),
        c: common_vendor.o(getData),
        d: common_vendor.o(($event) => showOrHideModal("")),
        e: common_vendor.t(common_vendor.unref(message)),
        f: common_vendor.n(modalName.value == "bottomModal" ? "show" : "")
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/java/time-sync-office/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
