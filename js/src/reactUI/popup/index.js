define(function (require) {
    var React = require('react');

    var chromeUtil = require('chromeUtil').chromeLocalStorage;

    var magic = require('./component/magic');
    var comment = require('../common/comment');
    var team = require('../common/team');

    chromeUtil.getLocalStorageSync('team')
        .then(function (err, team) {
            var PopupBox = React.createClass({
                getDefaultProps: function () {
                    return {
                        team: team
                    };
                },

                render: function () {
                    return (
                        <div id="popupBox" className="container-fluid">
                            <MagicBox/>
                            {comment.CommentBox(this.props.team)}
                        </div>
                    );``
                }
            });

            var MagicBox = React.createClass({
                render: function () {
                    return (magic.MagicBox);
                }
            });

            React.render(
                <PopupBox />, document.getElementById('_main')
            );
        }.bind(this));

});