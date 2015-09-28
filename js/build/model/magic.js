'use strict';

define(function (require, exports) {
    var React = require('react');

    //UI module
    var buttons = [{
        id: 'mb',
        name: 'Multiple Browsers',
        rows: 3
    }, {
        id: 'ct',
        name: 'Custom Tables',
        rows: 3
    }, {
        id: 'de',
        name: 'Descriptions',
        rows: 2
    }, {
        id: 'other',
        name: 'Other Tools',
        rows: 2
    }, {
        id: 'ei',
        name: 'Export/Import',
        rows: 2
    }];

    //React Components
    var MagicButton = React.createClass({
        displayName: 'MagicButton',

        buttonRedirect: function buttonRedirect() {
            var redirectURL = '/options.html?magic=';

            window.open(redirectURL + this.props.magic.id);
        },

        render: function render() {
            return React.createElement(
                'div',
                { className: 'col-xs-' + this.props.magic.rows },
                React.createElement(
                    'button',
                    { id: this.props.magic.id, className: 'btn btn-default',
                        onClick: this.buttonRedirect },
                    this.props.magic.name
                )
            );
        }
    });

    var MagicButtonBox = React.createClass({
        displayName: 'MagicButtonBox',

        render: function render() {
            var temp = [];

            Array.prototype.forEach.call(this.props.buttons, function (c) {
                temp.push(React.createElement(MagicButton, { magic: c, key: c.id }));
            });

            return React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'p',
                    null,
                    'Magic'
                ),
                temp
            );
        }
    });

    exports.MagicBox = React.createElement(MagicButtonBox, { buttons: buttons });
});