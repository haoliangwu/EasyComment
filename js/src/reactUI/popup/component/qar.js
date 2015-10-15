define(function (require, exports) {
    var React = require('react');

    var chromeUtil = require('chromeUtil').chromeLocalStorage;

    var templates = require('comment');

    var comment = require('../../util/comment');
    var dropdown = require('../../util/dropdown');

    var qar = require('qar');

    exports.QARBox = function () {
        var EnvironmentBox = React.createClass({
            getDefaultProps: function () {
                return {
                    os: 'Win7 64x',
                    server: 'Tomcat 7.0.62',
                    database: 'MySql 5.5',
                    browser: 'FF Latest'
                }
            },

            getInitialState: function () {
                return {
                    os: 'Win7 64x',
                    server: 'Tomcat 7.0.62',
                    database: 'MySql 5.5',
                    browser: 'FF Latest'
                }
            },

            render: function () {
                return (
                    <div>
                        <div clasName='row'>
                            <div className='row'>
                                <div className='col-xs-6'><p className='block_title'>Environment Setting</p></div>
                                <div className='col-xs-5'><p className='block_title'>Current Value</p></div>
                            </div>
                            {dropdown.singleButtonDropDown('OS', qar.os_options, this.state.os)}
                            {dropdown.singleButtonDropDown('Server', qar.server_options, this.state.server)}
                            {dropdown.singleButtonDropDown('DataBase', qar.db_options, this.state.database)}
                            {dropdown.singleButtonDropDown('Browser', qar.browser_options, this.state.browser)}
                        </div>
                    </div>
                )
            }
        })

        var PortalTrunkBox = React.createClass({
            getDefaultProps: function () {
                return {
                    gitk_61: '61 GIT ID',
                    gitk_62: '62 GIT ID',
                    gitk_master: 'master GIT ID'
                }
            },

            render: function () {
                return (
                    <div className='row'>
                    </div>
                )
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