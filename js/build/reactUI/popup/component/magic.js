'use strict';

define(function (require, exports) {
    var React = require('react');

    //UI module
    var buttons = [{
        id: 'control_panel',
        name: 'Control Panel'
    }, {
        id: 'magic_tools',
        name: 'Magic Tools'
    }, {
        id: 'data_manufactor',
        name: 'Data Manufactor'
    }, {
        id: 'knowledge_base',
        name: 'Knowledge Base'
    }];

    //React Components
    var MagicButton = React.createClass({
        displayName: 'MagicButton',

        buttonRedirect: function buttonRedirect() {
            var redirectURL = '/options.html?tab_id=';

            window.open(redirectURL + this.props.magic.id);
        },

        render: function render() {
            return React.createElement(
                'button',
                { id: this.props.magic.id,
                    className: 'col-xs-3 btn btn-default',
                    onClick: this.buttonRedirect },
                this.props.magic.name
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
                temp
            );
        }
    });

    exports.MagicBox = React.createElement(
        'div',
        { className: 'row' },
        React.createElement(
            'p',
            { className: 'block_title' },
            'Extension Setting Panel Shortcut'
        ),
        React.createElement(MagicButtonBox, { buttons: buttons })
    );
});