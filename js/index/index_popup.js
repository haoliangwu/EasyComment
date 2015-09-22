seajs.config({
    path:'./js',
    alias: {
        //library
        'jquery': 'lib/jquery-2.1.4.min.js',
        'bootstrap':'lib/bootstrap.min.js',
        'promise':'lib/promise.min.js',

        //model
        'comment':'model/comment.js',
        'custom':'model/custom.js',
        'fixpack':'model/fixpack.js',
        'qar':'model/qar.js',
        'magic':'model/magic.js',

        //util
        'chromeUtil':'util/chromeUtil.js'
    },

    base:'./js'
});

seajs.use('static/popup');