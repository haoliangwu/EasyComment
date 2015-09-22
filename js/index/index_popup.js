seajs.config({
    base:'/js',
    alias: {
        //library
        'jquery': 'lib/jquery-2.1.4.min.js',
        'bootstrap':'lib/bootstrap.min.js',
        'promise':'lib/promise.min.js',
        'react':'lib/react.min.js',

        //model
        'comment':'build/model/comment.js',
        'custom':'build/model/custom.js',
        'fixpack':'build/model/fixpack.js',
        'qar':'build/model/qar.js',
        'magic':'build/model/magic.js',

        //util
        'chromeUtil':'build/util/chromeUtil.js'
    }
});

seajs.use('build/static/popup');

