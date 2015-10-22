'use strict';

define(function (require, exports) {
    var React = require('react');
    var $ = require('jquery');

    var Home = React.createClass({
        displayName: 'Home',

        render: function render() {
            return React.createElement(
                'div',
                { className: 'jumbotron jumbotron-options' },
                React.createElement(
                    'h1',
                    null,
                    'Thanks for using EasyComment !!'
                ),
                React.createElement(
                    'h3',
                    null,
                    'Here are some tips about the extension.'
                ),
                React.createElement(
                    'dl',
                    null,
                    React.createElement(
                        'dt',
                        null,
                        'Control Panel'
                    ),
                    React.createElement(
                        'dd',
                        null,
                        'The setting of extension, you could customize your setting here.'
                    ),
                    React.createElement(
                        'dt',
                        null,
                        'Magic Tools'
                    ),
                    React.createElement(
                        'dd',
                        null,
                        'These tools can help you generate different pretty comment layouts with markdown grammar and custom metadata.'
                    ),
                    React.createElement(
                        'dt',
                        null,
                        'Data Manufactor'
                    ),
                    React.createElement(
                        'dd',
                        null,
                        'The Create All Things For Portal plugin in Chrome Extension.'
                    ),
                    React.createElement(
                        'dt',
                        null,
                        'Knowledge Base'
                    ),
                    React.createElement(
                        'dd',
                        null,
                        'The convenient Knowledge Base collected by Internet, Liferay Official Website, Social Office Wikis and etc.'
                    )
                ),
                React.createElement(
                    'p',
                    { className: 'text-right' },
                    React.createElement('span', { className: 'glyphicon glyphicon-hand-right' }),
                    React.createElement(
                        'a',
                        { className: 'btn btn-primary btn-lg', href: 'https://github.com/haoliangwu/EasyComment',
                            role: 'button' },
                        'Learn more'
                    )
                )
            );
        }
    });

    exports.index = React.createElement(Home, null);
});