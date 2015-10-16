define(function (require, exports) {
    var React = require('react');

    var chromeUtil = require('chromeUtil').chromeLocalStorage;

    var templates = require('comment');

    var comment = require('../../util/comment');
    var dropdown = require('../../util/dropdown');
    var input = require('../../util/input')

    var qar = require('qar');

    exports.QARBox = function () {
        var EnvironmentBox = React.createClass({
            checkedHandler: function (e) {
                var isChecked = e.target.checked;
                var id = e.target.id;
                var obj = this.state.isChecked;

                obj[id] = isChecked;

                chromeUtil.getLocalStorageSync('parameter_qar')
                    .then(function (err, result) {
                        result.enable_branch = obj;
                        return chromeUtil.setLocalStorageSync({
                            parameter_qar: result
                        })
                    });

                this.setState(obj);
            },

            switchHandler: function () {
                this.setState({
                    isPortal: !(this.state.isPortal)
                })
            },

            getDefaultProps: function () {
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
                        _61x: true
                    }
                };
            },

            getInitialState: function () {
                return {
                    isChecked: {
                        master: true,
                        _62x: true,
                        _61x: true
                    }
                }
            },

            render: function () {
                var portal_branch_detail = [];

                if (this.state.isChecked.master)
                    portal_branch_detail.push((
                        <div className='row'>
                            {input.singleInputWithTag('Master')}
                        </div>))

                if (this.state.isChecked._62x)
                    portal_branch_detail.push((
                        <div className='row'>
                            {input.singleInputWithTag('6.2.x EE')}
                        </div>))

                if (this.state.isChecked._61x)
                    portal_branch_detail.push((
                        <div className='row'>
                            {input.singleInputWithTag('6.1.x EE')}
                        </div>
                    ))

                return (
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className='col-xs-10 col-xs-offset-1'>
                                <div className='row'>
                                    <p className='block_title'>Device Setting</p>
                                </div>
                                <div className='row'>
                                    {dropdown.singleButtonDropDown('OS', qar.os_options, this.props.os)}
                                </div>
                                <div className='row'>
                                    {dropdown.singleButtonDropDown('Server', qar.server_options, this.props.server)}
                                </div>
                                <div className='row'>
                                    {dropdown.singleButtonDropDown('DataBase', qar.db_options, this.props.database)}
                                </div>
                                <div className='row'>
                                    {dropdown.singleButtonDropDown('Browser', qar.browser_options, this.props.browser)}
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-xs-10 col-xs-offset-1'>
                                <div className='row'>
                                    <p className='block_title'>{this.state.isPortal ? 'Portal ' : 'Plugin '} Portal
                                        Setting</p>
                                </div>
                                <div className='row'>
                                    <dt>Fix Portal Version</dt>
                                    <dd>
                                        <label className="checkbox-inline">
                                            <input type="checkbox" id='master' onChange={this.checkedHandler}
                                                   checked={this.state.isChecked.master}> Master</input>
                                        </label>
                                        <label className="checkbox-inline">
                                            <input type="checkbox" id='_62x' onChange={this.checkedHandler}
                                                   checked={this.state.isChecked._62x}> 6.2.x EE</input>
                                        </label>
                                        <label className="checkbox-inline">
                                            <input type="checkbox" id='_61x' onChange={this.checkedHandler}
                                                   checked={this.state.isChecked._61x}> 6.1.x EE</input>
                                        </label>
                                    </dd>
                                </div>

                                {portal_branch_detail}
                            </div>
                        </div>
                    </div>
                );
            },

            componentDidMount: function () {
                chromeUtil.getLocalStorageSync('parameter_qar')
                    .then(function (err, result) {
                        if (!result)
                            return chromeUtil.setLocalStorageSync({
                                parameter_qar: this.props
                            })
                        else {
                            this.setState({
                                isChecked: result.enable_branch
                            })
                        }

                    }.bind(this));
            }
        })

        var QARCommentTitleBox = React.createClass({
            render: function () {
                return (
                    <div className='row'>
                        <EnvironmentBox/>

                        <p className='block_title'>QA-R Comment List</p>
                    </div>
                )
            }
        });

        var QARCommentListBox = React.createClass({
            getDefaultProps: function () {
                return {
                    team: 'qar'
                }
            },

            getInitialState: function () {
                return {
                    rows: []
                }
            },

            render: function () {
                return (
                    <div className='row'>
                        <QARCommentTitleBox/>
                        {comment.CommentBox(this.props.team, this.state.rows)}
                    </div>
                )
            },

            componentDidMount: function () {
                var template = templates.templates_qar;

                chromeUtil.getLocalStorageSync("qar_obj")
                    .then(function (err, result) {
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

                            chromeUtil.setLocalStorage({'qar_obj': obj}, function () {
                                console.log("Initiate qar obj to %o successfully.", obj)
                                this.setState({rows: rows});
                            }.bind(this));
                        } else {
                            for (e in result) {
                                if (result.hasOwnProperty(e))
                                    rows.push(result[e])
                            }

                            this.setState({rows: rows});
                        }

                    }.bind(this));
            }
        });

        return (
            <QARCommentListBox/>
        )
    };

});