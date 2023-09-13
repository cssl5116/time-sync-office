"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_message_index = require("../../stores/message/index.js");
require("../../server/message.js");
require("../../utils/request.js");
require("../../utils/utils.js");
require("../../server/config.js");
const _sfc_main = {
  __name: "message",
  setup(__props) {
    const messageStore = stores_message_index.useMessageStore();
    const { message } = common_vendor.storeToRefs(messageStore);
    let id = "";
    common_vendor.onLoad((option) => {
      id = option.id;
      messageStore.searchMessageById(id);
      if (!message.value.readFlag)
        messageStore.updateUnreadMessage(id);
    });
    const deleteMsg = () => {
      common_vendor.index.showModal({
        title: "温馨提示",
        content: "确认删除此消息?",
        success: function(res) {
          if (res.confirm) {
            messageStore.deleteMessageRefById(id).then((res2) => {
              if (res2)
                common_vendor.index.navigateBack();
            });
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(message).sendTime),
        b: common_vendor.o(deleteMsg),
        c: common_vendor.t(common_vendor.unref(message).msg)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/fishx/Desktop/team/time-sync-office/pages/message/message.vue"]]);
wx.createPage(MiniProgramPage);
