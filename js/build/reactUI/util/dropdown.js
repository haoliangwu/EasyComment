'use strict';

define(function (require, exports) {
    var bootstrap = require('bootstrap');
    var React = require('react');
    var $ = require('jquery');

    var SingleButtonDropDown = React.createClass({
        displayName: 'SingleButtonDropDown',

        getDefaultProps: function getDefaultProps() {
            return {
                title: 'OS',
                menu: ['option1', 'option2', 'option3'],
                chooseHandler: function chooseHandler(e) {
                    alert($(e.target).text());
                }
            };
        },

        getInitialState: function getInitialState() {
            return {
                title: this.props.title
            };
        },

        render: function render() {
            var rows = [];

            this.props.menu.forEach((function (c, i) {
                var row = React.createElement(
                    'li',
                    { key: 'env_' + i, onClick: this.props.chooseHandler },
                    React.createElement(
                        'a',
                        { href: '#' },
                        c
                    )
                );

                rows.push(row);
            }).bind(this));

            return React.createElement(
                'div',
                { ref: 'dropdown', className: 'col-xs-6 btn-group dropdown' },
                React.createElement(
                    'button',
                    { type: 'button', className: 'btn btn-default btn-block dropdown-toggle', 'data-toggle': 'dropdown',
                        'aria-haspopup': 'true', 'aria-expanded': 'false' },
                    this.state.title,
                    ' ',
                    React.createElement('span', { className: 'caret' })
                ),
                React.createElement(
                    'ul',
                    { className: 'dropdown-menu col-xs-12' },
                    rows
                )
            );
        },

        componentDidMount: function componentDidMount() {}
    });

    exports.singleButtonDropDown = function (title, menuList, eventHandler) {
        return React.createElement(SingleButtonDropDown, { title: title });
    };
});