"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const stores_index = require("./stores/index.js");
if (!Math) {
  "./pages/login/login.js";
  "./pages/index/index.js";
  "./pages/register/register.js";
  "./pages/meeting_list/meeting_list.js";
  "./pages/document/document.js";
  "./pages/contacts/contacts.js";
  "./pages/mine/mine.js";
  "./pages/checkIn/checkIn.js";
  "./pages/message_list/message_list.js";
  "./pages/message/message.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/fishx/Desktop/team/time-sync-office/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(stores_index.pinia);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
