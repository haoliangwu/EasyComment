'use strict';

define(function (require, exports) {
    var React = require('react');

    var chromeUtil = require('chromeUtil').chromeLocalStorage;

    var comment = require('../../util/comment');

    exports.CustomBox = function () {
        var CustomCommentTitleBox = React.createClass({
            displayName: 'CustomCommentTitleBox',

            render: function render() {
                return React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'p',
                        { className: 'block_title' },
                        'Custom Comment List'
                    )
                );
            }
        });

        var CommentListBox = React.createClass({
            displayName: 'CommentListBox',

            AddNewComment: function AddNewComment() {
                var rows = this.state.rows;

                chromeUtil.getLocalStorageSync('custom_count').then((function (err, count) {
                    count++;

                    var cc_obj = {
                        id: count,
                        key: '',
                        des: '',
                        template: ''
                    };

                    rows.push(cc_obj);

                    this.setState({ rows: rows });

                    return chromeUtil.setLocalStorageSync({ custom_count: count });
                }).bind(this));
            },

            getDefaultProps: function getDefaultProps() {
                return {
                    team: 'custom'
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
                    React.createElement(CustomCommentTitleBox, null),
                    comment.CommentBox(this.props.team, this.state.rows),
                    React.createElement(
                        'button',
                        { className: 'btn btn-primary btn-block', onClick: this.AddNewComment },
                        'Add New Custom SmartKey To Have Fun'
                    )
                );
            },

            componentDidMount: function componentDidMount() {
                chromeUtil.getLocalStorageSync("custom_obj").then((function (err, result) {
                    var e;
                    var rows = [];

                    if (!result) {
                        chromeUtil.setLocalStorage({ 'custom_obj': {} }, function () {
                            console.log("Initiate custom obj to %o successfully.", {});
                        });
                    } else {
                        for (e in result) {
                            if (result.hasOwnProperty(e)) rows.push(result[e]);
                        }

                        this.setState({ rows: rows });
                    }
                }).bind(this));
            }

        });

        return React.createElement(CommentListBox, null);
    };
});