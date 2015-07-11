$(document).ready(function () {
    $("#comment").keydown(function () {
        if (event.keyCode == 17) {
            $(this).one("mouseup", function () {
                chrome.storage.local.get('team', function (result) {
                    chrome.storage.local.get("parameter_qar", function (result) {
                        var obj = result.parameter_qar;
                        if (obj) {
                            var dictionary = commentTemplate(obj);
                            if (result.team == 'qar') {
                                convert_selected_fixpack(dictionary);
                            }
                            else if (result.team == 'fixpack') {

                            }
                        }
                    });
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
        else{
            chrome.storage.local.get('custom_obj',function(result) {
                var obj=result.custom_obj;
                for(var e in obj){
                    if(sel.toString()== e.key) {
                        $focused.val(e.template);
                    }
                }
            });

        }
    }
}

function commentTemplate(obj) {
    var server_master = obj.server_master;
    var server_61 = obj.server_61;
    var db = obj.db;
    var gitk_master=obj.master;
    var gitk_62x=obj.x62;
    var gitk_61x=obj.x61;
    var template = {};

    //var rep = server_master + " + " + db + ". " + "Portal Master GIT ID: ***.\n" +
    //    server_master + " + " + db + ". " + "Portal 6.2.x EE GIT ID: ***.\n" +
    //    server_61 + " + " + db + ". " + "Portal 6.1.x EE GIT ID: ***.\n";
    //
    //var fix = server_master + " + " + db + ". " + "Portal Master GIT ID: " + obj.master + ".\n" +
    //    server_master + " + " + db + ". " + "Portal 6.2.x EE GIT ID: " + obj.x62 + ".\n" +
    //    server_61 + " + " + db + ". " + "Portal 6.1.x EE GIT ID: " + obj.x61 + ".\n";
    //
    //var content = "\n" +
    //    "Reproduced on:\n" +
    //    rep +
    //    "\n" +
    //    "Explanation.\n" +
    //    "\n" +
    //    "Fixed on:\n" +
    //    fix +
    //    "\n" +
    //    "Explanation.\n";
    //
    //var template1 = {
    //    "pani": "PASSED Manual Testing using the following steps:\n" +
    //    "\n" +
    //    "# Step1\n# Step2\n# Step3\n" +
    //    content,
    //
    //    "pai": "PASSED Manual Testing following the steps in the description.\n" +
    //    content,
    //
    //    "nlni": "No Longer Reproducible through Manual Testing using the following steps:\n" +
    //    "\n" +
    //    "# Step1\n# Step2\n# Step3\n" +
    //    content,
    //
    //    "nli": "No Longer Reproducible through Manual Testing following the steps in the description.\n" +
    //    content,
    //
    //    "fani": "FAILED Manual Testing using the following steps:\n" +
    //    "\n" +
    //    "# Step1\n# Step2\n# Step3\n" +
    //    content,
    //
    //    "fai": "FAILED Manual Testing following the steps in the description.\n" +
    //    content,
    //
    //    "qavr": "Reproduced on:\n" +
    //    rep +
    //    "\n" +
    //    "Explanation.\n",
    //
    //    "qavnl": "No Longer Reproducible on:\n" +
    //    rep +
    //    "\n" +
    //    "Explanation.\n"
    //};


    chrome.storage.local.get('qar_obj', function (result) {
        var obj=result.fp_obj;

        for(var e in obj) {
            var temp=obj[e].template;
            temp = temp.relace(/\$server_master/, server_master);
            temp = temp.replace(/\$gitk_master/, gitk_master);
            temp = temp.replace(/\$gitk_62x/, gitk_62x);
            temp = temp.replace(/\$gitk_61x/, gitk_61x);
            temp = temp.replace(/\$server_61/, server_61);
            temp = temp.replace(/\$db/, db);
            template[obj[e].key] = temp;
        }
        convert_selected_fixpack(template);
    });

}
