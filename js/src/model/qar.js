define(function (require, exports) {
    var $ = require('jquery');
    var React = require('react');
    var comment = require('comment');
    var chromeUtil = require('chromeUtil').chromeLocalStorage;

    var default_qar_obj = {
        server_master: '',
        server_61: '',
        db: '',
        x61: '',
        x62: '',
        master: ''
    };

    var properties = {
        id: 'qar',
        table_selector: '#qa-r'
    };

    exports.properties = properties;

    exports.init = function () {
        var template = comment.templates_qar;

        chromeUtil.getLocalStorage("qar_obj", function (result) {
            var e;
            if (!result.qar_obj) {
                var obj = {};

                for (e in template) {
                    if (template.hasOwnProperty(e)) {
                        obj[e] = {
                            id: e,
                            key: e,
                            des: comment.descriptions_qar[e],
                            template: template[e]
                        };
                    }
                }

                chromeUtil.setLocalStorage({'qar_obj': obj}, function () {
                    console.log("Initiate fixpack obj to %o successfully.", obj)
                });
            } else {
                //initiate UI
                for (e in result.qar_obj) {
                    //create element
                    if (result.qar_obj.hasOwnProperty(e)) {
                        comment.initSmartKeyEntry(result.qar_obj[e], '#qar_basic', 'qar');
                    }
                }
            }
        });

        chromeUtil.getLocalStorage("parameter_qar", function (result) {
            if (result.parameter_qar) {
                var obj = result.parameter_qar;

                //initiate setting parameters mapping to local storage
                $('#server_master').val(obj.server_master);
                $('#server_61').val(obj.server_61);
                $('#db').val(obj.db);
                $('#x61').val(obj.x61);
                $('#x62').val(obj.x62);
                $('#master').val(obj.master);
                $("input #qa-r").keyup(function () {
                    var id = $(this).attr('id');
                    obj[id] = $(this).val();
                    chromeUtil.setLocalStorage({"parameter_qar": obj}, function () {
                        console.log("Change Parameter_qar obj to %o", obj)
                    })
                });
            }
            else {
                var parameter_qar = default_qar_obj;

                chromeUtil.setLocalStorage({"parameter_qar": parameter_qar}, function () {
                    console.log("Init Parameter_qar %o successfully", parameter_qar)
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

    //UI Module
    var ParametersBox = React.createClass({
        render: function () {
            return (
                <div>QA-R ParameterBox</div>
            );
        }
    });

    var QARCommentListBox = React.createClass({
        getInitialState: function () {
            return {rows: []};
        },

        componentWillMount: function () {
            var template = comment.templates_qar;

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
                                    des: comment.descriptions_qar[e],
                                    template: template[e]
                                };
                            }
                        }

                        chromeUtil.setLocalStorage({'qar_obj': obj}, function () {
                            console.log("Initiate qa-r obj to %o successfully.", obj)
                        });
                    } else {
                        for (e in result) {
                            if (result.hasOwnProperty(e)) {
                                rows.push(result[e])
                            }
                        }

                        this.setState({rows: rows});
                    }
                }.bind(this));
        },

        render: function () {
            return (
                <div className="smartkey">
                    <table id="qar_basic" className="table table-striped table-condensed">
                        <tbody>
                        <tr>
                            <th className="one">Smart Key</th>
                            <th className="two">Description</th>
                            <th className="three">To Do</th>
                        </tr>
                        {comment.CommentRowBox(this.state.rows, 'qar')}
                        </tbody>
                    </table>
                </div>
            );
        }
    });

    exports.QARCommentListBox = (
        <div className="row">
            <p>QA-R Comment List</p>
            <ParametersBox />
            <QARCommentListBox />
        </div>
    );
});
