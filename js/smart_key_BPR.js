$(document).ready(function () {
    chrome.storage.local.get("portal_branch", function (result) {

        var title = $("#summary-val").text();
        console.log(title);
        console.log(title.match(/portal-\d{2}-\d{4}/ig)[0]);
        var fix_pack_name = title ? title.match(/portal-\d{2}-\d{4}/ig)[0] : "portal-version-branch";
        var LPE = title ? title.match(/LPE-\d{5}/ig)[0]: "LPE-*****";
        var LPS = title ? title.match(/LPS-\d{5}/ig)[0]: "LPS-*****";
        var portal_branch = result.portal_branch ? result.portal_branch : "Portal-Branch";

        var template_obj = {
            "LPS": LPS,
            "LPE": LPE,
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
    var fix_pack_name = obj.fix_pack_name;
    var portal_branch = obj.portal_branch;

    var template = {
        "bprc": "Can't reproduce " + LPS + " on " + portal_branch + "  + {the depends on patches}.\n" +
        "[No/A] regression was found on " + portal_branch + " + " + fix_pack_name + " by using the steps in " + LPS + ".\n" +
        "{Give more information about the regression you have found}",

        "bprf": "Fail to test " + LPS + " on " + portal_branch + " + " + fix_pack_name + ".\n" +
        LPS + "[can/can't] be reproduced on Portal {portal-head-branch} GIT ID: {GITK}.\n" +
        "NOTE: Additional information that you think is helpful. If there is a lot thing you need to add, feel free to add a new comment instead."
    };

    return template;

}
