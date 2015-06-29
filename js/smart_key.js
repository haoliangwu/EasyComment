$(document).ready(function () {

    var title = $("#summary-val").text();
    var fix_pack_name = title ? title.split(':')[0] : "portal-version-branch";
    var LPE = title ? title.split(':')[1].split('(')[0] : "LPE-*****";
    var LPS = title ? title.split(':')[1].split('(')[1].split(')')[0] : "LPS-*****";

    var dictionary = {
        "pa": "PASSED Manual Testing for " + LPS + ".\n" +
        "\n" +
        "Reproduced on:\n" +
        "6.2.10 EE SP11.\n" +
        "\n" +
        "Passed on:\n" +
        "6.2.10 EE SP11 + " + fix_pack_name + ".",

        "pacr": "PASSED Manual Testing for " + LPS + ".\n" +
        "\n" +
        "Cannot be reproduced on:\n" +
        "6.2.10 EE SP9 + {the depends on patches}.\n" +
        "Due to this issue is caused by " + LPS + " and " + LPS + " is also in the same patch, so I can't reproduced it.\n" +
        "\n" +
        "Passed on:\n" +
        "6.2.10 EE SP11 + " + fix_pack_name + ".",

        "fcr":"FAILED Manual Testing for "+LPS+"(BPR-123).\n"+
            "\n"+
            "Cannot be reproduced on:\n"+
            "6.2.10 EE SP11  + {the depends on patches}.",

        "f":"FAILED Manual Testing for "+LPS+"(BPR-123).\n"+
            "\n"+
            "Reproduced on:\n"+
            "6.2.10 EE SP11 + {the depends on patches}.\n"+
            "\n"+
            "Failed on:\n"+
            "6.2.10 EE SP11 + "+fix_pack_name+".",

        "ct":"This can't be tested by manual.\n"+
            "{code:xml}\nHere is the proof. It can be the comment from the LPS, message from email or Skype.\n{code}",

        "rm":"I'll close this sub-task as complete because it is removed from "+fix_pack_name+".",

        "bprc":"Can't reproduce LPS-123 on {6.2.10 EE SP11/6.1.30 EE GA3 SP4}  + {the depends on patches}.\n"+
            "[No/A] regression was found on {6.2.10 EE SP11/6.1.30 EE GA3 SP4} + "+fix_pack_name+" by using the steps in "+LPS+".\n"+
            "{Give more information about the regression you have found}",

        "bprf":"Fail to test LPS-123 on 6.2.10 EE SP11 + "+fix_pack_name+".\n"+
            LPS+ "[can/can't] be reproduced on Portal ee-6.2.x GIT ID: {GITK}.\n"+
            "NOTE: Additional information that you think is helpful. If there is a lot thing you need to add, feel free to add a new comment instead.",

        "crv":"The "+LPS+" can't be reproduced on 6.2.10 EE SP11, need another person to verify this again.",

        "fv":"The "+LPS+" is failed on 6.2.10 EE SP11 + "+fix_pack_name+", need another person to verify this again.",

        "ma":"Send email to developer for help."
    };

    var team=chrome.storage.local.get('team', function (result) {
        if(!result.team){
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
