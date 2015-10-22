define(function (require, exports) {
    var React = require('react');
    var $ = require('jquery');

    var StackedNavPill = require('../util/stacked_nav_pill')

    var Development = React.createClass({
        render: function () {
            return (<div>MultipleBrowser</div>)
        }
    });

    var Configuration = React.createClass({
        render: function () {
            return (<div>MultipleBrowser</div>)
        }
    });

    var PortalProperties = React.createClass({
        render: function () {
            return (<div>MultipleBrowser</div>)
        }
    });

    var id = 'knowledge-base-nav-pill';
    var tabs = ['Development', 'Configuration', 'Portal Properties']
    var tab_contents = {
        development: <Development/>,
        configuration: <Configuration/>,
        portal_propeties: <PortalProperties/>
    }

    exports.index = <StackedNavPill id={id} tabs={tabs} tab_contents={tab_contents}/>
})