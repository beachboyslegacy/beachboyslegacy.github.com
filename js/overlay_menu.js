window.addEventListener("load", () => {
    $('#open-overlay-menu').click(function(){
        $('#overlay-menu-screen').show();
        $('.overlay-menu').animate({left: '0'});
        $('body').addClass('disable-scrolling');
    });

    $('#close-overlay-menu').click(function(){
        $('.overlay-menu').animate({left: '-100%'});
        setTimeout(function(){
            $('#overlay-menu-screen').fadeOut();
        }, 100);

        $('body').removeClass('disable-scrolling');
    });


    $('.overlay-menu__header__nav ul li').click(function(){
        $('.overlay-menu__header__nav ul li').removeClass('selected');
        $(this).addClass('selected');
        $('.overlay-menu__content__section').hide();
    });

    $('#about-this-site-tab').click(function(){
        $('#about-this-site').show();
    });

    $('#about-the-authors-tab').click(function(){
        $('#about-the-authors').show();
    });

    $('#contact-tab').click(function(){
        $('#contact').show();
    });
});
