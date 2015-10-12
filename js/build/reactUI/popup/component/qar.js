'use strict';

define(function (require, exports) {
    var React = require('react');

    var chromeUtil = require('chromeUtil').chromeLocalStorage;

    var templates = require('comment');
    var comment = require('../../util/comment');

    exports.QARBox = function () {

        var QARCommentTitleBox = React.createClass({
            displayName: 'QARCommentTitleBox',

            render: function render() {
                return React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'p',
                        null,
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

                chromeUtil.getLocalStorageSync("qar_obj").then((function (err, result) {
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

                        chromeUtil.setLocalStorage({ 'qar_obj': obj }, (function () {
                            console.log("Initiate qar obj to %o successfully.", obj);
                            this.setState({ rows: rows });
                        }).bind(this));
                    } else {
                        for (e in result) {
                            if (result.hasOwnProperty(e)) rows.push(result[e]);
                        }

                        this.setState({ rows: rows });
                    }
                }).bind(this));
            }
        });

        return React.createElement(QARCommentListBox, null);
    };
});