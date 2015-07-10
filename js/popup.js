$(document).ready(function () {

    //chrome.storage.local.get('fp_obj',function(result) {
    //    console.log(result.fp_obj);
    //});

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

    var template = {
        "pa": "PASSED Manual Testing for " + "$LPS" + ".\n" +
        "\n" +
        "Reproduced on:\n" +
        "$portal_branch" + ".\n" +
        "\n" +
        "Passed on:\n" +
        "$portal_branch" + " + " + "$fix_pack_name" + ".",

        "pacr": "PASSED Manual Testing for " + "$LPS" + ".\n" +
        "\n" +
        "Cannot be reproduced on:\n" +
        "$portal_branch" + "$regression_env" + "\n" +
        "Due to this issue is caused by " + "$LPS" + " and " + "$LPS" + " is also in the same patch, so I can't reproduced it.\n" +
        "\n" +
        "Passed on:\n" +
        "$portal_branch" + " + " + "$fix_pack_name" + ".",

        "fcr": "FAILED Manual Testing for " + "$LPS" + "(" + "$BPR" + ").\n" +
        "\n" +
        "Cannot be reproduced on:\n" +
        "$portal_branch" + "$regression_env" + "\n",

        "f": "FAILED Manual Testing for " + "$LPS" + "(" + "$BPR" + ").\n" +
        "\n" +
        "Reproduced on:\n" +
        "$portal_branch" + "$regression_env" + "\n" +
        "\n" +
        "Failed on:\n" +
        "$portal_branch" + " + " + "$fix_pack_name" + ".",

        "ct": "This can't be tested by manual.\n" +
        "{code:xml}\nHere is the proof. It can be the comment from the LPS, message from email or Skype.\n{code}",

        "rm": "I'll close this sub-task as complete because it is removed from " + "$fix_pack_name" + ".",

        "bprc": "Can't reproduce " + "$LPS" + " on " + "$portal_branch" + "$regression_env" + "\n" +
        "[No/A] regression was found on " + "$portal_branch" + " + " + "$fix_pack_name" + " by using the steps in " + "$LPS" + ".\n" +
        "{Give more information about the regression you have found}",

        "bprf": "Fail to test " + "$LPS" + " on " + "$portal_branch" + " + " + "$fix_pack_name" + ".\n" +
        "$LPS" + "[can/can't] be reproduced on Portal {portal-head-branch} GIT ID: {GITK}.\n" +
        "NOTE: Additional information that you think is helpful. If there is a lot thing you need to add, feel free to add a new comment instead.",

        "crv": "The " + "$LPS" + " can't be reproduced on " + "$portal_bracnch" + ", need another person to verify this again.",

        "fv": "The " + "$LPS" + " is failed on " + "$portal_branch" + " + " + "$fix_pack_name" + ", need another person to verify this again.",

        "mail": "Send email to developer for help.",

        "all": "All the tickets are passed for manual testing."
    }

    chrome.storage.local.get("fp_obj", function (result) {
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

            chrome.storage.local.set({'fp_obj': obj}, function () {
                console.log("Initiate fixpack obj to %o successfully.", obj)
            });
        } else {
            //initiate UI

            for (var e in result.fp_obj) {
                //create element
                addNewSmartKey(result.fp_obj[e], '#fixpack table', 'fp');
            }
        }
    });

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
                "portal_branch": "6.2.10 EE SP11",
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
                addNewSmartKey(result.custom_obj[e], '#custom_content table','custom');
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
            addNewSmartKey(null, '#custom_content table', 'custom');
        });
    });


}

function addNewSmartKey(obj, selector, team) {
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
            //var $table = $('#custom_content table').append($tr);
            var $table = $(selector).append($tr);

            chrome.storage.local.set({'custom_count': ++count}, function () {
                console.log("Change custom count to %s successfully.", count);
            });

            $save.click(function () {
                var cc_obj = {
                    "id": count,
                    "key": $input1.val(),
                    "des": $input2.val(),
                    "template": ''
                };

                chrome.storage.local.get('custom_obj', function (result) {

                    var custom_obj = result.custom_obj;
                    custom_obj[count] = cc_obj;

                    chrome.storage.local.set({'custom_obj': custom_obj}, function () {
                        console.log("Change custom obj to %o successfully.", custom_obj);
                        $more.click(function () {
                            window.open("/options.html?id=" + obj.id + "&team=" + team, window);
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
            var $table = $(selector).append($tr);

            $save.click(function () {
                var cc_obj = {
                    "id": obj.id,
                    "key": $input1.val(),
                    "des": $input2.val(),
                    "template": ''
                };

                chrome.storage.local.get(team+'_obj', function (result) {
                    var custom_obj = result[team+'_obj'];
                    cc_obj.template = custom_obj[obj.id].template;
                    custom_obj[obj.id] = cc_obj;
                    var temp={};
                    temp[team+'_obj']=custom_obj;

                    chrome.storage.local.set(temp, function () {
                        console.log("Change custom obj to %o successfully.", cc_obj);
                    });


                });
            });

            $more.click(function () {
                window.open("/options.html?id=" + obj.id + "&team=" + team, window);
            });
        });
    }

}