$(document).ready(function () {
    chrome.storage.local.get('team', function (result) {
        $("select").val(result.team);
    });

    $("select").change(function () {
        var value = $(this).val();
        chrome.storage.local.set({"team": value}, function () {
            console.log("change team to %s", value);
        });
    });
})