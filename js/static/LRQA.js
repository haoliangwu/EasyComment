seajs.config({
    path:'./js',
    alias: {
        //library
        'jquery': 'lib/jquery-2.1.4.min.js',
        'bootstrap':'lib/bootstrap.min.js',

        //model
        'comment':'model/comment.js',

        //util
        'chromeUtil':'util/chromeUtil.js'
    },

    base:'file:///home/lyon/ChromeExtensionJS/smart_key_for_comment/js'
});

seajs.use('static/smart_key_LRQA');