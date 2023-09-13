"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_message_index = require("../../stores/message/index.js");
require("../../server/message.js");
require("../../utils/request.js");
require("../../utils/utils.js");
require("../../server/config.js");
const _sfc_main = {
  __name: "message_list",
  setup(__props) {
    const messageStore = stores_message_index.useMessageStore();
    const { page, length, list, isLastPage } = common_vendor.storeToRefs(messageStore);
    common_vendor.onShow(() => {
      page.value = 1;
      isLastPage.value = false;
      common_vendor.index.pageScrollTo({ scrollTop: "0" });
      messageStore.loadMessageList();
    });
    common_vendor.onReachBottom(() => {
      if (isLastPage.value)
        return;
      page.value++;
      messageStore.loadMessageList();
    });
    const toMessage = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/message/message?id=${id}`
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(list), (item, index, i0) => {
          return common_vendor.e({
            a: item.senderName !== "系统消息"
          }, item.senderName !== "系统消息" ? {
            b: common_vendor.s({
              backgroundImage: "url(" + item.senderPhoto + ")"
            })
          } : common_vendor.e({
            c: !item.readFlag
          }, !item.readFlag ? {} : {}), {
            d: common_vendor.t(item.senderName),
            e: common_vendor.t(item.msg),
            f: common_vendor.t(item.sendTime),
            g: common_vendor.o(($event) => toMessage(item.id), index),
            h: common_vendor.n("move-box-" + index),
            i: index,
            j: "move-box-" + index
          });
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/fishx/Desktop/team/time-sync-office/pages/message_list/message_list.vue"]]);
wx.createPage(MiniProgramPage);
