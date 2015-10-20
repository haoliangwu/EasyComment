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
        var $focused = $("textarea:focus");
        $focused.selection().replace(dictionary[sel.toString()], false);
    }
}

function comment_compile(metadata, storageName) {
    _.templateSettings = {
        interpolate: /\$\{(.+?)\}/g
    };

    var sel = window.getSelection();
    var $focused = $("textarea:focus");

    if (sel.toString() == '') {
        return false;
    }
    else {
        getLocalStorage(storageName, function (result) {
            var obj = result[storageName][sel.toString()];

            if (obj) {
                var compiled = _.template(obj.template);
                $focused.selection().replace(compiled(metadata), false);
            }
            else {
                getLocalStorage('custom_obj', function (result) {
                    var templates = {};
                    var obj = result.custom_obj;

                    for (var e in obj) {
                        templates[obj[e].key] = obj[e].template;
                    }

                    var template = templates[sel.toString()];

                    if (template) {
                        var compiled = _.template(template);
                        $focused.selection().replace(compiled(metadata), false);
                    }
                })
            }
        });
    }
}

function bindToComment(locator, callback) {
    $(locator).mouseup(function (e) {
        if (e.ctrlKey && e.which == 1) {
            chrome.storage.local.get('team', callback);
        }
    });
}
