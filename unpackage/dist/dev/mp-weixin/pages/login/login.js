"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  methods: {
    toRegister() {
      common_vendor.index.navigateTo({
        url: "../register/register"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => _ctx.login && _ctx.login(...args)),
    b: common_vendor.o((...args) => $options.toRegister && $options.toRegister(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/java/time-sync-office/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
