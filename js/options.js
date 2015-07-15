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

    $("#reset").click(function () {
        chrome.storage.local.clear(function () {
            console.log("Clear Local Storage and reset all setting.");
        })
    });

    var magic = $.getUrlParam('magic');
    var team = $.getUrlParam('team');

    init_team(team);
    init_magic(magic);


});

function init_magic(magic) {
    $('.setting').hide();

    switch (magic) {
        case 'mb':
            multiple_browser();
            break;
        case 'dl':
            break;
        case 'ct':
            break;
        case 'de':
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

function multiple_browser() {
    $('#browser_detail input:checkbox').change(function() {
        console.log($(this).attr('id'));
        $('#' + $(this).attr('id') + '_detail').toggle();
    })

    $('#magic_submit').click(function () {
        var browsers = browser_init_obj();
        var portal_branch = portal_branch_init_obj();
        console.log("Browser obj is %o", browsers);
        console.log("portal_branch obj is %o", portal_branch);
        var template = magic_template(browsers, portal_branch);
        $('#magic textarea').val(template);
    });
}

function magic_template(browsers, portal_branch) {
    var table_head_base = '|| Portal Version || Reproduced Result || Verified Result ||\n';
    var content = '';

    for (var e in browsers) {
        var browser = browsers[e].name;
        var title = 'h4.' + browser + ' Testing Results:\n';
        for (var e1 in browsers[e].version) {
            var versions = browsers[e].version;
            var sub_title = 'h5.' + versions[e1] + ' Version\n';
            sub_title += table_head_base;

            var ee_versions = portal_branch.ee_version;
            if (ee_versions) {
                for (var e2 in ee_versions) {
                    var line='|' + ee_versions[e2] +'| $Result | $Result |\n';
                    sub_title+=line;
                }
            }

            var release_versions=portal_branch.released_version;
            if(release_versions) {
                for( var e2 in release_versions) {
                    var line='|' + release_versions[e2]+'| $Result | $Result |\n';
                    sub_title+=line;
                }
            }

            sub_title += '\n';
            title += sub_title;
        }
        content += title;
    }
    return content;
}


function portal_branch_init_obj() {
    var obj = {};

    var $ee_version = $('#ee_version input:checkbox:checked');
    var $released_version = $('#released_version input:checkbox:checked');

    var ee_versions = util_each($ee_version);
    var released_versions = util_each($released_version);

    if (ee_versions.length != 0)
        obj.ee_version = ee_versions;
    if (released_versions.length != 0)
        obj.released_version = released_versions;

    return obj;
}

function browser_init_obj() {
    var obj = {};

    var $browser = $('#browser_detail input:checkbox:checked');
    var $chrome_detail = $('#chrome_detail input:checkbox:checked');
    var $ff_detail = $('#ff_detail input:checkbox:checked');
    var $ie_detail = $('#ie_detail input:checkbox:checked');

    $browser.each(function () {
        switch ($(this).val()) {
            case 'chrome':
                var chrome_obj = {};
                chrome_obj.version = util_each($chrome_detail);
                chrome_obj.name = 'Chrome';
                obj.chrome = chrome_obj;
                break;
            case 'ff':
                var ff_obj = {};
                ff_obj.version = util_each($ff_detail);
                ff_obj.name = 'FireFox';
                obj.ff = ff_obj;
                break;
            case 'ie':
                var ie_obj = {};
                ie_obj.version = util_each($ie_detail);
                ie_obj.name = 'IE';
                obj.ie = ie_obj;
                break;
            default:
                break;
        }
    });

    return obj;
}

function util_each(JqueryObj) {
    var temp = [];
    JqueryObj.each(function () {
        temp.push($(this).val());
    })
    return temp;
}
