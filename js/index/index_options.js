seajs.config({
    path: './js',
    alias: {
        //library
        'jquery': 'lib/jquery-2.1.4.min.js',
        'bootstrap': 'lib/bootstrap.min.js',
        'promise':'lib/promise.min.js',

        //model
        'comment': 'model/comment.js',

        //util
        'chromeUtil': 'util/chromeUtil.js'
    },

    base: './js'
});

var main = ['lib/jquery-selection', 'static/options', 'magic/other_tools']
var plugins = ['magic/custom_tables.js', 'magic/descriptions.js', 'magic/multiple_browsers.js', 'magic/other_tools.js']

seajs.use(plugins, function () {
    seajs.use(main);
});
