'use strict';

define(function (require, exports) {
    var React = require('react');

    var chromeUtil = require('chromeUtil').chromeLocalStorage;

    var templates = require('comment');

    var comment = require('../../util/comment');
    var dropdown = require('../../util/dropdown');

    exports.QARBox = function () {
        var EnvironmentBox = React.createClass({
            displayName: 'EnvironmentBox',

            getDefaultProps: function getDefaultProps() {
                return {
                    os: 'Win7 64x',
                    server: 'Tomcat 7.0.62',
                    db: 'MySql 5.5',
                    browser: 'FF Latest'
                };
            },

            render: function render() {
                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'div',
                        { clasName: 'row' },
                        React.createElement(
                            'div',
                            { className: 'row' },
                            React.createElement(
                                'div',
                                { className: 'col-xs-6' },
                                React.createElement(
                                    'p',
                                    null,
                                    'Environment Setting:'
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'row' },
                            dropdown.singleButtonDropDown('OS')
                        ),
                        React.createElement(
                            'div',
                            { className: 'row' },
                            dropdown.singleButtonDropDown('Server')
                        ),
                        React.createElement(
                            'div',
                            { className: 'row' },
                            dropdown.singleButtonDropDown('DataBase')
                        ),
                        React.createElement(
                            'div',
                            { className: 'row' },
                            dropdown.singleButtonDropDown('Browser')
                        )
                    )
                );
            }
        });

        var PortalTrunkBox = React.createClass({
            displayName: 'PortalTrunkBox',

            getDefaultProps: function getDefaultProps() {
                return {
                    gitk_61: '61 GIT ID',
                    gitk_62: '62 GIT ID',
                    gitk_master: 'master GIT ID'
                };
            },

            render: function render() {
                return React.createElement('div', { className: 'row' });
            }
        });

        var QARCommentTitleBox = React.createClass({
            displayName: 'QARCommentTitleBox',

            render: function render() {
                return React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(EnvironmentBox, null),
                    React.createElement(
                        'p',
                        null,
                        'QA-R Comment List'
                    )
                );
            }
        });

        var QARCommentListBox = React.createClass({
            displayName: 'QARCommentListBox',

            getDefaultProps: function getDefaultProps() {
                return {
                    team: 'qar'
                };
            },

            getInitialState: function getInitialState() {
                return {
                    rows: []
                };
            },

            render: function render() {
                return React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(QARCommentTitleBox, null),
                    comment.CommentBox(this.props.team, this.state.rows)
                );
            },

            componentDidMount: function componentDidMount() {
                var template = templates.templates_qar;

                chromeUtil.getLocalStorageSync("qar_obj").then((function (err, result) {
                    var e;
                    var rows = [];

                    if (!result) {
                        var obj = {};

                        for (e in template) {
                            if (template.hasOwnProperty(e)) {
                                obj[e] = {
                                    id: e,
                                    key: e,
                                    des: templates.descriptions_qar[e],
                                    template: template[e]
                                };

                                rows.push(obj[e]);
                            }
                        }

                        chromeUtil.setLocalStorage({ 'qar_obj': obj }, (function () {
                            console.log("Initiate qar obj to %o successfully.", obj);
                            this.setState({ rows: rows });
                        }).bind(this));
                    } else {
                        for (e in result) {
                            if (result.hasOwnProperty(e)) rows.push(result[e]);
                        }

                        this.setState({ rows: rows });
                    }
                }).bind(this));
            }
        });

        return React.createElement(QARCommentListBox, null);
    };
});