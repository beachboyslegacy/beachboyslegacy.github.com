// @codekit-prepend 'jquery.lazyload.1.9.7.min.js'
// @codekit-prepend 'jquery.smooth-scroll.js'
// @codekit-prepend 'jquery.shorten.js'
// @codekit-append 'jquery-webicon.js'

$(function(){

  // var jsonFile = 'js/data.json';
  var jsonFile = 'js/data-min.json';

  $.getJSON(jsonFile, function(data) {


    var totalItems = data.items.length;

    var months = [ 'January' , 'February' , 'March' , 'April' , 'May' , 'June' , 'July' , 'August' , 'September' , 'October' , 'November' , 'December' ]
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
      var tracks = 0;
      var thisTrack = '<tr></tr>'

      $('.items').empty();
      $('#backToTop').remove();



      if( selectedCategory == 'new' ){

        for(i=0; i<totalItems; i++){

          if( data.items[i].parent.category.new == true ){

            loadedItems++;

            thisReleaseMonthNumber = data.items[i].parent.releaseMonth;
            if ( thisReleaseMonthNumber == 0 ){
              thisReleaseMonthName = "";
            }else{
              thisReleaseMonthName = months[thisReleaseMonthNumber - 1];
            }

            thisReleaseDayNumber = data.items[i].parent.releaseDay;
            if ( thisReleaseDayNumber == 0 ){
              thisReleaseDayNumber = "";
            }else{
              thisReleaseDayNumber = thisReleaseDayNumber;
            }


            // NEW BOOKS
            if ( data.items[i].parent.category.book == true ) {

              $thisItem = '<li id="'+data.items[i].parent.uniqueId+'" data-date="'+data.items[i].parent.releaseYear+'">'+
                                '<div class="item__header" style="background-color:'+data.items[i].parent.backgroundColor+'">'+
                                  '<img class="item__cover lazy" data-original="'+data.items[i].parent.image+'" alt="'+data.items[i].parent.name+' cover">'+
                                  '<div class="item__info">'+
                                    '<h2 class="item__title">'+data.items[i].parent.name+'</h2>'+
                                    '<h3 class="item__subtitle">'+data.items[i].parent.alternateName+'</h3>'+
                                    '<h3 class="item__year">'+data.items[i].parent.releaseYear+'</h3>'+
                                    // '<ul class="item__rating"></ul>'+
                                    '<div class="wpac-rating-ajax" data-wpac-chan="'+data.items[i].parent.uniqueId+'"></div>'+
                                    '<a href="#'+data.items[i].parent.uniqueId+'" class="item__btn scroll-to-anchor" onClick="ga(\x27send\x27, \x27event\x27, \x27Details\x27, \x27click\x27, \x27Book\x27)">See details and editions</a>'+
                                  '</div>'+
                                '</div>'+
                                '<div class="item__body">'+
                                  '<div class="parent-item__info">'+
                                    '<p>Release date: '+thisReleaseMonthName+' '+thisReleaseDayNumber+' '+data.items[i].parent.releaseYear+'</p>'+
                                    '<p>Author: '+data.items[i].parent.author.name+'</p>'+
                                    // '<p>'+data.items[i].parent.notes+'</p>'+
                                  '</div>'+
                                  '<ul class="child-items"></ul>'+
                                  '<div class="item__footer">'+
                                    '<a href="#'+data.items[i].parent.uniqueId+'" class="item__close-btn scroll-to-anchor">Close "'+data.items[i].parent.name+'"</a>'+
                                  '</div>'+
                                '</div>'+
                              '</li>';


                $thisItem = $($thisItem); //convers string to DOM element
                $('.items').append($thisItem);

            }


            // VIDEO
            else if( (data.items[i].parent.category.video) ){

              // DOCUMENTARIES AND MOVIES
              if( (data.items[i].parent.subcategory.documentary) ||  (data.items[i].parent.subcategory.movie) ){

                $thisItem = '<li id="'+data.items[i].parent.uniqueId+'" data-date="'+data.items[i].parent.releaseYear+'">'+
                                  '<div class="item__header" style="background-color:'+data.items[i].parent.backgroundColor+'">'+
                                    '<img class="item__cover lazy" data-original="'+data.items[i].parent.image+'" alt="'+data.items[i].parent.name+' cover">'+
                                    '<div class="item__info">'+
                                      '<h2 class="item__title">'+data.items[i].parent.name+'</h2>'+
                                      '<h3 class="item__subtitle">'+data.items[i].parent.alternateName+'</h3>'+
                                      '<h3 class="item__year">'+data.items[i].parent.releaseYear+'</h3>'+
                                      // '<ul class="item__rating"></ul>'+
                                      '<div class="wpac-rating-ajax" data-wpac-chan="'+data.items[i].parent.uniqueId+'"></div>'+
                                      '<a href="#'+data.items[i].parent.uniqueId+'" class="item__btn scroll-to-anchor" onClick="ga(\x27send\x27, \x27event\x27, \x27Details\x27, \x27click\x27, \x27Video\x27)">See details and editions</a>'+
                                    '</div>'+
                                  '</div>'+
                                  '<div class="item__body">'+
                                    '<div class="parent-item__info">'+
                                      '<p>Released on '+thisReleaseMonthName+' '+thisReleaseDayNumber+', '+data.items[i].parent.releaseYear+'</p>'+
									  '<p>'+data.items[i].parent.producer+'</p>'+
									  '<p>Duration: '+data.items[i].parent.duration+'</p>'+
									  // '<p>'+data.items[i].parent.notes+'</p>'+
                                    '</div>'+
                                    '<ul class="child-items"></ul>'+
                                    '<div class="item__footer">'+
                                      '<a href="#'+data.items[i].parent.uniqueId+'" class="item__close-btn scroll-to-anchor">Close "'+data.items[i].parent.name+'"</a>'+
                                    '</div>'+
                                  '</div>'+
                                '</li>';



                $thisItem = $($thisItem); //convers string to DOM element
                $('.items').append($thisItem);
              }
            }


            // NEW ALBUM OR NEW COMPILATION OR NEW BOOTLEG
            else {

              // NEW ALBUM OR NEW BOXSET
              if(data.items[i].parent.category.album == true || data.items[i].parent.category.boxset == true || data.items[i].parent.category.live == true){

                $thisItem = '<li id="'+data.items[i].parent.uniqueId+'" data-date="'+data.items[i].parent.releaseYear+'">'+
                                  '<div class="item__header" style="background-color:'+data.items[i].parent.backgroundColor+'">'+
                                    '<img class="item__cover lazy" data-original="'+data.items[i].parent.image+'" alt="'+data.items[i].parent.name+' cover">'+
                                    '<div class="item__info">'+
                                      '<h2 class="item__title">'+data.items[i].parent.name+'</h2>'+
                                      '<h3 class="item__subtitle">'+data.items[i].parent.alternateName+'</h3>'+
                                      '<h3 class="item__year">'+data.items[i].parent.releaseYear+'</h3>'+
                                      // '<ul class="item__rating"></ul>'+
                                      '<div class="wpac-rating-ajax" data-wpac-chan="'+data.items[i].parent.uniqueId+'"></div>'+
                                      '<a href="#'+data.items[i].parent.uniqueId+'" class="item__btn scroll-to-anchor" onClick="ga(\x27send\x27, \x27event\x27, \x27Details\x27, \x27click\x27, \x27Solo\x27)">See details and editions</a>'+
                                    '</div>'+
                                  '</div>'+
                                  '<div class="item__body">'+
                                    '<div class="parent-item__info">'+
                                      '<p>Released on '+thisReleaseMonthName+' '+thisReleaseDayNumber+', '+data.items[i].parent.releaseYear+'</p>'+
                                      '<p>'+data.items[i].parent.publisher+' ('+data.items[i].parent.country+') '+data.items[i].parent.catalogNumber+'</p>'+
                                      '<p>Produced by '+data.items[i].parent.producer+'</p>'+
                                      '<p>Chart position: #'+data.items[i].parent.billboardPosition+'</p>'+
                                      '<p>'+data.items[i].parent.notes+'</p>'+
                                    '</div>'+
                                    '<div class="parent-item__tracklist">'+
                                      '<table>'+
                                        '<tbody>'+
                                          '<tr>'+
                                            '<td>Title</td>'+
                                            '<td></td>'+
                                            '<td>Composer</td>'+
                                          '</tr>'+
                                        '</tbody>'+
                                      '</table>'+
                                    '</div>'+
                                    '<ul class="child-items"></ul>'+
                                    '<div class="item__footer">'+
                                      '<a href="#'+data.items[i].parent.uniqueId+'" class="item__close-btn scroll-to-anchor">Close "'+data.items[i].parent.name+'"</a>'+
                                    '</div>'+
                                  '</div>'+
                                '</li>';

                }

                // NEW COMPILATION
                else if(data.items[i].parent.category.compilation == true){

                  $thisItem = '<li id="'+data.items[i].parent.uniqueId+'" data-date="'+data.items[i].parent.releaseYear+'">'+
                                    '<div class="item__header" style="background-color:'+data.items[i].parent.backgroundColor+'">'+
                                      '<img class="item__cover lazy" data-original="'+data.items[i].parent.image+'" alt="'+data.items[i].parent.name+' cover">'+
                                      '<div class="item__info">'+
                                        '<h2 class="item__title">'+data.items[i].parent.name+'</h2>'+
                                        '<h3 class="item__subtitle">'+data.items[i].parent.alternateName+'</h3>'+
                                        '<h3 class="item__year">'+data.items[i].parent.releaseYear+'</h3>'+
                                        // '<ul class="item__rating"></ul>'+
                                        '<div class="wpac-rating-ajax" data-wpac-chan="'+data.items[i].parent.uniqueId+'"></div>'+
                                        '<a href="#'+data.items[i].parent.uniqueId+'" class="item__btn scroll-to-anchor" onClick="ga(\x27send\x27, \x27event\x27, \x27Details\x27, \x27click\x27, \x27Solo\x27)">See details and editions</a>'+
                                      '</div>'+
                                    '</div>'+
                                    '<div class="item__body">'+
                                      '<div class="parent-item__info">'+
                                        '<p>Released on '+thisReleaseMonthName+' '+thisReleaseDayNumber+', '+data.items[i].parent.releaseYear+'</p>'+
                                        '<p>'+data.items[i].parent.publisher+' ('+data.items[i].parent.country+') '+data.items[i].parent.catalogNumber+'</p>'+
                                        // '<p>Produced by '+data.items[i].parent.producer+'</p>'+
                                        '<p>Chart position: #'+data.items[i].parent.billboardPosition+'</p>'+
                                        '<p>'+data.items[i].parent.notes+'</p>'+
                                      '</div>'+
                                      '<div class="parent-item__tracklist">'+
                                        '<table>'+
                                          '<tbody>'+
                                            '<tr>'+
                                              '<td>Title</td>'+
                                              '<td></td>'+
                                              '<td>Composer</td>'+
                                            '</tr>'+
                                          '</tbody>'+
                                        '</table>'+
                                      '</div>'+
                                      '<ul class="child-items"></ul>'+
                                      '<div class="item__footer">'+
                                        '<a href="#'+data.items[i].parent.uniqueId+'" class="item__close-btn scroll-to-anchor">Close "'+data.items[i].parent.name+'"</a>'+
                                      '</div>'+
                                    '</div>'+
                                  '</li>';

                  }


                $thisItem = $($thisItem); //convers string to DOM element
                $('.items').append($thisItem);


                tracks = data.items[i].parent.track.itemListElement.length;

                for (k=0; k<tracks; k++){

                  if (data.items[i].parent.numberOfDiscs > 1) {
                    if( data.items[i].parent.track.itemListElement[k].item.trackNumber == 1){
                      $thisItem.find('.parent-item__tracklist tbody tr:last-child').after(
                        '<tr class="discnumber"><td colspan="3">Disc '+data.items[i].parent.track.itemListElement[k].item.disc+'</td></tr>'
                      );
                    }
                  }


                  if( data.items[i].parent.track.itemListElement[k].item.hit == true ){
                    thisTrack = '<tr>'+
                                      '<td><div class="tracknumber">'+data.items[i].parent.track.itemListElement[k].item.trackNumber+'</div>'+data.items[i].parent.track.itemListElement[k].item.name+'</td>'+
                                      '<td class="hit-or-gem"><img src="assets/star.svg" /> HIT</td>'+
                                      '<td>'+data.items[i].parent.track.itemListElement[k].item.composer+'</td>'+
                                    '</tr>'
                  }else if( data.items[i].parent.track.itemListElement[k].item.inthit == true ){
                    thisTrack = '<tr>'+
                                      '<td><div class="tracknumber">'+data.items[i].parent.track.itemListElement[k].item.trackNumber+'</div>'+data.items[i].parent.track.itemListElement[k].item.name+'</td>'+
                                      '<td class="hit-or-gem"><img src="assets/inthit.svg" /> HIT</td>'+
                                      '<td>'+data.items[i].parent.track.itemListElement[k].item.composer+'</td>'+
                                    '</tr>'
                  }else if( data.items[i].parent.track.itemListElement[k].item.gem == true ){
                    thisTrack = '<tr>'+
                                      '<td><div class="tracknumber">'+data.items[i].parent.track.itemListElement[k].item.trackNumber+'</div>'+data.items[i].parent.track.itemListElement[k].item.name+'</td>'+
                                      '<td class="hit-or-gem"><img src="assets/gem.svg" /> GEM</td>'+
                                      '<td>'+data.items[i].parent.track.itemListElement[k].item.composer+'</td>'+
                                    '</tr>'
                  }else{
                    thisTrack = '<tr>'+
                                      '<td><div class="tracknumber">'+data.items[i].parent.track.itemListElement[k].item.trackNumber+'</div>'+data.items[i].parent.track.itemListElement[k].item.name+'</td>'+
                                      '<td></td>'+
                                      '<td>'+data.items[i].parent.track.itemListElement[k].item.composer+'</td>'+
                                    '</tr>'
                  }

                  $thisItem.find('.parent-item__tracklist tbody').append(thisTrack);

                }

              }


              $('.scroll-to-anchor').smoothScroll({
                 offset: -44
              });

          }

        } //end of main for loop

        sortByRelease();

      // end of NEW
      }



      else if( selectedCategory == 'solo' ){

        for(i=0; i<totalItems; i++){

          if( data.items[i].parent.category.solo == true ){

            loadedItems++;

            thisReleaseMonthNumber = data.items[i].parent.releaseMonth;
            if ( thisReleaseMonthNumber == 0 ){
              thisReleaseMonthName = "";
            }else{
              thisReleaseMonthName = months[thisReleaseMonthNumber - 1];
            }

            thisReleaseDayNumber = data.items[i].parent.releaseDay;
            if ( thisReleaseDayNumber == 0 ){
              thisReleaseDayNumber = "";
            }else{
              thisReleaseDayNumber = thisReleaseDayNumber;
            }

            // SOLO
            $thisItem = '<li id="'+data.items[i].parent.uniqueId+'" data-date="'+data.items[i].parent.releaseYear+'">'+
                              '<div class="item__header" style="background-color:'+data.items[i].parent.backgroundColor+'">'+
                                '<img class="item__cover lazy" data-original="'+data.items[i].parent.image+'" alt="'+data.items[i].parent.name+' cover">'+
                                '<div class="item__info">'+
                                  '<h2 class="item__title">'+data.items[i].parent.name+'</h2>'+
                                  '<h3 class="item__subtitle">'+data.items[i].parent.alternateName+'</h3>'+
                                  '<h3 class="item__year">'+data.items[i].parent.releaseYear+'</h3>'+
                                  // '<ul class="item__rating"></ul>'+
                                  '<div class="wpac-rating-ajax" data-wpac-chan="'+data.items[i].parent.uniqueId+'"></div>'+
                                  '<a href="#'+data.items[i].parent.uniqueId+'" class="item__btn scroll-to-anchor" onClick="ga(\x27send\x27, \x27event\x27, \x27Details\x27, \x27click\x27, \x27Solo\x27)">See details and editions</a>'+
                                '</div>'+
                              '</div>'+
                              '<div class="item__body">'+
                                '<div class="parent-item__info">'+
                                  '<p>Released on '+thisReleaseMonthName+' '+thisReleaseDayNumber+', '+data.items[i].parent.releaseYear+'</p>'+
                                  '<p>'+data.items[i].parent.publisher+' ('+data.items[i].parent.country+') '+data.items[i].parent.catalogNumber+'</p>'+
                                  '<p>Produced by '+data.items[i].parent.producer+'</p>'+
                                  '<p>Chart position: #'+data.items[i].parent.billboardPosition+'</p>'+
                                  // '<p>'+data.items[i].parent.notes+'</p>'+
                                '</div>'+
                                '<div class="parent-item__tracklist">'+
                                  '<table>'+
                                    '<tbody>'+
                                      '<tr>'+
                                        '<td>Title</td>'+
                                        '<td></td>'+
                                        '<td>Composer</td>'+
                                      '</tr>'+
                                    '</tbody>'+
                                  '</table>'+
                                '</div>'+
                                '<ul class="child-items"></ul>'+
                                '<div class="item__footer">'+
                                  '<a href="#'+data.items[i].parent.uniqueId+'" class="item__close-btn scroll-to-anchor">Close "'+data.items[i].parent.name+'"</a>'+
                                '</div>'+
                              '</div>'+
                            '</li>';


              $thisItem = $($thisItem); //convers string to DOM element
              $('.items').append($thisItem);

              // rating = data.items[i].parent.aggregateRating;
              //
              // for (j=0; j<rating; j++){
              //   $thisItem.find('.item__rating').append(
              //     '<li><img alt="star" src="assets/hit.svg" /></li>'
              //     // '<li><img alt="star" src="../assets/star.svg"; this.onerror=null;" /></li>'
              //   );
              // }
              // if (rating === 0.5 || rating === 1.5 || rating === 2.5 || rating === 3.5 || rating === 4.5){
              //
              //   $thisItem.find('.item__rating').children('li:last-child').remove();
              //   $thisItem.find('.item__rating').append(
              //     '<li alt="half star" class="item-rating__half-star"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgNDUzLjA5OCA0NTMuMDk4IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NTMuMDk4IDQ1My4wOTg7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNMzMxLjMyMywxMS43MDhMMjY3LjA5LDE0MS42MTNsLTE0My4zMjIsMjAuODM5Yy0xMC42NTYsMS43MTQtMTUuOTg2LDYuMDkxLTE1Ljk4NiwxMy4xMzQgICBjMCwzLjk5OSwyLjM4LDguNTY3LDcuMTM1LDEzLjcwNmwxMDMuOTIzLDEwMS4wNjRsLTI0LjU1MSwxNDIuNzUyYy0wLjM4MSwyLjY3LTAuNTcxLDQuNTcyLTAuNTcxLDUuNzE2ICAgYzAsMy45OTcsMC45OTksNy4zNzEsMi45OTYsMTAuMTM2YzEuOTk5LDIuNzU5LDQuOTk1LDQuMTM4LDguOTkzLDQuMTM4YzMuNDI2LDAsNy4yMzMtMS4xMzMsMTEuNDItMy40MjZsMTI4LjE5LTY3LjM4MlYwICAgQzMzOS42MDgsMCwzMzQuOTQ3LDMuOSwzMzEuMzIzLDExLjcwOHoiIGZpbGw9IiMwMDAwMDAiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" /></li>'
              //     // '<li alt="half star" class="item-rating__half-star"><img src="../assets/half-star.svg"; this.onerror=null;"></li>'
              //   );
              // }

              tracks = data.items[i].parent.track.itemListElement.length;

              for (k=0; k<tracks; k++){

                if (data.items[i].parent.numberOfDiscs > 1) {
                  if( data.items[i].parent.track.itemListElement[k].item.trackNumber == 1){
                    $thisItem.find('.parent-item__tracklist tbody tr:last-child').after(
                      '<tr class="discnumber"><td colspan="3">Disc '+data.items[i].parent.track.itemListElement[k].item.disc+'</td></tr>'
                    );
                  }
                }


                if( data.items[i].parent.track.itemListElement[k].item.hit == true ){
                  thisTrack = '<tr>'+
                                    '<td><div class="tracknumber">'+data.items[i].parent.track.itemListElement[k].item.trackNumber+'</div>'+data.items[i].parent.track.itemListElement[k].item.name+'</td>'+
                                    '<td class="hit-or-gem"><img src="assets/star.svg" /> HIT</td>'+
                                    '<td>'+data.items[i].parent.track.itemListElement[k].item.composer+'</td>'+
                                  '</tr>'
                }else if( data.items[i].parent.track.itemListElement[k].item.inthit == true ){
                  thisTrack = '<tr>'+
                                    '<td><div class="tracknumber">'+data.items[i].parent.track.itemListElement[k].item.trackNumber+'</div>'+data.items[i].parent.track.itemListElement[k].item.name+'</td>'+
                                    '<td class="hit-or-gem"><img src="assets/inthit.svg" /> HIT</td>'+
                                    '<td>'+data.items[i].parent.track.itemListElement[k].item.composer+'</td>'+
                                  '</tr>'
                }else if( data.items[i].parent.track.itemListElement[k].item.gem == true ){
                  thisTrack = '<tr>'+
                                    '<td><div class="tracknumber">'+data.items[i].parent.track.itemListElement[k].item.trackNumber+'</div>'+data.items[i].parent.track.itemListElement[k].item.name+'</td>'+
                                    '<td class="hit-or-gem"><img src="assets/gem.svg" /> GEM</td>'+
                                    '<td>'+data.items[i].parent.track.itemListElement[k].item.composer+'</td>'+
                                  '</tr>'
                }else{
                  thisTrack = '<tr>'+
                                    '<td><div class="tracknumber">'+data.items[i].parent.track.itemListElement[k].item.trackNumber+'</div>'+data.items[i].parent.track.itemListElement[k].item.name+'</td>'+
                                    '<td></td>'+
                                    '<td>'+data.items[i].parent.track.itemListElement[k].item.composer+'</td>'+
                                  '</tr>'
                }

                $thisItem.find('.parent-item__tracklist tbody').append(thisTrack);

              }

              $('.scroll-to-anchor').smoothScroll({
                 offset: -44
              });

          }

        } //end of main for loop

        sortByRelease();

      // end of solo album
      }



      // BOOK
      else if( selectedCategory == 'book'){

        for(i=0; i<totalItems; i++){

          thisReleaseMonthNumber = data.items[i].parent.releaseMonth;
          if ( thisReleaseMonthNumber == 0 ){
            thisReleaseMonthName = "";
          }else{
            thisReleaseMonthName = months[thisReleaseMonthNumber - 1];
          }

          thisReleaseDayNumber = data.items[i].parent.releaseDay;
          if ( thisReleaseDayNumber == 0 ){
            thisReleaseDayNumber = "";
          }else{
            thisReleaseDayNumber = thisReleaseDayNumber;
          }


          // If selected artist is The Beach Boys, then load all the books
          if( data.items[i].parent.category.book == true && selectedArtist == 'The Beach Boys'){

            loadedItems++;

            $thisItem = '<li id="'+data.items[i].parent.uniqueId+'" data-date="'+data.items[i].parent.releaseYear+'">'+
                              '<div class="item__header" style="background-color:'+data.items[i].parent.backgroundColor+'">'+
                                '<img class="item__cover lazy" data-original="'+data.items[i].parent.image+'" alt="'+data.items[i].parent.name+' cover">'+
                                '<div class="item__info">'+
                                  '<h2 class="item__title">'+data.items[i].parent.name+'</h2>'+
                                  '<h3 class="item__subtitle">'+data.items[i].parent.alternateName+'</h3>'+
                                  '<h3 class="item__year">'+data.items[i].parent.releaseYear+'</h3>'+
                                  // '<ul class="item__rating"></ul>'+
                                  '<div class="wpac-rating-ajax" data-wpac-chan="'+data.items[i].parent.uniqueId+'"></div>'+
                                  '<a href="#'+data.items[i].parent.uniqueId+'" class="item__btn scroll-to-anchor" onClick="ga(\x27send\x27, \x27event\x27, \x27Details\x27, \x27click\x27, \x27Book\x27)">See details and editions</a>'+
                                '</div>'+
                              '</div>'+
                              '<div class="item__body">'+
                                '<div class="parent-item__info">'+
                                  '<p>Release date: '+thisReleaseMonthName+' '+thisReleaseDayNumber+' '+data.items[i].parent.releaseYear+'</p>'+
                                  '<p>Author: '+data.items[i].parent.author.name+'</p>'+
                                  // '<p>'+data.items[i].parent.notes+'</p>'+
                                '</div>'+
                                '<ul class="child-items"></ul>'+
                                '<div class="item__footer">'+
                                  '<a href="#'+data.items[i].parent.uniqueId+'" class="item__close-btn scroll-to-anchor">Close "'+data.items[i].parent.name+'"</a>'+
                                '</div>'+
                              '</div>'+
                            '</li>';


              $thisItem = $($thisItem); //convers string to DOM element
              $('.items').append($thisItem);

              rating = data.items[i].parent.aggregateRating;

              // for (j=0; j<rating; j++){
              //   $thisItem.find('.item__rating').append(
              //     '<li><img alt="star" src="assets/hit.svg" /></li>'
              //     // '<li><img alt="star" src="../assets/star.svg"; this.onerror=null;" /></li>'
              //   );
              // }
              // if (rating === 0.5 || rating === 1.5 || rating === 2.5 || rating === 3.5 || rating === 4.5){
              //
              //   $thisItem.find('.item__rating').children('li:last-child').remove();
              //   $thisItem.find('.item__rating').append(
              //     '<li alt="half star" class="item-rating__half-star"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgNDUzLjA5OCA0NTMuMDk4IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NTMuMDk4IDQ1My4wOTg7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNMzMxLjMyMywxMS43MDhMMjY3LjA5LDE0MS42MTNsLTE0My4zMjIsMjAuODM5Yy0xMC42NTYsMS43MTQtMTUuOTg2LDYuMDkxLTE1Ljk4NiwxMy4xMzQgICBjMCwzLjk5OSwyLjM4LDguNTY3LDcuMTM1LDEzLjcwNmwxMDMuOTIzLDEwMS4wNjRsLTI0LjU1MSwxNDIuNzUyYy0wLjM4MSwyLjY3LTAuNTcxLDQuNTcyLTAuNTcxLDUuNzE2ICAgYzAsMy45OTcsMC45OTksNy4zNzEsMi45OTYsMTAuMTM2YzEuOTk5LDIuNzU5LDQuOTk1LDQuMTM4LDguOTkzLDQuMTM4YzMuNDI2LDAsNy4yMzMtMS4xMzMsMTEuNDItMy40MjZsMTI4LjE5LTY3LjM4MlYwICAgQzMzOS42MDgsMCwzMzQuOTQ3LDMuOSwzMzEuMzIzLDExLjcwOHoiIGZpbGw9IiMwMDAwMDAiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" /></li>'
              //     // '<li alt="half star" class="item-rating__half-star"><img src="../assets/half-star.svg"; this.onerror=null;"></li>'
              //   );
              // }

          }

          else if( (data.items[i].parent.aboutArtist === selectedArtist) && (data.items[i].parent.category[selectedCategory] == true) ){

            loadedItems++;

            $thisItem = '<li id="'+data.items[i].parent.uniqueId+'" data-date="'+data.items[i].parent.releaseYear+'">'+
                              '<div class="item__header" style="background-color:'+data.items[i].parent.backgroundColor+'">'+
                                '<img class="item__cover lazy" data-original="'+data.items[i].parent.image+'" alt="'+data.items[i].parent.name+' cover">'+
                                '<div class="item__info">'+
                                  '<h2 class="item__title">'+data.items[i].parent.name+'</h2>'+
                                  '<h3 class="item__subtitle">'+data.items[i].parent.alternateName+'</h3>'+
                                  '<h3 class="item__year">'+data.items[i].parent.releaseYear+'</h3>'+
                                  // '<ul class="item__rating"></ul>'+
                                  '<div class="wpac-rating-ajax" data-wpac-chan="'+data.items[i].parent.uniqueId+'"></div>'+
                                  '<a href="#'+data.items[i].parent.uniqueId+'" class="item__btn scroll-to-anchor" onClick="ga(\x27send\x27, \x27event\x27, \x27Details\x27, \x27click\x27, \x27Book\x27)">See details and editions</a>'+
                                '</div>'+
                              '</div>'+
                              '<div class="item__body">'+
                                '<div class="parent-item__info">'+
                                  '<p>Release date: '+thisReleaseMonthName+' '+thisReleaseDayNumber+' '+data.items[i].parent.releaseYear+'</p>'+
                                  '<p>Author: '+data.items[i].parent.author.name+'</p>'+
                                  // '<p>'+data.items[i].parent.notes+'</p>'+
                                '</div>'+
                                '<ul class="child-items"></ul>'+
                                '<div class="item__footer">'+
                                  '<a href="#'+data.items[i].parent.uniqueId+'" class="item__close-btn scroll-to-anchor">Close "'+data.items[i].parent.name+'"</a>'+
                                '</div>'+
                              '</div>'+
                            '</li>';


              $thisItem = $($thisItem); //convers string to DOM element
              $('.items').append($thisItem);

              // rating = data.items[i].parent.aggregateRating;
              //
              // for (j=0; j<rating; j++){
              //   $thisItem.find('.item__rating').append(
              //     '<li><img alt="star" src="assets/hit.svg" /></li>'
              //     // '<li><img alt="star" src="../assets/star.svg"; this.onerror=null;" /></li>'
              //   );
              // }
              // if (rating === 0.5 || rating === 1.5 || rating === 2.5 || rating === 3.5 || rating === 4.5){
              //
              //   $thisItem.find('.item__rating').children('li:last-child').remove();
              //   $thisItem.find('.item__rating').append(
              //     '<li alt="half star" class="item-rating__half-star"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgNDUzLjA5OCA0NTMuMDk4IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NTMuMDk4IDQ1My4wOTg7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNMzMxLjMyMywxMS43MDhMMjY3LjA5LDE0MS42MTNsLTE0My4zMjIsMjAuODM5Yy0xMC42NTYsMS43MTQtMTUuOTg2LDYuMDkxLTE1Ljk4NiwxMy4xMzQgICBjMCwzLjk5OSwyLjM4LDguNTY3LDcuMTM1LDEzLjcwNmwxMDMuOTIzLDEwMS4wNjRsLTI0LjU1MSwxNDIuNzUyYy0wLjM4MSwyLjY3LTAuNTcxLDQuNTcyLTAuNTcxLDUuNzE2ICAgYzAsMy45OTcsMC45OTksNy4zNzEsMi45OTYsMTAuMTM2YzEuOTk5LDIuNzU5LDQuOTk1LDQuMTM4LDguOTkzLDQuMTM4YzMuNDI2LDAsNy4yMzMtMS4xMzMsMTEuNDItMy40MjZsMTI4LjE5LTY3LjM4MlYwICAgQzMzOS42MDgsMCwzMzQuOTQ3LDMuOSwzMzEuMzIzLDExLjcwOHoiIGZpbGw9IiMwMDAwMDAiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" /></li>'
              //     // '<li alt="half star" class="item-rating__half-star"><img src="../assets/half-star.svg"; this.onerror=null;"></li>'
              //   );
              // }

          }// /if

          $('.scroll-to-anchor').smoothScroll({
             offset: -44
          });

        } //end of main for loop

        sortByRelease();

      // end of book
      }


      // VIDEO
      else if( selectedCategory == 'video' ){

        for(i=0; i<totalItems; i++){


          if( (data.items[i].parent.byArtist === selectedArtist) && (data.items[i].parent.category[selectedCategory] == true) ){

            loadedItems++;

            thisReleaseMonthNumber = data.items[i].parent.releaseMonth;
            if ( thisReleaseMonthNumber == 0 ){
              thisReleaseMonthName = "";
            }else{
              thisReleaseMonthName = months[thisReleaseMonthNumber - 1];
            }

            thisReleaseDayNumber = data.items[i].parent.releaseDay;
            if ( thisReleaseDayNumber == 0 ){
              thisReleaseDayNumber = "";
            }else{
              thisReleaseDayNumber = thisReleaseDayNumber;
            }

            // VIDEO
            if( (data.items[i].parent.category.video) ){

              // DOCUMENTARIES AND MOVIES
              if( (data.items[i].parent.subcategory.documentary) ||  (data.items[i].parent.subcategory.movie) ){

                $thisItem = '<li id="'+data.items[i].parent.uniqueId+'" data-date="'+data.items[i].parent.releaseYear+'">'+
                                  '<div class="item__header" style="background-color:'+data.items[i].parent.backgroundColor+'">'+
                                    '<img class="item__cover lazy" data-original="'+data.items[i].parent.image+'" alt="'+data.items[i].parent.name+' cover">'+
                                    '<div class="item__info">'+
                                      '<h2 class="item__title">'+data.items[i].parent.name+'</h2>'+
                                      '<h3 class="item__subtitle">'+data.items[i].parent.alternateName+'</h3>'+
                                      '<h3 class="item__year">'+data.items[i].parent.releaseYear+'</h3>'+
                                      // '<ul class="item__rating"></ul>'+
                                      '<div class="wpac-rating-ajax" data-wpac-chan="'+data.items[i].parent.uniqueId+'"></div>'+
                                      '<a href="#'+data.items[i].parent.uniqueId+'" class="item__btn scroll-to-anchor" onClick="ga(\x27send\x27, \x27event\x27, \x27Details\x27, \x27click\x27, \x27Video\x27)">See details and editions</a>'+
                                    '</div>'+
                                  '</div>'+
                                  '<div class="item__body">'+
                                    '<div class="parent-item__info">'+
                                      '<p>Released on '+thisReleaseMonthName+' '+thisReleaseDayNumber+', '+data.items[i].parent.releaseYear+'</p>'+
									  '<p>'+data.items[i].parent.producer+'</p>'+
									  '<p>Duration: '+data.items[i].parent.duration+'</p>'+
									  // '<p>'+data.items[i].parent.notes+'</p>'+
                                    '</div>'+
                                    '<ul class="child-items"></ul>'+
                                    '<div class="item__footer">'+
                                      '<a href="#'+data.items[i].parent.uniqueId+'" class="item__close-btn scroll-to-anchor">Close "'+data.items[i].parent.name+'"</a>'+
                                    '</div>'+
                                  '</div>'+
                                '</li>';



                $thisItem = $($thisItem); //convers string to DOM element
                $('.items').append($thisItem);

                // rating = data.items[i].parent.aggregateRating;
                //
                // for (j=0; j<rating; j++){
                //   $thisItem.find('.item__rating').append(
                //     '<li><img alt="star" src="assets/hit.svg" /></li>'
                //     // '<li><img alt="star" src="../assets/star.svg"; this.onerror=null;" /></li>'
                //   );
                // }
                // if (rating === 0.5 || rating === 1.5 || rating === 2.5 || rating === 3.5 || rating === 4.5){
                //
                //   $thisItem.find('.item__rating').children('li:last-child').remove();
                //   $thisItem.find('.item__rating').append(
                //     '<li alt="half star" class="item-rating__half-star"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgNDUzLjA5OCA0NTMuMDk4IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NTMuMDk4IDQ1My4wOTg7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNMzMxLjMyMywxMS43MDhMMjY3LjA5LDE0MS42MTNsLTE0My4zMjIsMjAuODM5Yy0xMC42NTYsMS43MTQtMTUuOTg2LDYuMDkxLTE1Ljk4NiwxMy4xMzQgICBjMCwzLjk5OSwyLjM4LDguNTY3LDcuMTM1LDEzLjcwNmwxMDMuOTIzLDEwMS4wNjRsLTI0LjU1MSwxNDIuNzUyYy0wLjM4MSwyLjY3LTAuNTcxLDQuNTcyLTAuNTcxLDUuNzE2ICAgYzAsMy45OTcsMC45OTksNy4zNzEsMi45OTYsMTAuMTM2YzEuOTk5LDIuNzU5LDQuOTk1LDQuMTM4LDguOTkzLDQuMTM4YzMuNDI2LDAsNy4yMzMtMS4xMzMsMTEuNDItMy40MjZsMTI4LjE5LTY3LjM4MlYwICAgQzMzOS42MDgsMCwzMzQuOTQ3LDMuOSwzMzEuMzIzLDExLjcwOHoiIGZpbGw9IiMwMDAwMDAiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" /></li>'
                //     // '<li alt="half star" class="item-rating__half-star"><img src="../assets/half-star.svg"; this.onerror=null;"></li>'
                //   );
                // }


                $('.scroll-to-anchor').smoothScroll({
                   offset: -44
                });

              } // /if


              // LIVE CONCERTS
              else if( (data.items[i].parent.subcategory.live) ){

                $thisItem = '<li id="'+data.items[i].parent.uniqueId+'" data-date="'+data.items[i].parent.releaseYear+'">'+
                                  '<div class="item__header" style="background-color:'+data.items[i].parent.backgroundColor+'">'+
                                    '<img class="item__cover lazy" data-original="'+data.items[i].parent.image+'" alt="'+data.items[i].parent.name+' cover">'+
                                    '<div class="item__info">'+
                                      '<h2 class="item__title">'+data.items[i].parent.name+'</h2>'+
                                      '<h3 class="item__subtitle">'+data.items[i].parent.alternateName+'</h3>'+
                                      '<h3 class="item__year">'+data.items[i].parent.releaseYear+'</h3>'+
                                      // '<ul class="item__rating"></ul>'+
                                      '<div class="wpac-rating-ajax" data-wpac-chan="'+data.items[i].parent.uniqueId+'"></div>'+
                                      '<a href="#'+data.items[i].parent.uniqueId+'" class="item__btn scroll-to-anchor" onClick="ga(\x27send\x27, \x27event\x27, \x27Details\x27, \x27click\x27, \x27Video\x27)">See details and editions</a>'+
                                    '</div>'+
                                  '</div>'+
                                  '<div class="item__body">'+
                                    '<div class="parent-item__info">'+
                                      '<p>Released on '+thisReleaseMonthName+' '+thisReleaseDayNumber+', '+data.items[i].parent.releaseYear+'</p>'+
									  '<p>'+data.items[i].parent.producer+'</p>'+
									  '<p>Duration: '+data.items[i].parent.duration+'</p>'+
									  // '<p>'+data.items[i].parent.notes+'</p>'+
                                    '</div>'+
                                    '<div class="parent-item__tracklist">'+
                                      '<table>'+
                                        '<tbody>'+
                                          '<tr>'+
                                            '<td>Title</td>'+
                                            '<td></td>'+
                                            '<td>Composer</td>'+
                                          '</tr>'+
                                        '</tbody>'+
                                      '</table>'+
                                    '</div>'+
                                    '<ul class="child-items"></ul>'+
                                    '<div class="item__footer">'+
                                      '<a href="#'+data.items[i].parent.uniqueId+'" class="item__close-btn scroll-to-anchor">Close "'+data.items[i].parent.name+'"</a>'+
                                    '</div>'+
                                  '</div>'+
                                '</li>';




                $thisItem = $($thisItem); //convers string to DOM element
                $('.items').append($thisItem);

                // rating = data.items[i].parent.aggregateRating;
                //
                // for (j=0; j<rating; j++){
                //   $thisItem.find('.item__rating').append(
                //     '<li><img alt="star" src="assets/hit.svg" /></li>'
                //     // '<li><img alt="star" src="../assets/star.svg"; this.onerror=null;" /></li>'
                //   );
                // }
                // if (rating === 0.5 || rating === 1.5 || rating === 2.5 || rating === 3.5 || rating === 4.5){
                //
                //   $thisItem.find('.item__rating').children('li:last-child').remove();
                //   $thisItem.find('.item__rating').append(
                //     '<li alt="half star" class="item-rating__half-star"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgNDUzLjA5OCA0NTMuMDk4IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NTMuMDk4IDQ1My4wOTg7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNMzMxLjMyMywxMS43MDhMMjY3LjA5LDE0MS42MTNsLTE0My4zMjIsMjAuODM5Yy0xMC42NTYsMS43MTQtMTUuOTg2LDYuMDkxLTE1Ljk4NiwxMy4xMzQgICBjMCwzLjk5OSwyLjM4LDguNTY3LDcuMTM1LDEzLjcwNmwxMDMuOTIzLDEwMS4wNjRsLTI0LjU1MSwxNDIuNzUyYy0wLjM4MSwyLjY3LTAuNTcxLDQuNTcyLTAuNTcxLDUuNzE2ICAgYzAsMy45OTcsMC45OTksNy4zNzEsMi45OTYsMTAuMTM2YzEuOTk5LDIuNzU5LDQuOTk1LDQuMTM4LDguOTkzLDQuMTM4YzMuNDI2LDAsNy4yMzMtMS4xMzMsMTEuNDItMy40MjZsMTI4LjE5LTY3LjM4MlYwICAgQzMzOS42MDgsMCwzMzQuOTQ3LDMuOSwzMzEuMzIzLDExLjcwOHoiIGZpbGw9IiMwMDAwMDAiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" /></li>'
                //     // '<li alt="half star" class="item-rating__half-star"><img src="../assets/half-star.svg"; this.onerror=null;"></li>'
                //   );
                // }


                tracks = data.items[i].parent.track.itemListElement.length;

                for (k=0; k<tracks; k++){

                  if (data.items[i].parent.numberOfDiscs > 1) {
                    if( data.items[i].parent.track.itemListElement[k].item.trackNumber == 1){
                      $thisItem.find('.parent-item__tracklist tbody tr:last-child').after(
                        '<tr class="discnumber"><td colspan="3">Disc '+data.items[i].parent.track.itemListElement[k].item.disc+'</td></tr>'
                      );
                    }
                  }


                  if( data.items[i].parent.track.itemListElement[k].item.hit == true ){
                    thisTrack = '<tr>'+
                                      '<td><div class="tracknumber">'+data.items[i].parent.track.itemListElement[k].item.trackNumber+'</div>'+data.items[i].parent.track.itemListElement[k].item.name+'</td>'+
                                      '<td class="hit-or-gem"><img src="assets/star.svg" /> HIT</td>'+
                                      '<td>'+data.items[i].parent.track.itemListElement[k].item.composer+'</td>'+
                                    '</tr>'
                  }else if( data.items[i].parent.track.itemListElement[k].item.inthit == true ){
                    thisTrack = '<tr>'+
                                      '<td><div class="tracknumber">'+data.items[i].parent.track.itemListElement[k].item.trackNumber+'</div>'+data.items[i].parent.track.itemListElement[k].item.name+'</td>'+
                                      '<td class="hit-or-gem"><img src="assets/inthit.svg" /> HIT</td>'+
                                      '<td>'+data.items[i].parent.track.itemListElement[k].item.composer+'</td>'+
                                    '</tr>'
                  }else if( data.items[i].parent.track.itemListElement[k].item.gem == true ){
                    thisTrack = '<tr>'+
                                      '<td><div class="tracknumber">'+data.items[i].parent.track.itemListElement[k].item.trackNumber+'</div>'+data.items[i].parent.track.itemListElement[k].item.name+'</td>'+
                                      '<td class="hit-or-gem"><img src="assets/gem.svg" /> GEM</td>'+
                                      '<td>'+data.items[i].parent.track.itemListElement[k].item.composer+'</td>'+
                                    '</tr>'
                  }else{
                    thisTrack = '<tr>'+
                                      '<td><div class="tracknumber">'+data.items[i].parent.track.itemListElement[k].item.trackNumber+'</div>'+data.items[i].parent.track.itemListElement[k].item.name+'</td>'+
                                      '<td></td>'+
                                      '<td>'+data.items[i].parent.track.itemListElement[k].item.composer+'</td>'+
                                    '</tr>'
                  }

                  $thisItem.find('.parent-item__tracklist tbody').append(thisTrack);

                }


                $('.scroll-to-anchor').smoothScroll({
                   offset: -44
                });


              } // /else

            } // /if


          }// /if

        } //end of main for loop


      } // /else   /end of video





      else{ //Everything but solo albums, books, videos or bootlegs

        for(i=0; i<totalItems; i++){


          if( (data.items[i].parent.byArtist === selectedArtist) && (data.items[i].parent.category[selectedCategory] == true) ){

            loadedItems++;

            thisReleaseMonthNumber = data.items[i].parent.releaseMonth;
            if ( thisReleaseMonthNumber == 0 ){
              thisReleaseMonthName = "";
            }else{
              thisReleaseMonthName = months[thisReleaseMonthNumber - 1];
            }

            thisReleaseDayNumber = data.items[i].parent.releaseDay;
            if ( thisReleaseDayNumber == 0 ){
              thisReleaseDayNumber = "";
            }else{
              thisReleaseDayNumber = thisReleaseDayNumber;
            }


            // COMPILATION
            if(data.items[i].parent.category.compilation){
              $thisItem = '<li id="'+data.items[i].parent.uniqueId+'" data-date="'+data.items[i].parent.releaseYear+'">'+
                                '<div class="item__header" style="background-color:'+data.items[i].parent.backgroundColor+'">'+
                                  '<img class="item__cover lazy" data-original="'+data.items[i].parent.image+'" alt="'+data.items[i].parent.name+' cover">'+
                                  '<div class="item__info">'+
                                    '<h2 class="item__title">'+data.items[i].parent.name+'</h2>'+
                                    '<h3 class="item__subtitle">'+data.items[i].parent.alternateName+'</h3>'+
                                    '<h3 class="item__year">'+data.items[i].parent.releaseYear+'</h3>'+
                                    // '<ul class="item__rating"></ul>'+
                                    '<div class="wpac-rating-ajax" data-wpac-chan="'+data.items[i].parent.uniqueId+'"></div>'+
                                    '<a href="#'+data.items[i].parent.uniqueId+'" class="item__btn scroll-to-anchor" onClick="ga(\x27send\x27, \x27event\x27, \x27Details\x27, \x27click\x27, \x27Compilation\x27)">See details and editions</a>'+
                                  '</div>'+
                                '</div>'+
                                '<div class="item__body">'+
                                  '<div class="parent-item__info">'+
                                    '<p>Released on '+thisReleaseMonthName+' '+thisReleaseDayNumber+', '+data.items[i].parent.releaseYear+'</p>'+
                                    '<p>'+data.items[i].parent.publisher+' ('+data.items[i].parent.country+') '+data.items[i].parent.catalogNumber+'</p>'+
                                    '<p>Chart position: #'+data.items[i].parent.billboardPosition+'</p>'+
                                    // '<p>'+data.items[i].parent.notes+'</p>'+
                                  '</div>'+
                                  '<div class="parent-item__tracklist">'+
                                    '<table>'+
                                      '<tbody>'+
                                        '<tr>'+
                                          '<td>Title</td>'+
                                          '<td></td>'+
                                          '<td>Composer</td>'+
                                        '</tr>'+
                                      '</tbody>'+
                                    '</table>'+
                                  '</div>'+
                                  '<ul class="child-items"></ul>'+
                                  '<div class="item__footer">'+
                                    '<a href="#'+data.items[i].parent.uniqueId+'" class="item__close-btn scroll-to-anchor">Close "'+data.items[i].parent.name+'"</a>'+
                                  '</div>'+
                                '</div>'+
                              '</li>';
            }
            // SINGLES
            else if(data.items[i].parent.category.single){
              $thisItem = '<li id="'+data.items[i].parent.uniqueId+'" data-date="'+data.items[i].parent.releaseYear+'">'+
                                '<div class="item__header" style="background-color:'+data.items[i].parent.backgroundColor+'">'+
                                  '<img class="item__cover single lazy" data-original="'+data.items[i].parent.image+'" alt="'+data.items[i].parent.name+' cover">'+
                                  '<div class="item__info">'+
                                    '<h2 class="item__title">'+data.items[i].parent.name+'</h2>'+
                                    '<h3 class="item__subtitle">'+data.items[i].parent.alternateName+'</h3>'+
                                    '<h3 class="item__year">'+data.items[i].parent.releaseYear+'</h3>'+
                                    // '<ul class="item__rating"></ul>'+
                                    '<div class="wpac-rating-ajax" data-wpac-chan="'+data.items[i].parent.uniqueId+'"></div>'+
                                    '<a href="#'+data.items[i].parent.uniqueId+'" class="item__btn scroll-to-anchor" onClick="ga(\x27send\x27, \x27event\x27, \x27Details\x27, \x27click\x27, \x27Compilation\x27)">See details and editions</a>'+
                                  '</div>'+
                                '</div>'+
                                '<div class="item__body">'+
                                  '<div class="parent-item__info">'+
                                    '<p>Released on '+thisReleaseMonthName+' '+thisReleaseDayNumber+', '+data.items[i].parent.releaseYear+'</p>'+
                                    '<p>'+data.items[i].parent.publisher+' ('+data.items[i].parent.country+') '+data.items[i].parent.catalogNumber+'</p>'+
                                    '<p>Chart position: #'+data.items[i].parent.billboardPosition+'</p>'+
                                    // '<p>'+data.items[i].parent.notes+'</p>'+
                                  '</div>'+
                                  '<div class="parent-item__tracklist">'+
                                    '<table>'+
                                      '<tbody>'+
                                        '<tr>'+
                                          '<td>Title</td>'+
                                          '<td></td>'+
                                          '<td>Composer</td>'+
                                        '</tr>'+
                                      '</tbody>'+
                                    '</table>'+
                                  '</div>'+
                                  '<ul class="child-items"></ul>'+
                                  '<div class="item__footer">'+
                                    '<a href="#'+data.items[i].parent.uniqueId+'" class="item__close-btn scroll-to-anchor">Close "'+data.items[i].parent.name+'"</a>'+
                                  '</div>'+
                                '</div>'+
                              '</li>';
            }
            // BOOTLEG
            else if(data.items[i].parent.category.bootleg){
              $thisItem = '<li id="'+data.items[i].parent.uniqueId+'" data-date="'+data.items[i].parent.releaseYear+'">'+
                                '<div class="item__header" style="background-color:'+data.items[i].parent.backgroundColor+'">'+
                                  '<img class="item__cover lazy" data-original="'+data.items[i].parent.image+'" alt="'+data.items[i].parent.name+' cover">'+
                                  '<div class="item__info">'+
                                    '<h2 class="item__title">'+data.items[i].parent.name+'</h2>'+
                                    '<h3 class="item__subtitle">'+data.items[i].parent.alternateName+'</h3>'+
                                    '<h3 class="item__year">'+data.items[i].parent.releaseYear+'</h3>'+
                                    // '<ul class="item__rating"></ul>'+
                                    '<div class="wpac-rating-ajax" data-wpac-chan="'+data.items[i].parent.uniqueId+'"></div>'+
                                    '<a href="#'+data.items[i].parent.uniqueId+'" class="item__btn scroll-to-anchor" onClick="ga(\x27send\x27, \x27event\x27, \x27Details\x27, \x27click\x27, \x27Album\x27)">See details and editions</a>'+
                                  '</div>'+
                                '</div>'+
                                '<div class="item__body">'+
                                  '<div class="parent-item__info">'+
                                    '<p>'+data.items[i].parent.publisher+' ('+data.items[i].parent.country+') '+data.items[i].parent.catalogNumber+'</p>'+
                                    // '<p>'+data.items[i].parent.notes+'</p>'+
                                  '</div>'+
                                  '<div class="parent-item__tracklist">'+
                                    '<table>'+
                                      '<tbody>'+
                                        '<tr>'+
                                          '<td>Title</td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                        '</tr>'+
                                      '</tbody>'+
                                    '</table>'+
                                  '</div>'+
                                  '<ul class="child-items"></ul>'+
                                  '<div class="item__footer">'+
                                    '<a href="#'+data.items[i].parent.uniqueId+'" class="item__close-btn scroll-to-anchor">Close "'+data.items[i].parent.name+'"</a>'+
                                  '</div>'+
                                '</div>'+
                              '</li>';
            }
            // Productions
            else if(data.items[i].parent.category.production){
              $thisItem = '<li id="'+data.items[i].parent.uniqueId+'" data-date="'+data.items[i].parent.releaseYear+'">'+
                                '<div class="item__header" style="background-color:'+data.items[i].parent.backgroundColor+'">'+
                                  '<img class="item__cover single lazy" data-original="'+data.items[i].parent.image+'" alt="'+data.items[i].parent.name+' cover">'+
                                  '<div class="item__info">'+
                                    '<h2 class="item__title">'+data.items[i].parent.name+'</h2>'+
                                    '<h3 class="item__subtitle">'+data.items[i].parent.alternateName+'</h3>'+
                                    '<h3 class="item__year">'+data.items[i].parent.releaseYear+'</h3>'+
                                    // '<ul class="item__rating"></ul>'+
                                    '<div class="wpac-rating-ajax" data-wpac-chan="'+data.items[i].parent.uniqueId+'"></div>'+
                                    '<a href="#'+data.items[i].parent.uniqueId+'" class="item__btn scroll-to-anchor" onClick="ga(\x27send\x27, \x27event\x27, \x27Details\x27, \x27click\x27, \x27Album\x27)">See details and editions</a>'+
                                  '</div>'+
                                '</div>'+
                                '<div class="item__body">'+
                                  '<div class="parent-item__info">'+
                                    '<p>Released on '+thisReleaseMonthName+' '+thisReleaseDayNumber+', '+data.items[i].parent.releaseYear+'</p>'+
                                    '<p>'+data.items[i].parent.publisher+' ('+data.items[i].parent.country+') '+data.items[i].parent.catalogNumber+'</p>'+
                                    '<p>Produced by '+data.items[i].parent.producer+'</p>'+
                                    '<p>Chart position: #'+data.items[i].parent.billboardPosition+'</p>'+
                                    // '<p>'+data.items[i].parent.notes+'</p>'+
                                  '</div>'+
                                  '<div class="parent-item__tracklist">'+
                                    '<table>'+
                                      '<tbody>'+
                                        '<tr>'+
                                          '<td>Title</td>'+
                                          '<td></td>'+
                                          '<td>Composer</td>'+
                                          '<td>Producer</td>'+
                                        '</tr>'+
                                      '</tbody>'+
                                    '</table>'+
                                  '</div>'+
                                  '<ul class="child-items"></ul>'+
                                  '<div class="item__footer">'+
                                    '<a href="#'+data.items[i].parent.uniqueId+'" class="item__close-btn scroll-to-anchor">Close "'+data.items[i].parent.name+'"</a>'+
                                  '</div>'+
                                '</div>'+
                              '</li>';
            }
            // Collaborations
            else if(data.items[i].parent.category.collaboration){
              $thisItem = '<li id="'+data.items[i].parent.uniqueId+'" data-date="'+data.items[i].parent.releaseYear+'">'+
                                '<div class="item__header" style="background-color:'+data.items[i].parent.backgroundColor+'">'+
                                  '<img class="item__cover single lazy" data-original="'+data.items[i].parent.image+'" alt="'+data.items[i].parent.name+' cover">'+
                                  '<div class="item__info">'+
                                    '<h2 class="item__title">'+data.items[i].parent.name+'</h2>'+
                                    '<h3 class="item__subtitle">'+data.items[i].parent.alternateName+'</h3>'+
                                    '<h3 class="item__year">'+data.items[i].parent.releaseYear+'</h3>'+
                                    // '<ul class="item__rating"></ul>'+
                                    '<div class="wpac-rating-ajax" data-wpac-chan="'+data.items[i].parent.uniqueId+'"></div>'+
                                    '<a href="#'+data.items[i].parent.uniqueId+'" class="item__btn scroll-to-anchor" onClick="ga(\x27send\x27, \x27event\x27, \x27Details\x27, \x27click\x27, \x27Album\x27)">See details and editions</a>'+
                                  '</div>'+
                                '</div>'+
                                '<div class="item__body">'+
                                  '<div class="parent-item__info">'+
                                    '<p>Released on '+thisReleaseMonthName+' '+thisReleaseDayNumber+', '+data.items[i].parent.releaseYear+'</p>'+
                                    '<p>'+data.items[i].parent.publisher+' ('+data.items[i].parent.country+') '+data.items[i].parent.catalogNumber+'</p>'+
                                    '<p>Produced by '+data.items[i].parent.producer+'</p>'+
                                    '<p>Chart position: #'+data.items[i].parent.billboardPosition+'</p>'+
                                    // '<p>'+data.items[i].parent.notes+'</p>'+
                                  '</div>'+
                                  '<div class="parent-item__tracklist">'+
                                    '<table>'+
                                      '<tbody>'+
                                        '<tr>'+
                                          '<td>Title</td>'+
                                          '<td></td>'+
                                          '<td>Composer</td>'+
                                        '</tr>'+
                                      '</tbody>'+
                                    '</table>'+
                                  '</div>'+
                                  '<ul class="child-items"></ul>'+
                                  '<div class="item__footer">'+
                                    '<a href="#'+data.items[i].parent.uniqueId+'" class="item__close-btn scroll-to-anchor">Close "'+data.items[i].parent.name+'"</a>'+
                                  '</div>'+
                                '</div>'+
                              '</li>';
            }
            // Concert
            else if(data.items[i].parent.category.concert){
              $thisItem = '<li id="'+data.items[i].parent.uniqueId+'" data-date="'+data.items[i].parent.releaseYear+'">'+
                                '<div class="item__header" style="background-color:'+data.items[i].parent.backgroundColor+'">'+
                                  '<img class="item__cover single lazy" data-original="'+data.items[i].parent.image+'" alt="'+data.items[i].parent.name+' cover">'+
                                  '<div class="item__info">'+
                                    '<h2 class="item__title">'+data.items[i].parent.name+'</h2>'+
                                    '<h3 class="item__subtitle">'+data.items[i].parent.alternateName+'</h3>'+
                                    '<h3 class="item__year">'+thisReleaseMonthName+' '+thisReleaseDayNumber+', '+data.items[i].parent.releaseYear+'</h3>'+
                                    // '<ul class="item__rating"></ul>'+
                                    '<div class="wpac-rating-ajax" data-wpac-chan="'+data.items[i].parent.uniqueId+'"></div>'+
                                    '<a href="#'+data.items[i].parent.uniqueId+'" class="item__btn scroll-to-anchor" onClick="ga(\x27send\x27, \x27event\x27, \x27Details\x27, \x27click\x27, \x27Album\x27)">See details and editions</a>'+
                                  '</div>'+
                                '</div>'+
                                '<div class="item__body">'+
                                  '<div class="parent-item__info">'+
                                    '<p> Venue: '+data.items[i].parent.location+'</p>'+
                                    '<p>'+data.items[i].parent.doorTime+'</p>'+
                                    '<p> Beach Boys present: '+data.items[i].parent.performers+'</p>'+
                                    // '<p>'+data.items[i].parent.notes+'</p>'+
                                  '</div>'+
                                  '<div class="parent-item__tracklist">'+
                                    '<table>'+
                                      '<tbody>'+
                                        '<tr>'+
                                          '<td>Title</td>'+
                                          '<td></td>'+
                                          '<td>Composer</td>'+
                                        '</tr>'+
                                      '</tbody>'+
                                    '</table>'+
                                  '</div>'+
                                  '<ul class="child-items"></ul>'+
                                  '<div class="item__footer">'+
                                    '<a href="#'+data.items[i].parent.uniqueId+'" class="item__close-btn scroll-to-anchor">Close "'+data.items[i].parent.name+'"</a>'+
                                  '</div>'+
                                '</div>'+
                              '</li>';
            }
            // ALBUM
            else{
              $thisItem = '<li id="'+data.items[i].parent.uniqueId+'" data-date="'+data.items[i].parent.releaseYear+'">'+
                                '<div class="item__header" style="background-color:'+data.items[i].parent.backgroundColor+'">'+
                                  '<img class="item__cover lazy" data-original="'+data.items[i].parent.image+'" alt="'+data.items[i].parent.name+' cover">'+
                                  '<div class="item__info">'+
                                    '<h2 class="item__title">'+data.items[i].parent.name+'</h2>'+
                                    '<h3 class="item__subtitle">'+data.items[i].parent.alternateName+'</h3>'+
                                    '<h3 class="item__year">'+data.items[i].parent.releaseYear+'</h3>'+
                                    // '<ul class="item__rating"></ul>'+
                                    '<div class="wpac-rating-ajax" data-wpac-chan="'+data.items[i].parent.uniqueId+'"></div>'+
                                    '<a href="#'+data.items[i].parent.uniqueId+'" class="item__btn scroll-to-anchor" onClick="ga(\x27send\x27, \x27event\x27, \x27Details\x27, \x27click\x27, \x27Album\x27)">See details and editions</a>'+
                                  '</div>'+
                                '</div>'+
                                '<div class="item__body">'+
                                  '<div class="parent-item__info">'+
                                    '<p>Released on '+thisReleaseMonthName+' '+thisReleaseDayNumber+', '+data.items[i].parent.releaseYear+'</p>'+
                                    '<p>'+data.items[i].parent.publisher+' ('+data.items[i].parent.country+') '+data.items[i].parent.catalogNumber+'</p>'+
                                    '<p>Produced by '+data.items[i].parent.producer+'</p>'+
                                    '<p>Chart position: #'+data.items[i].parent.billboardPosition+'</p>'+
                                    // '<p>'+data.items[i].parent.notes+'</p>'+
                                  '</div>'+
                                  '<div class="parent-item__tracklist">'+
                                    '<table>'+
                                      '<tbody>'+
                                        '<tr>'+
                                          '<td>Title</td>'+
                                          '<td></td>'+
                                          '<td>Composer</td>'+
                                        '</tr>'+
                                      '</tbody>'+
                                    '</table>'+
                                  '</div>'+
                                  '<ul class="child-items"></ul>'+
                                  '<div class="item__footer">'+
                                    '<a href="#'+data.items[i].parent.uniqueId+'" class="item__close-btn scroll-to-anchor">Close "'+data.items[i].parent.name+'"</a>'+
                                  '</div>'+
                                '</div>'+
                              '</li>';
            } // /else

              $thisItem = $($thisItem); //converts string to DOM element
              $('.items').append($thisItem);



              tracks = data.items[i].parent.track.itemListElement.length;

              // productions are separate because we add the producer to the tracklist
              if(data.items[i].parent.category.production){

                for (k=0; k<tracks; k++){

                  thisTrack = '<tr>'+
                                    '<td><div class="tracknumber">'+data.items[i].parent.track.itemListElement[k].item.trackNumber+'</div>'+data.items[i].parent.track.itemListElement[k].item.name+'</td>'+
                                    '<td></td>'+
                                    '<td>'+data.items[i].parent.track.itemListElement[k].item.composer+'</td>'+
                                    '<td>'+data.items[i].parent.track.itemListElement[k].item.producer+'</td>'+
                                  '</tr>'

                  $thisItem.find('.parent-item__tracklist tbody').append(thisTrack);
                }



              }
              else{

                for (k=0; k<tracks; k++){

                  if (data.items[i].parent.numberOfDiscs > 1) {
                    if( data.items[i].parent.track.itemListElement[k].item.trackNumber == 1){
                      $thisItem.find('.parent-item__tracklist tbody tr:last-child').after(
                        '<tr class="discnumber"><td colspan="3">Disc '+data.items[i].parent.track.itemListElement[k].item.disc+'</td></tr>'
                      );
                    }
                  }


                  if( data.items[i].parent.track.itemListElement[k].item.hit == true ){
                    thisTrack = '<tr>'+
                                      '<td><div class="tracknumber">'+data.items[i].parent.track.itemListElement[k].item.trackNumber+'</div>'+data.items[i].parent.track.itemListElement[k].item.name+'</td>'+
                                      '<td class="hit-or-gem"><img src="assets/star.svg" /> HIT</td>'+
                                      '<td>'+data.items[i].parent.track.itemListElement[k].item.composer+'</td>'+
                                    '</tr>'
                  }else if( data.items[i].parent.track.itemListElement[k].item.inthit == true ){
                    thisTrack = '<tr>'+
                                      '<td><div class="tracknumber">'+data.items[i].parent.track.itemListElement[k].item.trackNumber+'</div>'+data.items[i].parent.track.itemListElement[k].item.name+'</td>'+
                                      '<td class="hit-or-gem"><img src="assets/inthit.svg" /> HIT</td>'+
                                      '<td>'+data.items[i].parent.track.itemListElement[k].item.composer+'</td>'+
                                    '</tr>'
                  }else if( data.items[i].parent.track.itemListElement[k].item.gem == true ){
                    thisTrack = '<tr>'+
                                      '<td><div class="tracknumber">'+data.items[i].parent.track.itemListElement[k].item.trackNumber+'</div>'+data.items[i].parent.track.itemListElement[k].item.name+'</td>'+
                                      '<td class="hit-or-gem"><img src="assets/gem.svg" /> GEM</td>'+
                                      '<td>'+data.items[i].parent.track.itemListElement[k].item.composer+'</td>'+
                                    '</tr>'
                  }else{
                    thisTrack = '<tr>'+
                                      '<td><div class="tracknumber">'+data.items[i].parent.track.itemListElement[k].item.trackNumber+'</div>'+data.items[i].parent.track.itemListElement[k].item.name+'</td>'+
                                      '<td></td>'+
                                      '<td>'+data.items[i].parent.track.itemListElement[k].item.composer+'</td>'+
                                    '</tr>'
                  }

                  $thisItem.find('.parent-item__tracklist tbody').append(thisTrack);

                } //for


              } // else

              $('.scroll-to-anchor').smoothScroll({
                 offset: -44
              });


          } // /if

        } //end of main for loop

      } // /else

      //adds back to top button at the end of the items when there are more than 5 items
      if(loadedItems>5){
        var backToTop = '<div class="backtotop-btn" id="backToTop"><a href="#sorting" class="scroll-to-anchor">Back to top</a></div>'
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

    // Toggles item body and item button text for open/closed states
    function toggleChildren(){

      $('.item__btn, .item__title, .item__year').on( 'click', function() {
        $(this).parent('.item__info').parent('.item__header').next('.item__body').slideToggle(200);

        var thisBtn = $(this).parent('.item__info').find('.item__btn');

        thisBtn.toggleClass('itemOpened');
        if( thisBtn.hasClass('itemOpened') ){
          thisBtn.html('Hide details and editions');
        }
        else{
          thisBtn.html('See details and editions');
        }
      });


      $('.item__cover').on( 'click', function() {
        $(this).next('.item__info').parent('.item__header').next('.item__body').slideToggle(200);

        var thisBtn = $(this).next('.item__info').find('.item__btn');

        thisBtn.toggleClass('itemOpened');
        if( thisBtn.hasClass('itemOpened') ){
          thisBtn.html('Hide details and editions');
        }
        else{
          thisBtn.html('See details and editions');
        }
      });


    } // /toggleChildren function


    //Closes item from the bottom
    function closeChildren(){

      $('.item__close-btn').on( 'click', function() {
        $(this).parent('.item__footer').parent('.item__body').slideToggle(50);
        var thisBtn = $(this).parent('.item__footer').parent('.item__body').prev('.item__header').find('.item__info').find('.item__btn');
        thisBtn.html('See details and editions').toggleClass('itemOpened');

      });
    } // /closeChildren function


    //Loads child items for a given parent
    function loadChildren(){



      var i,j=0;

      $('.item__btn').on( 'click', function() {

        var thisButton = $(this);

        if ( thisButton.hasClass('visited') ){
          return 0;
        }else {
          thisButton.addClass('visited');

          var itemId = thisButton.parent('.item__info').parent('.item__header').parent('li').attr('id');



          for (i=0; i<totalItems; i++){
            if (itemId === data.items[i].parent.uniqueId){
             var requestedItemNumber = i;
            }
          }

          var childrenNumber = data.items[requestedItemNumber].editions.length;



          for (j=childrenNumber-1; j>=0; j--){

            // BOOKS
            if(data.items[requestedItemNumber].parent.category.book){

              var thisChildReleaseMonthNumber = data.items[requestedItemNumber].editions[j].releaseMonth;
              var thisChildReleaseMonthName = 0;
              if ( thisChildReleaseMonthNumber == 0 ){
                thisChildReleaseMonthName = "";
              }else{
                var thisChildReleaseMonthName = months[thisChildReleaseMonthNumber - 1];
              }

              var thisChildReleaseDayNumber = data.items[requestedItemNumber].editions[j].releaseDay;
              if ( thisChildReleaseDayNumber == 0 ){
                thisChildReleaseDayNumber = "";
              }else{
                thisChildReleaseDayNumber = thisChildReleaseDayNumber;
              }



              var $thisChild = '<li>'+
                                '<div class="child-item__header">'+
                                  '<h3 class="child-item__title">'+data.items[requestedItemNumber].editions[j].name+'</h3>'+
                                  '<h4 class="child-item__subtitle">'+data.items[requestedItemNumber].editions[j].alternateName+'</h4>'+
                                  '<ul class="child-item__info">'+
                                    '<li>'+thisChildReleaseMonthName+' '+thisChildReleaseDayNumber+' '+data.items[requestedItemNumber].editions[j].releaseYear+'</li>'+
                                    '<li>'+data.items[requestedItemNumber].editions[j].publisher+'</li>'+
									'<li>'+data.items[requestedItemNumber].editions[j].country+'</li>'+
                                    '<li>'+data.items[requestedItemNumber].editions[j].bookFormat+'</li>'+
                                    '<li>'+data.items[requestedItemNumber].editions[j].numberOfPages+' pages</li>'+
                                    '<li>ISBN: '+data.items[requestedItemNumber].editions[j].isbn+'</li>'+
                                  '</ul>'+
                                '</div>'+
                                '<div class="child-item__body">'+
                                  '<div class="child-item__sidebar">'+
                                    '<div class="sticky-content">'+
                                      '<a href="'+data.items[requestedItemNumber].editions[j][amazonLink]+'" target="_blank"><img class="child-item__cover" src="'+data.items[requestedItemNumber].editions[j].image+'" alt="'+data.items[requestedItemNumber].editions[j].name+' cover"></a>'+
                                      '<a class="child-item__buy" href="'+data.items[requestedItemNumber].editions[j][amazonLink]+'" target="_blank" onClick="ga(\x27send\x27, \x27event\x27, \x27Amazon\x27, \x27click\x27, \x27Item\x27)">'+amazonBtnTxt+'</a>'+  // \x27 is a scaped quote '
                                    '</div>'+
                                  '</div>'+
                                  '<div class="child-item__book-review">'+
                                    '<pre>'+data.items[requestedItemNumber].editions[j].review+'</pre>'+
                                  '</div>'+
                                '</div>'+
                              '</li>';
            }
            // VIDEO (Excluding Live & Video, e.g. Brian Wilson and Friends)
            else if( (data.items[requestedItemNumber].parent.category.video) && !(data.items[requestedItemNumber].parent.category.live) ){

              var thisChildReleaseMonthNumber = data.items[requestedItemNumber].editions[j].albumRelease.releaseMonth;
              var thisChildReleaseMonthName = 0;
              if ( thisChildReleaseMonthNumber == 0 ){
                thisChildReleaseMonthName = "";
              }else{
                var thisChildReleaseMonthName = months[thisChildReleaseMonthNumber - 1];
              }

              var thisChildReleaseDayNumber = data.items[requestedItemNumber].editions[j].albumRelease.releaseDay;
              if ( thisChildReleaseDayNumber == 0 ){
                thisChildReleaseDayNumber = "";
              }else{
                thisChildReleaseDayNumber = thisChildReleaseDayNumber;
              }

              var $thisChild = '<li>'+
                                '<div class="child-item__header">'+
                                  '<h3 class="child-item__title">'+data.items[requestedItemNumber].editions[j].albumRelease.name+'</h3>'+
                                  '<ul class="child-item__info">'+
                                    '<li>'+thisChildReleaseMonthName+' '+thisChildReleaseDayNumber+' '+data.items[requestedItemNumber].editions[j].albumRelease.releaseYear+'</li>'+
                                    '<li>'+data.items[requestedItemNumber].editions[j].albumRelease.publisher+' ('+data.items[requestedItemNumber].editions[j].albumRelease.country+')</li>'+
                                    '<li>'+data.items[requestedItemNumber].editions[j].albumRelease.videoReleaseFormat+'</li>'+
                                  '</ul>'+
                                '</div>'+
                                '<div class="child-item__body">'+
                                  '<div class="child-item__sidebar">'+
                                    '<div class="sticky-content">'+
                                      '<a href="'+data.items[requestedItemNumber].editions[j].albumRelease[amazonLink]+'" target="_blank"><img class="child-item__cover" src="'+data.items[requestedItemNumber].editions[j].albumRelease.image+'" alt="'+data.items[requestedItemNumber].editions[j].albumRelease.name+' cover"></a>'+
                                      '<a class="child-item__buy" href="'+data.items[requestedItemNumber].editions[j].albumRelease[amazonLink]+'" target="_blank" onClick="ga(\x27send\x27, \x27event\x27, \x27Amazon\x27, \x27click\x27, \x27Item\x27)">'+amazonBtnTxt+'</a>'+  // \x27 is a scaped quote '
                                    '</div>'+
                                  '</div>'+
                                  '<div class="child-item__tracklist">'+
                                    '<pre>'+data.items[requestedItemNumber].editions[j].albumRelease.tracklist+'</pre>'+
                                  '</div>'+
                                '</div>'+
                              '</li>';
            }
            // ALL ITEMS BUT BOOKS AND VIDEOS
            else{
              // var thisChildReleaseMonthNumber = data.items[requestedItemNumber].editions[j].albumRelease.releaseMonth;
              // var thisChildReleaseMonthName = months[thisChildReleaseMonthNumber - 1];


              var thisChildReleaseMonthNumber = data.items[requestedItemNumber].editions[j].albumRelease.releaseMonth;
              var thisChildReleaseMonthName = 0;
              if ( thisChildReleaseMonthNumber == 0 ){
                thisChildReleaseMonthName = "";
              }else{
                var thisChildReleaseMonthName = months[thisChildReleaseMonthNumber - 1];
              }

              var thisChildReleaseDayNumber = data.items[requestedItemNumber].editions[j].albumRelease.releaseDay;
              if ( thisChildReleaseDayNumber == 0 ){
                thisChildReleaseDayNumber = "";
              }else{
                thisChildReleaseDayNumber = thisChildReleaseDayNumber;
              }


              var $thisChild = '<li>'+
                                '<div class="child-item__header">'+
                                  '<h3 class="child-item__title">'+data.items[requestedItemNumber].editions[j].albumRelease.name+'</h3>'+
                                  '<ul class="child-item__info">'+
                                    '<li>'+thisChildReleaseMonthName+' '+thisChildReleaseDayNumber+' '+data.items[requestedItemNumber].editions[j].albumRelease.releaseYear+'</li>'+
                                    '<li>'+data.items[requestedItemNumber].editions[j].albumRelease.recordLabel+' ('+data.items[requestedItemNumber].editions[j].albumRelease.country+') '+data.items[requestedItemNumber].editions[j].albumRelease.catalogNumber+'</li>'+
                                    '<li>'+data.items[requestedItemNumber].editions[j].albumRelease.musicReleaseFormat+'</li>'+
                                  '</ul>'+
                                '</div>'+
                                '<div class="child-item__body">'+
                                  '<div class="child-item__sidebar">'+
                                    '<div class="sticky-content">'+
                                      '<a href="'+data.items[requestedItemNumber].editions[j].albumRelease[amazonLink]+'" target="_blank"><img class="child-item__cover" src="'+data.items[requestedItemNumber].editions[j].albumRelease.image+'" alt="'+data.items[requestedItemNumber].editions[j].albumRelease.name+' cover"></a>'+
                                      '<a class="child-item__buy" href="'+data.items[requestedItemNumber].editions[j].albumRelease[amazonLink]+'" target="_blank" onClick="ga(\x27send\x27, \x27event\x27, \x27Amazon\x27, \x27click\x27, \x27Item\x27)">'+amazonBtnTxt+'</a>'+  // \x27 is a scaped quote '
                                    '</div>'+
                                  '</div>'+
                                  '<div class="child-item__tracklist">'+
                                    '<pre>'+data.items[requestedItemNumber].editions[j].albumRelease.tracklist+'</pre>'+
                                  '</div>'+
                                '</div>'+
                              '</li>';
            }

            $thisChild = $($thisChild); //convers string to DOM element
            $('#'+itemId).find('.item__body').find('.child-items').append($thisChild);

            // Removes amazon button for items with no amazon link
            if( $thisChild.find('.child-item__buy').attr('href') == "" ){
              $thisChild.find('.child-item__buy').remove();
            }

            $('.child-item__tracklist').each(function(){
              $(this).shorten({
                moreText: 'Show full tracklist',
                lessText: 'Show less',
                showChars: 300
              });
            });

          }  // /for
        }
      });


      toggleChildren();
      closeChildren();  // Is this the best way to do it?



    } // /loadChildren





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
    loadChildren();
    lazyLoad();






    // Reverse order of items
    function reverseOrder(){
      var list = $('.items');
      var listItems = list.children('li');
      list.append(listItems.get().reverse());
    }



    function sortByRating(){

      var list = $('.items');
      var listItems = list.children('li');

      listItems.sort(sortList).appendTo(list);
      function sortList(a, b){
          return ($(b).data('rating')) > ($(a).data('rating')) ? 1 : -1;
      }

    }


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
        loadChildren();
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
        loadChildren();
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
