seajs.config({
    base:'./js',
    alias: {
        'jquery': 'lib/jquery-2.1.4.min.js',
        'bootstrap':'lib/bootstrap.min.js'
    }
});

seajs.use('static/popup')