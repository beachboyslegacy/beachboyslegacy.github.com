window.addEventListener("load", () => {
    var artistSelectorHeight = $('#artist').height() + 20;
    var categorySelectorHeight = $('#category').height() + 20;
    $('#artist').css({
      'min-height':artistSelectorHeight
    });
    $('#category').css({
      'min-height':categorySelectorHeight
    });
});

$('.selector__current').on( 'click', function() {
    $(this).next('.selector__options')
        .slideToggle(200)
        .toggleClass('open-menu');
});
