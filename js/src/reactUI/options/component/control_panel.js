define(function (require, exports) {
    var React = require('react');
    var $ = require('jquery');

    var StackedNavPill = require('../util/stacked_nav_pill')

    var CommentSetting = React.createClass({
        render: function () {
            return (<div>Comment Setting</div>)
        }
    })

    var ExtensionSetting = React.createClass({
        render: function () {
            return (<div>Extension Setting</div>)
        }
    })

    var id = 'control-panel-nav-pill';
    var tabs = ['Comment Setting', 'Extension Setting']
    var tab_contents = {
        comment_setting: <CommentSetting/>,
        extension_setting: <ExtensionSetting/>
    }

    exports.index = <StackedNavPill id={id} tabs={tabs} tab_contents={tab_contents}/>
})
