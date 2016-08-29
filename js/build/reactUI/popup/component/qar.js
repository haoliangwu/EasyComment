'use strict';

define(function (require, exports) {
    var React = require('react');

    var chromeUtil = require('chromeUtil').chromeLocalStorage;

    var templates = require('comment');

    var comment = require('../../util/comment');
    var dropdown = require('../../util/dropdown');
    var input = require('../../util/input');
    var setting = require('../../../model/setting');

    var qar = require('qar');

    exports.QARBox = function () {
        var EnvironmentBox = React.createClass({
            displayName: 'EnvironmentBox',

            checkedHandler: function checkedHandler(e) {
                var isChecked = e.target.checked;
                var id = e.target.id;
                var obj = this.state.isChecked;

                obj[id] = isChecked;

                chromeUtil.getLocalStorageSync('parameter_qar').then(function (err, result) {
                    result.enable_branch = obj;

                    return chromeUtil.setLocalStorageSync({
                        parameter_qar: result
                    });
                }).then(function () {
                    setting.syncQARComment();
                });

                this.setState(obj);
            },

            switchHandler: function switchHandler() {
                this.setState({
                    isPortal: !this.state.isPortal
                });
            },

            getDefaultProps: function getDefaultProps() {
                return {
                    os: 'Win7',
                    server: 'Tomcat',
                    database: 'MySql 5.5',
                    browser: 'FF Latest',

                    gitk_61x: '',
                    gitk_62x: '',
                    gitk_master: '',

                    server_61x: '',
                    server_62x: '',
                    server_master: '',

                    enable_branch: {
                        master: true,
                        _62x: true,
                        _61x: true,
                        master_r: true,
                        _62x_r: true,
                        _61x_r: true
                    }
                };
            },

            getInitialState: function getInitialState() {
                return {
                    isChecked: {
                        master: true,
                        _62x: true,
                        _61x: true,
                        master_r: true,
                        _62x_r: true,
                        _61x_r: true
                    }
                };
            },

            render: function render() {
                var portal_branch_detail = [];
                var portal_branch_detail_r = [];

                if (this.state.isChecked.master) portal_branch_detail.push(React.createElement(
                    'div',
                    { key: 'master', className: 'row' },
                    input.singleInputWithTag('Master')
                ));

                if (this.state.isChecked._62x) portal_branch_detail.push(React.createElement(
                    'div',
                    { key: '62x', className: 'row' },
                    input.singleInputWithTag('6.2.x EE')
                ));

                if (this.state.isChecked._61x) portal_branch_detail.push(React.createElement(
                    'div',
                    { key: '61x', className: 'row' },
                    input.singleInputWithTag('6.1.x EE')
                ));

                if (this.state.isChecked.master_r) portal_branch_detail_r.push(React.createElement(
                    'div',
                    { key: 'master', className: 'row' },
                    input.singleInputWithTag('Master(R)')
                ));

                if (this.state.isChecked._62x_r) portal_branch_detail_r.push(React.createElement(
                    'div',
                    { key: '62x', className: 'row' },
                    input.singleInputWithTag('6.2.x EE(R)')
                ));

                if (this.state.isChecked._61x_r) portal_branch_detail_r.push(React.createElement(
                    'div',
                    { key: '61x', className: 'row' },
                    input.singleInputWithTag('6.1.x EE(R)')
                ));

                return React.createElement(
                    'div',
                    { className: 'container-fluid' },
                    React.createElement(
                        'div',
                        { className: 'row' },
                        React.createElement(
                            'div',
                            { className: 'col-xs-10 col-xs-offset-1' },
                            React.createElement(
                                'div',
                                { className: 'row' },
                                React.createElement(
                                    'p',
                                    { className: 'block_title' },
                                    'Device Detail Setting'
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'row' },
                                dropdown.singleButtonDropDown('OS', qar.os_options, this.props.os)
                            ),
                            React.createElement(
                                'div',
                                { className: 'row' },
                                dropdown.singleButtonDropDown('Server', qar.server_options, this.props.server)
                            ),
                            React.createElement(
                                'div',
                                { className: 'row' },
                                dropdown.singleButtonDropDown('DataBase', qar.db_options, this.props.database)
                            ),
                            React.createElement(
                                'div',
                                { className: 'row' },
                                dropdown.singleButtonDropDown('Browser', qar.browser_options, this.props.browser)
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'row' },
                        React.createElement(
                            'div',
                            { className: 'col-xs-10 col-xs-offset-1' },
                            React.createElement(
                                'div',
                                { className: 'row' },
                                React.createElement(
                                    'p',
                                    { className: 'block_title' },
                                    'Portal Detail Setting'
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'row' },
                                React.createElement(
                                    'dt',
                                    null,
                                    'Reproduced Portal Version'
                                ),
                                React.createElement(
                                    'dd',
                                    null,
                                    React.createElement(
                                        'label',
                                        { className: 'checkbox-inline' },
                                        React.createElement(
                                            'input',
                                            { type: 'checkbox', id: 'master_r', onChange: this.checkedHandler,
                                                checked: this.state.isChecked.master_r },
                                            ' Master'
                                        )
                                    ),
                                    React.createElement(
                                        'label',
                                        { className: 'checkbox-inline' },
                                        React.createElement(
                                            'input',
                                            { type: 'checkbox', id: '_62x_r', onChange: this.checkedHandler,
                                                checked: this.state.isChecked._62x_r },
                                            ' 6.2.x EE'
                                        )
                                    ),
                                    React.createElement(
                                        'label',
                                        { className: 'checkbox-inline' },
                                        React.createElement(
                                            'input',
                                            { type: 'checkbox', id: '_61x_r', onChange: this.checkedHandler,
                                                checked: this.state.isChecked._61x_r },
                                            ' 6.1.x EE'
                                        )
                                    )
                                )
                            ),
                            portal_branch_detail_r,
                            React.createElement(
                                'div',
                                { className: 'row' },
                                React.createElement(
                                    'dt',
                                    null,
                                    'Fixed Portal Version'
                                ),
                                React.createElement(
                                    'dd',
                                    null,
                                    React.createElement(
                                        'label',
                                        { className: 'checkbox-inline' },
                                        React.createElement(
                                            'input',
                                            { type: 'checkbox', id: 'master', onChange: this.checkedHandler,
                                                checked: this.state.isChecked.master },
                                            ' Master'
                                        )
                                    ),
                                    React.createElement(
                                        'label',
                                        { className: 'checkbox-inline' },
                                        React.createElement(
                                            'input',
                                            { type: 'checkbox', id: '_62x', onChange: this.checkedHandler,
                                                checked: this.state.isChecked._62x },
                                            ' 6.2.x EE'
                                        )
                                    ),
                                    React.createElement(
                                        'label',
                                        { className: 'checkbox-inline' },
                                        React.createElement(
                                            'input',
                                            { type: 'checkbox', id: '_61x', onChange: this.checkedHandler,
                                                checked: this.state.isChecked._61x },
                                            ' 6.1.x EE'
                                        )
                                    )
                                )
                            ),
                            portal_branch_detail
                        )
                    )
                );
            },

            componentDidMount: function componentDidMount() {
                chromeUtil.getLocalStorageSync('parameter_qar').then(function (err, result) {
                    if (!result) return chromeUtil.setLocalStorageSync({
                        parameter_qar: this.props
                    });else {
                        this.setState({
                            isChecked: result.enable_branch
                        });
                    }
                }.bind(this));
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
                        { className: 'block_title' },
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

                chromeUtil.getLocalStorageSync("qar_obj").then(function (err, result) {
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

                        chromeUtil.setLocalStorage({ 'qar_obj': obj }, function () {
                            console.log("Initiate qar obj to %o successfully.", obj);
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

        return React.createElement(QARCommentListBox, null);
    };
});