seajs.config({
    base: '/js',
    alias: {
        //library
        'jquery': 'lib/jquery-2.1.4.min.js',
        'bootstrap': 'lib/bootstrap.min.js',
        'promise': 'lib/promise.min.js',
        'react': 'lib/react.js',

        //model
        'comment': 'build/model/comment.js',
        'custom': 'build/model/custom.js',
        'fixpack': 'build/model/fixpack.js',
        'qar': 'build/model/qar.js',
        'magic': 'build/model/magic.js',

        //util
        'chromeUtil': 'build/util/chromeUtil.js',
        'getURLParam': 'build/util/JQuery-Plugins/getURLParam.js'
    }

});

//var main = ['lib/jquery-selection', 'build/static/options', 'build/magic/other_tools'];
//var plugins = ['build/magic/custom_tables.js', 'build/magic/descriptions.js', 'build/magic/multiple_browsers.js', 'build/magic/other_tools.js'];
//
//seajs.use(plugins, function () {
//    seajs.use(main);
//});

seajs.use('build/reactUI/options/index');