define(function (require) {
    var React = require('react');
    var bootstrap = require('bootstrap');
    var $ = require('jquery');

    var chromeUtil = require('chromeUtil').chromeLocalStorage;

    var home = require('./component/home');
    var cp = require('./component/control_panel');

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
        },

        componentDidMount: function () {
            $('#nav-tabs a').click(function (e) {
                e.preventDefault()
                $(this).tab('show')
            })
        }
    })

    var ContentPanel = React.createClass({
        render: function () {
            return (
                <div className="tab-content">
                    <div role="tabpanel" className="tab-pane tab-pane-options active" id="home">{home.index}</div>
                    <div role="tabpanel" className="tab-pane tab-pane-options" id="control_panel">{cp.index}</div>
                    <div role="tabpanel" className="tab-pane tab-pane-options" id="magic_tools">MT</div>
                    <div role="tabpanel" className="tab-pane tab-pane-options" id="data_manufactor">DM</div>
                    <div role="tabpanel" className="tab-pane tab-pane-options" id="knowledge_base">KB</div>
                </div>
            )

        }
    });

    React.render(<Navigation/>, document.getElementById('_nav'));
    React.render(<ContentPanel/>, document.getElementById('_content_panel'))
});