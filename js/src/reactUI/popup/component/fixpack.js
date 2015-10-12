define(function (require, exports) {
    var React = require('react');

    var chromeUtil = require('chromeUtil').chromeLocalStorage;

    var templates = require('comment');
    var comment = require('../../util/comment');

    var defaultPortalVersion = '6.2.10 EE SP13';

    exports.FixPackBox = function () {
        var IsRregression = React.createClass({
            render: function () {
                return (
                    <div className="col-sm-4">
                        Regression Style:
                        <input type="radio" value="1" name="is_regression" ref='isReg_y'
                               onChange={this.props.handleChecked} checked={this.props.isRegression}/> YES
                        <input type="radio" value="0" name="is_regression" ref='isReg_n'
                               onChange={this.props.handleChecked} checked={!this.props.isRegression}/> NO
                    </div>
                );
            }
        });

        var PortalVersion = React.createClass({
            render: function () {
                return (
                    <div className="col-sm-5 col-sm-offset-3">
                        Portal Version:
                        <select ref='portal_version' value={this.props.portal_branch}
                                onChange={this.props.handleChange}>
                            <option value="6.2.10 EE SP13">
                                6.2.10 EE SP13
                            </option>
                            <option value="6.1.30 EE GA3 SP4">
                                6.1.30 EE GA3 SP4
                            </option>
                        </select>
                    </div>
                );
            }
        });

        var FixPackCommentTitleBox = React.createClass({
            handleChecked: function (e) {
                var value = Boolean(parseInt(e.target.value));

                this.setState({isRegression: value});

                chromeUtil.getLocalStorageSync('parameter_fp')
                    .then(function (err, results) {
                        results.isRegression = value;

                        chromeUtil.setLocalStorage({"parameter_fp": results}, function () {
                            console.log('Set fixpack parameter obj to %o', results)
                        })
                    })
            },

            handleChange: function (e) {
                var value = e.target.value;

                this.setState({portal_branch: value});

                chromeUtil.getLocalStorageSync('parameter_fp')
                    .then(function (err, results) {
                        results.portal_branch = value;

                        chromeUtil.setLocalStorage({"parameter_fp": results}, function () {
                            console.log('Set fixpack parameter obj to %o', results)
                        })
                    })
            },

            getInitialState: function () {
                return {
                    isRegression: false,
                    portal_branch: defaultPortalVersion
                }
            },

            render: function () {
                return (
                    <div className='row'>
                        <p>Fix Pack Comment List</p>
                        <IsRregression isRegression={this.state.isRegression}
                                       handleChecked={this.handleChecked}/>
                        <PortalVersion portal_branch={this.state.portal_branch}
                                       handleChange={this.handleChange}/>

                    </div>
                )
            },

            componentDidMount: function () {
                var state = {};

                chromeUtil.getLocalStorageSync('parameter_fp')
                    .then(function (err, result) {
                        var default_fp_obj = {
                            portal_branch: this.state.portal_branch,
                            isRegressionStyle: this.state.isRegression
                        };

                        if (result) {
                            state.isRegression = result.isRegression;
                            state.portal_branch = result.portal_branch;
                            this.setState(state);
                        }
                        else {
                            var parameter_fp = default_fp_obj;

                            chromeUtil.setLocalStorage({"parameter_fp": parameter_fp}, function () {
                                console.log("Init parameter_fp %o successfully", parameter_fp)
                            })
                        }
                    }.bind(this));
            }
        });

        var FixPackCommentListBox = React.createClass({
            getDefaultProps: function () {
                return {
                    team: 'fp'
                }
            },

            getInitialState: function () {
                return {
                    rows: [],
                    setting: {
                        isRegression: false,
                        value: defaultPortalVersion
                    }
                }
            },

            render: function () {
                return (
                    <div className='row'>
                        <FixPackCommentTitleBox/>
                        {comment.CommentBox(this.props.team, this.state.rows)}
                    </div>
                )
            },

            componentDidMount: function () {
                var template = templates.templates_fp;

                chromeUtil.getLocalStorageSync("fp_obj")
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
                                        des: templates.descriptions_fp[e],
                                        template: template[e]
                                    };

                                    rows.push(obj[e]);
                                }
                            }

                            chromeUtil.setLocalStorage({'fp_obj': obj}, function () {
                                console.log("Initiate fixpack obj to %o successfully.", obj)
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
            <FixPackCommentListBox/>
        )
    };

});