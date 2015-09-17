define(function (require, exports) {
    var $ = require('jquery');

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
    };
});

