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
        var id_comment = $.getUrlParam('id');
        var custom_obj=result.custom_obj;
        var obj=result.custom_obj[id_comment];

        $('#smart_id').val(obj.key);
        $('#desc').val(obj.des);
        if(obj.template == undefined || obj.template =='') {
            $('#template').focus();
        }
        else {
            $('#template').val(obj.template);
        }
        $('#save').click(function () {
            obj.template = $('#template').val();
            custom_obj[id_comment] = obj;
            chrome.storage.local.set({'custom_obj':custom_obj},function() {
                console.log("Update custom obj %o.", obj);
            });
        });
    })
});