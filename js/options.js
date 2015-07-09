(function($){
    $.getUrlParam = function(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r!=null) return decodeURI(r[2]); return null;
    }
})(jQuery);

$(document).ready(function() {

    $("#reset").click(function () {
        chrome.storage.local.clear(function() {
            console.log("Clear Local Storage and reset all setting.");
        })
    });

    chrome.storage.local.get('custom_obj',function(result) {
        var obj=result.custom_obj;
        var id_comment = $.getUrlParam('id');
        console.log(id_comment);
    })
});