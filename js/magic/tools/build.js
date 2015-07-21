var span=$('.issueaction-create-subtask span:eq(0)');
span.click();

setTimeout(function () {
    $('#summary').val('#####');
    $('components').val('17580');
    //$('#create-issue-submit').click();
    console.log(1);
}, 5000);
