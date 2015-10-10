define(function (require, exports) {
    var React = require('react');

    var chromeUtil = require('chromeUtil').chromeLocalStorage;

    //model
    var comment = require('../../util/comment');

    //ui


    var defaultPortalVersion = '6.2.10 EE SP13';

    exports.FixPackBox = function () {
        var IsRregression = React.createClass({
            render: function () {
                return (
                    <div className="col-sm-4">
                        Regression Style:
                        <input type="radio" id="sex_0" value="y" name="is_regression"
                               defaultChecked={this.props.isRegression}/> YES
                        <input type="radio" id="sex_1" value="n" name="is_regression"
                               defaultChecked={!this.props.isRegression}/> NO
                    </div>
                );
            }
        });

        var PortalVersion = React.createClass({
            render: function () {
                return (
                    <div className="col-sm-5 col-sm-offset-3">
                        Portal Version:
                        <select ref='portal_version' defaultValue={this.props.value}>
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
            render: function () {
                return (
                    <div className='row'>
                        <p>Fix Pack Comment List</p>
                        <IsRregression isRegression={this.props.setting.isRegression}/>
                        <PortalVersion value={this.props.setting.value}/>
                    </div>
                )
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
                        <FixPackCommentTitleBox setting={this.state.setting}/>
                        {comment.CommentBox(this.props.team, this.state.rows)}
                    </div>
                )
            },

            componentDidMount: function () {
                var template = comment.templates_fp;
                var state = {};

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
                                        des: comment.descriptions_fp[e],
                                        template: template[e]
                                    };
                                }
                            }

                            chromeUtil.setLocalStorage({'fp_obj': obj}, function () {
                                console.log("Initiate fixpack obj to %o successfully.", obj)
                            });
                        } else {
                            for (e in result) {
                                if (result.hasOwnProperty(e))
                                    rows.push(result[e])
                            }

                            state.rows = rows;
                        }

                        return chromeUtil.getLocalStorageSync("parameter_fp");
                    }.bind(this))
                    .then(function (err, result) {
                        var default_fp_obj = {
                            portal_branch: this.state.portal_branch,
                            isRegressionStyle: this.state.isRegressionStyle
                        };

                        if (result) {
                            state.isRegressionStyle = result.isRegressionStyle;
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
        })

        return (
            <FixPackCommentListBox/>
        )
    };

});