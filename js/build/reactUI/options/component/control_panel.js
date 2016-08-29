'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

define(function (require, exports) {
    var React = require('react');
    var $ = require('jquery');

    var chromeUtil = require('chromeUtil').chromeLocalStorage;

    var StackedNavPill = require('../util/stacked_nav_pill');

    //Comment Setting
    var CommentSetting = React.createClass({
        displayName: 'CommentSetting',

        render: function render() {
            return React.createElement(
                'div',
                null,
                'Comment Setting'
            );
        }
    });

    //ExtensionSetting
    var ExtensionSetting = React.createClass({
        displayName: 'ExtensionSetting',

        handleNext: function handleNext(e) {
            e.preventDefault();
            this.setState({
                count: ++this.state.count
            });
        },

        handleLast: function handleLast(e) {
            e.preventDefault();
            this.setState({
                count: --this.state.count
            });
        },

        handleResetAll: function handleResetAll() {
            var flag = confirm("Are you sure to clean all setting?");

            if (flag) {
                chromeUtil.removeLocalStroageAll(function () {
                    console.log("Clear Local Storage and reset all setting.");
                });
            }
        },

        getInitialState: function getInitialState() {
            return {
                count: 0,
                setting_fp: [],
                setting_qar: []
            };
        },

        render: function render() {

            var fp_HTML = [];
            var map = new Map(this.state.setting_fp);

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = map.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _step$value = _slicedToArray(_step.value, 2);

                    var key = _step$value[0];
                    var value = _step$value[1];

                    fp_HTML.push(React.createElement(
                        'dt',
                        null,
                        key
                    ));
                    fp_HTML.push(React.createElement(
                        'dd',
                        null,
                        value.toString()
                    ));
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            var qar_HTML = [];
            var map = new Map(this.state.setting_qar);

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = map.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _step2$value = _slicedToArray(_step2.value, 2);

                    var key = _step2$value[0];
                    var value = _step2$value[1];

                    qar_HTML.push(React.createElement(
                        'dt',
                        null,
                        key
                    ));
                    qar_HTML.push(React.createElement(
                        'dd',
                        null,
                        value.toString()
                    ));
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            var qar_cache = [];
            var temp = [];
            for (var i = 1; i <= qar_HTML.length; i++) {
                temp.push(qar_HTML[i - 1]);

                if (i % 10 == 0 || i == qar_HTML.length) {
                    qar_cache.push(temp);
                    temp = [];
                }
            }

            return React.createElement(
                'div',
                { className: 'tab-content-options' },
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'list-group' },
                        React.createElement(
                            'h2',
                            { className: 'list-group-item-heading' },
                            'Current Setting Overview'
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-xs-6' },
                            React.createElement(
                                'h4',
                                null,
                                'Fix Pack'
                            ),
                            React.createElement(
                                'dl',
                                { className: 'list-inline' },
                                fp_HTML
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-xs-6' },
                            React.createElement(
                                'h4',
                                null,
                                'QA-R'
                            ),
                            React.createElement(
                                'dl',
                                { className: 'list-inline' },
                                qar_cache[this.state.count]
                            ),
                            React.createElement(
                                'nav',
                                null,
                                React.createElement(
                                    'ul',
                                    { className: 'pager' },
                                    React.createElement(
                                        'li',
                                        null,
                                        React.createElement(
                                            'a',
                                            { href: '#', onClick: this.handleLast },
                                            'Previous'
                                        )
                                    ),
                                    React.createElement(
                                        'li',
                                        null,
                                        React.createElement(
                                            'a',
                                            { href: '#', onClick: this.handleNext },
                                            'Next'
                                        )
                                    )
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'list-group' },
                        React.createElement(
                            'h2',
                            { className: 'list-group-item-heading' },
                            'Global Setting'
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-xs-6' },
                            React.createElement(
                                'dl',
                                { className: 'list-inline' },
                                React.createElement(
                                    'dt',
                                    null,
                                    'Reset all setting to initial state'
                                ),
                                React.createElement(
                                    'dd',
                                    null,
                                    React.createElement(
                                        'button',
                                        { className: 'btn btn-danger', onClick: this.handleResetAll },
                                        'Reset Setting'
                                    )
                                )
                            )
                        )
                    )
                )
            );
        },

        componentDidMount: function componentDidMount() {
            chromeUtil.getLocalStorageSync('parameter_fp').then(function (err, result) {
                var map = [];

                for (var i in result) {
                    var j = [];
                    j.push(i);
                    j.push(result[i]);
                    map.push(j);
                }

                this.setState({
                    setting_fp: map
                });
            }.bind(this));

            chromeUtil.getLocalStorageSync('parameter_qar').then(function (err, result) {
                var map = [];

                for (var i in result) {
                    var j = [];
                    j.push(i);
                    j.push(result[i]);
                    map.push(j);
                }

                this.setState({
                    setting_qar: map
                });
            }.bind(this));
        }
    });

    var id = 'control-panel-nav-pill';
    var tabs = ['Comment Setting', 'Extension Setting'];
    var tab_contents = {
        comment_setting: React.createElement(CommentSetting, null),
        extension_setting: React.createElement(ExtensionSetting, null)
    };

    exports.index = React.createElement(StackedNavPill, { id: id, tabs: tabs, tab_contents: tab_contents });
});