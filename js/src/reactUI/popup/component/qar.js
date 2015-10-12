define(function (require, exports) {
    var React = require('react');

    var chromeUtil = require('chromeUtil').chromeLocalStorage;

    var templates = require('comment');
    var comment = require('../../util/comment');

    exports.QARBox = function () {

        var QARCommentTitleBox = React.createClass({
            render: function () {
                return (
                    <div className='row'>
                        <p>QA-R Comment List</p>
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