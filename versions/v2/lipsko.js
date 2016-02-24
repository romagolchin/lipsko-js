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

    window.lipsko_render_block = function($text_node, isTable) {
        var lines = $text_node.text().trim().split('\n');
        var lines_with_highlight = [];
        for (var i in lines) {
            var line = lines[i];
            var line_with_highlight = [];
            for (var word of line.split(' ')) {
                line_with_highlight.push(word.replace(/([^[]+)(\[.+\])/, function(str, p1, p2) {
                    return '<span lipsko-id="' + p2 + '">' + p1 + '</span>';
                }));
            }
            var line_joined = line_with_highlight.join(' ');
            if (isTable) {
                line_joined = line_joined.replace('/*', '</em>').replace('*', '<em>');
                if (i == 0) {
                    line_joined = '<h1>' + line_joined + '</h1><table>';
                } else {
                    line_joined = '<tr><td>' + line_joined.replace('|', '</td><td>') + '</td></tr>';
                }
                if (i == lines.length - 1) {
                    line_joined += '</table>'
                }
            }
            lines_with_highlight.push(line_joined);
        }
        $text_node.html(lines_with_highlight.join('\n'));

        $('.lipsko-table td:contains("- ")').addClass('translation-td');
        $('.lipsko-table td:contains("^")').each(function(i, node) {
            var $node = $(node);
            var text = $node.text().trim();
            if (text.indexOf('^') == 0) {
                $node.addClass('header-td');
                $node.text(text.substr(1));
            }
        });
    }

    $('.lipsko-text').each(function(i, node) {
        window.lipsko_render_block($(node), false);
    });

    $('.lipsko-table').each(function(i, node) {
        window.lipsko_render_block($(node), true);
    });
});
