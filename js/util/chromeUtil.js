define(function (require, exports, module) {
    exports.chromeLocalStorage = {
        getLocalStorage: function (key, callback) {
            chrome.storage.local.get(key, callback)
        },

        setLocalStorage: function (obj, callback) {
            chrome.storage.local.set(obj, callback);
        }
    }
})
