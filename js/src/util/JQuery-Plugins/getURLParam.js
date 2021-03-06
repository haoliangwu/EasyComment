define(function (require,exports) {

    var getURLParam = function ($) {
        $.getURLParam = function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return decodeURI(r[2]);
            return null;
        }
    };

    exports.getURLParam = getURLParam;
});
