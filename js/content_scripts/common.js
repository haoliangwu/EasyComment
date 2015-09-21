function getLocalStorage(key, callback) {
    chrome.storage.local.get(key, callback)
}

function setLocalStorage(obj, callback) {
    chrome.storage.local.set(obj, callback);
}

function convert_selected_fixpack(dictionary) {
    var sel = window.getSelection();
    if (sel.toString() == '') {
        return 0;
    }
    else {
        var $focused = $(":focus");
        $focused.selection().replace(dictionary[sel.toString()], false);
    }
}

function bindToComment(locator, callback) {
    $(locator).mouseup(function (e) {
        if (e.ctrlKey && e.which == 1) {
            chrome.storage.local.get('team', callback);
        }
    });
}
