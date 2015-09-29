define(function (require) {
    var $ = require('jquery')
    var chromeUtil = require('chromeUtil').chromeLocalStorage;
    var React = require('react');

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

        custom.init();
        qar.init();
        fixpack.init();

        chromeUtil.getLocalStorage('team', function (result) {
            if (result.team) {
                //already initiated team option
                $(".team select").val(result.team);
            }
            else {
                //if the first time to initiated, set team to fixpack as default option
                chromeUtil.setLocalStorage({"team": "fixpack"}, function () {
                    console.log("Init team to %s and Init setting", "fixpack");
                });
            }
        });
    });

    var TeamBox = React.createClass({
        handleSwitch: function (e) {
            var element = e.target;
            var fixpack = React.findDOMNode(this.refs.fixpack);
            var qar = React.findDOMNode(this.refs.qar);

            if ($(element).text() == 'Fix Pack') {
                this.props.switchTeam({team: 'fixpack'});
                $(fixpack).addClass('active');
                $(qar).removeClass('active');
            }
            else {
                this.props.switchTeam({team: 'qar'});
                $(qar).addClass('active');
                $(fixpack).removeClass('active');
            }
        },

        render: function () {
            return (
                <div>
                    <p>Team Setting</p>

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



    var BasicCommentBox = React.createClass({
        getInitialState: function () {
            return {
                team: 'fixpack'
            }
        },

        switchTeam: function (state) {
            this.setState(state)
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
    })

    var PopupBox = React.createClass({
        render: function () {
            return (
                <div id="popupBox" className="container-fluid">
                    {magic.MagicBox}
                    <BasicCommentBox/>
                    <CustomCommentBox/>
                </div>
            )
        }
    })

    React.render(
        <PopupBox />, document.getElementById('_main')
    );
});