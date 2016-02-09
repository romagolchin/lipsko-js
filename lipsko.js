$(function() {
    $('[data-lipsko-id]').on('mouseover', function(event) {
        $('[data-lipsko-id="' + event.target.dataset.lipskoId + '"]')
            .addClass('lipsko-highlight');
    }).on('mouseout', function(event) {
        $('[data-lipsko-id="' + event.target.dataset.lipskoId + '"]')
            .removeClass('lipsko-highlight');
    });
});