'use strict';

define(function (require) {
    var $ = require('jquery');
    var chromeUtil = require('chromeUtil').chromeLocalStorage;
    var React = require('react');

    var custom = require('custom');
    var fixpack = require('fixpack');
    var qar = require('qar');
    var magic = require('magic');

    $(document).ready(function () {
        $(".team select").change(function () {
            var value = $(this).val();

            if (value == qar.properties.id) {
                qar.showPanel();
                fixpack.hidePanel();
            } else if (value == fixpack.properties.id) {
                qar.hidePanel();
                fixpack.showPanel();
            } else {
                alert('Error Team Initiate !!');
            }
        });

        custom.init();
        qar.init();
        fixpack.init();

        chromeUtil.getLocalStorage('team', function (result) {
            if (result.team) {
                //already initiated team option
                $(".team select").val(result.team);
            } else {
                //if the first time to initiated, set team to fixpack as default option
                chromeUtil.setLocalStorage({ "team": "fixpack" }, function () {
                    console.log("Init team to %s and Init setting", "fixpack");
                });
            }
        });
    });

    var TeamBox = React.createClass({
        displayName: 'TeamBox',

        handleSwitch: function handleSwitch(e) {
            var element = e.target;
            var fixpack = React.findDOMNode(this.refs.fixpack);
            var qar = React.findDOMNode(this.refs.qar);

            if ($(element).text() == 'Fix Pack') {
                $(fixpack).addClass('active');
                $(qar).removeClass('active');
            } else {
                $(qar).addClass('active');
                $(fixpack).removeClass('active');
            }
        },

        render: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'p',
                    null,
                    'Team Setting'
                ),
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'col-xs-3 col-xs-offset-3' },
                        React.createElement(
                            'button',
                            { className: 'btn btn-default btn-block active', ref: 'fixpack', onClick: this.handleSwitch },
                            'Fix Pack'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-xs-3' },
                        React.createElement(
                            'button',
                            { className: 'btn btn-default btn-block', ref: 'qar', onClick: this.handleSwitch },
                            'QA-R'
                        )
                    )
                )
            );
        }
    });

    var BasicCommentBox = React.createClass({
        displayName: 'BasicCommentBox',

        render: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(TeamBox, null),
                React.createElement(
                    'div',
                    null,
                    'this is basic'
                )
            );
        }
    });

    var CustomCommentBox = React.createClass({
        displayName: 'CustomCommentBox',

        render: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'p',
                    null,
                    'Custom Comment List'
                ),
                React.createElement(
                    'div',
                    null,
                    'this is custom'
                )
            );
        }
    });

    var PopupBox = React.createClass({
        displayName: 'PopupBox',

        render: function render() {
            return React.createElement(
                'div',
                { id: 'popupBox', className: 'container-fluid' },
                magic.MagicBox,
                React.createElement(BasicCommentBox, null),
                React.createElement(CustomCommentBox, null)
            );
        }
    });

    React.render(React.createElement(PopupBox, null), document.getElementById('_main'));
});