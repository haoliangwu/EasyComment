var count = 1;

function description() {
    var steps = {
        'part1': '',
        'part2': '',
        'part3': ''
    };

    var results = {
        'actual': '',
        'expected': ''
    }

    var notes = {
        'note': '',
        'log': ''
    }

    $('#magic_de').show();
    $('#magic_submit').click(function () {
        results.actual = $('#actual_result textarea').val();
        results.expected = $('#expected_result textarea').val();
        notes.note = $('#note_detail textarea').val();
        notes.log = $('#note_code textarea').val();

        var template = magic_template_de(steps, results, notes);
        $('#editor').val(template);

    });

    $('#steps_macro button').each(function () {
        $(this).click(function () {

            $('#steps_init').show();
            var button_html = $(this).text();

            if (count > 3) {
                alert('The max number initial parts is 3.')
            }
            else {
                $('#init_part' + count).show();
                $('#init_part' + count).append('<span class="text-warning">' + count + '. ' + button_html + '</span>');
                switch ($(this).attr('id')) {
                    case 'init_1':
                        steps['part' + count] = '# Start up portal with no errors.\n' +
                            '# Login by default admin User Test.\n';
                        count++;
                        break;
                    case 'init_2':
                        steps['part' + count] = '# Go to Admin > Control Panel > Sites.\n' +
                            '# Click Add > Blank Site and add a site named \'Site1\'\n' +
                            '# Go to Site1 Admin Page and add a public page named \'page1\'\n';
                        count++;
                        break;
                    case 'init_3':
                        steps['part' + count] ='# Go to Admin > Control panel > Users and Organizations.\n' +
                            '# Add User named \'Test1\'' +
                            '# Click User Test1 and Assign it to liferay.com.\n';
                        count++;
                        break;
                    case 'init_4':
                        steps['part' + count] ='';
                        count++;
                        break;
                    case 'init_5':
                        steps['part' + count] ='';
                        count++;
                        break;
                    case 'init_6':
                        steps['part' + count] ='';
                        count++;
                        break;
                    case 'init_7':
                        steps['part' + count] ='';
                        count++;
                        break;
                    case 'init_8':
                        steps['part' + count] ='';
                        count++;
                        break;
                    case 'init_reset':
                        count == 1;
                        reconstructSteps(steps);
                        break;
                    default :
                        break;
                }
            }

        });

    });

    $('#init_others').change(function () {
        $('#steps_init').show();
        var button_html = $('#init_others').find('option:selected').text();

        if (count > 3) {
            alert('The max number initial parts is 3.')
        }
        else {
            var type = $(this).val();

            $('#init_part' + count).show();
            $('#init_part' + count).append('<span class="text-warning">' + count + '. ' + button_html + '</span>');
            switch (type) {
                case 'wiki_page':
                    steps['part' + count] ='WIKI TEST\n';
                    count++;
                    break;
                case 'mb_thread':
                    steps['part' + count] ='';
                    count++;
                    break;
                default :
                    break;
            }
        }

    })

}

function magic_template_de(steps, results, notes) {
    var steps_title = '*Steps to reproduce:*\n\n';
    var actual_title = '*Actual Result:*(x)\n';
    var expected_title = '*Expected Result:*(/)\n';
    var note_title = '*Note:*(!)\n';
    var error_log = notes.log != '' ? 'The error log is as follow:\n{noformat}' + notes.log + '{noformat}\n' : '';

    for (var e in steps) {
        steps_title += steps[e];
    }

    actual_title += results.actual + '\n' + error_log;

    expected_title += results.expected + '\n';


    if (notes.note != '') {
        note_title += notes.note + '\n';
        expected_title += ('\n' + note_title);
        actual_title += ('\n' + expected_title);
        steps_title += ('\n' + actual_title);

    } else {
        actual_title += ('\n' + expected_title);
        steps_title += ('\n' + actual_title);
    }

    return steps_title;
}

function reconstructSteps(steps) {
    $('#steps_init div[class="col-xs-4"]').each(function () {
        $(this).empty();
    })

    steps.part1 = '';
    steps.part2 = '';
    steps.part3 = '';


}