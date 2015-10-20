'use strict';

define(function (require, exports, module) {
    var $ = require('jquery');
    var promise = require('promise');
    var comment = require('comment');
    var chromeUtil = require('chromeUtil').chromeLocalStorage;
    var description = require('../magic/descriptions');
    var custom_table = require('../magic/custom_tables');
    var multiple_browser = require('../magic/multiple_browsers');
    var other_tools = require('../magic/other_tools');
    var import_export = require('../model/setting');

    (function ($) {
        $.getUrlParam = function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return decodeURI(r[2]);
            return null;
        };
    })($);

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
                chromeUtil.removeLocalStroageAll(function () {
                    console.log("Clear Local Storage and reset all setting.");
                });
            }
        });
    };

    function init_magic(magic) {
        $('#ctrl_c').click(function () {
            $('#editor').selection().select(0);
        });

        switch (magic) {
            case 'mb':
                $('#magic').show();
                multiple_browser.multiple_browser();
                break;
            case 'other':
                $('#magic').show();
                other_tools.other_tools();
                break;
            case 'ct':
                $('#magic').show();
                custom_table.custom_table();
                break;
            case 'de':
                $('#magic').show();
                description.description();
                break;
            case 'ei':
                $('#magic').show();
                import_export.init();
            default:
                break;
        }
    }

    function init_team(team) {
        var id_comment = $.getUrlParam('id');

        $('#delete').click(function () {
            var flag = confirm("Are you sure to clean comment of key " + id_comment + " ?");

            if (flag) {
                promise.chain([function () {
                    return chromeUtil.getLocalStorageSync('custom_obj');
                }, function (err, result) {
                    result[id_comment] = undefined;
                    return chromeUtil.setLocalStorageSync({ 'custom_obj': result });
                }]).then(function () {
                    window.location.href = '/options.html';
                    console.log('The comment of key %s has been removed.', id_comment);
                });
            }
        });

        switch (team) {
            case 'custom':
                $('.editor').show();
                chrome.storage.local.get('custom_obj', function (result) {
                    var custom_obj = result.custom_obj;
                    var obj = result.custom_obj[id_comment];

                    $('#smart_id').val(obj.key);
                    $('#desc').val(obj.des);
                    if (obj.template == undefined || obj.template == '') {
                        $('#template').focus();
                    } else {
                        $('#template').val(obj.template);
                    }
                    $('#save').click(function () {
                        obj.template = $('#template').val();
                        custom_obj[id_comment] = obj;
                        chrome.storage.local.set({ 'custom_obj': custom_obj }, function () {
                            console.log("Update custom obj %o.", obj);
                        });
                    });
                });
                break;
            case 'fp':
                $('.editor, .variate_fixpack').show();
                chrome.storage.local.get('fp_obj', function (result) {
                    var fp_obj = result.fp_obj;
                    var obj = result.fp_obj[id_comment];

                    $('#smart_id').val(obj.key);
                    $('#desc').val(obj.des);
                    if (obj.template == undefined || obj.template == '') {
                        $('#template').focus();
                    } else {
                        $('#template').val(obj.template);
                    }
                    $('#save').click(function () {
                        obj.template = $('#template').val();
                        fp_obj[id_comment] = obj;
                        chrome.storage.local.set({ 'fp_obj': fp_obj }, function () {
                            console.log("Update fp obj %o.", obj);
                        });
                    });
                });
                break;
            case 'qar':
                $('.editor, .variate_qar').show();

                chrome.storage.local.get('qar_obj', function (result) {
                    var qar_obj = result.qar_obj;
                    var obj = result.qar_obj[id_comment];

                    $('#smart_id').val(obj.key);
                    $('#desc').val(obj.des);
                    if (obj.template == undefined || obj.template == '') {
                        $('#template').focus();
                    } else {
                        $('#template').val(obj.template);
                    }
                    $('#save').click(function () {
                        obj.template = $('#template').val();
                        qar_obj[id_comment] = obj;
                        chrome.storage.local.set({ 'qar_obj': qar_obj }, function () {
                            console.log("Update fp obj %o.", obj);
                        });
                    });
                });
                break;
            default:
                $('.setting').show();
                break;
        }
    }
});