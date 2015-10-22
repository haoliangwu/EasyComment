'use strict';

define(function (require, exports) {
    var React = require('react');
    var $ = require('jquery');

    var StackedNavPill = require('../util/stacked_nav_pill');

    var MultipleBrowser = React.createClass({
        displayName: 'MultipleBrowser',

        render: function render() {
            return React.createElement(
                'div',
                null,
                'MultipleBrowser'
            );
        }
    });

    var CustomTable = React.createClass({
        displayName: 'CustomTable',

        render: function render() {
            return React.createElement(
                'div',
                null,
                'CustomTable'
            );
        }
    });

    var TicketDescription = React.createClass({
        displayName: 'TicketDescription',

        render: function render() {
            return React.createElement(
                'div',
                null,
                'TicketDescription'
            );
        }
    });

    var id = 'magic-tools-nav-pill';
    var tabs = ['Multiple Browser', 'Custom Table', 'Ticket Description'];
    var tab_contents = {
        multiple_browser: React.createElement(MultipleBrowser, null),
        custom_table: React.createElement(CustomTable, null),
        ticket_description: React.createElement(TicketDescription, null)
    };

    exports.index = React.createElement(StackedNavPill, { id: id, tabs: tabs, tab_contents: tab_contents });
});