'use strict';

define(function (require, exports) {
    var bootstrap = require('bootstrap');
    var React = require('react');
    var $ = require('jquery');

    var chromeUtil = require('chromeUtil').chromeLocalStorage;

    var SingleButtonDropDown = React.createClass({
        displayName: 'SingleButtonDropDown',

        chooseHandler: function chooseHandler(e) {
            var id = this.refs.ES_title.getDOMNode().id.toLowerCase();
            var value = $(e.target).text();
            chromeUtil.getLocalStorageSync('parameter_qar').then(function (err, result) {
                result[id] = value;
                return chromeUtil.setLocalStorageSync({
                    parameter_qar: result
                });
            });

            this.setState({
                value: value
            });
        },

        getDefaultProps: function getDefaultProps() {
            return {
                title: 'OS',
                menu: ['option1', 'option2', 'option3']
            };
        },

        getInitialState: function getInitialState() {
            return {
                value: this.props.value
            };
        },

        render: function render() {
            var rows = [];

            this.props.menu.forEach((function (c, i) {
                var row = React.createElement(
                    'li',
                    { key: 'env_' + i, onClick: this.chooseHandler },
                    React.createElement(
                        'a',
                        { href: '#' },
                        React.createElement(
                            'p',
                            { className: 'text-center' },
                            c
                        )
                    )
                );

                rows.push(row);
            }).bind(this));

            return React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-xs-6 btn-group dropdown' },
                    React.createElement(
                        'button',
                        { ref: 'ES_title', id: this.props.title, type: 'button',
                            className: 'btn btn-default btn-block dropdown-toggle',
                            'data-toggle': 'dropdown',
                            'aria-haspopup': 'true', 'aria-expanded': 'false' },
                        this.props.title,
                        React.createElement('span', { className: 'caret' })
                    ),
                    React.createElement(
                        'ul',
                        { className: 'dropdown-menu col-xs-6' },
                        rows
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'col-xs-5 border_currentValue' },
                    React.createElement(
                        'p',
                        { className: 'text-center' },
                        React.createElement(
                            'strong',
                            null,
                            React.createElement(
                                'u',
                                null,
                                this.state.value
                            )
                        )
                    )
                )
            );
        },

        componentDidMount: function componentDidMount() {
            chromeUtil.getLocalStorageSync('parameter_qar').then((function (err, result) {
                var default_qar_obj = {
                    os: 'Win7 64x',
                    server: 'Tomcat 7.0.62',
                    database: 'MySql 5.5',
                    browser: 'FF Latest'
                };

                if (!result) return chromeUtil.setLocalStorageSync({
                    parameter_qar: default_qar_obj
                });else {
                    var id = this.refs.ES_title.getDOMNode().id.toLowerCase();
                    this.setState({
                        value: result[id]
                    });
                }
            }).bind(this));
        }
    });

    exports.singleButtonDropDown = function (title, menuList, currentValue, eventHandler) {
        return React.createElement(SingleButtonDropDown, { title: title, menu: menuList, value: currentValue });
    };
});