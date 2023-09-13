"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_utils = require("../../utils/utils.js");
const server_config = require("../../server/config.js");
require("../../utils/request.js");
const utils_socket = require("../../utils/socket.js");
const _sfc_main = {
  data() {
    return {
      unreadRows: 0,
      lastRows: 0,
      timer: null,
      calendar: [],
      meetingPage: 1,
      meetingLength: 20,
      meetingList: [],
      isMeetingLastPage: false,
      IMG_URL: server_config.IMG_URL
    };
  },
  methods: {
    toPage(url) {
      if (!url) {
        utils_utils.toast("正在施工中...敬请期待");
        return;
      }
      utils_utils.useRouter(url);
    }
  },
  onLoad: function() {
    let that = this;
    common_vendor.index.$on("showMessage", function() {
      that.$refs.popup.open("top");
    });
  },
  onUnload: function() {
    common_vendor.index.$off("showMessage");
  },
  onShow: function() {
    utils_socket.websocketInit();
    utils_socket.sendMessage(0);
    let that = this;
    utils_socket.websocket.value.onMessage((res) => {
      let resp = JSON.parse(res.data);
      that.unreadRows = resp.unreadRows;
      that.lastRows = resp.lastRows;
      if (that.lastRows > 0) {
        common_vendor.index.$emit("showMessage");
      }
    });
  },
  onHide: () => {
    utils_socket.closeSocket();
  }
};
if (!Array) {
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_popup_message2 + _easycom_uni_popup2)();
}
const _easycom_uni_popup_message = () => "../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_popup_message + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.IMG_URL + "icon-1.png",
    b: common_vendor.t($data.unreadRows),
    c: $data.IMG_URL + "icon-2.png",
    d: common_vendor.o(($event) => $options.toPage("/pages/message_list/message_list")),
    e: $data.IMG_URL + "nav-1.png",
    f: common_vendor.o(($event) => $options.toPage("/pages/checkIn/checkIn")),
    g: $data.IMG_URL + "nav-2.png",
    h: common_vendor.o(($event) => $options.toPage()),
    i: $data.IMG_URL + "nav-3.png",
    j: common_vendor.o(($event) => $options.toPage()),
    k: $data.IMG_URL + "nav-4.png",
    l: common_vendor.o(($event) => $options.toPage()),
    m: $data.IMG_URL + "nav-5.png",
    n: common_vendor.o(($event) => $options.toPage()),
    o: $data.IMG_URL + "nav-6.png",
    p: common_vendor.o(($event) => $options.toPage()),
    q: $data.IMG_URL + "nav-7.png",
    r: common_vendor.o(($event) => $options.toPage()),
    s: $data.IMG_URL + "nav-8.png",
    t: common_vendor.o(($event) => $options.toPage()),
    v: $data.IMG_URL + "nav-9.png",
    w: common_vendor.o(($event) => $options.toPage()),
    x: $data.IMG_URL + "nav-10.png",
    y: common_vendor.o(($event) => $options.toPage()),
    z: $data.IMG_URL + "nav-11.png",
    A: common_vendor.o(($event) => $options.toPage()),
    B: $data.IMG_URL + "nav-12.png",
    C: common_vendor.o(($event) => $options.toPage()),
    D: common_vendor.p({
      type: "success",
      message: "接收到" + $data.lastRows + "条消息",
      duration: 2e3
    }),
    E: common_vendor.sr("popup", "0bd12f1e-0"),
    F: common_vendor.p({
      type: "message"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/fishx/Desktop/team/time-sync-office/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
