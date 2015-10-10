"use strict";

define(function (require, exports) {
    var React = require('react');

    exports.QARBox = function () {
        return React.createElement(
            "div",
            { className: "row" },
            React.createElement(
                "p",
                null,
                "QA-R Comment List"
            )
        );
    };
});