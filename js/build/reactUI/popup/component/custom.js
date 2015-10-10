'use strict';

define(function (require, exports) {
    var $ = require('jquery');
    var React = require('react');
    var comment = require('comment');
    var chromeUtil = require('chromeUtil').chromeLocalStorage;

    exports.init = function () {
        //custom comment table module
        chromeUtil.getLocalStorage('custom_obj', function (result) {
            if (!result.custom_obj) {
                chromeUtil.setLocalStorage({ 'custom_obj': {} }, function () {
                    console.log("Initiate custom obj to %o successfully.", {});
                });
            } else {
                //initiate UI
                for (var e in result.custom_obj) {
                    //initiate custom object which has key property
                    if (result.custom_obj.hasOwnProperty(e)) comment.initSmartKeyEntry(result.custom_obj[e], '#custom_content table', 'custom');
                }
            }
        });

        //custom comment control module
        chromeUtil.getLocalStorage('custom_count', function (result) {
            if (!result.custom_count) {
                chromeUtil.setLocalStorage({ 'custom_count': 1 }, function () {
                    console.log("Initiate custom count to 0 successfully.");
                });
            }

            $('#custom_toggle').click(function () {
                $('#custom_content').toggle();
            });

            $('#custom_new').click(function () {
                comment.initSmartKeyEntry(null, '#custom_content table', 'custom');
            });
        });
    };

    //UI Module
    var ParametersBox = React.createClass({
        displayName: 'ParametersBox',

        render: function render() {
            return React.createElement(
                'div',
                null,
                'Custom ParameterBox'
            );
        }
    });

    var CommentListBox = React.createClass({
        displayName: 'CommentListBox',

        render: function render() {
            return React.createElement(
                'div',
                null,
                'This is custom List Box'
            );
        }
    });

    exports.CustomCommentListBox = React.createElement(
        'div',
        { className: 'row' },
        React.createElement(
            'p',
            null,
            'Custom Comment List'
        ),
        React.createElement(ParametersBox, null),
        React.createElement(CommentListBox, { team: 'custom' })
    );
});