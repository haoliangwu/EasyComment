define(function (require,exports) {
    var React = require('react');
    var $ = require('jquery');

    var StackedNavPill = require('../util/stacked_nav_pill')

    var MultipleBrowser = React.createClass({
        render: function () {
            return (<div>MultipleBrowser</div>)
        }
    });

    var CustomTable = React.createClass({
        render: function () {
            return (<div>CustomTable</div>)
        }
    });

    var TicketDescription = React.createClass({
        render: function () {
            return (<div>TicketDescription</div>)
        }
    });

    var id = 'magic-tools-nav-pill';
    var tabs = ['Multiple Browser', 'Custom Table','Ticket Description']
    var tab_contents = {
        multiple_browser: <MultipleBrowser/>,
        custom_table: <CustomTable/>,
        ticket_description: <TicketDescription/>
    }

    exports.index = <StackedNavPill id={id} tabs={tabs} tab_contents={tab_contents}/>
})
