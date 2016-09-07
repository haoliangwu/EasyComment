$(document).ready(function () {
    bindToComment('#comment', function (result) {
        if (!result.team) {
            setLocalStorage({'team': 'fp'}, function () {
                console.log("Easy Comment initialize team to %s successfully.", 'fixpack');
            });
        }
        else {
            if (result.team == 'qar') {
                alert("Your team setting is QA-R,but the current page is Fix Pack sub-task page, please set team to Fix Pack.")
            }
            else if (result.team == 'fp') {

                getLocalStorage("parameter_fp", function (result) {
                    var obj = result.parameter_fp;
                    var title = $("#summary-val").text();
                    var fix_pack_name = title.match(/portal-\d+-\d+/ig) ? title.match(/portal-\d+-\d+/ig)[0] : "portal-version-branch";
                    var LPE = title.match(/LPE-\d{5}/ig) ? title.match(/LPE-\d{5}/ig)[0] : "LPE-*****";
                    var LPS = title.match(/LPS-\d{5}/ig) ? title.match(/LPS-\d{5}/ig)[0] : "LPS-*****";
                    var portal_branch = obj.portal_branch ? obj.portal_branch : "Portal-Branch";
                    var BPR = "BPR-*****";
                    $(".issue-link.link-title").each(function () {
                        var text = $(this).text();
                        //console.log(text);
                        if (text.match(/BPR-\d{4,5}/ig)) {
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
                    };

                    commentTemplate(template_obj);

                });


            }
            else {
                alert("Please set Your team in right-top setting page.");
            }
        }
    });
});

function commentTemplate(obj) {
    var metadata = {
        LPS: obj.LPS,
        LPE: obj.LPE,
        BPR: obj.BPR,
        fix_pack_name: obj.fix_pack_name,
        fix_pack_name_without_branch: obj.fix_pack_name.match(/portal-\d*/ig),
        portal_branch: obj.portal_branch,
        regression_env: obj.isRegressionStyle ? '+ {the depends on patches}.' : '.'
    }

    comment_compile(metadata, 'fp_obj');
}
