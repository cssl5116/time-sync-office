"use strict";
const common_vendor = require("../../common/vendor.js");
const server_message = require("../../server/message.js");
const utils_utils = require("../../utils/utils.js");
const useMessageStore = common_vendor.defineStore("message", {
  state: () => {
    return {
      page: 1,
      length: 15,
      list: [],
      isLastPage: false,
      message: {}
    };
  },
  actions: {
    async loadMessageList() {
      let data = { page: this.page, length: this.length };
      let res = await server_message.loadMessageList(data);
      let { result } = res;
      if (result == null || result.length == 0) {
        this.isLastPage = true;
        this.page = this.page - 1;
        utils_utils.toast("已经到底了");
      } else {
        if (this.page == 1)
          this.list = [];
        this.list = this.list.concat(result);
        if (this.page > 1)
          utils_utils.toast("又加载了" + result.length + "条消息");
      }
    },
    async searchMessageById(id) {
      const res = await server_message.searchMessageById(id);
      this.message = res.result;
    },
    async updateUnreadMessage(id) {
      await server_message.updateUnreadMessage(id);
    },
    async deleteMessageRefById(id) {
      const res = await server_message.deleteMessageRefById(id);
      return res.result;
    }
  }
});
exports.useMessageStore = useMessageStore;
