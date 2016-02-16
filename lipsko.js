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

    window.init_lipsko_text = function($text_node) {
        var lines = $text_node.text().trim().split('\n');
        var lines_with_highlight = [];
        for (var line of lines) {
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

    $('.lipsko-text').each(function(i, node) {
        window.init_lipsko_text($(node));
    });

    // TODO:
    // http://stackoverflow.com/questions/9213907/jquery-selector-that-simulates-starts-with-or-ends-with-for-searching-text
    $('.lipsko-table td:contains("- ")').addClass('translation-td');
    $('.lipsko-table td:contains("^")').addClass('header-td');
});
