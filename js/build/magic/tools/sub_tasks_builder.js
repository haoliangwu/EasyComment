'use strict';

var $des_div = $('#description-val');
var $LPEs = $des_div.find('a');
var url = [];

$LPEs.each(function () {
    url.push($(this).attr('href'));
});

url;