$(document).ready(function () {
    bindToComment('#comment', function (result) {
        if (!result.team) {
            setLocalStorage({'team': 'fixpack'}, function () {
                console.log("Easy Comment initialize team to %s successfully.", 'fixpack');
            });
        }
        else {
            if (result.team == 'qar') {
                alert("Your team setting is QA-R,but the current page is Fix Pack sub-task page, please set team to Fix Pack.")
            }
            else if (result.team == 'fixpack') {

                getLocalStorage("parameter_fp", function (result) {
                    var obj = result.parameter_fp;
                    var title = $("#summary-val").text();
                    var fix_pack_name = title.match(/portal-\d{2}-\d{4}/ig) ? title.match(/portal-\d{2}-\d{4}/ig)[0] : "portal-version-branch";
                    var LPE = title.match(/LPE-\d{5}/ig) ? title.match(/LPE-\d{5}/ig)[0] : "LPE-*****";
                    var LPS = title.match(/LPS-\d{5}/ig) ? title.match(/LPS-\d{5}/ig)[0] : "LPS-*****";
                    var portal_branch = obj.portal_branch ? obj.portal_branch : "Portal-Branch";
                    var BPR = "BPR-*****";
                    $(".issue-link.link-title").each(function () {
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
    var LPS = obj.LPS;
    var LPE = obj.LPE;
    var BPR = obj.BPR;
    var fix_pack_name = obj.fix_pack_name;
    var fix_pack_name_without_branch = fix_pack_name.match(/portal-\d*/ig);
    var portal_branch = obj.portal_branch;
    var regression_env = obj.isRegressionStyle ? '+ {the depends on patches}.' : '.';
    var template = {};

    getLocalStorage('fp_obj', function (result) {
        var obj = result.fp_obj;
        for (var e in obj) {
            if (obj.hasOwnProperty(e)) {
                var temp = obj[e].template;
                temp = temp.replace(/\$LPS/ig, LPS);
                temp = temp.replace(/\$portal_branch/ig, portal_branch);
                temp = temp.replace(/\$fix_pack_name_without_branch/ig, fix_pack_name_without_branch);
                temp = temp.replace(/\$fix_pack_name/ig, fix_pack_name);
                temp = temp.replace(/\$BPR/ig, BPR);
                temp = temp.replace(/\$regression_env/ig, regression_env);
                template[obj[e].key] = temp;
            }
        }

        getLocalStorage('custom_obj', function (result) {
            var obj = result.custom_obj;
            for (var e in obj) {
                if (obj.hasOwnProperty(e)) {
                    var temp = obj[e].template;
                    temp = temp.replace(/\$LPS/ig, LPS);
                    temp = temp.replace(/\$portal_branch/ig, portal_branch);
                    temp = temp.replace(/\$fix_pack_name_without_branch/ig, fix_pack_name_without_branch);
                    temp = temp.replace(/\$fix_pack_name/ig, fix_pack_name);
                    temp = temp.replace(/\$BPR/ig, BPR);
                    temp = temp.replace(/\$regression_env/ig, regression_env);
                    template[obj[e].key] = temp;
                }
            }

            convert_selected_fixpack(template);
        })

    });


}
