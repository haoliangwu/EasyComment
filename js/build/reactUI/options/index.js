'use strict';

define(function (require) {
    var React = require('react');
    var bootstrap = require('bootstrap');
    var $ = require('jquery');

    require('$getURLParam').getURLParam($);

    var chromeUtil = require('chromeUtil').chromeLocalStorage;

    var home = require('./component/home');
    var cp = require('./component/control_panel');
    var mt = require('./component/magic_tools');
    var dm = require('./component/data_manufactor');
    var kb = require('./component/kb');

    //nav
    var Navigation = React.createClass({
        displayName: 'Navigation',

        render: function render() {
            return React.createElement(
                'ul',
                { id: 'nav-tabs', className: 'nav nav-tabs nav-justified' },
                React.createElement(
                    'li',
                    { role: 'presentation', className: 'active' },
                    React.createElement(
                        'a',
                        { href: '#home' },
                        'Home'
                    )
                ),
                React.createElement(
                    'li',
                    { role: 'presentation' },
                    React.createElement(
                        'a',
                        { href: '#control_panel' },
                        'Control Panel'
                    )
                ),
                React.createElement(
                    'li',
                    { role: 'presentation' },
                    React.createElement(
                        'a',
                        { href: '#magic_tools' },
                        'Magic Tools'
                    )
                ),
                React.createElement(
                    'li',
                    { role: 'presentation' },
                    React.createElement(
                        'a',
                        { href: '#data_manufactor' },
                        'Data Manufactor'
                    )
                ),
                React.createElement(
                    'li',
                    { role: 'presentation' },
                    React.createElement(
                        'a',
                        { href: '#knowledge_base' },
                        'Knowledge Base'
                    )
                )
            );
        }
    });

    var ContentPanel = React.createClass({
        displayName: 'ContentPanel',

        render: function render() {
            return React.createElement(
                'div',
                { className: 'tab-content' },
                React.createElement(
                    'div',
                    { role: 'tabpanel', className: 'tab-pane tab-pane-options active', id: 'home' },
                    home.index
                ),
                React.createElement(
                    'div',
                    { role: 'tabpanel', className: 'tab-pane tab-pane-options', id: 'control_panel' },
                    cp.index
                ),
                React.createElement(
                    'div',
                    { role: 'tabpanel', className: 'tab-pane tab-pane-options', id: 'magic_tools' },
                    mt.index
                ),
                React.createElement(
                    'div',
                    { role: 'tabpanel', className: 'tab-pane tab-pane-options', id: 'data_manufactor' },
                    dm.index
                ),
                React.createElement(
                    'div',
                    { role: 'tabpanel', className: 'tab-pane tab-pane-options', id: 'knowledge_base' },
                    kb.index
                )
            );
        }
    });

    var OptionsBox = React.createClass({
        displayName: 'OptionsBox',

        render: function render() {
            return React.createElement(
                'div',
                { className: 'col-xs-8 col-xs-offset-2 options_panel' },
                React.createElement(Navigation, null),
                React.createElement(ContentPanel, null)
            );
        },

        componentDidMount: function componentDidMount() {
            var $tabs = $('#nav-tabs');

            $tabs.find('a').click(function (e) {
                e.preventDefault();
                $(this).tab('show');
            });

            var tab_id = $.getURLParam('tab_id');

            if (tab_id) $tabs.find('a[href="#' + tab_id + '"]').click();
        }
    });

    React.render(React.createElement(OptionsBox, null), document.getElementById('_main'));
});