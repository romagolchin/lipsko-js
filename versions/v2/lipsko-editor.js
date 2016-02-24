$(function() {
    // var id_counter = 0;

    // $(document).on('click', '#lipsko-editor .lipsko-word', function(event) {
    //     var $target = $(event.currentTarget);
    //     if ($target.hasClass('lipsko-editor-word-editing')) {
    //         $target.removeClass('lipsko-editor-word-editing')
    //             .removeClass('lipsko-highlight')
    //             .removeAttr('lipsko-id');
    //     } else if (!event.shiftKey && $target.parent('.lipsko-source').length) {
    //         $('.lipsko-editor-word-editing').removeClass('lipsko-editor-word-editing');
    //         $target.addClass('lipsko-editor-word-editing');
    //         $target.attr('lipsko-id', '[' + ++id_counter + ']');
    //     } else {
    //         $target.addClass('lipsko-editor-word-editing');
    //         $target.attr('lipsko-id', '[' + id_counter + ']');
    //     }

    //     update_markup();
    // });

    var editorPanes = [];

    function EditorPane(element) {
        this.$paneElement = $(element);
        var text = this.$paneElement.text().trim();
        this.$textElement = $('<div class="' +
            (this.$paneElement.hasClass('lipsko-editor-table') ? 'lipsko-table' : 'lipsko-text') + '">');
        this.$textareaElement = $('<textarea rows="20" cols="40">').val(text);
        this.$paneElement.html('');
        this.$paneElement.append(this.$textElement);
        this.$paneElement.append(this.$textareaElement);

        this.$textareaElement.on('input', this.takeContentFromTextarea.bind(this));
        this.takeContentFromTextarea();
    }

    EditorPane.prototype.takeContentFromTextarea = function() {
        this.$textElement.text(this.$textareaElement.val());
        window.lipsko_render_block(this.$textElement, this.$paneElement.hasClass('lipsko-editor-table'));
    }

    $('.lipsko-editor').each(function(i, node) {
        editorPanes.push(new EditorPane(node));
    });
});
