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

        chrome.storage.local.set({"team": value}, function () {
            console.log("Set team to %s", value);
        });
    });

})

function init() {

    init_custom();

    chrome.storage.local.get('team', function (result) {

        if (result.team) {
            $(".team select").val(result.team);
            if (result.team == 'qar') {
                $("#fixpack").hide();
                $("#qa-r").show();
                init_qar();
            }
            else {
                $("#qa-r").hide();
                $("#fixpack").show();
                init_fixpack();
            }
        }
        else {
            chrome.storage.local.set({"team": "fixpack"}, function () {
                console.log("Init team to %s", "fixpack");
            });
        }

    });
}

function init_qar() {

    chrome.storage.local.get("parameter_qar", function (result) {
        if (result.parameter_qar) {
            var obj = result.parameter_qar;
            $('#server_master').val(obj.server_master);
            $('#server_61').val(obj.server_61);
            $('#db').val(obj.db);
            $('#x61').val(obj.x61);
            $('#x62').val(obj.x62);
            $('#master').val(obj.master);
            $("#qa_r input").keyup(function () {
                var id = $(this).attr('id');
                var value = $(this).val();
                obj[id] = value;
                chrome.storage.local.set({"parameter_qar": obj}, function () {
                    console.log("Change Parameter_qar obj to %o", obj)
                })
            });
        }
        else {
            var parameter_qar = {
                "server": "Tomcat-7.0.**",
                "db": "MySQL 5.5.**",
                "x61": "***",
                "x62": "***",
                "master": "***"
            }
            chrome.storage.local.set({"parameter_qar": parameter_qar}, function () {
                console.log("Init Parameter_qar %o successfully", parameter_qar)
            })
        }
    });
}

function init_fixpack() {

    chrome.storage.local.get("parameter_fp", function (result) {
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
                chrome.storage.local.set({"parameter_fp": obj}, function () {
                    console.log("Change parameter_fp obj to %o", obj)
                });
            });
            $(".parameter_fixpack input:radio").change(function () {
                var value = $('.parameter_fixpack input:radio:checked').val();
                console.log(value);
                obj.isRegressionStyle = (value == 'y') ? true : false;
                chrome.storage.local.set({"parameter_fp": obj}, function () {
                    console.log("Change parameter_fp obj to %o", obj)
                });
            });
        }
        else {
            var parameter_fp = {
                "portal_branch": "6.2.10 EE SP4",
                "isRegressionStyle": false
            }
            chrome.storage.local.set({"parameter_fp": parameter_fp}, function () {
                console.log("Init parameter_fp %o successfully", parameter_fp)
            })
        }
    });


}

function init_custom() {
    chrome.storage.local.get('custom_obj', function (result) {
        if (!result.custom_obj) {
            chrome.storage.local.set({'custom_obj': {}}, function () {
                console.log("Initiate custom obj to %o successfully.", {})
            });
        } else {
            //initiate UI
            for (var e in result.custom_obj) {
                //create element
                addNewSmartKey(result.custom_obj[e]);
            }
        }
    });
    chrome.storage.local.get('custom_count', function (result) {
        if (!result.custom_count) {
            chrome.storage.local.set({'custom_count': 1}, function () {
                console.log("Initiate custom count to 0 successfully.")
            });
        }

        $('#custom_toggle').click(function () {
            $('#custom_content').toggle();
        });

        $('#custom_new').click(function () {

            addNewSmartKey(null);

        });
    });


}

function addNewSmartKey(obj) {
    var $input1 = $('<input type="text" class="table_input one_input"/>');
    var $input2 = $('<input type="text" class="table_input two_input"/>');
    var $save = $('<input type="button" value="save" class="table_input three_input"/>');
    var $more = $('<input type="button" value="more" class="table_input three_input"/>');

    if (!obj) {

        chrome.storage.local.get('custom_count', function (result) {
            var count = result.custom_count;
            $input1.attr('id', count + "_key");
            $input2.attr('id', count + "_d");

            var $td1 = $('<td></td>').append($input1);
            var $td2 = $('<td></td>').append($input2);
            var $td3 = $('<td></td>').append($save, $more);
            var $tr = $('<tr></tr>').append($td1, $td2, $td3);
            var $table = $('#custom_content table').append($tr);

            chrome.storage.local.set({'custom_count': ++count}, function () {
                console.log("Change custom count to %s successfully.", count);
            });

            $save.click(function () {
                var cc_obj = {
                    "id": count,
                    "key": $input1.val(),
                    "des": $input2.val()
                };

                chrome.storage.local.get('custom_obj', function (result) {

                    var custom_obj = result.custom_obj;
                    custom_obj[count] = cc_obj;

                    chrome.storage.local.set({'custom_obj': custom_obj}, function () {
                        console.log("Change custom obj to %o successfully.", custom_obj);
                        $more.click(function () {
                            location.href = "/options.html?id="+cc_obj.id;
                        });
                    });


                });
            });
        });
    } else {
        chrome.storage.local.get('custom_count', function (result) {
            $input1.attr('id', obj.id + "_key");
            $input1.val(obj.key);
            $input2.attr('id', obj.id + "_d");
            $input2.val(obj.des);

            var $td1 = $('<td></td>').append($input1);
            var $td2 = $('<td></td>').append($input2);
            var $td3 = $('<td></td>').append($save, $more);
            var $tr = $('<tr></tr>').append($td1, $td2, $td3);
            var $table = $('#custom_content table').append($tr);

            $save.click(function () {
                var cc_obj = {
                    "id": obj.id,
                    "key": $input1.val(),
                    "des": $input2.val()
                };

                chrome.storage.local.get('custom_obj', function (result) {

                    var custom_obj = result.custom_obj;
                    custom_obj[obj.id] = cc_obj;

                    chrome.storage.local.set({'custom_obj': custom_obj}, function () {
                        console.log("Change custom obj to %o successfully.", custom_obj);
                    });


                });
            });

            $more.click(function () {
                window.open("/options.html?id=" + obj.id,window);
            });
        });
    }

}