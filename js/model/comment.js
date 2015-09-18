define(function (require, exports) {
    var $ = require('jquery');
    var chromeUtil = require('chromeUtil').chromeLocalStorage;

    //fix pack templates
    var templates_fp = {
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

        "crv": "The " + "$LPS" + " can't be reproduced on " + "$portal_branch" + ", need another person to verify this again.",

        "fv": "The " + "$LPS" + " is failed on " + "$portal_branch" + " + " + "$fix_pack_name" + ", need another person to verify this again.",

        "mail": "Send email to developer for help.",

        "all": "All the tickets are passed for manual testing."
    };

    // qa-r templates
    var rep = "$server_master" + " + " + "$db" + ". " + "Portal Master GIT ID: ***.\n" +
        "$server_62" + " + " + "$db" + ". " + "Portal ee-6.2.x EE GIT ID: ***.\n" +
        "$server_61" + " + " + "$db" + ". " + "Portal ee-6.1.x EE GIT ID: ***.\n";

    var fix = "$server_master" + " + " + "$db" + ". " + "Portal Master GIT ID: " + "$gitk_master" + ".\n" +
        "$server_62" + " + " + "$db" + ". " + "Portal ee-6.2.x EE GIT ID: " + "$gitk_62x" + ".\n" +
        "$server_61r" + " + " + "$db" + ". " + "Portal ee-6.1.x EE GIT ID: " + "$gitk_61x" + ".\n";

    var content = "\n" +
        "Reproduced on:\n" +
        rep +
        "\n" +
        "Explanation.\n" +
        "\n" +
        "Fixed on:\n" +
        fix +
        "\n" +
        "Explanation.\n";

    var content_fail = "\n" +
        "Reproduced on:\n" +
        rep +
        "\n" +
        "Explanation.\n" +
        "\n" +
        "Failed on:\n" +
        fix +
        "\n" +
        "Explanation.\n";

    var templates_qar = {
        "pani": "PASSED Manual Testing using the following steps:\n" +
        "\n" +
        "# Step1\n# Step2\n# Step3\n" +
        content,

        "pai": "PASSED Manual Testing following the steps in the description.\n" +
        content,

        "nlni": "No Longer Reproducible through Manual Testing using the following steps:\n" +
        "\n" +
        "# Step1\n# Step2\n# Step3\n" +
        content,

        "nli": "No Longer Reproducible through Manual Testing following the steps in the description.\n" +
        content,

        "fani": "FAILED Manual Testing using the following steps:\n" +
        "\n" +
        "# Step1\n# Step2\n# Step3\n" +
        content_fail,

        "fai": "FAILED Manual Testing following the steps in the description.\n" +
        content_fail,

        "qavr": "Reproduced on:\n" +
        rep +
        "\n" +
        "Explanation.\n",

        "qavnl": "No Longer Reproducible on:\n" +
        rep +
        "\n" +
        "Explanation.\n"
    };

    //data exports
    exports.templates_fp = templates_fp;
    exports.templates_qar = templates_qar;

    //function exports
    exports.initSmartKeyEntry = function (obj, selector, team) {
        //Html elements
        var $input1 = $('<input type="text" class="table_input one_input" placeholder="smartkey"/>');
        var $input2 = $('<input type="text" class="table_input two_input" placeholder="description"/>');
        var $save = $('<button type="button" value="save" class=" three_input btn btn-default btn-xs">Save</button>');
        var $more = $('<button type="button" value="more" class=" three_input btn btn-info btn-xs">More</button>');
        var $td1 = $('<td></td>').append($input1);
        var $td2 = $('<td></td>').append($input2);
        var $td3 = $('<td></td>').append($save, $more);
        var $tr = $('<tr></tr>').append($td1, $td2, $td3);

        //Custom Comment Object
        var cc_obj = {
            id: '',
            key: '',
            des: '',
            template: ''
        };

        chromeUtil.getLocalStorage('custom_count', function (result) {
                var count = result.custom_count;

                if (!obj) {
                    $input1.attr('id', count + "_key");
                    $input2.attr('id', count + "_d");

                    chromeUtil.setLocalStorage({'custom_count': ++count}, function () {
                        console.log("Change custom count to %s successfully.", count);
                    });
                }
                else {
                    $input1.attr('id', obj.id + "_key");
                    $input1.val(obj.key);
                    $input2.attr('id', obj.id + "_d");
                    $input2.val(obj.des);
                }

                $(selector).append($tr);

                $save.click(function () {
                    cc_obj.key = $input1.val();
                    cc_obj.key = $input2.val();

                    if (!obj) {
                        chromeUtil.getLocalStorage('custom_obj', function (result) {
                            cc_obj.id = count;

                            var custom_obj = result.custom_obj;
                            custom_obj[count] = cc_obj;

                            chromeUtil.setLocalStorage({'custom_obj': custom_obj}, function () {
                                console.log("Change custom obj to %o successfully.", cc_obj);
                            });
                        });
                    }
                    else {
                        chromeUtil.getLocalStorage(team + '_obj', function (result) {
                            cc_obj.id = obj.id;

                            var custom_obj = result[team + '_obj'];
                            cc_obj.template = custom_obj[obj.id].template;
                            custom_obj[obj.id] = cc_obj;

                            var temp = {};
                            temp[team + '_obj'] = custom_obj;
                            chromeUtil.setLocalStorage(temp, function () {
                                console.log("Change %s obj to %o successfully.", team, cc_obj);
                            });
                        });
                    }
                });

                $more.click(function () {
                    window.open("/options.html?id=" + obj.id + "&team=" + team, window);
                });
            }
        )
    };
});

