define(function (require) {
    var $ = require('jquery')
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
            }
            else if (value == fixpack.properties.id) {
                qar.hidePanel();
                fixpack.showPanel();
            }
            else {
                alert('Error Team Initiate !!')
            }
        });

        //custom.init();
        //qar.init();
        //fixpack.init();

        chromeUtil.getLocalStorage('team', function (result) {
            if (result.team) {
                //already initiated team option
                $(".team select").val(result.team);
            }
            else {
                //if the first time to initiated, set team to fixpack as default option
                chromeUtil.setLocalStorage({"team": "fp"}, function () {
                    console.log("Init team to %s and Init setting", "fixpack");
                });
            }
        });
    });

    var TeamBox = React.createClass({
        showFixPack: function () {
            var fixpack = React.findDOMNode(this.refs.fixpack);
            var qar = React.findDOMNode(this.refs.qar);

            this.props.switchTeam({team: 'fp'});
            $(fixpack).addClass('active');
            $(qar).removeClass('active');
        },

        showQAR: function () {
            var fixpack = React.findDOMNode(this.refs.fixpack);
            var qar = React.findDOMNode(this.refs.qar);

            this.props.switchTeam({team: 'qar'});
            $(qar).addClass('active');
            $(fixpack).removeClass('active');
        },

        handleSwitch: function (e) {
            var element = e.target;

            if ($(element).text() == 'Fix Pack') {
                this.showFixPack();
            }
            else {
                this.showQAR();
            }
        },

        componentDidMount: function () {
            chromeUtil.getLocalStorage('team', function (result) {
                if (result.team) {
                    if (result.team == 'fp') {
                        this.showFixPack();
                    }
                    else {
                        this.showQAR();
                    }
                }
                else {
                    chromeUtil.setLocalStorage({"team": "fp"}, function () {
                        console.log("Init team to %s and Init setting", "fp");
                    });
                }
            }.bind(this));
        },

        render: function () {
            return (
                <div>
                    <p>Team Setting(Current is {this.props.team == 'fp' ? 'Fix Pack' : 'QA-R'})</p>

                    <div className="row">
                        <div className="col-xs-3 col-xs-offset-3">
                            <button className="btn btn-default btn-block active" ref='fixpack'
                                    onClick={this.handleSwitch}>Fix
                                Pack
                            </button>
                        </div>
                        <div className="col-xs-3">
                            <button className="btn btn-default btn-block" ref='qar' onClick={this.handleSwitch}>QA-R
                            </button>
                        </div>
                    </div>
                </div>
            );
        }
    });

    var MagicBox = React.createClass({
        render: function () {
            return (magic.MagicBox);
        }
    });

    var BasicCommentBox = React.createClass({
        switchTeam: function (state) {
            this.setState(state);
            chromeUtil.setLocalStorage(state, function () {
                console.log("Change team to %o.", state);
            });
        },

        getInitialState: function () {
            return {team: 'fp'};
        },

        render: function () {
            return (
                <div>
                    <TeamBox switchTeam={this.switchTeam} team={this.state.team}/>
                    {comment.CommentBox(this.state.team)}
                </div>
            );
        }
    });

    var CustomCommentBox = React.createClass({
        render: function () {
            return (
                <div>
                    {comment.CommentBox('custom')}
                </div>
            );
        }
    });

    var PopupBox = React.createClass({
        render: function () {
            return (
                <div id="popupBox" className="container-fluid">
                    <MagicBox/>
                    <BasicCommentBox/>
                    <CustomCommentBox/>
                </div>
            )
        }
    });

    React.render(
        <PopupBox />, document.getElementById('_main')
    );
});