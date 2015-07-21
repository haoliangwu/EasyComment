var links = $(".issue-link.link-title");
var LPS = '';
links.each(function () {
    var text = $(this).text();

    if (text.match(/LPS-\d{5}/ig)) {
        LPS=text;
    }
})

LPS;
