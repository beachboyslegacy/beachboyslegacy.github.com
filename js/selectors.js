window.addEventListener("load", () => {
    $('.selector__current').on( 'click', function() {
        $(this).next('.selector__options')
            .slideToggle(200)
            .toggleClass('open-menu');
    });
});
