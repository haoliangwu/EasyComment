define(function (require, exports) {
    var $ = require('jquery');
    var comment = require('comment');
    var chromeUtil = require('chromeUtil').chromeLocalStorage;

    exports.init = function () {
        var template = comment.templates_fp;

        //fixpack comment table module
        chromeUtil.getLocalStorage("fp_obj", function (result) {
            if (!result.fp_obj) {

                var obj = {};
                for (var e in template) {
                    obj[e] = {
                        'id': e,
                        'key': e,
                        'des': e,
                        'template': template[e]
                    };
                }

                chromeUtil.setLocalStorage({'fp_obj': obj}, function () {
                    console.log("Initiate fixpack obj to %o successfully.", obj)
                });
            } else {
                //initiate UI
                for (var e in result.fp_obj) {
                    //create element
                    if (result.fp_obj.hasOwnProperty('key'))
                        comment.initSmartKeyEntry(result.fp_obj[e], '#fp_basic', 'fp');
                }
            }
        });

        //fixpack comment setting module
        chromeUtil.getLocalStorage("parameter_fp", function (result) {
            if (result.parameter_fp) {
                var obj = result.parameter_fp;
                $(".parameter_fixpack select").val(obj.portal_branch);
                if (obj.isRegressionStyle) {
                    $(".parameter_fixpack input:radio:eq(0)").attr('checked', true);
                    $(".parameter_fixpack input:radio:eq(1)").attr('checked', false);
                }
                else {
                    $(".parameter_fixpack input:radio:eq(0)").attr('checked', false);
                    $(".parameter_fixpack input:radio:eq(1)").attr('checked', true);
                }

                $(".parameter_fixpack select").change(function () {
                    var value = $(this).val();
                    obj.portal_branch = value;
                    chromeUtil.setLocalStorage({"parameter_fp": obj}, function () {
                        console.log("Change parameter_fp obj to %o", obj)
                    });
                });
                $(".parameter_fixpack input:radio").change(function () {
                    var value = $('.parameter_fixpack input:radio:checked').val();
                    console.log(value);
                    obj.isRegressionStyle = (value == 'y') ? true : false;
                    chromeUtil.setLocalStorage({"parameter_fp": obj}, function () {
                        console.log("Change parameter_fp obj to %o", obj)
                    });
                });
            }
            else {
                var parameter_fp = {
                    "portal_branch": "6.2.10 EE SP11",
                    "isRegressionStyle": false
                }
                chromeUtil.setLocalStorage({"parameter_fp": parameter_fp}, function () {
                    console.log("Init parameter_fp %o successfully", parameter_fp)
                })
            }
        });
    };
});