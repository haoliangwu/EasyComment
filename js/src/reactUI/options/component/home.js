define(function (require, exports) {
    var React = require('react');
    var $ = require('jquery');

    var Home = React.createClass({
        render: function () {
            return (
                <div className="jumbotron jumbotron-options">
                    <h1>Thanks for using EasyComment !!</h1>

                    <h3>Here are some tips about the extension.</h3>
                    <dl>
                        <dt>Control Panel</dt>
                        <dd>The setting of extension, you could customize your setting here.</dd>
                        <dt>Magic Tools</dt>
                        <dd>These tools can help you generate different pretty comment layouts with markdown grammar and
                            custom metadata.
                        </dd>
                        <dt>Data Manufactor</dt>
                        <dd>The Create All Things For Portal plugin in Chrome Extension.</dd>
                        <dt>Knowledge Base</dt>
                        <dd>The convenient Knowledge Base collected by Internet, Liferay Official Website, Social Office
                            Wikis and etc.
                        </dd>
                    </dl>

                    <p className='text-right'>
                        <span className='glyphicon glyphicon-hand-right'></span>
                        <a className="btn btn-primary btn-lg" href="https://github.com/haoliangwu/EasyComment"
                           role="button">Learn more</a>
                    </p>
                </div>
            )
        }
    })

    exports.index = <Home/>
})
