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

    function init_lipsko_text(i, text_node) {
        var $text_node = $(text_node);
        var lines = $text_node.text().trim().split('\n');
        var lines_with_highlight = [];
        for (var line of lines) {
            debugger;
            var line_with_highlight = [];
            for (var word of line.split(' ')) {
                line_with_highlight.push(word.replace(/([^[]+)(\[.+\])/, function(str, p1, p2) {
                    return '<span lipsko-id="' + p2 + '">' + p1 + '</span>';
                }));
            }
            lines_with_highlight.push(line_with_highlight.join(' '));
        }
        $text_node.html(lines_with_highlight.join('\n'));
    }

    $('.lipsko-text').each(init_lipsko_text);

    // TODO:
    // http://stackoverflow.com/questions/9213907/jquery-selector-that-simulates-starts-with-or-ends-with-for-searching-text
    $('.lipsko-table td:contains("- ")').addClass('translation-td');
    $('.lipsko-table td:contains("^")').addClass('header-td');
});
