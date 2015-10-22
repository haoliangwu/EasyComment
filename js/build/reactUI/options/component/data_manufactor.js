'use strict';

define(function (require, exports) {
    var React = require('react');
    var $ = require('jquery');

    var StackedNavPill = require('../util/stacked_nav_pill');

    var DataManufactorMaster = React.createClass({
        displayName: 'DataManufactorMaster',

        render: function render() {
            return React.createElement(
                'div',
                null,
                'MultipleBrowser'
            );
        }
    });

    var DataManufactor62 = React.createClass({
        displayName: 'DataManufactor62',

        render: function render() {
            return React.createElement(
                'div',
                null,
                'MultipleBrowser'
            );
        }
    });

    var DataManufactor61 = React.createClass({
        displayName: 'DataManufactor61',

        render: function render() {
            return React.createElement(
                'div',
                null,
                'MultipleBrowser'
            );
        }
    });

    var DataManufactorHome = React.createClass({
        displayName: 'DataManufactorHome',

        render: function render() {
            return React.createElement(
                'div',
                null,
                'MultipleBrowser'
            );
        }
    });

    var id = 'data-manufactor-nav-pill';
    var tabs = ['DataManufactor Home', 'Master', ' 62', ' 61'];
    var tab_contents = {
        data_manufactor_home: React.createElement(DataManufactorHome, null),
        master: React.createElement(DataManufactorMaster, null),
        _62: React.createElement(DataManufactor62, null),
        _61: React.createElement(DataManufactor61, null)

    };

    exports.index = React.createElement(StackedNavPill, { id: id, tabs: tabs, tab_contents: tab_contents });
});