$(document).ready(function () {

    $('#comment').mouseup(function (e) {
        if (e.ctrlKey && e.which == 1) {
            chrome.storage.local.get('team', function (result) {
                if (!result.team) {
                    chrome.storage.local.set({'team': 'qar'}, function () {
                        console.log("Easy Comment initialize team to %s successfully.", 'qar');
                    });
                }
                else {
                    if (result.team == 'fixpack') {
                        alert("Your team setting is fixpack,but the current page is qa-r LPS page, please set team to qa-r.");
                    }
                    else if (result.team == 'qar') {
                        chrome.storage.local.get("parameter_qar", function (result) {
                            var obj = result.parameter_qar;
                            commentTemplate(obj);
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
    var server_master = obj.server_master ? obj.server_master : '{Master-server}';
    var server_61 = obj.server_61 ? obj.server_61 : '{61-server}';
    var db = obj.db != '' ? obj.db : 'MySQL 5.5.xx';
    var gitk_master = obj.master != '' ? obj.master : 'GIT ID of master branch';
    var gitk_62x = obj.x62 != '' ? obj.x62 : 'GIT ID of 62 branch';
    var gitk_61x = obj.x61 != '' ? obj.x61 : 'GIT ID of 61 branch';
    var template = {};

    chrome.storage.local.get('qar_obj', function (result) {
        var obj = result.qar_obj;

        for (var e in obj) {
            var temp = obj[e].template;
            temp = temp.replace(/\$server_master/ig, server_master);
            temp = temp.replace(/\$server_62/ig, server_master);
            temp = temp.replace(/\$server_61/ig, server_61);
            temp = temp.replace(/\$gitk_master/ig, gitk_master);
            temp = temp.replace(/\$gitk_62x/ig, gitk_62x);
            temp = temp.replace(/\$gitk_61x/ig, gitk_61x);
            temp = temp.replace(/\$db/ig, db);
            template[obj[e].key] = temp;
        }
        chrome.storage.local.get('custom_obj', function (result) {
            var obj = result.custom_obj;
            for (var e in obj) {
                var temp = obj[e].template;
                temp = temp.replace(/\$server_master/ig, server_master);
                temp = temp.replace(/\$server_62/ig, server_master);
                temp = temp.replace(/\$server_61/ig, server_61);
                temp = temp.replace(/\$gitk_master/ig, gitk_master);
                temp = temp.replace(/\$gitk_62x/ig, gitk_62x);
                temp = temp.replace(/\$gitk_61x/ig, gitk_61x);
                temp = temp.replace(/\$db/ig, db);
                template[obj[e].key] = temp;
            }

            convert_selected_fixpack(template);
        })
    });

}
