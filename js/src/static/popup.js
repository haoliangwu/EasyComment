define(function (require) {
    var $ = require('jquery')
    var chromeUtil = require('chromeUtil').chromeLocalStorage;
    var React = require('react');
    var promise = require('promise');
    var comment = require('comment');
    var custom = require('custom');
    var fixpack = require('fixpack');
    var qar = require('qar');
    var magic = require('magic');

    $(document).ready(function () {
        $(".team select").change(function () {
            var value = $(this).val();

            if (value == qar.properties.id) {
                qar.showPanel();
                fixpack.hidePanel();
            }
            else if (value == fixpack.properties.id) {
                qar.hidePanel();
                fixpack.showPanel();
            }
            else {
                alert('Error Team Initiate !!')
            }
        });

        //custom.init();
        //qar.init();
        //fixpack.init();

        chromeUtil.getLocalStorage('team', function (result) {
            if (result.team) {
                //already initiated team option
                $(".team select").val(result.team);
            }
            else {
                //if the first time to initiated, set team to fixpack as default option
                chromeUtil.setLocalStorage({"team": "fp"}, function () {
                    console.log("Init team to %s and Init setting", "fixpack");
                });
            }
        });
    });
});