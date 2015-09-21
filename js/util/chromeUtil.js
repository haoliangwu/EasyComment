define(function (require, exports, module) {
    var promise = require('promise');

    exports.chromeLocalStorage = {
        getLocalStorage: function (key, callback) {
            chrome.storage.local.get(key, callback);
        },

        setLocalStorage: function (obj, callback) {
            chrome.storage.local.set(obj, callback);
        },

        getLocalStoragePromise: function (key) {
            var p = new promise.Promise();
            chrome.storage.local.get(key, function (result) {
                p.done(null, result[key]);
            });
            return p;
        }
    }
})
