(function ($) {
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    }
})(jQuery);

function test() {
    $('.editor, .variate_qar, .variate_fixpack').show();
}

$(document).ready(function () {


    var magic = $.getUrlParam('magic');
    var team = $.getUrlParam('team');

    init_setting();
    init_team(team);
    init_magic(magic);


});

function init_setting() {
    $(".setting").show();
    $("#reset").click(function () {
        var flag = confirm("Are you sure to clean all setting?");
        if (flag) {

            chrome.storage.local.clear(function () {
                console.log("Clear Local Storage and reset all setting.");
            })
        }
    });
};

function init_magic(magic) {
    $('#ctrl_c').click(function () {
        $('#editor').selection().select(0);
    })

    switch (magic) {
        case 'mb':
            multiple_browser();
            break;
        case 'other':
            other_tools();
            break;
        case 'ct':
            custom_table();
            break;
        case 'de':
            description();
            break;
        default :
            break;
    }
}

function init_team(team) {
    switch (team) {
        case 'custom':
            $('.editor').show();
            chrome.storage.local.get('custom_obj', function (result) {
                var id_comment = $.getUrlParam('id');
                var custom_obj = result.custom_obj;
                var obj = result.custom_obj[id_comment];

                $('#smart_id').val(obj.key);
                $('#desc').val(obj.des);
                if (obj.template == undefined || obj.template == '') {
                    $('#template').focus();
                }
                else {
                    $('#template').val(obj.template);
                }
                $('#save').click(function () {
                    obj.template = $('#template').val();
                    custom_obj[id_comment] = obj;
                    chrome.storage.local.set({'custom_obj': custom_obj}, function () {
                        console.log("Update custom obj %o.", obj);
                    });
                });
            })
            break;
        case 'fp':
            $('.editor, .variate_fixpack').show();
            chrome.storage.local.get('fp_obj', function (result) {
                var id_comment = $.getUrlParam('id');
                var fp_obj = result.fp_obj;
                var obj = result.fp_obj[id_comment];

                $('#smart_id').val(obj.key);
                $('#desc').val(obj.des);
                if (obj.template == undefined || obj.template == '') {
                    $('#template').focus();
                }
                else {
                    $('#template').val(obj.template);
                }
                $('#save').click(function () {
                    obj.template = $('#template').val();
                    fp_obj[id_comment] = obj;
                    chrome.storage.local.set({'fp_obj': fp_obj}, function () {
                        console.log("Update fp obj %o.", obj);
                    });
                });
            })
            break;
        case 'qar':
            $('.editor, .variate_qar').show();

            chrome.storage.local.get('qar_obj', function (result) {
                var id_comment = $.getUrlParam('id');
                var qar_obj = result.qar_obj;
                var obj = result.qar_obj[id_comment];

                $('#smart_id').val(obj.key);
                $('#desc').val(obj.des);
                if (obj.template == undefined || obj.template == '') {
                    $('#template').focus();
                }
                else {
                    $('#template').val(obj.template);
                }
                $('#save').click(function () {
                    obj.template = $('#template').val();
                    fp_obj[id_comment] = obj;
                    chrome.storage.local.set({'qar_obj': qar_obj}, function () {
                        console.log("Update fp obj %o.", obj);
                    });
                });
            })
            break;
        default :
            $('.setting').show();
            break;
    }
}
