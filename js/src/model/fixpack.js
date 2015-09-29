define(function (require, exports) {
    var $ = require('jquery');
    var comment = require('comment');
    var chromeUtil = require('chromeUtil').chromeLocalStorage;
    var promise = require('promise');
    var React = require('react');

    var default_fp_obj = {
        portal_branch: '6.2.10 EE SP13',
        isRegressionStyle: false
    };

    var properties = {
        id: 'fixpack',
        table_selector: '#fixpack'
    };

    exports.properties = properties;

    exports.init = function () {
        var template = comment.templates_fp;

        //fixpack comment table module
        chromeUtil.getLocalStorage("fp_obj", function (result) {
            var e;

            if (!result.fp_obj) {
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
                //initiate UI
                for (e in result.fp_obj) {
                    //create element
                    //if (result.fp_obj.hasOwnProperty(e))
                    //    comment.initSmartKeyEntry(result.fp_obj[e], '#fp_basic', 'fp');
                }
            }
        });

        //fixpack comment setting module
        chromeUtil.getLocalStorage("parameter_fp", function (result) {
            if (result.parameter_fp) {
                var $portal_branch = $('.parameter_fixpack select');
                var $regression_style_enable = $('.parameter_fixpack input:radio:eq(0)');
                var $regression_style_disable = $('.parameter_fixpack input:radio:eq(1)');

                var obj = result.parameter_fp;

                //initiate setting parameters mapping to local storage
                $portal_branch.val(obj.portal_branch);
                if (obj.isRegressionStyle) {
                    $regression_style_enable.attr('checked', true);
                    $regression_style_disable.attr('checked', false);
                }
                else {
                    $regression_style_enable.attr('checked', false);
                    $regression_style_disable.attr('checked', true);
                }

                $portal_branch.change(function () {
                    obj.portal_branch = $(this).val();
                    chromeUtil.setLocalStorage({"parameter_fp": obj}, function () {
                        console.log("Change parameter_fp obj to %o", obj)
                    });
                });
                $(".parameter_fixpack input:radio").change(function () {
                    var value = $('.parameter_fixpack input:radio:checked').val();
                    console.log(value);
                    obj.isRegressionStyle = (value == 'y');
                    chromeUtil.setLocalStorage({"parameter_fp": obj}, function () {
                        console.log("Change parameter_fp obj to %o", obj)
                    });
                });
            }
            else {
                var parameter_fp = default_fp_obj;

                chromeUtil.setLocalStorage({"parameter_fp": parameter_fp}, function () {
                    console.log("Init parameter_fp %o successfully", parameter_fp)
                })
            }
        });
    };

    /*The Api of FixPack Module
     */

    //UI DOM
    exports.showPanel = function (speed) {
        $(properties.table_selector).show(speed);
    };

    exports.hidePanel = function (speed) {
        $(properties.table_selector).hide(speed);
    };

    //React Components
    var IsRregression = React.createClass({
        render: function () {
            return (
                <div className="col-sm-4">
                    Regression Style:
                    <strong>YES</strong>
                    <input type="radio" name="regression" value="y"/>
                    <strong>NO</strong>
                    <input type="radio" name="regression" value="n"/>
                </div>
            );
        }
    });

    var PortalVersion = React.createClass({
        render: function () {
            return (
                <div className="col-sm-5 col-sm-offset-3">
                    Portal Version:
                    <select>
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

    var ParametersBox = React.createClass({
        render: function () {
            return (
                <div className='row'>
                    <IsRregression/>
                    <PortalVersion/>
                </div>
            );
        }
    });

    var FixPackCommentListBox = React.createClass({
        getInitialState: function () {
            return {rows: []};
        },

        componentWillMount: function () {
            var template = comment.templates_fp;

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

                        this.setState({rows: rows});
                    }
                }.bind(this));
        },

        render: function () {
            return (
                <div className="smartkey">
                    <table id="fp_basic" className="table table-striped table-condensed">
                        <tbody>
                        <tr>
                            <th className="one">Smart Key</th>
                            <th className="two">Description</th>
                            <th className="three">To Do</th>
                        </tr>
                        {comment.CommentRowBox(this.state.rows, 'fp')}
                        </tbody>
                    </table>
                </div>
            );
        }
    });

    exports.FixPackCommentListBox = (
        <div id='fixpack' className="row">
            <p>Fix Pack Comment List</p>
            <ParametersBox />
            <FixPackCommentListBox />
        </div>
    );
});