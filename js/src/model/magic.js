define(function (require, exports) {
    var React = require('react');

    //UI module
    var buttons = [
        {
            id: 'mb',
            name: 'Multiple Browsers',
            rows: 3
        },
        {
            id: 'ct',
            name: 'Custom Tables',
            rows: 3
        },
        {
            id: 'de',
            name: 'Descriptions',
            rows: 2
        },
        {
            id: 'other',
            name: 'Other Tools',
            rows: 2
        },
        {
            id: 'ei',
            name: 'Export/Import',
            rows: 2
        }
    ];


    //React Components
    var MagicButton = React.createClass({
        buttonRedirect: function () {
            var redirectURL = '/options.html?magic=';

            window.open(redirectURL+this.props.magic.id);
        },

        render: function () {
            return (
                <div className={'col-xs-'+this.props.magic.rows}>
                    <button id={this.props.magic.id} className="btn btn-default"
                            onClick={this.buttonRedirect}>{this.props.magic.name}</button>
                </div>
            );
        }
    });

    var MagicButtonBox = React.createClass({
        render: function () {
            var temp = [];

            Array.prototype.forEach.call(this.props.buttons, function (c) {
                temp.push(<MagicButton magic={c} key={c.id}/>)
            });

            return (
                <div className="row">
                    <p>Magic</p>
                    {temp}
                </div>
            );
        }
    });

    exports.MagicBox = <MagicButtonBox buttons={buttons}/>;
});

