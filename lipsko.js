$(function() {
    $(document).on('mouseover', '[lipsko-id]', function(event) {
        $('[lipsko-id="' + $(event.target).attr('lipsko-id') + '"]')
            .addClass('lipsko-highlight');
    }).on('mouseout', function(event) {
        $('[lipsko-id="' + $(event.target).attr('lipsko-id') + '"]')
            .removeClass('lipsko-highlight');
    });

    var id_counter = 0;

    function wrap_to_spans_and_insert($demo, $editor) {
        var lines = $demo.text().split("\n");
        var editor_lines = [];
        for (var line of lines) {
            var editor_line = [];
            for (var word of line.split(" ")) {
                editor_line.push('<span class="lipsko-word">' + word + '</span>');
            }
            editor_lines.push(editor_line.join(' '));
        }
        $editor.html(editor_lines.join("\n"));
    }

    $('#lipsko-editor-start').click(function() {
        wrap_to_spans_and_insert($('#lipsko-demo .lipsko-source'), $('#lipsko-editor .lipsko-source'));
        wrap_to_spans_and_insert($('#lipsko-demo .lipsko-translation'), $('#lipsko-editor .lipsko-translation'));
    });

    $(document).on('click', '#lipsko-editor .lipsko-word', function(event) {
        var $target = $(event.target);
        if (!event.shiftKey && $target.parent('.lipsko-source').length) {
            $('.lipsko-editor-word-editing').removeClass('lipsko-editor-word-editing');
            $target.addClass('lipsko-editor-word-editing');
            $target.attr('lipsko-id', ++id_counter);
        } else {
            $target.addClass('lipsko-editor-word-editing');
            $target.attr('lipsko-id', id_counter);
        }
    });

    $('#lipsko-editor-apply').click(function() {
        $('#lipsko-demo .lipsko-source').html($('#lipsko-editor .lipsko-source').html());
        $('#lipsko-demo .lipsko-translation').html($('#lipsko-editor .lipsko-translation').html());
    });
});
