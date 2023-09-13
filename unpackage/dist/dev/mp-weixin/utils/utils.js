"use strict";
const common_vendor = require("../common/vendor.js");
function toast(title, icon = "none", duration = 1500) {
  if (title) {
    common_vendor.index.showToast({
      title,
      icon,
      duration
    });
  }
}
function clearStorageSync() {
  return common_vendor.index.clearStorageSync();
}
function useRouter(url, params = {}, type = "navigateTo") {
  try {
    if (Object.keys(params).length)
      url = `${url}?data=${encodeURIComponent(JSON.stringify(params))}`;
    if (type === "navigateBack") {
      common_vendor.index[type]({
        delta: url
      });
    } else {
      common_vendor.index[type]({
        url
      });
    }
  } catch (error) {
    console.error(error);
  }
}
exports.clearStorageSync = clearStorageSync;
exports.toast = toast;
exports.useRouter = useRouter;
