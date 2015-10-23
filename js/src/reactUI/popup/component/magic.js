define(function (require, exports) {
    var React = require('react');

    //UI module
    var buttons = [
        {
            id: 'control_panel',
            name: 'Control Panel'
        },
        {
            id: 'magic_tools',
            name: 'Magic Tools'
        },
        {
            id: 'data_manufactor',
            name: 'Data Manufactor'
        },
        {
            id: 'knowledge_base',
            name: 'Knowledge Base'
        },
    ];

    //React Components
    var MagicButton = React.createClass({
        buttonRedirect: function () {
            var redirectURL = '/options.html?tab_id=';

            window.open(redirectURL + this.props.magic.id);
        },

        render: function () {
            return (
                <button id={this.props.magic.id}
                        className='col-xs-3 btn btn-default'
                        onClick={this.buttonRedirect}>{this.props.magic.name}</button>
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
                <div className='row'>
                    {temp}
                </div>
            );

        }
    });

    exports.MagicBox = (
        <div className="row">
            <p className='block_title'>Extension Setting Panel Shortcut</p>
            <MagicButtonBox buttons={buttons}/>
        </div>
    );
});

