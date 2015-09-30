'use strict';

define(function (require) {
    var $ = require('jquery');
    var chromeUtil = require('chromeUtil').chromeLocalStorage;
    var React = require('react');
    var promise = require('promise');
    var comment = require('comment');
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
                chromeUtil.setLocalStorage({ "team": "fp" }, function () {
                    console.log("Init team to %s and Init setting", "fixpack");
                });
            }
        });
    });

    var TeamBox = React.createClass({
        displayName: 'TeamBox',

        showFixPack: function showFixPack() {
            var fixpack = React.findDOMNode(this.refs.fixpack);
            var qar = React.findDOMNode(this.refs.qar);

            this.props.switchTeam({ team: 'fp' });
            $(fixpack).addClass('active');
            $(qar).removeClass('active');
        },

        showQAR: function showQAR() {
            var fixpack = React.findDOMNode(this.refs.fixpack);
            var qar = React.findDOMNode(this.refs.qar);

            this.props.switchTeam({ team: 'qar' });
            $(qar).addClass('active');
            $(fixpack).removeClass('active');
        },

        handleSwitch: function handleSwitch(e) {
            var element = e.target;

            if ($(element).text() == 'Fix Pack') {
                this.showFixPack();
            } else {
                this.showQAR();
            }
        },

        render: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'p',
                    null,
                    'Team Setting(Current is ',
                    this.props.team == 'fp' ? 'Fix Pack' : 'QA-R',
                    ')'
                ),
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'col-xs-3 col-xs-offset-3' },
                        React.createElement(
                            'button',
                            { className: 'btn btn-default btn-block active', ref: 'fixpack',
                                onClick: this.handleSwitch },
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
        },

        componentDidMount: function componentDidMount() {
            chromeUtil.getLocalStorage('team', (function (result) {
                if (result.team) {
                    if (result.team == 'fp') {
                        this.showFixPack();
                    } else {
                        this.showQAR();
                    }
                } else {
                    chromeUtil.setLocalStorage({ "team": "fp" }, function () {
                        console.log("Init team to %s and Init setting", "fp");
                    });
                }
            }).bind(this));
        }
    });

    var MagicBox = React.createClass({
        displayName: 'MagicBox',

        render: function render() {
            return magic.MagicBox;
        }
    });

    var BasicCommentBox = React.createClass({
        displayName: 'BasicCommentBox',

        switchTeam: function switchTeam(state) {
            this.setState(state);
            chromeUtil.setLocalStorage(state, function () {
                console.log("Change team to %o.", state);
            });
        },

        getInitialState: function getInitialState() {
            return { team: 'fp' };
        },

        render: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(TeamBox, { switchTeam: this.switchTeam, team: this.state.team }),
                comment.CommentBox(this.state.team)
            );
        }
    });

    var CustomCommentBox = React.createClass({
        displayName: 'CustomCommentBox',

        render: function render() {
            return React.createElement(
                'div',
                null,
                comment.CommentBox('custom')
            );
        }
    });

    var PopupBox = React.createClass({
        displayName: 'PopupBox',

        render: function render() {
            return React.createElement(
                'div',
                { id: 'popupBox', className: 'container-fluid' },
                React.createElement(MagicBox, null),
                React.createElement(BasicCommentBox, null),
                React.createElement(CustomCommentBox, null)
            );
        }
    });

    React.render(React.createElement(PopupBox, null), document.getElementById('_main'));
});