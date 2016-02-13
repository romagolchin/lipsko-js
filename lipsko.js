$(function() {
    $(document).on('mouseover', '[lipsko-id]', function(event) {
        for (var number of $(event.currentTarget).attr('lipsko-id').split(',')) {
            $('[lipsko-id*="' + number + '"]').addClass('lipsko-highlight');
        }
    }).on('mouseout', '[lipsko-id]', function(event) {
        for (var number of $(event.currentTarget).attr('lipsko-id').split(',')) {
            $('[lipsko-id*="' + number + '"]').removeClass('lipsko-highlight');
        }
    });

    var id_counter = 0;

    function wrap_to_spans_and_insert($demo, $editor) {
        var lines = $demo.text().trim().split("\n");
        var editor_lines = [];
        for (var line of lines) {
            var editor_line = [];
            for (var word of line.split(" ")) {
                if (word) {
                    editor_line.push('<span class="lipsko-word">' + word + '</span>');
                }
            }
            editor_lines.push(editor_line.join(' '));
        }
        $editor.html(editor_lines.join("\n"));
    }

    function update_markup() {
        $('#lipsko-editor .lipsko-source-markup').val($('#lipsko-editor .lipsko-source').html());
        $('#lipsko-editor .lipsko-translation-markup').val($('#lipsko-editor .lipsko-translation').html());
    }

    $('#lipsko-editor-start').click(function() {
        wrap_to_spans_and_insert($('#lipsko-demo .lipsko-source'), $('#lipsko-editor .lipsko-source'));
        wrap_to_spans_and_insert($('#lipsko-demo .lipsko-translation'), $('#lipsko-editor .lipsko-translation'));
        update_markup();
    });

    $('#lipsko-editor-copy').click(function() {
        $('#lipsko-editor .lipsko-source').html($('#lipsko-demo .lipsko-source').html());
        $('#lipsko-editor .lipsko-translation').html($('#lipsko-demo .lipsko-translation').html());
        update_markup();
    });

    $(document).on('click', '#lipsko-editor .lipsko-word', function(event) {
        var $target = $(event.currentTarget);
        if ($target.hasClass('lipsko-editor-word-editing')) {
            $target.removeClass('lipsko-editor-word-editing')
                .removeClass('lipsko-highlight')
                .removeAttr('lipsko-id');
        } else if (!event.shiftKey && $target.parent('.lipsko-source').length) {
            $('.lipsko-editor-word-editing').removeClass('lipsko-editor-word-editing');
            $target.addClass('lipsko-editor-word-editing');
            $target.attr('lipsko-id', '[' + ++id_counter + ']');
        } else {
            $target.addClass('lipsko-editor-word-editing');
            $target.attr('lipsko-id', '[' + id_counter + ']');
        }

        update_markup();
    });

    $('td:contains("- ")').addClass('english-td');
});
