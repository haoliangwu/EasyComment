'use strict';

define(function (require, exports) {
    var React = require('react');

    var chromeUtil = require('chromeUtil').chromeLocalStorage;

    var templates = require('comment');
    var comment = require('../../util/comment');

    var defaultPortalVersion = '6.2.10 EE SP15';

    exports.FixPackBox = function () {
        var IsRregression = React.createClass({
            displayName: 'IsRregression',

            render: function render() {
                return React.createElement(
                    'div',
                    { className: 'col-sm-4' },
                    'Regression Style:',
                    React.createElement('input', { type: 'radio', value: '1', name: 'is_regression', ref: 'isReg_y',
                        onChange: this.props.handleChecked, checked: this.props.isRegression }),
                    ' YES',
                    React.createElement('input', { type: 'radio', value: '0', name: 'is_regression', ref: 'isReg_n',
                        onChange: this.props.handleChecked, checked: !this.props.isRegression }),
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
                    React.createElement('input', { ref: 'portal_version', value: this.props.portal_branch,
                        onChange: this.props.handleChange })
                );
            }
        });

        var FixPackCommentTitleBox = React.createClass({
            displayName: 'FixPackCommentTitleBox',

            handleChecked: function handleChecked(e) {
                var value = Boolean(parseInt(e.target.value));

                this.setState({ isRegression: value });

                chromeUtil.getLocalStorageSync('parameter_fp').then(function (err, results) {
                    results.isRegression = value;

                    chromeUtil.setLocalStorage({ "parameter_fp": results }, function () {
                        console.log('Set fixpack parameter obj to %o', results);
                    });
                });
            },

            handleChange: function handleChange(e) {
                var value = e.target.value;

                this.setState({ portal_branch: value });

                chromeUtil.getLocalStorageSync('parameter_fp').then(function (err, results) {
                    results.portal_branch = value;

                    chromeUtil.setLocalStorage({ "parameter_fp": results }, function () {
                        console.log('Set fixpack parameter obj to %o', results);
                    });
                });
            },

            getInitialState: function getInitialState() {
                return {
                    isRegression: false,
                    portal_branch: defaultPortalVersion
                };
            },

            render: function render() {
                return React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'p',
                        { className: 'block_title' },
                        'Fix Pack Comment List'
                    ),
                    React.createElement(IsRregression, { isRegression: this.state.isRegression,
                        handleChecked: this.handleChecked }),
                    React.createElement(PortalVersion, { portal_branch: this.state.portal_branch,
                        handleChange: this.handleChange })
                );
            },

            componentDidMount: function componentDidMount() {
                var state = {};

                chromeUtil.getLocalStorageSync('parameter_fp').then(function (err, result) {
                    var default_fp_obj = {
                        portal_branch: this.state.portal_branch,
                        isRegressionStyle: this.state.isRegression
                    };

                    if (result) {
                        state.isRegression = result.isRegression;
                        state.portal_branch = result.portal_branch;
                        this.setState(state);
                    } else {
                        var parameter_fp = default_fp_obj;

                        chromeUtil.setLocalStorage({ "parameter_fp": parameter_fp }, function () {
                            console.log("Init parameter_fp %o successfully", parameter_fp);
                        });
                    }
                }.bind(this));
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
                    React.createElement(FixPackCommentTitleBox, null),
                    comment.CommentBox(this.props.team, this.state.rows)
                );
            },

            componentDidMount: function componentDidMount() {
                var template = templates.templates_fp;

                chromeUtil.getLocalStorageSync("fp_obj").then(function (err, result) {
                    var e;
                    var rows = [];
                    if (!result) {
                        var obj = {};

                        for (e in template) {
                            if (template.hasOwnProperty(e)) {
                                obj[e] = {
                                    id: e,
                                    key: e,
                                    des: templates.descriptions_fp[e],
                                    template: template[e]
                                };

                                rows.push(obj[e]);
                            }
                        }

                        chromeUtil.setLocalStorage({ 'fp_obj': obj }, function () {
                            console.log("Initiate fixpack obj to %o successfully.", obj);
                            this.setState({ rows: rows });
                        }.bind(this));
                    } else {
                        for (e in result) {
                            if (result.hasOwnProperty(e)) rows.push(result[e]);
                        }

                        this.setState({ rows: rows });
                    }
                }.bind(this));
            }
        });

        return React.createElement(FixPackCommentListBox, null);
    };
});