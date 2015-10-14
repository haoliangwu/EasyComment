define(function (require, exports) {
    var bootstrap = require('bootstrap');
    var React = require('react');
    var $ = require('jquery');

    var SingleButtonDropDown = React.createClass({
        getDefaultProps: function () {
            return {
                title: 'OS',
                menu: ['option1', 'option2', 'option3'],
                chooseHandler: function (e) {
                    alert($(e.target).text());
                }
            }
        },

        getInitialState: function () {
            return {
                title: this.props.title
            }
        },

        render: function () {
            var rows = [];

            this.props.menu.forEach(function (c, i) {
                var row = (<li key={'env_'+i} onClick={this.props.chooseHandler}><a href='#'>{c}</a></li>)

                rows.push(row);
            }.bind(this));

            return (
                <div ref='dropdown' className="col-xs-6 btn-group dropdown">
                    <button type="button" className="btn btn-default btn-block dropdown-toggle" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                        {this.state.title} <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu col-xs-12">
                        {rows}
                    </ul>
                </div>
            )
        },

        componentDidMount: function () {
        }
    })

    exports.singleButtonDropDown = function (title, menuList, eventHandler) {
        return <SingleButtonDropDown title={title}/>
    };
});
