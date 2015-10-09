define(function (require, exports) {
    var React = require('react');

    //bug 相互依赖
    var comment = require('../../common/comment');
    var team = require('../../common/team');

    console.log(comment)
    console.log(team)

    exports.FixPackBox = function () {
        return (
            <div className="row">
                <p>Fix Pack Comment List</p>
            </div>)
    };

});