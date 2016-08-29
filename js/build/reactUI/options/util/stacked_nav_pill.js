'use strict';

define(function (require) {
    var React = require('react');
    var $ = require('jquery');

    var StackedNavPill = React.createClass({
        displayName: 'StackedNavPill',

        getDefaultProps: function getDefaultProps() {
            return {
                id: 'myTabs',
                tabs: [],
                tab_contents: {}
            };
        },

        render: function render() {
            var tabs_HTML = [];
            var tab_contents_HTML = [];

            this.props.tabs.forEach(function (v, i) {
                var label = v.toLowerCase().replace(' ', '_');

                tabs_HTML.push(React.createElement(
                    'li',
                    { key: i + 'tab', 'data-toggle': 'pill', role: 'presentation' },
                    React.createElement(
                        'a',
                        { href: '#' + label },
                        v
                    )
                ));
                tab_contents_HTML.push(React.createElement(
                    'div',
                    { key: i + 'tab_content', role: 'tabpanel', className: 'tab-pane active',
                        id: label },
                    this.props.tab_contents[label]
                ));
            }.bind(this));

            return React.createElement(
                'div',
                { className: 'full-height' },
                React.createElement(
                    'div',
                    { className: 'tab-content' },
                    tab_contents_HTML
                ),
                React.createElement(
                    'ul',
                    { id: this.props.id, className: 'nav nav-pills tag-content-options-nav' },
                    tabs_HTML
                )
            );
        },

        componentDidMount: function componentDidMount() {
            var id = this.props.id;

            $('#' + id + ' a:first').tab('show');
            $('#' + id + ' a').click(function (e) {
                e.preventDefault();
                $(this).tab('show');
            });
        }
    });

    return StackedNavPill;
});