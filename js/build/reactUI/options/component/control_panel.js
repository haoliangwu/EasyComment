'use strict';

define(function (require, exports) {
    var React = require('react');
    var $ = require('jquery');

    var StackedNavPill = require('../util/stacked_nav_pill');

    var CommentSetting = React.createClass({
        displayName: 'CommentSetting',

        render: function render() {
            return React.createElement(
                'div',
                null,
                'Comment Setting'
            );
        }
    });

    var ExtensionSetting = React.createClass({
        displayName: 'ExtensionSetting',

        render: function render() {
            return React.createElement(
                'div',
                null,
                'Extension Setting'
            );
        }
    });

    var id = 'control-panel-nav-pill';
    var tabs = ['Comment Setting', 'Extension Setting'];
    var tab_contents = {
        comment_setting: React.createElement(CommentSetting, null),
        extension_setting: React.createElement(ExtensionSetting, null)
    };

    exports.index = React.createElement(StackedNavPill, { id: id, tabs: tabs, tab_contents: tab_contents });
});