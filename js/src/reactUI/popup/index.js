define(function (require) {
    var React = require('react');
    var $ = require('jquery');

    var promise = require('promise');
    var chromeUtil = require('chromeUtil').chromeLocalStorage;

    var magic = require('./component/magic');
    var fixpack = require('./component/fixpack');
    var qar = require('./component/qar');
    var custom=require('./component/custom')

    chromeUtil.getLocalStorageSync('team')
        .then(function (err, team) {
            if (!team)
                return chromeUtil.setLocalStorageSync({team: 'fp'});
            else
                return (function () {
                    var p = new promise.Promise();
                    p.done(null, team);
                    return p;
                })();
        })
        .then(function (err, team) {

            var MagicBox = React.createClass({
                render: function () {
                    return (magic.MagicBox);
                }
            });

            var TeamBox = React.createClass({
                render: function () {
                    var fixpack = 'btn btn-default btn-block ';
                    var qar = 'btn btn-default btn-block ';

                    if (this.props.team == 'fp') {
                        fixpack += 'active';
                    }
                    else {
                        qar += 'active';
                    }

                    return (
                        <div>
                            <p className='block_title'>Team Setting(Current is {this.props.team == 'fp' ? 'Fix Pack' : 'QA-R'})</p>

                            <div className="row">
                                <div className="col-xs-3 col-xs-offset-3">
                                    <button className={fixpack} ref='fixpack'
                                            onClick={this.props.handleSwitch}>Fix
                                        Pack
                                    </button>
                                </div>
                                <div className="col-xs-3">
                                    <button className={qar} ref='qar'
                                            onClick={this.props.handleSwitch}>
                                        QA-R
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }
            });

            var BasicBox = React.createClass({
                render: function () {
                    var temp;

                    switch (this.props.team) {
                        case 'fp':
                            temp = fixpack.FixPackBox();
                            break;
                        case 'qar':
                            temp = qar.QARBox();
                            break;
                        default:
                            temp = (
                                <div>There is something wrong in Team Initiation.</div>
                            )
                    }

                    return temp;
                }
            });

            var CustomBox = React.createClass({
                render:function() {
                    return custom.CustomBox();
                }
            });

            var PopupBox = React.createClass({
                handleSwitchTeam: function (e) {
                    var state = {};
                    var element = e.target;

                    if ($(element).text() == 'Fix Pack') {
                        state.team = 'fp';
                    }
                    else {
                        state.team = 'qar';
                    }

                    chromeUtil.setLocalStorage({"team": state.team}, function () {
                        console.log('Set Team to %s', state.team)
                    });

                    this.setState(state);
                },

                getDefaultProps: function () {
                    return {
                        team: team
                    };
                },

                getInitialState: function () {
                    return {
                        team: this.props.team
                    }
                },

                render: function () {
                    return (
                        <div id="popupBox" className="container-fluid">
                            <MagicBox/>
                            <TeamBox team={this.state.team} handleSwitch={this.handleSwitchTeam}/>
                            <BasicBox team={this.state.team}/>
                            <CustomBox/>
                        </div>
                    );
                },

                componentDidMount: function () {
                    chromeUtil.getLocalStorageSync('team')
                        .then(function (err, team) {
                            this.setState({team: team});
                        }.bind(this))
                }
            });

            React.render(
                <PopupBox />, document.getElementById('_main')
            );

        }.bind(this));
});