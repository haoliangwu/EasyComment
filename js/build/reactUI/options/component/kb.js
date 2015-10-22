'use strict';

define(function (require, exports) {
    var React = require('react');
    var $ = require('jquery');

    var StackedNavPill = require('../util/stacked_nav_pill');

    var Development = React.createClass({
        displayName: 'Development',

        render: function render() {
            return React.createElement(
                'div',
                null,
                'MultipleBrowser'
            );
        }
    });

    var Configuration = React.createClass({
        displayName: 'Configuration',

        render: function render() {
            return React.createElement(
                'div',
                null,
                'MultipleBrowser'
            );
        }
    });

    var PortalProperties = React.createClass({
        displayName: 'PortalProperties',

        render: function render() {
            return React.createElement(
                'div',
                null,
                'MultipleBrowser'
            );
        }
    });

    var id = 'knowledge-base-nav-pill';
    var tabs = ['Development', 'Configuration', 'Portal Properties'];
    var tab_contents = {
        development: React.createElement(Development, null),
        configuration: React.createElement(Configuration, null),
        portal_propeties: React.createElement(PortalProperties, null)
    };

    exports.index = React.createElement(StackedNavPill, { id: id, tabs: tabs, tab_contents: tab_contents });
});