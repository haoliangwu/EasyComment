$(document).ready(function () {
    chrome.storage.local.get("portal_branch", function (result) {

        var title = $("#summary-val").text();
        var fix_pack_name = title ? title.match(/portal-\d{2}-\d{4}/ig)[0] : "portal-version-branch";
        var LPE = title ? title.match(/LPE-\d{5}/ig)[0]: "LPE-*****";
        var LPS = title ? title.match(/LPS-\d{5}/ig)[0]: "LPS-*****";
        var portal_branch = result.portal_branch ? result.portal_branch : "Portal-Branch";
        var BPR = "BPR-*****";
        var a_links=$(".issue-link.link-title").each(function() {
            var text=$(this).text();
            //console.log(text);
            if(text.match(/BPR-\d{4}/ig)){
                BPR = text;
            }
        });

        var template_obj = {
            "LPS": LPS,
            "LPE": LPE,
            "BPR": BPR,
            "portal_branch": portal_branch,
            "fix_pack_name": fix_pack_name
        }

        var dictionary = commentTemplate(template_obj);

        var team = chrome.storage.local.get('team', function (result) {
            if (!result.team) {
                chrome.storage.local.set({'team': 'fixpack'}, function () {
                    console.log("Easy Comment initialize successfully.");
                });
            }
        });

        $("#comment").keydown(function () {
            if (event.keyCode == 17) {
                $(this).one("mouseup", function () {
                    chrome.storage.local.get('team', function (result) {
                        //console.log(result);
                        if (result.team == 'qar') {

                        }
                        else if (result.team == 'fixpack') {
                            convert_selected_fixpack(dictionary);
                        }
                    });
                });
            }
        });
    });


});


function convert_selected_fixpack(dictionary) {
    var sel = window.getSelection();
    if (sel.toString() == '') {
        return 0;
    }
    else {
        console.log(sel.toString());
        var $focused = $(":focus");
        console.log($focused[0].tagName);
        if (dictionary[sel.toString()])
            $focused.val(dictionary[sel.toString()]);
    }
}

function commentTemplate(obj) {
    var LPS = obj.LPS;
    var LPE = obj.LPE;
    var BPR= obj.BPR;
    var fix_pack_name = obj.fix_pack_name;
    var portal_branch = obj.portal_branch;

    var template = {
        "pa": "PASSED Manual Testing for " + LPS + ".\n" +
        "\n" +
        "Reproduced on:\n" +
        portal_branch + ".\n" +
        "\n" +
        "Passed on:\n" +
        portal_branch + " + " + fix_pack_name + ".",

        "pacr": "PASSED Manual Testing for " + LPS + ".\n" +
        "\n" +
        "Cannot be reproduced on:\n" +
        portal_branch + "+ {the depends on patches}.\n" +
        "Due to this issue is caused by " + LPS + " and " + LPS + " is also in the same patch, so I can't reproduced it.\n" +
        "\n" +
        "Passed on:\n" +
        portal_branch + " + " + fix_pack_name + ".",

        "fcr": "FAILED Manual Testing for " + LPS + "("+BPR+").\n" +
        "\n" +
        "Cannot be reproduced on:\n" +
        portal_branch + " + {the depends on patches}.",

        "f": "FAILED Manual Testing for " + LPS + "("+BPR+").\n" +
        "\n" +
        "Reproduced on:\n" +
        portal_branch + " + {the depends on patches}.\n" +
        "\n" +
        "Failed on:\n" +
        portal_branch + " + " + fix_pack_name + ".",

        "ct": "This can't be tested by manual.\n" +
        "{code:xml}\nHere is the proof. It can be the comment from the LPS, message from email or Skype.\n{code}",

        "rm": "I'll close this sub-task as complete because it is removed from " + fix_pack_name + ".",

        "bprc": "Can't reproduce " + LPS + " on " + portal_branch + "  + {the depends on patches}.\n" +
        "[No/A] regression was found on " + portal_branch + " + " + fix_pack_name + " by using the steps in " + LPS + ".\n" +
        "{Give more information about the regression you have found}",

        "bprf": "Fail to test " + LPS + " on " + portal_branch + " + " + fix_pack_name + ".\n" +
        LPS + "[can/can't] be reproduced on Portal {portal-head-branch} GIT ID: {GITK}.\n" +
        "NOTE: Additional information that you think is helpful. If there is a lot thing you need to add, feel free to add a new comment instead.",

        "crv": "The " + LPS + " can't be reproduced on 6.2.10 EE SP11, need another person to verify this again.",

        "fv": "The " + LPS + " is failed on 6.2.10 EE SP11 + " + fix_pack_name + ", need another person to verify this again.",

        "ma": "Send email to developer for help."
    };

    return template;

}
