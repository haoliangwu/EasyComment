'use strict';

define(function (require) {
    var React = require('react');
    var $ = require('jquery');

    var promise = require('promise');
    var chromeUtil = require('chromeUtil').chromeLocalStorage;

    var magic = require('./component/magic');
    var fixpack = require('./component/fixpack');
    var qar = require('./component/qar');
    var custom = require('./component/custom');

    chromeUtil.getLocalStorageSync('team').then(function (err, team) {
        if (!team) return chromeUtil.setLocalStorageSync({ team: 'fp' });else return function () {
            var p = new promise.Promise();
            p.done(null, team);
            return p;
        }();
    }).then(function (err, team) {

        var MagicBox = React.createClass({
            displayName: 'MagicBox',

            render: function render() {
                return magic.MagicBox;
            }
        });

        var TeamBox = React.createClass({
            displayName: 'TeamBox',

            render: function render() {
                var fixpack = 'btn btn-default btn-block ';
                var qar = 'btn btn-default btn-block ';

                if (this.props.team == 'fp') {
                    fixpack += 'active';
                } else {
                    qar += 'active';
                }

                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'p',
                        { className: 'block_title' },
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
                                { className: fixpack, ref: 'fixpack',
                                    onClick: this.props.handleSwitch },
                                'Fix Pack'
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-xs-3' },
                            React.createElement(
                                'button',
                                { className: qar, ref: 'qar',
                                    onClick: this.props.handleSwitch },
                                'QA-R'
                            )
                        )
                    )
                );
            }
        });

        var BasicBox = React.createClass({
            displayName: 'BasicBox',

            render: function render() {
                var temp;

                switch (this.props.team) {
                    case 'fp':
                        temp = fixpack.FixPackBox();
                        break;
                    case 'qar':
                        temp = qar.QARBox();
                        break;
                    default:
                        temp = React.createElement(
                            'div',
                            null,
                            'There is something wrong in Team Initiation.'
                        );
                }

                return temp;
            }
        });

        var CustomBox = React.createClass({
            displayName: 'CustomBox',

            render: function render() {
                return custom.CustomBox();
            }
        });

        var PopupBox = React.createClass({
            displayName: 'PopupBox',

            handleSwitchTeam: function handleSwitchTeam(e) {
                var state = {};
                var element = e.target;

                if ($(element).text() == 'Fix Pack') {
                    state.team = 'fp';
                } else {
                    state.team = 'qar';
                }

                chromeUtil.setLocalStorage({ "team": state.team }, function () {
                    console.log('Set Team to %s', state.team);
                });

                this.setState(state);
            },

            getDefaultProps: function getDefaultProps() {
                return {
                    team: team
                };
            },

            getInitialState: function getInitialState() {
                return {
                    team: this.props.team
                };
            },

            render: function render() {
                return React.createElement(
                    'div',
                    { id: 'popupBox', className: 'container-fluid' },
                    React.createElement(MagicBox, null),
                    React.createElement(TeamBox, { team: this.state.team, handleSwitch: this.handleSwitchTeam }),
                    React.createElement(BasicBox, { team: this.state.team }),
                    React.createElement(CustomBox, null)
                );
            },

            componentDidMount: function componentDidMount() {
                chromeUtil.getLocalStorageSync('team').then(function (err, team) {
                    this.setState({ team: team });
                }.bind(this));
            }
        });

        React.render(React.createElement(PopupBox, null), document.getElementById('_main'));
    }.bind(this));
});