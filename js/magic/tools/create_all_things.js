$(document).ready(function () {
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
                        switch ($('#sites_menu option:selected').val()) {
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
                    panel_show_slow($('#pages'));

                    $('#pages_menu').click(function () {

                        company.getCompanyIdByWebId('liferay.com', function (result) {
                            var site = new Sites();
                            site.getSitesByCompanyId(result.companyId, null, function (result) {
                                appendOptionToSelection($('#pages_sites'), result, 'site');
                            })
                        });

                        switch ($('#pages_menu option:selected').val()) {
                            case '1':
                                hide_all_panels($('.pages_2'));
                                $start.unbind('click');
                                $start.click(function () {
                                    $('#editor').val('');

                                    var obj = {
                                        basename: $('#pages_prefix').val(),
                                        number: $('#pages_number').val(),
                                        groupId: $('#pages_sites').val(),
                                        isWithChild: false
                                    }

                                    for (var i = 1; i <= obj.number; i++) {
                                        var page = new Pages();
                                        obj.name = obj.basename + i;

                                        page.createPublicPages(obj);
                                    }

                                });
                                break;

                            case '2':
                                panel_show_slow($('.pages_2'));

                                $start.unbind('click');
                                $start.click(function () {
                                    $('#editor').val('');

                                    var obj = {
                                        basename: $('#pages_prefix').val(),
                                        basename_sub: $('#pages_sub_prefix').val(),
                                        number: $('#pages_number').val(),
                                        number_sub: $('#pages_sub_number').val(),
                                        groupId: $('#pages_sites').val(),
                                        isWithChild: true
                                    }

                                    for (var i = 1; i <= obj.number; i++) {
                                        var page = new Pages();
                                        obj.name = obj.basename + i;
                                        (function (a) {
                                            page.createPublicPagesWithChild(obj, function (result, payload) {
                                                for (var j = 1; j <= payload.number_sub; j++) {
                                                    var page = new Pages();
                                                    payload.parentLayoutId = result.layoutId;
                                                    payload.name = 'Sub' + payload.basename_sub + a + '_' + j;
                                                    page.createPublicPages(payload)
                                                }
                                            })
                                        })(i);

                                    }

                                });
                                break;
                        }
                    });
                    $('#pages_menu').trigger('click');
                    break;

                case 'Web Contents':
                    panel_show_slow($('#wc'));

                    company.getCompanyIdByWebId('liferay.com', function (result) {
                        var site = new Sites();
                        site.getSitesByCompanyId(result.companyId, null, function (result) {
                            appendOptionToSelection($('#wc_sites'), result, 'site');
                        })
                    });


                    $('#wc_menu').click(function () {
                        switch ($('#wc_menu option:selected').val()) {
                            case '1':
                                hide_all_panels($('.wc_2'));
                                $start.unbind('click');
                                $start.click(function () {
                                    $('#editor').val('');

                                    var obj = {
                                        basename: $('#wc_prefix').val(),
                                        number: $('#wc_number').val(),
                                        groupId: $('#wc_sites').val()
                                    }

                                    for (var i = 1; i <= obj.number; i++) {
                                        var wc = new WebContent();
                                        obj.name = obj.basename + i;

                                        wc.createWebContent(obj);
                                    }
                                });
                                break;

                            case '2':
                                panel_show_slow($('.wc_2'));
                                $start.unbind('click');
                                $start.click(function () {
                                    $('#editor').val('');

                                    var obj = {
                                        basename: $('#wc_prefix').val(),
                                        number: $('#wc_number').val(),
                                        groupId: $('#wc_sites').val(),
                                        version_number: $('#wc_versions').val()
                                    }

                                    for (var i = 1; i <= obj.number; i++) {
                                        var wc = new WebContent();
                                        obj.name = obj.basename + i;

                                        wc.createWebContent(obj, createWebContentWithDiffVersion);
                                    }

                                })

                                break;

                        }
                    });
                    $('#wc_menu').trigger('click');
                    break;

                case 'Documents':
                    panel_show_slow($('#document'));

                    company.getCompanyIdByWebId('liferay.com', function (result) {
                        var site = new Sites();
                        site.getSitesByCompanyId(result.companyId, null, function (result) {
                            appendOptionToSelection($('#document_sites'), result, 'site');
                        })
                    });

                    $('#document_menu').click(function () {
                        switch ($('#document_menu option:selected').val()) {
                            case '1':
                                hide_all_panels($('.dm_2'));
                                $start.unbind('click');
                                $start.click(function () {
                                    $('#editor').val('');
                                    var obj = {
                                        basename: $('#document_prefix').val(),
                                        number: $('#documents_number').val(),
                                        groupId: $('#document_sites').val()
                                    }

                                    for (var i = 1; i <= obj.number; i++) {
                                        var dm = new Documents();
                                        obj.name = obj.basename + i;

                                        dm.createDocument(obj);
                                    }
                                });

                                break;

                            case '2':
                                panel_show_slow($('.dm_2'));
                                $start.unbind('click');
                                $start.click(function () {
                                    $('#editor').val('');

                                    var obj = {
                                        basename: $('#document_prefix').val(),
                                        number: $('#documents_number').val(),
                                        groupId: $('#document_sites').val(),
                                        version_number: $('#dm_versions').val()
                                    }

                                    for (var i = 1; i <= obj.number; i++) {
                                        var dm = new Documents();
                                        obj.name = obj.basename + i;

                                        dm.createDocument(obj, createDocumentWithDiffVersion);
                                    }

                                })

                                break;

                        }
                    });
                    $('#document_menu').trigger('click');
                    break;

                case 'Message Board':
                    panel_show_slow($('#mb'));

                    company.getCompanyIdByWebId('liferay.com', function (result) {
                        var site = new Sites();
                        site.getSitesByCompanyId(result.companyId, null, function (result) {
                            appendOptionToSelection($('#mb_sites'), result, 'site');
                        })
                    });

                    $('#mb_menu').click(function () {

                        switch ($('#mb_menu option:selected').val()) {
                            case '1':
                                hide_all_panels($('.mb_2, .mb_3'));

                                $start.unbind('click');
                                $start.click(function () {
                                    $('#editor').val('');

                                    var obj = {
                                        basename: $('#mb_prefix').val(),
                                        number: $('#mb_number').val(),
                                        groupId: $('#mb_sites').val()
                                    }

                                    for (var i = 1; i <= obj.number; i++) {
                                        var thread = new MBThread();
                                        obj.name = obj.basename + i;

                                        thread.createMBTreadOnRoot(obj);
                                    }

                                });

                                break;

                            case '2':
                                $('#mb_sites').click(function () {
                                    var category = new MBCategory();
                                    category.getCategoryBySiteId({groupId: $(this).val()}, function (result) {
                                        appendOptionToSelection($('#mb_category'), result, 'category_mb');
                                    });
                                });

                                $('#mb_sites').trigger('click');

                                hide_all_panels($('.mb_3'))
                                panel_show_slow($('.mb_2'));

                                $start.unbind('click');
                                $start.click(function () {
                                    $('#editor').val('');

                                    var obj = {
                                        basename: $('#mb_prefix').val(),
                                        number: $('#mb_number').val(),
                                        groupId: $('#mb_sites').val(),
                                        categoryId: $('#mb_category').val()
                                    }

                                    for (var i = 1; i <= obj.number; i++) {
                                        var thread = new MBThread();
                                        obj.name = obj.basename + i;

                                        thread.createMBTreadOnCategory(obj);
                                    }

                                });

                                break;
                            case '3':
                                hide_all_panels($('.mb_2, .mb_1'));
                                panel_show_slow($('.mb_3'));

                                $start.unbind('click');
                                $start.click(function () {
                                    $('#editor').val('');

                                    company.getCompanyIdByWebId('liferay.com', function (result) {
                                        var user = new Users();
                                        user.getUesrByScreenName({
                                            companyId: result.companyId,
                                            screenName: 'test'
                                        }, function (user) {
                                            var obj = {
                                                userId:user.userId,
                                                basename: $('#mb_prefix').val(),
                                                c_basename: $('#mb_category_prefix').val(),
                                                number: $('#mb_number').val(),
                                                c_number: $('#mb_category_number').val(),
                                                groupId: $('#mb_sites').val()
                                            }

                                            for (var i = 1; i <= obj.c_number; i++) {
                                                var category = new MBCategory();
                                                obj.name = obj.c_basename + i;
                                                category.createCategory(obj, function (result, payload) {
                                                    (function (a) {
                                                        for (var j = 1; j <= payload.number; j++) {
                                                            var thread = new MBThread();
                                                            payload.name = payload.basename + a + j;
                                                            payload.categoryId=result.categoryId;
                                                            thread.createMBTreadOnCategory(payload);
                                                        }

                                                    })(i);
                                                })
                                            }
                                        })
                                    });
                                });
                                break;
                        }
                    });
                    $('#mb_menu').trigger('click');
                    break;

                case 'Wiki':
                    panel_show_slow($('#wiki'),function() {
                        $('#wiki_menu').trigger('click');
                    });

                    company.getCompanyIdByWebId('liferay.com', function (result) {
                        var site = new Sites();
                        site.getSitesByCompanyId(result.companyId, null, function (result) {
                            appendOptionToSelection($('#wiki_sites'), result, 'site');
                        })
                    });

                    $('#wiki_menu').click(function () {
                        switch ($('#wiki_menu option:selected').val()) {
                            case '1':
                                hide_all_panels($('.wiki_2'));

                                $('#wiki_sites').click(function() {
                                    var wikiNode=new WikiNode();
                                    wikiNode.getWikiNode({groupId: $(this).val()},function(result) {
                                        appendOptionToSelection($('#wiki_nodes'), result, 'wiki');
                                    });
                                });

                                $('#wiki_sites').trigger('click');

                                $start.unbind('click');
                                $start.click(function () {
                                    $('#editor').val('');

                                    var obj = {
                                        basename: $('#wiki_prefix').val(),
                                        number: $('#wiki_number').val(),
                                        groupId: $('#wiki_sites').val(),
                                        nodeId:$('#wiki_nodes').val()
                                    }

                                    for (var i = 1; i <= obj.number; i++) {
                                        var wiki = new WikiPage();
                                        obj.name = obj.basename + i;

                                        wiki.createWikiPage(obj);
                                    }

                                });


                                break;

                            case '2':
                                hide_all_panels($('.wiki_1'));
                                panel_show_slow($('.wiki_2'));

                                $start.unbind('click');
                                $start.click(function () {
                                    $('#editor').val('');

                                    var obj = {
                                        basename: $('#wiki_prefix').val(),
                                        n_basename: $('#wikinode_prefix').val(),
                                        number: $('#wiki_number').val(),
                                        n_number: $('#wikinode_number').val(),
                                        groupId: $('#wiki_sites').val(),
                                        nodeId:$('#wiki_nodes').val()
                                    }

                                    for (var i = 1; i <= obj.n_number; i++) {
                                        var wikiNode = new WikiNode();
                                        obj.name = obj.n_basename + i;

                                        wikiNode.createWikiNode(obj,function(result,payload) {
                                            (function (a) {
                                                for (var j = 1; j <= payload.number; j++) {
                                                    var wikipage = new WikiPage();
                                                    payload.name = payload.basename + a + j;
                                                    payload.nodeId = result.nodeId;

                                                    wikipage.createWikiPage(payload);
                                                }

                                            })(i);
                                        });
                                    }

                                });

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

function createWebContentWithDiffVersion(result, payload) {
    var wc = new WebContent();

    payload.version = result.version;
    payload.articleId = result.articleId;
    payload.groupId = result.groupId;

    wc.updateWebContent(payload, createWebContentWithDiffVersion);
}

function createDocumentWithDiffVersion(result, payload) {
    var dm = new Documents();

    payload.version = result.version;
    payload.fileEntryId = result.fileEntryId;
    payload.title = result.title;
    payload.sourceFileName = result.title;

    dm.updateDocument(payload, createDocumentWithDiffVersion);
}

function appendOptionToSelection($select, obj, type) {
    $select.empty();

    if (!obj)
        return 0;

    for (var e in obj) {
        switch (type) {
            case 'site':
                var $option = $('<option value="' + obj[e].groupId + '">' + obj[e].friendlyURL + '</option>')
                break;
            case 'org':
                var $option = $('<option value="' + obj[e].organizationId + '">' + obj[e].name + '</option>')
                break;
            case 'category_mb':
                var $option = $('<option value="' + obj[e].categoryId + '">' + obj[e].name + '</option>')
            case 'wiki':
                var $option = $('<option value="' + obj[e].nodeId + '">' + obj[e].name + '</option>')
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
                callback(result, payload);
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

function panel_show_slow($e, callback) {
    $e.each(function () {
        $(this).show('slow',callback);
    })
}



