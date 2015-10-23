define(function (require, exports) {
    var React = require('react');
    var $ = require('jquery');

    var chromeUtil = require('chromeUtil').chromeLocalStorage;

    var StackedNavPill = require('../util/stacked_nav_pill')

    //Comment Setting
    var CommentSetting = React.createClass({
        render: function () {
            return (<div>Comment Setting</div>)
        }
    })

    //ExtensionSetting
    var ExtensionSetting = React.createClass({
        handleNext: function (e) {
            e.preventDefault();
            this.setState({
                count: ++this.state.count
            });
        },

        handleLast: function (e) {
            e.preventDefault();
            this.setState({
                count: --this.state.count
            });
        },

        handleResetAll: function () {
            var flag = confirm("Are you sure to clean all setting?");

            if (flag) {
                chromeUtil.removeLocalStroageAll(function () {
                    console.log("Clear Local Storage and reset all setting.");
                })
            }
        },

        getInitialState: function () {
            return {
                count: 0,
                setting_fp: [],
                setting_qar: []
            }
        },

        render: function () {

            var fp_HTML = [];
            var map = new Map(this.state.setting_fp);

            for (let [key, value] of map.entries()) {
                fp_HTML.push(<dt>{key}</dt>);
                fp_HTML.push(<dd>{value.toString()}</dd>);
            }

            var qar_HTML = [];
            var map = new Map(this.state.setting_qar);

            for (let [key, value] of map.entries()) {
                qar_HTML.push(<dt>{key}</dt>);
                qar_HTML.push(<dd>{value.toString()}</dd>);
            }

            var qar_cache = [];
            var temp = [];
            for (var i = 1; i <= qar_HTML.length; i++) {
                temp.push(qar_HTML[i - 1]);

                if (i % 10 == 0 || i == qar_HTML.length) {
                    qar_cache.push(temp);
                    temp = []
                }
            }

            return (
                <div className="tab-content-options">
                    <div className='row'>
                        <div className="list-group">
                            <h2 className="list-group-item-heading">Current Setting Overview</h2>

                            <div className='col-xs-6'>
                                <h4>Fix Pack</h4>
                                <dl className="list-inline">
                                    {fp_HTML}
                                </dl>
                            </div>
                            <div className='col-xs-6'>
                                <h4>QA-R</h4>
                                <dl className="list-inline">
                                    {qar_cache[this.state.count]}
                                </dl>
                                <nav>
                                    <ul className="pager">
                                        <li><a href="#" onClick={this.handleLast}>Previous</a></li>
                                        <li><a href="#" onClick={this.handleNext}>Next</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="list-group">
                            <h2 className="list-group-item-heading">Global Setting</h2>

                            <div className='col-xs-6'>
                                <dl className="list-inline">
                                    <dt>Reset all setting to initial state</dt>
                                    <dd>
                                        <button className="btn btn-danger" onClick={this.handleResetAll}>Reset Setting
                                        </button>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },

        componentDidMount: function () {
            chromeUtil.getLocalStorageSync('parameter_fp')
                .then(function (err, result) {
                    var map = [];

                    for (var i in result) {
                        var j = [];
                        j.push(i);
                        j.push(result[i])
                        map.push(j);
                    }

                    this.setState({
                        setting_fp: map
                    })
                }.bind(this));

            chromeUtil.getLocalStorageSync('parameter_qar')
                .then(function (err, result) {
                    var map = [];

                    for (var i in result) {
                        var j = [];
                        j.push(i);
                        j.push(result[i])
                        map.push(j);
                    }

                    this.setState({
                        setting_qar: map
                    })
                }.bind(this));
        }
    })

    var id = 'control-panel-nav-pill';
    var tabs = ['Comment Setting', 'Extension Setting']
    var tab_contents = {
        comment_setting: <CommentSetting/>,
        extension_setting: <ExtensionSetting/>
    }

    exports.index = <StackedNavPill id={id} tabs={tabs} tab_contents={tab_contents}/>
})
