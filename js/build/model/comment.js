'use strict';

define(function (require, exports) {
    var $ = require('jquery');
    var React = require('react');
    var custom = require('custom');
    var fixpack = require('fixpack');
    var qar = require('qar');
    var chromeUtil = require('chromeUtil').chromeLocalStorage;

    //fix pack templates metadata
    var descriptions_fp = {
        pa: 'The sub task is passed due to it can be passed',
        pacr: 'The sub task is passed due to developer\'s reply',
        fcr: 'The sub task is failed due to cannot reproduced',
        f: 'The sub task is failed due to wrong fix',
        ct: 'The sub task cannot be tested by manual.',
        rm: 'Sub task is removed from the Fix Pack.',
        bprc: 'Cannot reproduced comment on BPR tickets.',
        bprf: 'Failed comment on BPR tickets.',
        crv: 'Need others to verify because it cannot be reproduced',
        fv: 'Need others to verify because it is failed.',
        mail: 'Try to mail developers for help.',
        all: 'All the sub tasks are completed.'
    };

    var descriptions_qar = {
        "pani": 'The LPS is passed without instructions.',
        "pai": 'The LPS is passed with instructions.',
        "nlni": 'The LPS is no longer reproduced without instructions.',
        "nli": 'The LPS is no longer reproduced with instructions.',
        "fani": 'The LPS is failed without instructions.',
        "fai": 'The LPS is failed with instructions.',
        "qavr": 'The QA-V LPS could be reproduced.',
        "qavnl": 'The QA-V LPS no longer reproduced.'
    };

    var templates_fp = {
        "pa": "PASSED Manual Testing for " + "$LPS" + ".\n" + "\n" + "Reproduced on:\n" + "$portal_branch" + ".\n" + "\n" + "Passed on:\n" + "$portal_branch" + " + " + "$fix_pack_name" + ".",

        "pacr": "PASSED Manual Testing for " + "$LPS" + ".\n" + "\n" + "Cannot be reproduced on:\n" + "$portal_branch" + "$regression_env" + "\n" + "Due to this issue is caused by " + "$LPS" + " and " + "$LPS" + " is also in the same patch, so I can't reproduced it.\n" + "\n" + "Passed on:\n" + "$portal_branch" + " + " + "$fix_pack_name" + ".",

        "fcr": "FAILED Manual Testing for " + "$LPS" + "(" + "$BPR" + ").\n" + "\n" + "Cannot be reproduced on:\n" + "$portal_branch" + "$regression_env" + "\n",

        "f": "FAILED Manual Testing for " + "$LPS" + "(" + "$BPR" + ").\n" + "\n" + "Reproduced on:\n" + "$portal_branch" + "$regression_env" + "\n" + "\n" + "Failed on:\n" + "$portal_branch" + " + " + "$fix_pack_name" + ".",

        "ct": "This can't be tested by manual.\n" + "{code:xml}\nHere is the proof. It can be the comment from the LPS, message from email or Skype.\n{code}",

        "rm": "I'll close this sub-task as complete because it is removed from " + "$fix_pack_name" + ".",

        "bprc": "Can't reproduce " + "$LPS" + " on " + "$portal_branch" + "$regression_env" + "\n" + "[No/A] regression was found on " + "$portal_branch" + " + " + "$fix_pack_name" + " by using the steps in " + "$LPS" + ".\n" + "{Give more information about the regression you have found}",

        "bprf": "Fail to test " + "$LPS" + " on " + "$portal_branch" + " + " + "$fix_pack_name" + ".\n" + "$LPS" + "[can/can't] be reproduced on Portal {portal-head-branch} GIT ID: {GITK}.\n" + "NOTE: Additional information that you think is helpful. If there is a lot thing you need to add, feel free to add a new comment instead.",

        "crv": "The " + "$LPS" + " can't be reproduced on " + "$portal_branch" + ", need another person to verify this again.",

        "fv": "The " + "$LPS" + " is failed on " + "$portal_branch" + " + " + "$fix_pack_name" + ", need another person to verify this again.",

        "mail": "Send email to developer for help.",

        "all": "All the tickets are passed for manual testing."
    };

    // qa-r templates
    var rep = "$server_master" + " + " + "$db" + ". " + "Portal Master GIT ID: ***.\n" + "$server_62" + " + " + "$db" + ". " + "Portal ee-6.2.x EE GIT ID: ***.\n" + "$server_61" + " + " + "$db" + ". " + "Portal ee-6.1.x EE GIT ID: ***.\n";

    var fix = "$server_master" + " + " + "$db" + ". " + "Portal Master GIT ID: " + "$gitk_master" + ".\n" + "$server_62" + " + " + "$db" + ". " + "Portal ee-6.2.x EE GIT ID: " + "$gitk_62x" + ".\n" + "$server_61r" + " + " + "$db" + ". " + "Portal ee-6.1.x EE GIT ID: " + "$gitk_61x" + ".\n";

    var content = "\n" + "Reproduced on:\n" + rep + "\n" + "Explanation.\n" + "\n" + "Fixed on:\n" + fix + "\n" + "Explanation.\n";

    var content_fail = "\n" + "Reproduced on:\n" + rep + "\n" + "Explanation.\n" + "\n" + "Failed on:\n" + fix + "\n" + "Explanation.\n";

    var templates_qar = {
        "pani": "PASSED Manual Testing using the following steps:\n" + "\n" + "# Step1\n# Step2\n# Step3\n" + content,

        "pai": "PASSED Manual Testing following the steps in the description.\n" + content,

        "nlni": "No Longer Reproducible through Manual Testing using the following steps:\n" + "\n" + "# Step1\n# Step2\n# Step3\n" + content,

        "nli": "No Longer Reproducible through Manual Testing following the steps in the description.\n" + content,

        "fani": "FAILED Manual Testing using the following steps:\n" + "\n" + "# Step1\n# Step2\n# Step3\n" + content_fail,

        "fai": "FAILED Manual Testing following the steps in the description.\n" + content_fail,

        "qavr": "Reproduced on:\n" + rep + "\n" + "Explanation.\n",

        "qavnl": "No Longer Reproducible on:\n" + rep + "\n" + "Explanation.\n"
    };

    //data exports
    exports.templates_fp = templates_fp;
    exports.descriptions_fp = descriptions_fp;
    exports.templates_qar = templates_qar;
    exports.descriptions_qar = descriptions_qar;
});