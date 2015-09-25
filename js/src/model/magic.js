define(function (require, exports) {
    var $ = require('jquery');
    var React = require('react');

    exports.init = function () {
        $('#mb_c').click(function () {
            window.open("/options.html?magic=" + 'mb', window);
        });

        $('#other_c').click(function () {
            window.open("/options.html?magic=" + 'other', window);
        });

        $('#ct_c').click(function () {
            window.open("/options.html?magic=" + 'ct', window);
        });

        $('#de_c').click(function () {
            window.open("/options.html?magic=" + 'de', window);
        });

        $('#export_import').click(function () {
            window.open("/options.html?magic=" + 'ei', window);
        });
    };

    var MagicButton = React.createClass({
        render: function () {
            return (
                <div class="col-xs-3">
                    <button id="mb_c" className="btn btn-default">Multiple Browsers</button>
                </div>
            );
        }
    });

    //exports.MagicBox = React.createClass({
    //    render: function () {
    //        return (
    //            <div className="row">
    //                <p>Magic</p>
    //                <MagicButton />
    //            </div>
    //        );
    //    }
    //});

    exports.MagicBox = (<div class="col-xs-3">
        <button id="mb_c" className="btn btn-default">Multiple Browsers</button>
    </div>)
});

