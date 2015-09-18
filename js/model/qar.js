define(function (require, exports, module) {
    var $ = require('jquery');
    var comment = require('comment');
    var chromeUtil = require('chromeUtil').chromeLocalStorage;

    exports.init = function () {
        var template = comment.templates_qar;

        chromeUtil.getLocalStorage("qar_obj", function (result) {
            var e;
            if (!result.qar_obj) {

                var obj = {};
                for (e in template) {
                    if (template.hasOwnProperty(e)) {
                        obj[e] = {
                            'id': e,
                            'key': e,
                            'des': e,
                            'template': template[e]
                        };
                    }
                }

                chromeUtil.setLocalStorage({'qar_obj': obj}, function () {
                    console.log("Initiate fixpack obj to %o successfully.", obj)
                });
            } else {
                //initiate UI
                for (e in result.qar_obj) {
                    //create element
                    if (result.qar_obj.hasOwnProperty(e)) {
                        comment.initSmartKeyEntry(result.qar_obj[e], '#qar_basic', 'qar');
                    }
                }
            }
        });

        chromeUtil.getLocalStorage("parameter_qar", function (result) {
            if (result.parameter_qar) {
                var obj = result.parameter_qar;
                $('#server_master').val(obj.server_master);
                $('#server_61').val(obj.server_61);
                $('#db').val(obj.db);
                $('#x61').val(obj.x61);
                $('#x62').val(obj.x62);
                $('#master').val(obj.master);
                $("input #qa-r").keyup(function () {
                    var id = $(this).attr('id');
                    obj[id] = $(this).val();
                    chromeUtil.setLocalStorage({"parameter_qar": obj}, function () {
                        console.log("Change Parameter_qar obj to %o", obj)
                    })
                });
            }
            else {
                var parameter_qar = {
                    "server": "",
                    "db": "",
                    "x61": "",
                    "x62": "",
                    "master": ""
                };

                chromeUtil.setLocalStorage({"parameter_qar": parameter_qar}, function () {
                    console.log("Init Parameter_qar %o successfully", parameter_qar)
                })
            }
        });
    };
});
