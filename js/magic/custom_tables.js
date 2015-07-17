function custom_table() {
    var tableName = '';

    $('#magic_ct').show();

    $('#magic_submit').click(function () {
        var type = $('#custom_table_size input:radio:checked').val();
        var size = {};
        switch (type) {
            case 'ss':
                size = {
                    'x': 3,
                    'y': 3
                }
                break;
            case 'ms':
                size = {
                    'x': 5,
                    'y': 5
                }
                break;
            case 'ls':
                size = {
                    'x': 7,
                    'y': 7
                }
                break;
            case 'cs':
                size = {
                    'x': $('.line').val(),
                    'y': $('.col').val()
                }
                break;
            default :
                break;
        }

        var rootTableElement = $('#preview_ct');
        var template = magic_template_ct(size, rootTableElement,tableName);
        $('#magic textarea').val(template);

    });

    $('#shortcut_ct button').each(function () {
        $(this).click(function () {
            var e = $.Event('click');
            switch ($(this).attr('id')) {
                case 'fixpack_performance':
                    tableName='Pass performance testing.\n'

                    $('#custom_size_title input').trigger(e);
                    $('.col').val(7);
                    $('.line').val(6);

                    $('.line').change();

                    var $th1 = $('#preview_ct').find('tr').eq(0).find('th');
                    $th1.eq(0).css('width', '25%');
                    $th1.eq(0).children().eq(0).val('Current Session Count');
                    $th1.eq(1).css('width', '7%');
                    $th1.eq(1).children().eq(0).val('Blog');
                    $th1.eq(2).css('width', '18%');
                    $th1.eq(2).children().eq(0).val('DocumentLibrary');
                    $th1.eq(3).css('width', '7%');
                    $th1.eq(3).children().eq(0).val('Login');
                    $th1.eq(4).css('width', '15%');
                    $th1.eq(4).children().eq(0).val('MessageBoard');
                    $th1.eq(5).css('width', '15%');
                    $th1.eq(5).children().eq(0).val('Web Content');
                    $th1.eq(6).css('width', '7%');
                    $th1.eq(6).children().eq(0).val('Wiki');

                    var $th2_input = $('#preview_ct').find('tr').eq(1).find(':input');
                    var $th3_input = $('#preview_ct').find('tr').eq(2).find(':input');
                    var $th4_input = $('#preview_ct').find('tr').eq(3).find(':input');
                    var $th5_input = $('#preview_ct').find('tr').eq(4).find(':input');
                    var $th6_input = $('#preview_ct').find('tr').eq(5).find(':input');

                    for (var i = 1; i < 7; ++i) {
                        (function (a) {
                            $th2_input.eq(a).keyup(function () {
                                var e2 = parseInt($(this).val());
                                var e3 = parseInt($th3_input.eq(a).val());
                                var e5 = parseInt($th5_input.eq(a).val());
                                var r1 = ((e3 - e2) / e2).toFixed(4);
                                var r2 = ((e5 - e2) / e2).toFixed(4);

                                $th4_input.eq(a).val(r1 * 100 + "%");
                                $th6_input.eq(a).val(r2 * 100 + "%");
                            })

                            $th3_input.eq(a).keyup(function () {
                                var e2 = parseInt($th2_input.eq(a).val());
                                var e3 = parseInt($(this).val());
                                var e5 = parseInt($th5_input.eq(a).val());
                                var r1 = ((e3 - e2) / e2).toFixed(4);
                                var r2 = ((e5 - e2) / e2).toFixed(4);

                                $th4_input.eq(a).val(r1 * 100 + "%");
                                $th6_input.eq(a).val(r2 * 100 + "%");
                            })

                            $th5_input.eq(a).keyup(function () {
                                var e2 = parseInt($th2_input.eq(a).val());
                                var e3 = parseInt($th3_input.eq(a).val());
                                var e5 = parseInt($(this).val());
                                var r1 = ((e3 - e2) / e2).toFixed(4);
                                var r2 = ((e5 - e2) / e2).toFixed(4);

                                $th4_input.eq(a).val(r1 * 100 + "%");
                                $th6_input.eq(a).val(r2 * 100 + "%");
                            })
                        })(i);
                    }

                    break;
                default :
                    break;
            }
        })
    });

    $('#custom_table_size input:radio').each(function () {
        var type = $(this).val();
        var rootTableElement = $('#preview_ct');
        switch (type) {
            case 'ss':
                $(this).change(function () {
                    $('#custom_size_value').hide();
                    var size = {
                        'x': 3,
                        'y': 3
                    }
                    generate_table(size, rootTableElement);
                })
                break;
            case 'ms':
                $(this).change(function () {
                    $('#custom_size_value').hide();
                    var size = {
                        'x': 5,
                        'y': 5
                    }
                    generate_table(size, rootTableElement);

                })
                break;
            case 'ls':
                $(this).change(function () {
                    $('#custom_size_value').hide();
                    var size = {
                        'x': 7,
                        'y': 7
                    }
                    generate_table(size, rootTableElement);
                })
                break;
            case 'cs':
                $(this).change(function () {
                    $('#custom_size_value').show('slow');
                    $('.line,.col').change(function () {
                        var size = {
                            'x': $('.line').val(),
                            'y': $('.col').val()
                        }
                        generate_table(size, rootTableElement);
                    })
                })
                break;
            default :
                break;
        }
    });
}

//size{
//    x: line;
//    y: col;
//}
function generate_table(size, rootTableElement) {
    var line = size.x;
    var col = size.y;
    rootTableElement.empty();
    $('#preview_panel').hide();

    for (var i = 0; i < line; i++) {
        var $tr = $('<tr></tr>');
        if (i == 0) {
            for (var j = 0; j < col; j++) {
                var $input = $('<input type="text" maxlength="50"/>')
                var $th = $('<th></th>');

                $th.append($input);
                $tr.append($th);
            }
        } else {
            for (var j = 0; j < col; j++) {
                var $input = $('<input type="text"/> maxlength="50"')
                var $td = $('<td></td>');

                $td.append($input);
                $tr.append($td);
            }
        }

        rootTableElement.append($tr);
        $('#preview_panel').show();
    }
}

function magic_template_ct(size, rootTableElement, tableName) {
    var line = size.x;
    var col = size.y;
    var body = '';

    for (var i = 0; i < line; i++) {
        if (i == 0) {
            var table_head = '|| ';
            for (var j = 0; j < col; j++) {
                var $th = rootTableElement.find('tr').eq(i).find('th').eq(j);
                var text = $th.children('input:first-child').val() + ' ||';
                table_head += text;
            }
            body += table_head + '\n';
        }
        else {
            var table_tr = '| ';
            for (var j = 0; j < col; j++) {
                var $td = rootTableElement.find('tr').eq(i).find('td').eq(j);
                var text = $td.children('input:first-child').val() + ' |';
                table_tr += text;
            }
            body += table_tr + '\n';
        }
    }

    if(tableName!=undefined)
        body = (tableName += body);

    return body;
}