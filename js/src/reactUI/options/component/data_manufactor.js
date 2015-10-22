define(function (require, exports) {
    var React = require('react');
    var $ = require('jquery');

    var StackedNavPill = require('../util/stacked_nav_pill')

    var DataManufactorMaster = React.createClass({
        render: function () {
            return (<div>MultipleBrowser</div>)
        }
    });

    var DataManufactor62 = React.createClass({
        render: function () {
            return (<div>MultipleBrowser</div>)
        }
    });

    var DataManufactor61 = React.createClass({
        render: function () {
            return (<div>MultipleBrowser</div>)
        }
    });

    var DataManufactorHome = React.createClass({
        render: function () {
            return (<div>MultipleBrowser</div>)
        }
    });

    var id = 'data-manufactor-nav-pill';
    var tabs = ['DataManufactor Home', 'Master', ' 62', ' 61']
    var tab_contents = {
        data_manufactor_home: <DataManufactorHome/>,
        master: <DataManufactorMaster/>,
        _62: <DataManufactor62/>,
        _61: <DataManufactor61/>

    }

    exports.index = <StackedNavPill id={id} tabs={tabs} tab_contents={tab_contents}/>
})
