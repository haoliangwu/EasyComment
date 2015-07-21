function other_tools() {
    $('#magic_other').show();

    $('#sub_task_start').click(function () {
            var tab1 = {
                url: 'https://issues.liferay.com/browse/LRQA-13307'
            };

            var jqueryJS = {
                file: 'js/lib/jquery-2.1.4.min.js',
                allFrames: false,
                runAt: 'document_end'
            };

            var mainJS = {
                file: 'js/magic/tools/sub_tasks_builder.js',
                allFrames: false,
                runAt: 'document_end'
            };

            var LPEJS = {
                file: 'js/magic/tools/lpe.js',
                allFrames: false,
                runAt: 'document_end'
            }

            var LPEs = [];
            var LPSs = [];


            chrome.tabs.create(tab1, function (tab) {
                var mainTab = tab;
                var mainTabId = tab.id;

                chrome.tabs.executeScript(mainTabId, jqueryJS);
                chrome.tabs.executeScript(mainTabId, mainJS, function (result) {
                    LPEs = result[0];
                    for (var e in LPEs) {
                        if (e < 3) {

                            var tab2 = {
                                url: LPEs[e]
                            };

                            chrome.tabs.create(tab2, function (tab) {
                                var id = tab.id;

                                chrome.tabs.executeScript(id, jqueryJS);
                                chrome.tabs.executeScript(id, LPEJS, function (result) {
                                    LPSs.push(result[0]);
                                    chrome.tabs.remove(id);
                                });

                            });
                        }

                    }
                });

                setTimeout(function () {

                    //for(var e in LPEs, LPSs) {
                    //
                    //}
                    var code=''
                    var code_obj = {
                        //code: code,
                        file: 'js/magic/tools/build.js',
                        allFrames: false,
                        runAt: 'document_end'
                    }
                    chrome.tabs.executeScript(mainTabId, code_obj, function (result) {
                        console.log('finish')
                    });

                }, 10000);

            });
        }
    )
}

