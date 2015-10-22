'use strict';

define(function (require) {
    var React = require('react');
    var bootstrap = require('bootstrap');
    var $ = require('jquery');

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
        },

        componentDidMount: function componentDidMount() {
            $('#nav-tabs a').click(function (e) {
                e.preventDefault();
                $(this).tab('show');
            });
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

    React.render(React.createElement(Navigation, null), document.getElementById('_nav'));
    React.render(React.createElement(ContentPanel, null), document.getElementById('_content_panel'));
});