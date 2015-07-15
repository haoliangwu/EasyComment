function multiple_browser() {
    $('#magic').show();
    $('#browser_detail input:checkbox').change(function () {
        $('#' + $(this).attr('id') + '_detail').toggle('middle');
        $('#' + $(this).attr('id') + '_tb').toggle('middle');
    })

    $('#ctrl_c').click(function () {
        $('#magic textarea').selection().select(0);
    })

    $('#magic_submit').click(function () {
        var browsers = browser_init_obj();
        var portal_branch = portal_branch_init_obj();
        //console.log("Browser obj is %o", browsers);
        //console.log("portal_branch obj is %o", portal_branch);
        var template = magic_template(browsers, portal_branch);
        $('#magic textarea').val(template);
    });

    $('#shortcut button').each(function () {

        var $chrome = $('#chrome');
        var $chrome_detail = $('#chrome_detail input:checkbox');
        var $ff = $('#ff');
        var $ff_detail = $('#ff_detail input:checkbox');
        var $ie = $('#ie');
        var $ie_detail = $('#ie_detail input:checkbox');
        var $ee_version = $('#ee_version input:checkbox');
        var $released_version = $('#released_version input:checkbox');

        $(this).click(function () {
            var e = $.Event('click');
            switch ($(this).attr('id')) {

                case 'all_chrome':
                    $('#shortcut_reset').trigger(e);
                    $chrome.trigger(e);
                    $chrome_detail.each(function () {
                        $(this).trigger(e);
                    })
                    break;
                case 'all_ff':
                    $('#shortcut_reset').trigger(e);
                    $ff.trigger(e);
                    $ff_detail.each(function () {
                        $(this).trigger(e);
                    })
                    break;
                case 'all_ie':
                    $('#shortcut_reset').trigger(e);
                    $ie.trigger(e);
                    $ie_detail.each(function () {
                        $(this).trigger(e);
                    })
                    break;
                case 'all_portal':
                    $('#shortcut_reset').trigger(e);
                    $released_version.each(function () {
                        $(this).trigger(e);
                    })
                    $ee_version.each(function () {
                        $(this).trigger(e);
                    })
                    break;
                case 'release_portal':
                    $('#shortcut_reset').trigger(e);
                    $released_version.each(function () {
                        $(this).trigger(e);
                    })
                    break;
                case 'ee_portal':
                    $('#shortcut_reset').trigger(e);
                    $ee_version.each(function () {
                        $(this).trigger(e);
                    })
                    break;
                case 'fixpack':
                    $('#shortcut_reset').trigger(e);
                    $chrome.trigger(e);
                    $chrome_detail.each(function () {
                        if($(this).attr('id')=='chrome_stable')
                        $(this).trigger(e);
                    })
                    $ff.trigger(e);
                    $ff_detail.each(function () {
                        if($(this).attr('id')!='ff_latest')
                        $(this).trigger(e);
                    })
                    $ie.trigger(e);
                    $ie_detail.each(function () {
                        if($(this).attr('id')=='ie_11')
                        $(this).trigger(e);
                    })
                    $released_version.each(function () {
                        $(this).trigger(e);
                    })
                    break;
                case 'qar':
                    $('#shortcut_reset').trigger(e);
                    $chrome.trigger(e);
                    $chrome_detail.each(function () {
                        if($(this).attr('id')!='chrome_stable')
                        $(this).trigger(e);
                    })
                    $ff.trigger(e);
                    $ff_detail.each(function () {
                        if($(this).attr('id')=='ff_latest')
                        $(this).trigger(e);
                    })
                    $ie.trigger(e);
                    $ie_detail.each(function () {
                        $(this).trigger(e);
                    })
                    $ee_version.each(function () {
                        $(this).trigger(e);
                    })
                    break;
                case 'shortcut_reset':
                    $('#magic textarea').val('');
                    $('#chrome_detail').hide('middle');
                    $('#ff_detail').hide('middle');
                    $('#ie_detail').hide('middle');
                    $('#chrome_tb').hide('middle');
                    $('#ff_tb').hide('middle');
                    $('#ie_tb').hide('middle');

                    $chrome.attr('checked',false);
                    $chrome_detail.each(function () {
                        $(this).attr('checked',false);
                    })
                    $ff.attr('checked',false);
                    $ff_detail.each(function () {
                        $(this).attr('checked',false);
                    })
                    $ie.attr('checked',false);
                    $ie_detail.each(function () {
                        $(this).attr('checked',false);
                    })
                    $released_version.each(function () {
                        $(this).attr('checked',false);
                    })
                    $ee_version.each(function () {
                        $(this).attr('checked',false);
                    })
                    break;
                default :
                    break;
            }
        })
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
                    var line = '|' + ee_versions[e2] + '| $Result | $Result |\n';
                    sub_title += line;
                }
            }

            var release_versions = portal_branch.released_version;
            if (release_versions) {
                for (var e2 in release_versions) {
                    var line = '|' + release_versions[e2] + '| $Result | $Result |\n';
                    sub_title += line;
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



