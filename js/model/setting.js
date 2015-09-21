define(function (require, exports) {
    var $ = require('jquery');
    var chromeUtil = require('chromeUtil').chromeLocalStorage;
    var promise = require('promise');

    //promise demo
    //function asyncfoo() {
    //
    //    setTimeout(function () {
    //        p.done(null, "O hai!");
    //        /* (3) resolve it when ready */
    //    }, 1000);
    //
    //    return p;
    //    /* (2) return it */
    //}
    //
    //p = asyncfoo();
    //
    //p.then(function (error, result) {
    //    if (error) return;
    //    alert(result);
    //});

    exports.init = function () {
        $('#import_export').show()
        $('#setting_export').click(function () {
            setting_export();
        });

        $('#setting_import').click(function () {
        });
    };

    function setting_export() {
        chromeUtil.getLocalStoragePromise('fp_obj').then(
            function (err, result) {
                console.log('1,%o',result);
                return chromeUtil.getLocalStoragePromise('qar_obj')
            }).then(
            function (err, result) {
                console.log('2,%o',result);
            }
        )
    }

    function setting_import() {

    }

    exports.export = function () {

    };

    exports.import = function () {

    };
});