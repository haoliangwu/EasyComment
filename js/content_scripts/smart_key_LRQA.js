$(document).ready(function () {

    //chrome.storage.local.get('fp_obj',function(result) {
    //    console.log(result.fp_obj);
    //});


    $("#comment").mouseup(function (e) {
        if (e.ctrlKey&& e.which==1) {
                chrome.storage.local.get('team', function (result) {
                    if (!result.team) {
                        chrome.storage.local.set({'team': 'fixpack'}, function () {
                            console.log("Easy Comment initialize team to %s successfully.",'fixpack');
                        });
                    }
                    else {
                        if (result.team == 'qar') {
                            alert("Your team setting is QA-R,but the current page is Fix Pack sub-task page, please set team to Fix Pack.")
                        }
                        else if (result.team == 'fixpack') {

                            chrome.storage.local.get("parameter_fp", function (result) {
                                var obj = result.parameter_fp;
                                var title = $("#summary-val").text();
                                var fix_pack_name = title.match(/portal-\d{2}-\d{4}/ig) ? title.match(/portal-\d{2}-\d{4}/ig)[0] : "portal-version-branch";
                                var LPE = title.match(/LPE-\d{5}/ig) ? title.match(/LPE-\d{5}/ig)[0] : "LPE-*****";
                                var LPS = title.match(/LPS-\d{5}/ig) ? title.match(/LPS-\d{5}/ig)[0] : "LPS-*****";
                                var portal_branch = obj.portal_branch ? obj.portal_branch : "Portal-Branch";
                                var BPR = "BPR-*****";
                                var a_links = $(".issue-link.link-title").each(function () {
                                    var text = $(this).text();
                                    //console.log(text);
                                    if (text.match(/BPR-\d{4}/ig)) {
                                        BPR = text;
                                    }
                                });

                                var template_obj = {
                                    "LPS": LPS,
                                    "LPE": LPE,
                                    "BPR": BPR,
                                    "isRegressionStyle": obj.isRegressionStyle,
                                    "portal_branch": portal_branch,
                                    "fix_pack_name": fix_pack_name
                                }

                                commentTemplate(template_obj);

                            });


                        }
                        else {
                            alert("Please set Your team in right-top setting page.");
                        }
                    }
                });
        }
    });
});


function convert_selected_fixpack(dictionary) {
    var sel = window.getSelection();
    if (sel.toString() == '') {
        return 0;
    }
    else {
        var $focused = $(":focus");
            $focused.selection().replace(dictionary[sel.toString()], false);
    }
}

function commentTemplate(obj) {
    var LPS = obj.LPS;
    var LPE = obj.LPE;
    var BPR = obj.BPR;
    var fix_pack_name = obj.fix_pack_name;
    var fix_pack_name_without_branch=fix_pack_name.match(/portal-\d*/ig);
    var portal_branch = obj.portal_branch;
    var regression_env = obj.isRegressionStyle ? '+ {the depends on patches}.' : '.';
    var template = {};

    //var template1 = {
    //    "pa": "PASSED Manual Testing for " + LPS + ".\n" +
    //    "\n" +
    //    "Reproduced on:\n" +
    //    portal_branch + ".\n" +
    //    "\n" +
    //    "Passed on:\n" +
    //    portal_branch + " + " + fix_pack_name + ".",
    //
    //    "pacr": "PASSED Manual Testing for " + LPS + ".\n" +
    //    "\n" +
    //    "Cannot be reproduced on:\n" +
    //    portal_branch + regression_env + "\n" +
    //    "Due to this issue is caused by " + LPS + " and " + LPS + " is also in the same patch, so I can't reproduced it.\n" +
    //    "\n" +
    //    "Passed on:\n" +
    //    portal_branch + " + " + fix_pack_name + ".",
    //
    //    "fcr": "FAILED Manual Testing for " + LPS + "(" + BPR + ").\n" +
    //    "\n" +
    //    "Cannot be reproduced on:\n" +
    //    portal_branch + regression_env + "\n",
    //
    //    "f": "FAILED Manual Testing for " + LPS + "(" + BPR + ").\n" +
    //    "\n" +
    //    "Reproduced on:\n" +
    //    portal_branch + regression_env + "\n" +
    //    "\n" +
    //    "Failed on:\n" +
    //    portal_branch + " + " + fix_pack_name + ".",
    //
    //    "ct": "This can't be tested by manual.\n" +
    //    "{code:xml}\nHere is the proof. It can be the comment from the LPS, message from email or Skype.\n{code}",
    //
    //    "rm": "I'll close this sub-task as complete because it is removed from " + fix_pack_name + ".",
    //
    //    "bprc": "Can't reproduce " + LPS + " on " + portal_branch + regression_env + "\n" +
    //    "[No/A] regression was found on " + portal_branch + " + " + fix_pack_name + " by using the steps in " + LPS + ".\n" +
    //    "{Give more information about the regression you have found}",
    //
    //    "bprf": "Fail to test " + LPS + " on " + portal_branch + " + " + fix_pack_name + ".\n" +
    //    LPS + "[can/can't] be reproduced on Portal {portal-head-branch} GIT ID: {GITK}.\n" +
    //    "NOTE: Additional information that you think is helpful. If there is a lot thing you need to add, feel free to add a new comment instead.",
    //
    //    "crv": "The " + LPS + " can't be reproduced on " + portal_branch + ", need another person to verify this again.",
    //
    //    "fv": "The " + LPS + " is failed on " + portal_branch + " + " + fix_pack_name + ", need another person to verify this again.",
    //
    //    "ma": "Send email to developer for help."
    //};

    chrome.storage.local.get('fp_obj',function(result) {
        var obj = result.fp_obj;
        for(var e in obj) {
            var temp=obj[e].template;
            temp=temp.replace(/\$LPS/ig,LPS);
            temp=temp.replace(/\$portal_branch/ig,portal_branch);
            temp=temp.replace(/\$fix_pack_name_without_branch/ig,fix_pack_name_without_branch);
            temp=temp.replace(/\$fix_pack_name/ig,fix_pack_name);
            temp=temp.replace(/\$BPR/ig,BPR);
            temp=temp.replace(/\$regression_env/ig, regression_env);
            template[obj[e].key]=temp;
        }

        chrome.storage.local.get('custom_obj',function(result) {
            var obj=result.custom_obj;
            for(var e in obj) {
                var temp=obj[e].template;
                temp=temp.replace(/\$LPS/ig,LPS);
                temp=temp.replace(/\$portal_branch/ig,portal_branch);
                temp=temp.replace(/\$fix_pack_name_without_branch/ig,fix_pack_name_without_branch);
                temp=temp.replace(/\$fix_pack_name/ig,fix_pack_name);
                temp=temp.replace(/\$BPR/ig,BPR);
                temp=temp.replace(/\$regression_env/ig, regression_env);
                template[obj[e].key]=temp;
            }

            convert_selected_fixpack(template);
        })

    });


}
