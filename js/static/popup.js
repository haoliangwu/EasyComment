define(function (require, exports, module) {
    var $ = require('jquery');
    var chromeUtil = require('chromeUtil').chromeLocalStorage;

    var custom = require('custom');
    var fixpack = require('fixpack');
    var qar = require('qar');
    var magic = require('magic');

    $(document).ready(function () {
        $(".team select").change(function () {
            var value = $(this).val();

            if (value == 'qar') {
                $("#fixpack").hide();
                $("#qa-r").show();
            }
            else {
                $("#qa-r").hide();
                $("#fixpack").show();
            }

            chromeUtil.setLocalStorage({"team": value}, function () {
                console.log("Set team to %s", value);
            });
        });

        magic.init();

        chromeUtil.getLocalStorage('team', function (result) {

            if (result.team) {
                //already initiated team option
                custom.init();
                qar.init();
                fixpack.init();

                $(".team select").val(result.team);
                if (result.team == 'qar') {
                    $("#fixpack").hide();
                    $("#qa-r").show();
                }
                else {
                    $("#qa-r").hide();
                    $("#fixpack").show();
                }
            }
            else {
                //if the first time to initiated, set team to fixpack as default option
                chromeUtil.setLocalStorage({"team": "fixpack"}, function () {
                    console.log("Init team to %s and Init setting", "fixpack");
                    //custom.init();
                    //qar.init();
                    //fixpack.init();
                    init();
                });
            }

        });
    });
});