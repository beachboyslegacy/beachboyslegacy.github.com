// @codekit-prepend 'jquery.lazyload.1.9.7.min.js'
// @codekit-prepend 'jquery.smooth-scroll.js'
// @codekit-prepend 'jquery.shorten.js'
// @codekit-append 'jquery-webicon.js'

// Updates title and description of page based on artist and category.
function updateTitleAndDescription(artist, category) {
    let title;
    let description;

    if (category === "Latest") {
        title = "Beach Boys Legacy";
        description = "Explore The Beach Boys Discography: Studio Albums, Live Albums, Compilations, Box Sets, Singles, and all Solo Albums by Brian Wilson, Dennis Wilson, Carl Wilson, Al Jardine, Mike Love, Bruce Johnston and David Marks.";
    } else {
        title = `${artist} ${category}`;
        description = `Explore all ${title} on Beach Boys Legacy.`
    }

    document.title = title;
    document.description = description;
    document
        .querySelector('meta[name="description"]')
        .setAttribute("content", description);

    // For Facebook.
    document
        .querySelector('meta[property="og:title"]')
        .setAttribute("content", title);
    document
        .querySelector('meta[property="og:description"]')
        .setAttribute("content", description);

    // For Twitter.
    document
        .querySelector('meta[name="twitter:title"]')
        .setAttribute("content", title);
    document
        .querySelector('meta[name="twitter:description"]')
        .setAttribute("content", description);

    // For Google+.
    document
        .querySelector('meta[itemprop="name"]')
        .setAttribute("content", title);
    document
        .querySelector('meta[itemprop="description"]')
        .setAttribute("content", description);
}

// Uses URL History API to store an arbitrary dict object.
function storeURLData(data) {
    // Let's grab the current URL and load it as a URL object.
    const url = new URL(window.location.href);

    // We can create our own params now.
    const newParams = new URLSearchParams(data);

    // Let's set the URL with our new params.
    url.search = newParams.toString();
    window.history.replaceState(
        { additionalInformation: "Update selected artist" },
        document.title,
        url,
    );
}

// Retrieves URL params as a data object.
function retrieveURLData() {
    // Let's grab the search params in the URL.
    const url = new URL(window.location.href);
    const search = new URLSearchParams(url.search);

    // We return them in a data dictionary.
    // TODO: find a way to make this return anything in the params.
    return {
        artist: search.get("artist"),
        category: search.get("category"),
    }
}

// Validates an artist or returns a viable option if invalid.
function validateArtist(artist) {
    const validArtist = [
        ...document
        .getElementById("artist")
        .getElementsByTagName("li")
    ].map(li => li.dataset.artist);

    if (validArtist.includes(artist)) {
        return artist;
    } else {
        return "The Beach Boys";
    }
}

// Validates a category or retuns a viable option if invalid.
function validateCategory(category) {
    const validCategories = [
        ...document
        .getElementById("category")
        .getElementsByTagName("li")
    ].filter(
        li => !li.classList.contains("hide-category")
    ) .map(li => li.dataset.categoryname);

    if (validCategories.includes(category)) {
        return category;
    } else {
        return validCategories[0];
    }
}

$(function(){

  // var jsonFile = 'js/data.json';
  var jsonFile = 'js/data-min.json';

  $.getJSON(jsonFile, function(data) {


    var totalItems = data.items.length;

    // We'll retrieve the selected artist and category form the URL. If none
    // are there, we'll use our default values.
    const urlData = retrieveURLData();

    // Let's update the navigation pane to reflect our artist.
    const initialArtist = validateArtist(urlData.artist);
    updateArtistNavigation(initialArtist);

    // Let's update the navigation pane to reflect our category.
    const initialCategory = validateCategory(urlData.category);
    updateCategoryNavigation(initialCategory);

    var currentArtist = initialArtist;
    var currentCategory = initialCategory;
    var amazonLink = 'amazonUs';
    var amazonBtnTxt = 'Buy on amazon.com';


    function loadItems(artist, category){


      var loadedItems = 0;
      var i,j,k = 0;
      var selectedArtist = artist;
      var selectedCategory = category;
      var $thisItem = '<li></li>';


      $('.items').empty();
      $('#backToTop').remove();



      if( selectedCategory == 'new' ){

        var currentYear = new Date().getFullYear();


        for(i=0; i<totalItems; i++){

          if( (currentYear - data.items[i].parent.releaseYear) < 4){

            loadedItems++;


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
          if( (data.items[i].parent.category[selectedCategory] == true) && selectedArtist == 'The Beach Boys'){

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





      // RSD or christmas
      // Like for Books, if Artist is Beach Boys we load all items. Separate from books bc they use byArtist instead of aboutArtist
      else if(selectedCategory == 'rsd' || selectedCategory == 'christmas'){

        for(i=0; i<totalItems; i++){


          // If selected artist is The Beach Boys, then load all the items by all members
          if( (data.items[i].parent.category[selectedCategory] == true) && selectedArtist == 'The Beach Boys'){

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

          // else list items for the selected member
          else if( (data.items[i].parent.byArtist === selectedArtist) && (data.items[i].parent.category[selectedCategory] == true) ){

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


      } // end of rsd







      // SINGLE (no box shadow for single covers)
      else if( selectedCategory == 'single'){

        for(i=0; i<totalItems; i++){


          if( (data.items[i].parent.byArtist === selectedArtist) && (data.items[i].parent.category[selectedCategory] == true) ){

            loadedItems++;

            $thisItem = '<li id="'+data.items[i].parent.uniqueId+'" data-date="'+data.items[i].parent.releaseYear+'">'+
                              '<a class="item__header" href="items/'+data.items[i].parent.uniqueId+'.html" style="background-color:'+data.items[i].parent.backgroundColor+'">'+
                                '<img class="item__cover lazy noshadow" data-original="'+data.items[i].parent.image+'" alt="'+data.items[i].parent.name+' cover">'+
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

        sortByRelease();


      } // end of single





      else{ //Everything but latest, solo albums, singles, books or videos

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

      // Let's store the category and artist in the URL.
      storeURLData({artist: selectedArtist, category: selectedCategory});

      // To help with SEO, we'll also update the page title and description.
      const prettyCategory =
        document
        .querySelectorAll(`[data-categoryname=${selectedCategory}]`)[0]
        .innerText;

      updateTitleAndDescription(selectedArtist, prettyCategory);

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

    // Updates artist navigation (side panel) to reflect the selected artist.
    function updateArtistNavigation(artist, category) {
        const selectedArtist =
            document
            .getElementById("artist")
            .getElementsByClassName("selector__options__current")[0];

        const newSelectedArtist = [
            ...document
                .getElementById("artist")
                .getElementsByTagName("li")
        ].filter(li => li.dataset.artist === artist)[0];

        // Unselect the old artist and select the new one.
        selectedArtist.removeAttribute("class");
        newSelectedArtist.classList = ["selector__options__current"];

        // We'll show relevant categories for the selected artist and remove
        // the rest.
        const newSelectedArtistClass = newSelectedArtist.dataset.artistclass;

        const categories = [
            ...document
            .getElementById("category")
            .getElementsByTagName("li")
        ];

        let firstValidCategory;
        for (category of categories) {
            if (category.classList.contains(newSelectedArtistClass)) {
                firstValidCategory = firstValidCategory || category;
                category.classList.remove("hide-category");
            } else {
                category.classList.add("hide-category");
            }
        }

        // We'll select the first category of the new selection.
        updateCategoryNavigation(firstValidCategory.dataset.categoryname);
    }

    // Updates category navigation (side panel) to reflect the selected
    // category.
    function updateCategoryNavigation(category) {
        const selectedCategory =
            document
            .getElementById("category")
            .getElementsByClassName("selector__options__current")[0];

        const newSelectedCategory = [
            ...document
                .getElementById("category")
                .getElementsByTagName("li")
        ].filter(li => li.dataset.categoryname === category)[0];

        // Unselect the old category and select the new one.
        selectedCategory.classList.remove("selector__options__current");
        newSelectedCategory.classList.add("selector__options__current");
    }

    // Register artist li event listeners.
    const artists = [
        ...document.getElementById("artist").getElementsByTagName("li")
    ];

    for (const artist of artists) {
        artist.addEventListener("click", function (event) {
            const selectedArtist =
                document
                .getElementById("artist")
                .getElementsByClassName("selector__options__current")[0]
                .dataset
                .artist;

            const newSelectedArtist = event.target.dataset.artist;

            // If the selected artist and the current artist match, don't do
            // anything.
            if (selectedArtist === newSelectedArtist) return;

            // Update the UI to reflect the click on the artist.
            updateArtistNavigation(newSelectedArtist);

            // We'll load the items matching the new artist and category.
            const selectedCategory =
                document
                .getElementById("category")
                .getElementsByClassName("selector__options__current")[0]
                .dataset
                .categoryname;

            loadItems(newSelectedArtist, selectedCategory);
            sortByRelease();

            lazyLoad();
            resetSorting();
        });
    }

    // Register categories li event listeners.
    const categories = [
        ...document.getElementById("category").getElementsByTagName("li")
    ];

    for (const category of categories) {
        category.addEventListener("click", function (event) {
            const selectedCategory =
                document
                .getElementById("category")
                .getElementsByClassName("selector__options__current")[0]
                .dataset
                .categoryname;

            const newSelectedCategory = event.target.dataset.categoryname;

            // If the selected category and the current category match, don't
            // do anything.
            if (selectedCategory === newSelectedCategory) return;

            // Update the UI to reflect the click on the category.
            updateCategoryNavigation(newSelectedCategory);

            // We'll load the items matching the new artist and category.
            const selectedArtist =
                document
                .getElementById("artist")
                .getElementsByClassName("selector__options__current")[0]
                .dataset
                .artist;

            loadItems(selectedArtist, newSelectedCategory);
            sortByRelease();

            lazyLoad();
            resetSorting();
        });
    }

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

  // $('#about-the-authors-tab').click(function(){
  //   $('#about-the-authors').load('authors.html').show();
  // });

  $('#contact-tab').click(function(){
    $('#contact').show();
  });



}); // /document ready
