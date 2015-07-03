$(document).ready(function () {

    //chrome.storage.local.clear(function() {
    //    console.log("clear all");
    //})

    init();

    $(".team select").change(function () {
        var value = $(this).val();

        if (value == 'qar') {
            $("#fixpack").hide();
            $("#qa-r").show();
        }
        else {
            $("#qa-r").hide();
            $("#fixpack").show();
        }

        chrome.storage.local.set({"team": value}, function () {
            console.log("Set team to %s", value);
        });
    });

})

function init() {
    chrome.storage.local.get('team', function (result) {

        if (result.team) {
            $(".team select").val(result.team);
            if (result.team == 'qar') {
                $("#fixpack").hide();
                $("#qa-r").show();
                init_qar();
            }
            else {
                $("#qa-r").hide();
                $("#fixpack").show();
                init_fixpack();
            }
        }
        else {
            chrome.storage.local.set({"team": "fixpack"}, function () {
                console.log("Init team to %s", "fixpack");
            });
        }

    });
}

function init_qar() {

    chrome.storage.local.get("parameter_qar", function (result) {
        if (result.parameter_qar) {
            var obj=result.parameter_qar;
            $('#server_master').val(obj.server_master);
            $('#server_61').val(obj.server_61);
            $('#db').val(obj.db);
            $('#x61').val(obj.x61);
            $('#x62').val(obj.x62);
            $('#master').val(obj.master);
            $("input").keydown(function () {
                var id = $(this).attr('id');
                var value = $(this).val();
                obj[id] = value;
                chrome.storage.local.set({"parameter_qar": obj}, function () {
                    console.log("Change Parameter_qar obj to %o", obj)
                })
            });
        }
        else {
            var parameter_qar = {
                "server": "Tomcat-7.0.**",
                "db": "MySQL 5.5.**",
                "x61": "***",
                "x62": "***",
                "master": "***"
            }
            chrome.storage.local.set({"parameter_qar": parameter_qar}, function () {
                console.log("Init Parameter_qar obj successfully")
            })
        }
    });
}

function init_fixpack() {

    $(".parameter_fixpack select").change(function () {
        var value = $(this).val();

        chrome.storage.local.set({"portal_branch": value}, function () {
            console.log("Set portal_branch to %s", value);
        })
    });

    chrome.storage.local.get('portal_branch', function (result) {
        $(".parameter_fixpack select").val(result.portal_branch);
    });
}