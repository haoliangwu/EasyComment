define(function (require) {
    var React = require('react');
    var bootstrap = require('bootstrap');
    var $ = require('jquery');

    require('$getURLParam').getURLParam($);

    var chromeUtil = require('chromeUtil').chromeLocalStorage;

    var home = require('./component/home');
    var cp = require('./component/control_panel');
    var mt = require('./component/magic_tools');
    var dm = require('./component/data_manufactor');
    var kb = require('./component/kb');

    //nav
    var Navigation = React.createClass({
        render: function () {
            return (
                <ul id='nav-tabs' className="nav nav-tabs nav-justified">
                    <li role="presentation" className='active'><a href="#home">Home</a></li>
                    <li role="presentation"><a href="#control_panel">Control Panel</a></li>
                    <li role="presentation"><a href="#magic_tools">Magic Tools</a></li>
                    <li role="presentation"><a href="#data_manufactor">Data Manufactor</a></li>
                    <li role="presentation"><a href="#knowledge_base">Knowledge Base</a></li>
                </ul>
            )
        }
    })

    var ContentPanel = React.createClass({
        render: function () {
            return (
                <div className="tab-content">
                    <div role="tabpanel" className="tab-pane tab-pane-options active" id="home">{home.index}</div>
                    <div role="tabpanel" className="tab-pane tab-pane-options" id="control_panel">{cp.index}</div>
                    <div role="tabpanel" className="tab-pane tab-pane-options" id="magic_tools">{mt.index}</div>
                    <div role="tabpanel" className="tab-pane tab-pane-options" id="data_manufactor">{dm.index}</div>
                    <div role="tabpanel" className="tab-pane tab-pane-options" id="knowledge_base">{kb.index}</div>
                </div>
            )

        }
    });

    var OptionsBox = React.createClass({
        render: function () {
            return (
                <div className="col-xs-8 col-xs-offset-2 options_panel">
                    <Navigation/>
                    <ContentPanel/>
                </div>
            )
        },

        componentDidMount: function () {
            var $tabs = $('#nav-tabs');

            $tabs.find('a').click(function (e) {
                e.preventDefault();
                $(this).tab('show');
            });

            var tab_id = $.getURLParam('tab_id');

            if (tab_id)
                $tabs.find('a[href="#' + tab_id + '"]').click();
        }
    });

    React.render(<OptionsBox/>, document.getElementById('_main'));
});