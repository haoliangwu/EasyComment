var templates = {
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
}

var Comment=function(type, template) {
    this.type=type;
    this.template=template;
};

Comment.prototype={
    render:function(model) {
        console.log(this.template);
    }
}

var test = new Comment('fixpack', templates['pa']);
test.render();