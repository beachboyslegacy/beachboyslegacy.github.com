// @codekit-prepend 'jquery.lazyload.1.9.7.min.js'
// @codekit-prepend 'jquery.smooth-scroll.js'
// @codekit-prepend 'jquery.shorten.js'
// @codekit-append 'jquery-webicon.js'

$(function(){

  // var jsonFile = 'js/data.json';
  var jsonFile = 'js/data-min.json';

  $.getJSON(jsonFile, function(data) {


    var totalItems = data.items.length;

    var initialArtist = 'The Beach Boys';
    var initialCategory = 'new'
    var currentArtist = initialArtist;
    var currentCategory = initialCategory;
    var amazonLink = 'amazonUs';
    var amazonBtnTxt = 'Buy on amazon.com';


    function loadItems(artist, category){


      var loadedItems = 0;
      var i,j,k = 0;
      var selectedArtist = artist;
      var selectedCategory = category;
      var thisReleaseMonthNumber = 0;
      var thisReleaseMonthName = 0;
      var thisReleaseDayNumber = 0;
      var $thisItem = '<li></li>';
      var rating = 0;


      $('.items').empty();
      $('#backToTop').remove();



      if( selectedCategory == 'new' ){

        for(i=0; i<totalItems; i++){

          if( data.items[i].parent.category.new == true ){

            loadedItems++;

            thisReleaseMonthNumber = data.items[i].parent.releaseMonth;


            $thisItem = '<li id="'+data.items[i].parent.uniqueId+'" data-date="'+data.items[i].parent.releaseYear+'">'+
                              '<a class="item__header" href="items/'+data.items[i].parent.uniqueId+'.html" style="background-color:'+data.items[i].parent.backgroundColor+'" onClick="ga(\x27send\x27, \x27event\x27, \x27Details\x27, \x27click\x27, \x27Latest\x27)">'+
                                '<img class="item__cover lazy" data-original="'+data.items[i].parent.image+'" alt="'+data.items[i].parent.name+' cover">'+
                                '<div class="item__info">'+
                                  '<h2 class="item__title">'+data.items[i].parent.name+'</h2>'+
                                  '<h3 class="item__subtitle">'+data.items[i].parent.alternateName+'</h3>'+
                                  '<h3 class="item__year">'+data.items[i].parent.releaseYear+'</h3>'+
                                  '<div class="wpac-rating-ajax" data-wpac-chan="'+data.items[i].parent.uniqueId+'"></div>'+
                                  '<div class="item__btn">See details and editions</div>'+
                                '</div>'+
                              '</a>'+
                            '</li>';


              $thisItem = $($thisItem); //convers string to DOM element
              $('.items').append($thisItem);


              $('.scroll-to-anchor').smoothScroll({
                 offset: -44
              });

          }

        } //end of main for loop

        sortByRelease();

      } // end of NEW



      else if( selectedCategory == 'solo' ){

        for(i=0; i<totalItems; i++){

          if( data.items[i].parent.category.solo == true ){

            loadedItems++;

            // SOLO
            $thisItem = '<li id="'+data.items[i].parent.uniqueId+'" data-date="'+data.items[i].parent.releaseYear+'">'+
                              '<a class="item__header" href="items/'+data.items[i].parent.uniqueId+'.html" style="background-color:'+data.items[i].parent.backgroundColor+'" onClick="ga(\x27send\x27, \x27event\x27, \x27Details\x27, \x27click\x27, \x27Solo\x27)">'+
                                '<img class="item__cover lazy" data-original="'+data.items[i].parent.image+'" alt="'+data.items[i].parent.name+' cover">'+
                                '<div class="item__info">'+
                                  '<h2 class="item__title">'+data.items[i].parent.name+'</h2>'+
                                  '<h3 class="item__subtitle">'+data.items[i].parent.alternateName+'</h3>'+
                                  '<h3 class="item__year">'+data.items[i].parent.releaseYear+'</h3>'+
                                  '<div class="wpac-rating-ajax" data-wpac-chan="'+data.items[i].parent.uniqueId+'"></div>'+
                                  '<div class="item__btn">See details and editions</div>'+
                                '</div>'+
                              '</a>'+
                            '</li>';


              $thisItem = $($thisItem); //convers string to DOM element
              $('.items').append($thisItem);


              $('.scroll-to-anchor').smoothScroll({
                 offset: -44
              });

          }

        } //end of main for loop

        sortByRelease();

      } // end of solo album



      // BOOK
      else if( selectedCategory == 'book'){

        for(i=0; i<totalItems; i++){


          // If selected artist is The Beach Boys, then load all the books
          if( data.items[i].parent.category.book == true && selectedArtist == 'The Beach Boys'){

            loadedItems++;

            $thisItem = '<li id="'+data.items[i].parent.uniqueId+'" data-date="'+data.items[i].parent.releaseYear+'">'+
                              '<a class="item__header" href="items/'+data.items[i].parent.uniqueId+'.html" style="background-color:'+data.items[i].parent.backgroundColor+'" onClick="ga(\x27send\x27, \x27event\x27, \x27Details\x27, \x27click\x27, \x27Book\x27)">'+
                                '<img class="item__cover lazy" data-original="'+data.items[i].parent.image+'" alt="'+data.items[i].parent.name+' cover">'+
                                '<div class="item__info">'+
                                  '<h2 class="item__title">'+data.items[i].parent.name+'</h2>'+
                                  '<h3 class="item__subtitle">'+data.items[i].parent.alternateName+'</h3>'+
                                  '<h3 class="item__year">'+data.items[i].parent.releaseYear+'</h3>'+
                                  '<div class="wpac-rating-ajax" data-wpac-chan="'+data.items[i].parent.uniqueId+'"></div>'+
                                  '<div class="item__btn">See details and editions</div>'+
                                  '</div>'+
                              '</a>'+
                            '</li>';


              $thisItem = $($thisItem); //convers string to DOM element
              $('.items').append($thisItem);



          }

          // else list books for the selected member
          else if( (data.items[i].parent.aboutArtist === selectedArtist) && (data.items[i].parent.category[selectedCategory] == true) ){

            loadedItems++;

            $thisItem = '<li id="'+data.items[i].parent.uniqueId+'" data-date="'+data.items[i].parent.releaseYear+'">'+
                              '<a class="item__header" href="items/'+data.items[i].parent.uniqueId+'.html" style="background-color:'+data.items[i].parent.backgroundColor+'" onClick="ga(\x27send\x27, \x27event\x27, \x27Details\x27, \x27click\x27, \x27Book\x27)">'+
                                '<img class="item__cover lazy" data-original="'+data.items[i].parent.image+'" alt="'+data.items[i].parent.name+' cover">'+
                                '<div class="item__info">'+
                                  '<h2 class="item__title">'+data.items[i].parent.name+'</h2>'+
                                  '<h3 class="item__subtitle">'+data.items[i].parent.alternateName+'</h3>'+
                                  '<h3 class="item__year">'+data.items[i].parent.releaseYear+'</h3>'+
                                  '<div class="wpac-rating-ajax" data-wpac-chan="'+data.items[i].parent.uniqueId+'"></div>'+
                                  '<div class="item__btn">See details and editions</div>'+
                                '</div>'+
                              '</a>'+
                            '</li>';


              $thisItem = $($thisItem); //convers string to DOM element
              $('.items').append($thisItem);


          }// /if

          $('.scroll-to-anchor').smoothScroll({
             offset: -44
          });

        } //end of main for loop

        sortByRelease();


      } // end of book




      else{ //Everything but latest, solo albums, books or videos

        for(i=0; i<totalItems; i++){


          if( (data.items[i].parent.byArtist === selectedArtist) && (data.items[i].parent.category[selectedCategory] == true) ){

            loadedItems++;

            $thisItem = '<li id="'+data.items[i].parent.uniqueId+'" data-date="'+data.items[i].parent.releaseYear+'">'+
                              '<a class="item__header" href="items/'+data.items[i].parent.uniqueId+'.html" style="background-color:'+data.items[i].parent.backgroundColor+'">'+
                                '<img class="item__cover lazy" data-original="'+data.items[i].parent.image+'" alt="'+data.items[i].parent.name+' cover">'+
                                '<div class="item__info">'+
                                  '<h2 class="item__title">'+data.items[i].parent.name+'</h2>'+
                                  '<h3 class="item__subtitle">'+data.items[i].parent.alternateName+'</h3>'+
                                  '<h3 class="item__year">'+data.items[i].parent.releaseYear+'</h3>'+
                                  '<div class="wpac-rating-ajax" data-wpac-chan="'+data.items[i].parent.uniqueId+'"></div>'+
                                  '<div class="item__btn">See details and editions</div>'+
                                '</div>'+
                              '</a>'+
                            '</li>';


              $thisItem = $($thisItem); //converts string to DOM element
              $('.items').append($thisItem);


              $('.scroll-to-anchor').smoothScroll({
                 offset: -44
              });


          } // /if

        } //end of main for loop

      } // /else

      //adds back to top button at the end of the items when there are more than 5 items
      if(loadedItems>5){
        var backToTop = '<div class="backtotop-btn" id="backToTop"><a href="#sorting" class="scroll-to-anchor">Catch a wave to the top</a></div>'
        $('.items').after(backToTop);
        $('.scroll-to-anchor').smoothScroll({
           offset: -44
        });
      }

      if(loadedItems==1){
        $('.results-number').html(loadedItems+' item');
      }else{
        $('.results-number').html(loadedItems+' items');
      }

      $('html, body').animate({
          scrollTop: $('.items').offset().top - 74
      }, 0);

      wpac_ajax_init(); // Loads the rating widget for each loaded item

    } // /loadItems function









    function getCountry(){

      $.get("https://ipinfo.io", function (response) {

        var country = response.country;
        console.log('country'+country);

        if (country == 'GB' || country == 'gb' || country == 'UK' || country == 'uk'){
          amazonLink = 'amazonUk';
          amazonBtnTxt = 'Buy on amazon.co.uk';
        }
        else if (country == 'ES' || country == 'es'){
          amazonLink = 'amazonEs';
          amazonBtnTxt = 'Comprar en amazon.es';
        }
        else if (country == 'CA' || country == 'ca') {
          amazonLink = 'amazonCa';
          amazonBtnTxt = 'Buy on amazon.ca';
        }
        else if (country == 'DE' || country == 'de') {
          amazonLink = 'amazonDe';
          amazonBtnTxt = 'Kaufen bei amazon.de';
        }
        else if (country == 'FR' || country == 'fr') {
          amazonLink = 'amazonFr';
          amazonBtnTxt = 'Acheter sur amazon.fr';
        }
        else if (country == 'IT' || country == 'it') {
          amazonLink = 'amazonIt';
          amazonBtnTxt = 'Compra su amazon.it';
        }
        else{
          amazonLink = 'amazonUs';
          amazonBtnTxt = 'Buy on amazon.com';
        }

      }, "jsonp");

    }



    // Initial load of items
    loadItems(initialArtist, initialCategory);
    sortByRelease();
    getCountry();
    lazyLoad();






    // Reverse order of items
    function reverseOrder(){
      var list = $('.items');
      var listItems = list.children('li');
      list.append(listItems.get().reverse());
    }



    // function sortByRating(){
    //
    //   var list = $('.items');
    //   var listItems = list.children('li');
    //
    //   listItems.sort(sortList).appendTo(list);
    //   function sortList(a, b){
    //       return ($(b).data('rating')) > ($(a).data('rating')) ? 1 : -1;
    //   }
    //
    // }


    function sortByRelease(){

      var list = $('.items');
      var listItems = list.children('li');

      listItems.sort(sortList).appendTo(list);
      function sortList(a, b){
          return ($(b).data('date')) > ($(a).data('date')) ? 1 : -1;
      }
    }

    function resetSorting(){
      $('.sorting li').removeClass('sorting__current');
      $('#sorting-release').addClass('sorting__current');
    }


    function lazyLoad(){
      $("img.lazy").lazyload({
        threshold : 500,
        effect : "fadeIn",
        placeholder: 'assets/preloader.svg'
      });
    }



    // Loads another artist's items and filters categories based on selected artist
    $('#artist li').on( 'click', function() {

      if ( $(this).hasClass('selector__options__current') ){
        return 0; // currently selected artist has been clicked so do nothing
      }else{

        //updates navigation
        $('#artist li').removeClass('selector__options__current');
        $(this).addClass('selector__options__current');

        selectedArtistClass = $(this).attr('data-artistclass');


        $('#category li.'+selectedArtistClass).removeClass('hide-category');
        $('#category li').not('.'+selectedArtistClass).addClass('hide-category');

        $('#category li').removeClass('selector__options__current');

        //loads new items

        selectedArtist = $(this).attr('data-artist');
        currentArtist = selectedArtist;

        if( selectedArtist == 'The Beach Boys'){
          loadItems(selectedArtist,initialCategory); //new
          $('#new').addClass('selector__options__current');
          $('#current-category span').html('Latest');
        }
        else{
          loadItems(selectedArtist,'album');   //only Beach Boys have a latest (new) category. The others default to 'album'.
          $('#album').addClass('selector__options__current');
          $('#current-category span').html('Albums');
        }

        sortByRelease();
        lazyLoad();
        resetSorting();



      } // /else


      $('#sorting-rating').show();


    });


    // Loads another category items for a given artist
    $('#category li').on( 'click', function() {

      if ( $(this).hasClass('selector__options__current') ){
        return 0; // currently selected artist has been clicked so do nothing
      }else{

        //updates navigation
        $('#category li').removeClass('selector__options__current');
        $(this).addClass('selector__options__current');

        //loads new items
        selectedCategory= $(this).attr('data-categoryname');



        currentCategory = selectedCategory;
        loadItems(currentArtist,selectedCategory);
        sortByRelease();

        lazyLoad();
        resetSorting();

      } // /else

      if ( selectedCategory == 'book' ){
        $('#sorting-rating').hide();
      }
      else{
        $('#sorting-rating').show();
      }

    });


    // Sorting
    $('.sorting li').on( 'click', function() {

      if ( $(this).hasClass('sorting__current') ){
        reverseOrder();
      }else{
        $('.sorting li').removeClass('sorting__current');
        $(this).addClass('sorting__current');

        if( $(this).is('#sorting-rating') ){
          sortByRating();
        }else if ( $(this).is('#sorting-release') ){
          sortByRelease();
        }
      }

      lazyLoad();

    });


  }); // /get json


  //sets height of selector option
  function setSelectorsHeight(){
    var artistSelectorHeight = $('#artist').height() + 20;
    var categorySelectorHeight = $('#category').height() + 20;
    $('#artist').css({
      'min-height':artistSelectorHeight
    });
    $('#category').css({
      'min-height':categorySelectorHeight
    });
  }

  setSelectorsHeight();


  //toggles dropdown menu on mobile
  $('.selector__current').on( 'click', function() {
    $(this).next('.selector__options').slideToggle(200).toggleClass('open-menu');
  });

  // Closes mobile dropdown menu after selecting an option
  $('.selector__options li').on( 'click', function() {


    var theseOptions = $(this).parent('.selector__options');

    if( $('.selector__current').is(":visible")  ){
      theseOptions.slideToggle(200).toggleClass('open-menu');
      var newOption = $(this).html();
      theseOptions.prev('.selector__current').find('span').html(newOption);
    }

    ga('send', 'event', 'Navigation', 'click', 'Filter');

  });



  //Overlay Menu
  $('#open-overlay-menu').click(function(){
    $('#overlay-menu-screen').show();
    $('.overlay-menu').animate({left: '0'});
    $('body').addClass('disable-scrolling');
  });

  $('.closeOverlayMenu').click(function(){
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
    $('#about-the-authors').load('authors.html').show();
  });

  $('#contact-tab').click(function(){
    $('#contact').show();
  });



}); // /document ready
