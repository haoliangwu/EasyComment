$(document).ready(function () {
    $('#magic_submit, #ctrl_c').hide();
    create_all_things_init();
});

function create_all_things_init() {

    chrome.storage.local.get('basic_obj', function (result) {
        var obj = result.basic_obj;
        if (obj) {
            $('#portal_host').val(obj.portal_host);
            $('#portal_port').val(obj.portal_port);
            $('#portal_auth').val(obj.portal_auth);
        }
    })

    $('#sub_task_start').hide();

    $('#basic_setting button').click(function () {

        var basic_obj = {
            portal_host: '',
            portal_port: '',
            portal_auth: ''
        }

        basic_obj.portal_host = $('#portal_host').val();
        basic_obj.portal_port = $('#portal_port').val();
        basic_obj.portal_auth = $('#portal_auth').val();

        chrome.storage.local.set({'basic_obj': basic_obj}, function () {
            console.log('Save Basic Setting Obj to %o', basic_obj);
        })
    });

    $('.toolbar li').each(function () {
        $(this).click(function () {
            inactive_all_field($('.toolbar li'));
            hide_all_panels($('#control_panel').children());

            var text = $(this).find('a').text();

            var $start = $('#sub_task_start');
            $start.show();

            $(this).addClass('active');

            switch (text) {
                case 'Basic Setting':
                    panel_show_slow($('#basic_setting'));
                    $start.hide();
                    break;

                case 'Users':
                    panel_show_slow($('#users'));

                    $('#users_menu').click(function () {
                        switch ($('#users_menu option:selected').val()) {
                            case '1':
                                $start.unbind('click');
                                $start.click(function () {
                                    $('#editor').val('');

                                    var obj = {
                                        number: $('#users_number').val(),
                                        basename: $('#users_prefix').val(),
                                        roleId: $('#users_roleId').val(),
                                        siteId: $('#users_sites').val(),
                                        orgId: $('#users_orgs').val()
                                    }


                                    for (var i = 1; i <= obj.number; i++) {
                                        var user = new Users();
                                        obj.name = obj.basename + i;

                                        user.createBasicUser_62x(obj);
                                    }
                                });

                                company.getCompanyIdByWebId('liferay.com', function (result) {
                                    var site = new Sites();
                                    site.getSitesByCompanyId(result.companyId, null, function (result) {
                                        appendOptionToSelection($('#users_sites'), result, 'site');
                                    })

                                    var organization = new Organizations();
                                    organization.getOrgsByCompanyId(result.companyId, null, function (result) {
                                        appendOptionToSelection($('#users_orgs'), result, 'org');
                                    })
                                });

                                break;

                            case '2':
                                break;

                        }
                    });
                    $('#users_menu').trigger('click');
                    break;

                case 'Organizations':
                    panel_show_slow($('#organizations'));

                    $('#orgs_menu').click(function () {
                        switch ($('#orgs_menu option:selected').val()) {
                            case '1':
                                $start.unbind('click');
                                $start.click(function () {
                                    $('#editor').val('');

                                    var obj = {
                                        basename: $('#orgs_prefix').val(),
                                        number: $('#orgs_number').val(),
                                        parentId: $('#orgs_prarentId').val()
                                    }

                                    for (var i = 1; i <= obj.number; i++) {
                                        var org = new Organizations();
                                        obj.name = obj.basename + i;

                                        org.createBasicOrgs(obj);
                                    }

                                });

                                break;

                            case '2':
                                break;

                        }
                    });
                    $('#orgs_menu').trigger('click');
                    break;

                case 'Sites':
                    panel_show_slow($('#sites'));

                    $('#sites_menu').click(function () {
                        switch ($('#orgs_menu option:selected').val()) {
                            case '1':
                                $start.unbind('click');
                                $start.click(function () {
                                    $('#editor').val('');

                                    var obj = {
                                        basename: $('#sites_prefix').val(),
                                        number: $('#sites_number').val(),
                                        parentId: $('#sites_parentId').val()
                                    }

                                    for (var i = 1; i <= obj.number; i++) {
                                        var site = new Sites();
                                        obj.name = obj.basename + i;

                                        site.createBasicSites(obj);
                                    }
                                });

                                break;

                            case '2':
                                break;
                        }
                    });
                    $('#sites_menu').trigger('click');
                    break;

                case 'Pages':
                    panel_show_slow($('#organizations'));

                    $('#orgs_menu').click(function () {
                        switch ($('#orgs_menu option:selected').val()) {
                            case '1':
                                $start.unbind('click');
                                $start.click(function () {
                                    $('#editor').val('');

                                });

                                break;

                            case '2':
                                break;
                        }
                    });
                    break;

                case 'Web Contents':
                    panel_show_slow($('#organizations'));

                    $('#orgs_menu').click(function () {
                        switch ($('#orgs_menu option:selected').val()) {
                            case '1':
                                $start.unbind('click');
                                $start.click(function () {
                                    $('#editor').val('');

                                });

                                break;

                            case '2':
                                break;

                        }
                    });
                    break;

                case 'Blogs':
                    panel_show_slow($('#organizations'));

                    $('#orgs_menu').click(function () {
                        switch ($('#orgs_menu option:selected').val()) {
                            case '1':
                                $start.unbind('click');
                                $start.click(function () {
                                    $('#editor').val('');

                                });

                                break;

                            case '2':
                                break;

                        }
                    });
                    break;

                case 'Documents':
                    panel_show_slow($('#organizations'));

                    $('#orgs_menu').click(function () {
                        switch ($('#orgs_menu option:selected').val()) {
                            case '1':
                                $start.unbind('click');
                                $start.click(function () {
                                    $('#editor').val('');

                                });

                                break;

                            case '2':
                                break;

                        }
                    });
                    break;

                case 'Message Board':
                    panel_show_slow($('#organizations'));

                    $('#orgs_menu').click(function () {
                        switch ($('#orgs_menu option:selected').val()) {
                            case '1':
                                $start.unbind('click');
                                $start.click(function () {
                                    $('#editor').val('');

                                });

                                break;

                            case '2':
                                break;

                        }
                    });
                    break;

                case 'Wiki':
                    panel_show_slow($('#organizations'));

                    $('#orgs_menu').click(function () {
                        switch ($('#orgs_menu option:selected').val()) {
                            case '1':
                                $start.unbind('click');
                                $start.click(function () {
                                    $('#editor').val('');

                                });

                                break;

                            case '2':
                                break;

                        }
                    });
                    break;

                case 'Tags & Categories':
                    panel_show_slow($('#organizations'));

                    $('#orgs_menu').click(function () {
                        switch ($('#orgs_menu option:selected').val()) {
                            case '1':
                                $start.unbind('click');
                                $start.click(function () {
                                    $('#editor').val('');

                                });

                                break;

                            case '2':
                                break;

                        }
                    });
                    break;

                case 'Dynamic Data Lists':
                    panel_show_slow($('#organizations'));

                    $('#orgs_menu').click(function () {
                        switch ($('#orgs_menu option:selected').val()) {
                            case '1':
                                $start.unbind('click');
                                $start.click(function () {
                                    $('#editor').val('');

                                });

                                break;

                            case '2':
                                break;

                        }
                    });
                    break;

                default :
                    break;
            }
        });
    })
}


function appendOptionToSelection($select, obj, type) {
    for (var e in obj) {
        switch (type) {
            case 'site':
                var $option = $('<option value="' + obj[e].groupId + '">' + obj[e].friendlyURL + '</option>')
                break;
            case 'org':
                var $option = $('<option value="' + obj[e].organizationId + '">' + obj[e].name + '</option>')
                break;
        }
        $select.append($option);
    }
}

function invoke(method, payload, log, callback) {
    chrome.storage.local.get('basic_obj', function (result) {
        var obj = result.basic_obj;
        var protocal = 'http://';
        var username = 'test@liferay.com';
        var password = 'test';
        var account = username + ':' + password;
        var portal_host = obj ? obj.portal_host : 'localhost';
        var portal_port = obj ? obj.portal_port : 'localhost';
        var url_base = portal_host + ':' + portal_port + '/api/jsonws';
        var url = protocal + account + '@' + url_base + method;

        payload.p_auth = obj.portal_auth;

        $.post(url, payload, function (result) {
            if (log) {
                var temp = $('#editor').val() + '\n';
                $('#editor').val(temp + JSON.stringify(result, null, 4));
            }

            if (callback)
                callback(result);
        });
    })


}

function inactive_all_field($e) {
    $e.each(function () {
        $(this).removeClass('active')
    });
}

function hide_all_panels($e) {
    $e.each(function () {
        $(this).hide();
    })
}

function panel_show_slow($e) {
    $e.show('slow');
}


