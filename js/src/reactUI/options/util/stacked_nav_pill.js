define(function (require) {
    var React = require('react');
    var $ = require('jquery');

    var StackedNavPill = React.createClass({
        getDefaultProps: function () {
            return {
                id: 'myTabs',
                tabs: [],
                tab_contents: {}
            };
        },

        render: function () {
            var tabs_HTML = [];
            var tab_contents_HTML = [];

            this.props.tabs.forEach(function (v, i) {
                var label = v.toLowerCase().replace(' ', '_');

                tabs_HTML.push(
                    <li key={i+'tab'} data-toggle="pill" role="presentation"><a href={'#'+label}>{v}</a>
                    </li>);
                tab_contents_HTML.push(
                    <div key={i+'tab_content'} role="tabpanel" className="tab-pane active"
                         id={label}>{this.props.tab_contents[label]}</div>)
            }.bind(this));

            return (
                <div className='full-height'>
                    <div className="tab-content">
                        {tab_contents_HTML}
                    </div>
                    <ul id={this.props.id} className="nav nav-pills tag-content-options-nav">
                        {tabs_HTML}
                    </ul>
                </div>
            )
        },

        componentDidMount: function () {
            var id = this.props.id;

            $('#' + id + ' a:first').tab('show');
            $('#' + id + ' a').click(function (e) {
                e.preventDefault()
                $(this).tab('show');
            })
        }
    })

    return StackedNavPill;
})