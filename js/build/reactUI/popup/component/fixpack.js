'use strict';

define(function (require, exports) {
    var React = require('react');

    var chromeUtil = require('chromeUtil').chromeLocalStorage;

    //model
    var comment = require('../../util/comment');

    //ui

    var defaultPortalVersion = '6.2.10 EE SP13';

    exports.FixPackBox = function () {
        var IsRregression = React.createClass({
            displayName: 'IsRregression',

            render: function render() {
                return React.createElement(
                    'div',
                    { className: 'col-sm-4' },
                    'Regression Style:',
                    React.createElement('input', { type: 'radio', id: 'sex_0', value: 'y', name: 'is_regression',
                        defaultChecked: this.props.isRegression }),
                    ' YES',
                    React.createElement('input', { type: 'radio', id: 'sex_1', value: 'n', name: 'is_regression',
                        defaultChecked: !this.props.isRegression }),
                    ' NO'
                );
            }
        });

        var PortalVersion = React.createClass({
            displayName: 'PortalVersion',

            render: function render() {
                return React.createElement(
                    'div',
                    { className: 'col-sm-5 col-sm-offset-3' },
                    'Portal Version:',
                    React.createElement(
                        'select',
                        { ref: 'portal_version', defaultValue: this.props.value },
                        React.createElement(
                            'option',
                            { value: '6.2.10 EE SP13' },
                            '6.2.10 EE SP13'
                        ),
                        React.createElement(
                            'option',
                            { value: '6.1.30 EE GA3 SP4' },
                            '6.1.30 EE GA3 SP4'
                        )
                    )
                );
            }
        });

        var FixPackCommentTitleBox = React.createClass({
            displayName: 'FixPackCommentTitleBox',

            render: function render() {
                return React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'p',
                        null,
                        'Fix Pack Comment List'
                    ),
                    React.createElement(IsRregression, { isRegression: this.props.setting.isRegression }),
                    React.createElement(PortalVersion, { value: this.props.setting.value })
                );
            }
        });

        var FixPackCommentListBox = React.createClass({
            displayName: 'FixPackCommentListBox',

            getDefaultProps: function getDefaultProps() {
                return {
                    team: 'fp'
                };
            },

            getInitialState: function getInitialState() {
                return {
                    rows: [],
                    setting: {
                        isRegression: false,
                        value: defaultPortalVersion
                    }
                };
            },

            render: function render() {
                return React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(FixPackCommentTitleBox, { setting: this.state.setting }),
                    comment.CommentBox(this.props.team, this.state.rows)
                );
            },

            componentDidMount: function componentDidMount() {
                var template = comment.templates_fp;
                var state = {};

                chromeUtil.getLocalStorageSync("fp_obj").then((function (err, result) {
                    var e;
                    var rows = [];

                    if (!result) {
                        var obj = {};

                        for (e in template) {
                            if (template.hasOwnProperty(e)) {
                                obj[e] = {
                                    id: e,
                                    key: e,
                                    des: comment.descriptions_fp[e],
                                    template: template[e]
                                };
                            }
                        }

                        chromeUtil.setLocalStorage({ 'fp_obj': obj }, function () {
                            console.log("Initiate fixpack obj to %o successfully.", obj);
                        });
                    } else {
                        for (e in result) {
                            if (result.hasOwnProperty(e)) rows.push(result[e]);
                        }

                        state.rows = rows;
                    }

                    return chromeUtil.getLocalStorageSync("parameter_fp");
                }).bind(this)).then((function (err, result) {
                    var default_fp_obj = {
                        portal_branch: this.state.portal_branch,
                        isRegressionStyle: this.state.isRegressionStyle
                    };

                    if (result) {
                        state.isRegressionStyle = result.isRegressionStyle;
                        state.portal_branch = result.portal_branch;
                        this.setState(state);
                    } else {
                        var parameter_fp = default_fp_obj;

                        chromeUtil.setLocalStorage({ "parameter_fp": parameter_fp }, function () {
                            console.log("Init parameter_fp %o successfully", parameter_fp);
                        });
                    }
                }).bind(this));
            }
        });

        return React.createElement(FixPackCommentListBox, null);
    };
});