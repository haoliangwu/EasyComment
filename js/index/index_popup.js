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

    base:'./js'
});

seajs.use('static/popup');