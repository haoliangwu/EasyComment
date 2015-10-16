define(function (require, exports) {
    var bootstrap = require('bootstrap');
    var React = require('react');
    var $ = require('jquery');

    var chromeUtil = require('chromeUtil').chromeLocalStorage;

    var dropdown = require('../util/dropdown');

    var qar = require('qar');

    var bridge = new Map(
        [
            ['Master', 'gitk_master'],
            ['6.2.x EE', 'gitk_62x'],
            ['6.1.x EE', 'gitk_61x']
        ]
    );

    var SingleInputWithTag = React.createClass({
        changeHandler: function () {
            var tag = this.refs.PS_tag.getDOMNode();
            var value = this.refs.PS_value.getDOMNode().value;

            chromeUtil.getLocalStorageSync('parameter_qar')
                .then(function (err, result) {
                    result[bridge.get($(tag).text())] = value
                    return chromeUtil.setLocalStorageSync({
                        parameter_qar: result
                    })
                });
        },

        getDefaultProps: function () {
            return {
                tag: 'Master'
            }
        },

        getInitialState: function () {
            return {
                value: this.props.value,
                menu: ['version1', 'version2', 'version3']
            }
        },

        render: function () {
            return (
                <div>
                    <div className="input-group col-xs-12">
                        <span ref='PS_tag' className="input-group-addon">{this.props.tag}</span>
                        <input ref='PS_value' type="text" className="form-control"
                               placeholder={this.props.tag+' Git ID'} onChange={this.changeHandler}>
                        </input>
                        <div className='input-group-btn'>
                            {dropdown.singleButtonDropDownAddOn(this.props.tag, this.state.menu)}
                        </div>

                    </div>
                </div>
            );
        },

        componentDidMount: function () {
            chromeUtil.getLocalStorageSync('parameter_qar')
                .then(function (err, result) {
                    var tag = this.refs.PS_tag.getDOMNode();
                    this.refs.PS_value.getDOMNode().value = result[bridge.get($(tag).text())];
                    this.setState({
                        menu: qar.server_versions[result.server]
                    })
                }.bind(this));
        }
    });

    exports.singleInputWithTag = function (tag, defaultValue) {
        return <SingleInputWithTag tag={tag} value={defaultValue}/>
    };
});


