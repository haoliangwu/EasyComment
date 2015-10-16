$(document).ready(function () {
    bindToComment('#comment', function (result) {
        if (!result.team) {
            setLocalStorage({'team': 'qar'}, function () {
                console.log("Easy Comment initialize team to %s successfully.", 'qar');
            });
        }
        else {
            if (result.team == 'fp') {
                alert("Your team setting is fixpack,but the current page is qa-r LPS page, please set team to qa-r.");
            }
            else if (result.team == 'qar') {
                getLocalStorage("parameter_qar", function (result) {
                    var obj = result.parameter_qar;
                    commentTemplate(obj);
                });
            }
            else {
                alert("Please set Your team in right-top setting page.");
            }
        }
    })
});

function commentTemplate(obj) {
    var server = obj.server ? obj.server : 'Tomcat 7.0.xx';
    var server_master = obj.server_master ? obj.server_master : 'Master Server';
    var server_62 = obj.server_62x ? obj.server_62x : '6.2.x Server';
    var server_61 = obj.server_61x ? obj.server_61x : '6.1.x Server';
    var db = obj.database ? obj.database : 'MySQL 5.5.xx';
    var gitk_master = obj.gitk_master ? obj.gitk_master : 'GIT ID of master branch';
    var gitk_62x = obj.gitk_62x ? obj.gitk_62x : 'GIT ID of 62 branch';
    var gitk_61x = obj.gitk_61x ? obj.gitk_61x : 'GIT ID of 61 branch';
    var template = {};

    getLocalStorage('qar_obj', function (result) {
        var obj = result.qar_obj;

        for (var e in obj) {
            if (obj.hasOwnProperty(e)) {
                var temp = obj[e].template;
                temp = temp.replace(/\$server_master/ig, server+' '+server_master);
                temp = temp.replace(/\$server_62/ig, server+' '+server_62);
                temp = temp.replace(/\$server_61/ig, server+' '+server_61);
                temp = temp.replace(/\$gitk_master/ig, gitk_master);
                temp = temp.replace(/\$gitk_62x/ig, gitk_62x);
                temp = temp.replace(/\$gitk_61x/ig, gitk_61x);
                temp = temp.replace(/\$db/ig, db);
                template[obj[e].key] = temp;
            }
        }
        getLocalStorage('custom_obj', function (result) {
            var obj = result.custom_obj;
            for (var e in obj) {
                if (obj.hasOwnProperty(e)) {
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
            }

            convert_selected_fixpack(template);
        })
    });

}
