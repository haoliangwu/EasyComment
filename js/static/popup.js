define(function (require, exports, module) {
    var $ = require('jquery');
    var comment = require('comment');
    var chromeUtil = require('chromeUtil').chromeLocalStorage;

    $(document).ready(function () {
        init();

        $(".team select").change(function () {
            var value = $(this).val();

            if (value == 'qar') {
                $("#fixpack").hide();
                $("#qa-r").show();
            }
            else {
                $("#qa-r").hide();
                $("#fixpack").show();
            }

            chromeUtil.setLocalStorage({"team": value}, function () {
                console.log("Set team to %s", value);
            });
        });

    });

    function init() {

        init_magic();

        chromeUtil.getLocalStorage('team', function (result) {

            if (result.team) {
                init_custom();
                init_qar();
                init_fixpack();

                $(".team select").val(result.team);
                if (result.team == 'qar') {
                    $("#fixpack").hide();
                    $("#qa-r").show();
                }
                else {
                    $("#qa-r").hide();
                    $("#fixpack").show();
                }
            }
            else {
                chromeUtil.setLocalStorage({"team": "fixpack"}, function () {
                    console.log("Init team to %s and Init setting", "fixpack");
                    init_custom();
                    init_qar();
                    init_fixpack();
                    init();
                });
            }

        });
    }

    function init_qar() {

        var template = comment.templates_qar;

        chromeUtil.getLocalStorage("qar_obj", function (result) {
            if (!result.qar_obj) {

                var obj = {};
                for (var e in template) {
                    obj[e] = {
                        'id': e,
                        'key': e,
                        'des': e,
                        'template': template[e]
                    };
                }

                chromeUtil.setLocalStorage({'qar_obj': obj}, function () {
                    console.log("Initiate fixpack obj to %o successfully.", obj)
                });
            } else {
                //initiate UI

                for (var e in result.qar_obj) {
                    //create element
                    comment.initSmartKeyEntry(result.qar_obj[e], '#qar_basic', 'qar');
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
                $("#qa-r input").keyup(function () {
                    var id = $(this).attr('id');
                    var value = $(this).val();
                    obj[id] = value;
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
                }
                chromeUtil.setLocalStorage({"parameter_qar": parameter_qar}, function () {
                    console.log("Init Parameter_qar %o successfully", parameter_qar)
                })
            }
        });
    }

    function init_fixpack() {

        var template = comment.templates_fp;

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
                    comment.initSmartKeyEntry(result.fp_obj[e], '#fp_basic', 'fp');
                }
            }
        });

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


    }

    function init_custom() {
        chromeUtil.getLocalStorage('custom_obj', function (result) {
            if (!result.custom_obj) {
                chromeUtil.setLocalStorage({'custom_obj': {}}, function () {
                    console.log("Initiate custom obj to %o successfully.", {})
                });
            } else {
                //initiate UI
                for (var e in result.custom_obj) {
                    //create element
                    comment.initSmartKeyEntry(result.custom_obj[e], '#custom_content table', 'custom');
                }
            }
        });
        chromeUtil.getLocalStorage('custom_count', function (result) {
            if (!result.custom_count) {
                chromeUtil.setLocalStorage({'custom_count': 1}, function () {
                    console.log("Initiate custom count to 0 successfully.")
                });
            }

            $('#custom_toggle').click(function () {
                $('#custom_content').toggle();
            });

            $('#custom_new').click(function () {
                comment.initSmartKeyEntry(null,'#custom_content table', 'custom');
            });
        });


    }

    function init_magic() {
        $('#mb_c').click(function () {
            window.open("/options.html?magic=" + 'mb', window);
        });

        $('#other_c').click(function () {
            window.open("/options.html?magic=" + 'other', window);
        });

        $('#ct_c').click(function () {
            window.open("/options.html?magic=" + 'ct', window);
        });

        $('#de_c').click(function () {
            window.open("/options.html?magic=" + 'de', window);
        });
    }
});