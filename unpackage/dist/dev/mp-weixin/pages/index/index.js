"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_utils = require("../../utils/utils.js");
const server_config = require("../../server/config.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const unreadRows = common_vendor.ref(0);
    common_vendor.onMounted(() => {
      if (!common_vendor.index.getStorageSync("token")) {
        common_vendor.index.showToast({
          title: "请先登录",
          icon: "error"
        });
        setTimeout(() => {
          common_vendor.index.redirectTo({
            url: "/pages/register/register"
          });
        }, 800);
      }
    });
    const toPage = (url) => {
      if (!url) {
        utils_utils.toast("正在施工中...敬请期待");
        return;
      }
      utils_utils.useRouter(url);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(server_config.IMG_URL) + "icon-1.png",
        b: common_vendor.t(unreadRows.value),
        c: common_vendor.unref(server_config.IMG_URL) + "icon-2.png",
        d: common_vendor.unref(server_config.IMG_URL) + "nav-1.png",
        e: common_vendor.o(($event) => toPage("/pages/checkIn/checkIn")),
        f: common_vendor.unref(server_config.IMG_URL) + "nav-2.png",
        g: common_vendor.o(($event) => toPage()),
        h: common_vendor.unref(server_config.IMG_URL) + "nav-3.png",
        i: common_vendor.o(($event) => toPage()),
        j: common_vendor.unref(server_config.IMG_URL) + "nav-4.png",
        k: common_vendor.o(($event) => toPage()),
        l: common_vendor.unref(server_config.IMG_URL) + "nav-5.png",
        m: common_vendor.o(($event) => toPage()),
        n: common_vendor.unref(server_config.IMG_URL) + "nav-6.png",
        o: common_vendor.o(($event) => toPage()),
        p: common_vendor.unref(server_config.IMG_URL) + "nav-7.png",
        q: common_vendor.o(($event) => toPage()),
        r: common_vendor.unref(server_config.IMG_URL) + "nav-8.png",
        s: common_vendor.o(($event) => toPage()),
        t: common_vendor.unref(server_config.IMG_URL) + "nav-9.png",
        v: common_vendor.o(($event) => toPage()),
        w: common_vendor.unref(server_config.IMG_URL) + "nav-10.png",
        x: common_vendor.o(($event) => toPage()),
        y: common_vendor.unref(server_config.IMG_URL) + "nav-11.png",
        z: common_vendor.o(($event) => toPage()),
        A: common_vendor.unref(server_config.IMG_URL) + "nav-12.png",
        B: common_vendor.o(($event) => toPage())
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/86185/Desktop/团队项目代码/time-sync-office/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
