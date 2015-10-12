'use strict';

define(function (require, exports) {
    var $ = require('jquery');
    var React = require('react');
    var chromeUtil = require('chromeUtil').chromeLocalStorage;

    //UI Module
    var CommentRowBox = React.createClass({
        displayName: 'CommentRowBox',

        handleSave: function handleSave() {
            var team = this.props.team;
            var id = this.props.rows.id;

            var smartkey = React.findDOMNode(this.refs.smartkey);
            var description = React.findDOMNode(this.refs.description);
            var cc_obj = {
                id: id,
                key: $(smartkey).val(),
                des: $(description).val(),
                template: ''
            };

            chromeUtil.getLocalStorage(team + '_obj', function (result) {
                var custom_obj = result[team + '_obj'];
                cc_obj.template = custom_obj[id].template;
                custom_obj[id] = cc_obj;

                var temp = {};
                temp[team + '_obj'] = custom_obj;

                chromeUtil.setLocalStorage(temp, function () {
                    console.log("Change %s obj to %o successfully.", team, cc_obj);
                });
            });
        },

        handleMore: function handleMore() {
            window.open("/options.html?id=" + this.props.rows.id + "&team=" + this.props.team);
        },

        render: function render() {
            return React.createElement(
                'tr',
                null,
                React.createElement(
                    'td',
                    null,
                    React.createElement('input', { id: this.props.rows.id + '_key', type: 'text', className: 'table_input one_input',
                        placeholder: 'smartkey', ref: 'smartkey', defaultValue: this.props.rows.key })
                ),
                React.createElement(
                    'td',
                    null,
                    React.createElement('input', { id: this.props.rows.id + '_d', type: 'text', className: 'table_input two_input',
                        placeholder: 'description', ref: 'description', defaultValue: this.props.rows.des })
                ),
                React.createElement(
                    'td',
                    null,
                    React.createElement(
                        'button',
                        { type: 'button', value: 'save', className: ' three_input btn btn-default btn-xs',
                            onClick: this.handleSave },
                        'Save'
                    ),
                    React.createElement(
                        'button',
                        { type: 'button', value: 'more', className: ' three_input btn btn-info btn-xs',
                            onClick: this.handleMore },
                        'More'
                    )
                )
            );
        }
    });

    exports.CommentBox = function (team, rows) {
        var CommentRows = [];

        rows.forEach(function (c, i) {
            CommentRows.push(React.createElement(CommentRowBox, { key: i, rows: c, team: team }));
        });

        return React.createElement(
            'div',
            null,
            React.createElement(
                'table',
                { id: 'fp_basic', className: 'table table-striped table-condensed' },
                React.createElement(
                    'tbody',
                    null,
                    React.createElement(
                        'tr',
                        null,
                        React.createElement(
                            'th',
                            { className: 'one' },
                            'Smart Key'
                        ),
                        React.createElement(
                            'th',
                            { className: 'two' },
                            'Description'
                        ),
                        React.createElement(
                            'th',
                            { className: 'three' },
                            'To Do'
                        )
                    ),
                    CommentRows
                )
            )
        );
    };
});