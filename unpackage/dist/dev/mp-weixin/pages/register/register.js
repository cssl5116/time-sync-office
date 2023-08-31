"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "register",
  setup(__props) {
    const bottomModal = common_vendor.ref(false);
    const register = () => {
      bottomModal.value = true;
    };
    return (_ctx, _cache) => {
      return {
        a: _ctx.code,
        b: common_vendor.o(($event) => _ctx.code = $event.detail.value),
        c: common_vendor.o(register),
        d: common_vendor.o((...args) => _ctx.hideModal && _ctx.hideModal(...args)),
        e: common_vendor.n(bottomModal.value ? "show" : "")
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/java/time-sync-office/pages/register/register.vue"]]);
wx.createPage(MiniProgramPage);
