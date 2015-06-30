$(document).ready(function () {

    init();

    $(".team select").change(function () {
        var value = $(this).val();

        if (value =='qar') {
            $("#fixpack").hide();
            $("#qa-r").show();
        }
        else {
            $("#qa-r").hide();
            $("#fixpack").show();
        }

        //console.log(value);
        chrome.storage.local.set({"team": value}, function () {
            console.log("Set team to %s", value);
        });
    });

    $(".parameter select").change(function () {
        var value = $(this).val();

        chrome.storage.local.set({"portal_branch": value}, function () {
            console.log("Set portal_branch to %s", value);
        })
    });
})


function init() {
    chrome.storage.local.get('team', function (result) {
        $(".team select").val(result.team);
        if (result.team == 'qar') {
            $("#fixpack").hide();
            $("#qa-r").show();
        }
        else {
            $("#qa-r").hide();
            $("#fixpack").show();
        }
    });

    chrome.storage.local.get('portal_branch', function (result) {
        console.log(result.portal_branch);
        $(".parameter select").val(result.portal_branch);
    });
}