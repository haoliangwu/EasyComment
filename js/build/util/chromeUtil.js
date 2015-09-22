define(function (require, exports, module) {
    var promise = require('promise');

    exports.chromeLocalStorage = {
        getLocalStorage: function (key, callback) {
            chrome.storage.local.get(key, callback);
        },

        getLocalStorageSync: function (key) {
            var p = new promise.Promise();

            chrome.storage.local.get(key, function (result) {
                p.done(null, result[key]);
            })

            return p;
        },

        setLocalStorage: function (obj, callback) {
            chrome.storage.local.set(obj, callback);
        },

        setLocalStorageSync: function (obj) {
            var p = new promise.Promise();

            chrome.storage.local.set(obj, function () {
                console.log('Setting %o finished..', obj);
                p.done();
            })

            return p;
        },

        removeLocalStroageAll: function (callback) {
            chrome.storage.local.clear(callback);
        },

        removeLocalStroageAllSync: function () {
            var p=new promise.Promise();
            chrome.storage.local.clear();

            console.log('Cleaning original setting..')
            p.done();
            return p;
        },

        removeLocalStroageByKey: function (keys, callback) {
            chrome.storage.local.remove(keys, callback);
        }
    }
})
