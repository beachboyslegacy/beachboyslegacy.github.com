$(function(){

  $.getJSON('js/data.json', function(data) {


    var totalItems = data.items.length;

    var months = [ 'January' , 'February' , 'March' , 'April' , 'May' , 'June' , 'July' , 'August' , 'September' , 'October' , 'November' , 'December' ]
    var initialArtist = 'The Beach Boys';
    var initialCategory = 'album'
    var currentArtist = initialArtist;
    var currentCategory = initialCategory;


    function loadItems(artist, category){


      var loadedItems = 0;
      var i,j,k = 0;
      var selectedArtist = artist;
      var selectedCategory = category;
      var thisReleaseMonthNumber = 0;
      var thisReleaseMonthName = 0;
      var $thisItem = '<li></li>';
      var rating = 0;
      var tracks = 0;
      var thisTrack = '<tr></tr>'

      $('.items').empty();
      $('#backToTop').remove();

      if( selectedCategory == 'solo' ){

        for(i=0; i<totalItems; i++){


          if( data.items[i].parent.category.solo == true ){

            loadedItems++;

            thisReleaseMonthNumber = data.items[i].parent.releaseMonth;
            thisReleaseMonthName = months[thisReleaseMonthNumber - 1];


            $thisItem = '<li id="'+data.items[i].parent.uniqueId+'" data-rating="'+data.items[i].parent.rating+'">'+
                              '<div class="item__header" style="background-color:'+data.items[i].parent.backgroundColor+'">'+
                                '<img class="item__cover" src="'+data.items[i].parent.cover+'" alt="">'+
                                '<div class="item__info">'+
                                  '<h2 class="item__title">'+data.items[i].parent.title+'</h2>'+
                                  '<h3 class="item__year">'+data.items[i].parent.releaseYear+'</h3>'+
                                  '<ul class="item__rating"></ul>'+
                                  '<a href="#'+data.items[i].parent.uniqueId+'" class="item__btn scroll-to-anchor">See details and editions</a>'+
                                '</div>'+
                              '</div>'+
                              '<div class="item__body">'+
                                '<div class="parent-item__info">'+
                                  '<p>Released on '+thisReleaseMonthName+' '+data.items[i].parent.releaseDay+', '+data.items[i].parent.releaseYear+'</p>'+
                                  '<p>'+data.items[i].parent.label+' ('+data.items[i].parent.country+') '+data.items[i].parent.code+'</p>'+
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
                                  '<a href="#'+data.items[i].parent.uniqueId+'" class="item__close-btn scroll-to-anchor">Close "'+data.items[i].parent.title+'"</a>'+
                                '</div>'+
                              '</div>'+
                            '</li>';


              $thisItem = $($thisItem); //convers string to DOM element
              $('.items').append($thisItem);

              rating = data.items[i].parent.rating;

              for (j=0; j<rating; j++){
                $thisItem.find('.item__rating').append(
                  '<li><img alt="star" src="data:image/svg+xml;charset=US-ASCII,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgNDc1LjA3NSA0NzUuMDc1IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NzUuMDc1IDQ3NS4wNzU7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNNDc1LjA3NSwxODYuNTczYzAtNy4wNDMtNS4zMjgtMTEuNDItMTUuOTkyLTEzLjEzNUwzMTUuNzY2LDE1Mi42TDI1MS41MjksMjIuNjk0Yy0zLjYxNC03LjgwNC04LjI4MS0xMS43MDQtMTMuOTktMTEuNzA0ICAgYy01LjcwOCwwLTEwLjM3MiwzLjktMTMuOTg5LDExLjcwNEwxNTkuMzEsMTUyLjZMMTUuOTg2LDE3My40MzhDNS4zMywxNzUuMTUzLDAsMTc5LjUzLDAsMTg2LjU3M2MwLDMuOTk5LDIuMzgsOC41NjcsNy4xMzksMTMuNzA2ICAgbDEwMy45MjQsMTAxLjA2OEw4Ni41MSw0NDQuMDk2Yy0wLjM4MSwyLjY2Ni0wLjU3LDQuNTc1LTAuNTcsNS43MTJjMCwzLjk5NywwLjk5OCw3LjM3NCwyLjk5NiwxMC4xMzYgICBjMS45OTcsMi43NjYsNC45OTMsNC4xNDIsOC45OTIsNC4xNDJjMy40MjgsMCw3LjIzMy0xLjEzNywxMS40Mi0zLjQyM2wxMjguMTg4LTY3LjM4NmwxMjguMTk3LDY3LjM4NiAgIGM0LjAwNCwyLjI4Niw3LjgxLDMuNDIzLDExLjQxNiwzLjQyM2MzLjgxOSwwLDYuNzE1LTEuMzc2LDguNzEzLTQuMTQyYzEuOTkyLTIuNzU4LDIuOTkxLTYuMTM5LDIuOTkxLTEwLjEzNiAgIGMwLTIuNDcxLTAuMDk2LTQuMzc0LTAuMjg3LTUuNzEybC0yNC41NTUtMTQyLjc0OWwxMDMuNjM3LTEwMS4wNjhDNDcyLjYwNCwxOTUuMzMsNDc1LjA3NSwxOTAuNzYsNDc1LjA3NSwxODYuNTczeiIgZmlsbD0iIzAwMDAwMCIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" /></li>'
                );
              }
              if (rating === 0.5 || rating === 1.5 || rating === 2.5 || rating === 3.5 || rating === 4.5){

                $thisItem.find('.item__rating').children('li:last-child').remove();
                $thisItem.find('.item__rating').append(
                  '<li alt="half star" class="item-rating__half-star"><img src="data:image/svg+xml;charset=US-ASCII,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgNDUzLjA5OCA0NTMuMDk4IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NTMuMDk4IDQ1My4wOTg7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNMzMxLjMyMywxMS43MDhMMjY3LjA5LDE0MS42MTNsLTE0My4zMjIsMjAuODM5Yy0xMC42NTYsMS43MTQtMTUuOTg2LDYuMDkxLTE1Ljk4NiwxMy4xMzQgICBjMCwzLjk5OSwyLjM4LDguNTY3LDcuMTM1LDEzLjcwNmwxMDMuOTIzLDEwMS4wNjRsLTI0LjU1MSwxNDIuNzUyYy0wLjM4MSwyLjY3LTAuNTcxLDQuNTcyLTAuNTcxLDUuNzE2ICAgYzAsMy45OTcsMC45OTksNy4zNzEsMi45OTYsMTAuMTM2YzEuOTk5LDIuNzU5LDQuOTk1LDQuMTM4LDguOTkzLDQuMTM4YzMuNDI2LDAsNy4yMzMtMS4xMzMsMTEuNDItMy40MjZsMTI4LjE5LTY3LjM4MlYwICAgQzMzOS42MDgsMCwzMzQuOTQ3LDMuOSwzMzEuMzIzLDExLjcwOHoiIGZpbGw9IiMwMDAwMDAiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" /></li>'
                );
              }

              tracks = data.items[i].parent.tracklist.length;

              for (k=0; k<tracks; k++){

                if (data.items[i].parent.numberOfDiscs > 1) {
                  if( data.items[i].parent.tracklist[k].track == 1){
                    $thisItem.find('.parent-item__tracklist tbody tr:last-child').after(
                      '<tr class="discnumber"><td colspan="3">Disc '+data.items[i].parent.tracklist[k].disc+'</td></tr>'
                    );
                  }
                }


                if( data.items[i].parent.tracklist[k].hit == true ){
                  thisTrack = '<tr>'+
                                    '<td><div class="tracknumber">'+data.items[i].parent.tracklist[k].track+'</div>'+data.items[i].parent.tracklist[k].title+'</td>'+
                                    '<td class="hit-or-gem"><img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgNDc1LjA3NSA0NzUuMDc1IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NzUuMDc1IDQ3NS4wNzU7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNNDc1LjA3NSwxODYuNTczYzAtNy4wNDMtNS4zMjgtMTEuNDItMTUuOTkyLTEzLjEzNUwzMTUuNzY2LDE1Mi42TDI1MS41MjksMjIuNjk0Yy0zLjYxNC03LjgwNC04LjI4MS0xMS43MDQtMTMuOTktMTEuNzA0ICAgYy01LjcwOCwwLTEwLjM3MiwzLjktMTMuOTg5LDExLjcwNEwxNTkuMzEsMTUyLjZMMTUuOTg2LDE3My40MzhDNS4zMywxNzUuMTUzLDAsMTc5LjUzLDAsMTg2LjU3M2MwLDMuOTk5LDIuMzgsOC41NjcsNy4xMzksMTMuNzA2ICAgbDEwMy45MjQsMTAxLjA2OEw4Ni41MSw0NDQuMDk2Yy0wLjM4MSwyLjY2Ni0wLjU3LDQuNTc1LTAuNTcsNS43MTJjMCwzLjk5NywwLjk5OCw3LjM3NCwyLjk5NiwxMC4xMzYgICBjMS45OTcsMi43NjYsNC45OTMsNC4xNDIsOC45OTIsNC4xNDJjMy40MjgsMCw3LjIzMy0xLjEzNywxMS40Mi0zLjQyM2wxMjguMTg4LTY3LjM4NmwxMjguMTk3LDY3LjM4NiAgIGM0LjAwNCwyLjI4Niw3LjgxLDMuNDIzLDExLjQxNiwzLjQyM2MzLjgxOSwwLDYuNzE1LTEuMzc2LDguNzEzLTQuMTQyYzEuOTkyLTIuNzU4LDIuOTkxLTYuMTM5LDIuOTkxLTEwLjEzNiAgIGMwLTIuNDcxLTAuMDk2LTQuMzc0LTAuMjg3LTUuNzEybC0yNC41NTUtMTQyLjc0OWwxMDMuNjM3LTEwMS4wNjhDNDcyLjYwNCwxOTUuMzMsNDc1LjA3NSwxOTAuNzYsNDc1LjA3NSwxODYuNTczeiIgZmlsbD0iIzAwMDAwMCIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" /> HIT</td>'+
                                    '<td>'+data.items[i].parent.tracklist[k].composer+'</td>'+
                                  '</tr>'
                }else if( data.items[i].parent.tracklist[k].gem == true ){
                  thisTrack = '<tr>'+
                                    '<td><div class="tracknumber">'+data.items[i].parent.tracklist[k].track+'</div>'+data.items[i].parent.tracklist[k].title+'</td>'+
                                    '<td class="hit-or-gem"><img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgMzI3LjUyMyAzMjcuNTI0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzMjcuNTIzIDMyNy41MjQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNMzI3LjM4MSwxMTIuMDU4Yy0wLjE2Mi0xLjA0NC0wLjQ5My0yLjA2Ni0wLjg5Ni0zLjA1Yy0wLjA5LTAuMjEzLTAuMDktMC40My0wLjE4Ni0wLjY0NiAgIGMtMC4wMTItMC4wMTItMC4wMy0wLjAzNi0wLjAzNi0wLjA0OGMwLTAuMDI0LTAuMDEyLTAuMDM2LTAuMDI0LTAuMDUxbC0zNi4yMjEtNzYuOTFjLTAuMDg0LTAuMTc3LTAuMjQtMC4zMzYtMC4zMzYtMC41MTYgICBjLTAuMTI2LTAuMjE2LTAuMTY4LTAuNDgtMC4zMDctMC42OTRjLTAuMjc2LTAuNDY4LTAuNjU0LTAuODMyLTAuOTc5LTEuMjQ5Yy0wLjMzLTAuNDI5LTAuNjMxLTAuODkyLTAuOTk3LTEuMjcyICAgYy0wLjU0LTAuNTY0LTEuMTU5LTEuMDQ1LTEuNzg5LTEuNTE0Yy0wLjM5Ni0wLjMxMi0wLjc2OS0wLjY1Ny0xLjIwMS0wLjkxYy0wLjczMi0wLjQ0MS0xLjUyNS0wLjc1Ni0yLjMzLTEuMDU3ICAgYy0wLjQwMi0wLjE1My0wLjc5Mi0wLjM4Ny0xLjIxMy0wLjUwNGMtMS4yNDktMC4zNTItMi41NDYtMC41NTMtMy44OTEtMC41NTNIMTYyLjk5OWgtOTkuNDljLTEuMjY3LDAtMi40OTUsMC4xNzctMy42OSwwLjQ4OSAgIGMtMC40MTcsMC4xMTEtMC43OTgsMC4zMjgtMS4yMSwwLjQ2OWMtMC43MzIsMC4yNzYtMS40ODMsMC41MTctMi4xNywwLjkxQzU2LDI1LjIwNSw1NS42NCwyNS41NDMsNTUuMjMxLDI1LjgyICAgYy0wLjU4OSwwLjQxNy0xLjE5OCwwLjgxNi0xLjcyMSwxLjMyMWMtMC4zNjksMC4zNjMtMC42NjMsMC43OTItMC45OTEsMS4yMDFjLTAuMzg3LDAuNDU0LTAuODQsMC44NjUtMS4xNTYsMS4zODFMMi4xNzMsMTA2LjYzNSAgIGMtMC4xODMsMC4zLTAuMjcsMC42NC0wLjQzNiwwLjk1OGMtMC4xNDEsMC4yNTItMC4zNzUsMC40NjgtMC40OTgsMC43NDRjLTAuMTI5LDAuMjg5LTAuMTM1LDAuNTkyLTAuMjU4LDAuODY4ICAgYy0wLjI2NCwwLjcwNS0wLjQ3NCwxLjQwOC0wLjY0LDIuMTM4Yy0wLjEyMywwLjU3OS0wLjIyOCwxLjE0Ni0wLjI4OCwxLjcxN2MtMC4wNjksMC43Mi0wLjA2MywxLjQzOC0wLjAyNywyLjE2NSAgIGMwLjA0NSwwLjU5MiwwLjA4NywxLjE3NCwwLjE4LDEuNzVjMC4xMjksMC43MDgsMC4zNTIsMS4zNzIsMC41NzcsMi4wNTRjMC4yMDQsMC41OCwwLjM4NywxLjE1OSwwLjY2MSwxLjcwNiAgIGMwLjA5LDAuMTg5LDAuMTI5LDAuNDA1LDAuMjE5LDAuNmMwLjI1OCwwLjQ4LDAuNjM5LDAuODU2LDAuOTU1LDEuMjg4YzAuMjUyLDAuMzc1LDAuNDA1LDAuNzY5LDAuNjkzLDEuMTA1bDE0OC42NzYsMTc1LjYwNyAgIGMyLjU2NCwzLjAyNiw2LjQwNyw1LjE3NiwxMC4yMzgsNS4wNjdjMC4wNDgsMCwwLjA5NywwLjAyNCwwLjEyOSwwLjAyNGMwLjIxNCwwLjAxMiwwLjQxOCwwLjAxMiwwLjYzNCwwLjAxMiAgIGMwLjAwNiwwLDAuMDA2LDAsMC4wMDYsMHMwLjAxMiwwLDAuMDI0LDBjMS4yODUsMCwyLjU0Ni0wLjI0LDMuNzU5LTAuNTY0YzAuMzYtMC4xMTQsMC42ODUtMC4yMjgsMS4wNDUtMC4zNjYgICBjMC44OTUtMC4zMTIsMS43NjYtMC43MzIsMi41OTQtMS4yMjVjMC4yNzYtMC4xNjIsMC41Ny0wLjMyNCwwLjg0MS0wLjUwNWMwLjk3OS0wLjY3OSwxLjg5Ny0xLjQ1OSwyLjY5LTIuNDAxTDMyNC4xNSwxMjMuNzczICAgYzAuMTkxLTAuMjI4LDAuMy0wLjUwNCwwLjQ2OC0wLjc0NWMwLjI0LTAuMzAzLDAuNTQxLTAuNTU1LDAuNzQ1LTAuODk4YzAuMjE2LTAuMzM5LDAuMzI0LTAuNzIsMC41MDQtMS4wODMgICBjMC4yNTMtMC40NjUsMC40OTItMC45MzQsMC42NzktMS40MzhjMC4yODItMC43MzIsMC40NzUtMS40NzUsMC42NDMtMi4yMTljMC4xMDgtMC41MDUsMC4yMjktMC45ODUsMC4yNzYtMS40ODkgICBjMC4wOTYtMC44MjksMC4wNi0xLjYzNywwLTIuNDU5QzMyNy40MjksMTEyLjk1NiwzMjcuNDUyLDExMi41MDIsMzI3LjM4MSwxMTIuMDU4eiIgZmlsbD0iIzAwMDAwMCIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" /> GEM</td>'+
                                    '<td>'+data.items[i].parent.tracklist[k].composer+'</td>'+
                                  '</tr>'
                }else{
                  thisTrack = '<tr>'+
                                    '<td><div class="tracknumber">'+data.items[i].parent.tracklist[k].track+'</div>'+data.items[i].parent.tracklist[k].title+'</td>'+
                                    '<td></td>'+
                                    '<td>'+data.items[i].parent.tracklist[k].composer+'</td>'+
                                  '</tr>'
                }

                $thisItem.find('.parent-item__tracklist tbody').append(thisTrack);

              }

              $('.scroll-to-anchor').smoothScroll({
                 offset: -44
              });

          } // /if selectedCategory = 'solo'

        } //end of main for loop

      }else{

        for(i=0; i<totalItems; i++){


          if( (data.items[i].parent.artist === selectedArtist) && (data.items[i].parent.category[selectedCategory] == true) ){

            loadedItems++;

            thisReleaseMonthNumber = data.items[i].parent.releaseMonth;
            thisReleaseMonthName = months[thisReleaseMonthNumber - 1];

            if( (data.items[i].parent.category.video) && !(data.items[i].parent.category.live) ){
              $thisItem = '<li id="'+data.items[i].parent.uniqueId+'" data-rating="'+data.items[i].parent.rating+'">'+
                                '<div class="item__header" style="background-color:'+data.items[i].parent.backgroundColor+'">'+
                                  '<img class="item__cover" src="'+data.items[i].parent.cover+'" alt="">'+
                                  '<div class="item__info">'+
                                    '<h2 class="item__title">'+data.items[i].parent.title+'</h2>'+
                                    '<h3 class="item__year">'+data.items[i].parent.releaseYear+'</h3>'+
                                    '<ul class="item__rating"></ul>'+
                                    '<a href="#'+data.items[i].parent.uniqueId+'" class="item__btn scroll-to-anchor">See details and editions</a>'+
                                  '</div>'+
                                '</div>'+
                                '<div class="item__body">'+
                                  '<div class="parent-item__info">'+
                                    '<p>Released on '+thisReleaseMonthName+' '+data.items[i].parent.releaseDay+', '+data.items[i].parent.releaseYear+'</p>'+
                                    '<p>'+data.items[i].parent.label+' ('+data.items[i].parent.country+')</p>'+
                                    // '<p>'+data.items[i].parent.notes+'</p>'+
                                  '</div>'+
                                  '<ul class="child-items"></ul>'+
                                  '<div class="item__footer">'+
                                    '<a href="#'+data.items[i].parent.uniqueId+'" class="item__close-btn scroll-to-anchor">Close "'+data.items[i].parent.title+'"</a>'+
                                  '</div>'+
                                '</div>'+
                              '</li>';
            }
            else if(data.items[i].parent.category.book){
              $thisItem = '<li id="'+data.items[i].parent.uniqueId+'" data-rating="'+data.items[i].parent.rating+'">'+
                                '<div class="item__header" style="background-color:'+data.items[i].parent.backgroundColor+'">'+
                                  '<img class="item__cover" src="'+data.items[i].parent.cover+'" alt="">'+
                                  '<div class="item__info">'+
                                    '<h2 class="item__title">'+data.items[i].parent.title+'</h2>'+
                                    '<h3 class="item__year">'+data.items[i].parent.releaseYear+'</h3>'+
                                    '<ul class="item__rating"></ul>'+
                                    '<a href="#'+data.items[i].parent.uniqueId+'" class="item__btn scroll-to-anchor">See details and editions</a>'+
                                  '</div>'+
                                '</div>'+
                                '<div class="item__body">'+
                                  '<div class="parent-item__info">'+
                                    '<p>Released on '+thisReleaseMonthName+' '+data.items[i].parent.releaseDay+', '+data.items[i].parent.releaseYear+'</p>'+
                                    '<p>'+data.items[i].parent.label+' ('+data.items[i].parent.country+')</p>'+
                                    '<p> ASIN: '+data.items[i].parent.asin+'</p>'+
                                    // '<p>'+data.items[i].parent.notes+'</p>'+
                                  '</div>'+
                                  '<ul class="child-items"></ul>'+
                                  '<div class="item__footer">'+
                                    '<a href="#'+data.items[i].parent.uniqueId+'" class="item__close-btn scroll-to-anchor">Close "'+data.items[i].parent.title+'"</a>'+
                                  '</div>'+
                                '</div>'+
                              '</li>';
            }
            else if(data.items[i].parent.category.compilation){
              $thisItem = '<li id="'+data.items[i].parent.uniqueId+'" data-rating="'+data.items[i].parent.rating+'">'+
                                '<div class="item__header" style="background-color:'+data.items[i].parent.backgroundColor+'">'+
                                  '<img class="item__cover" src="'+data.items[i].parent.cover+'" alt="">'+
                                  '<div class="item__info">'+
                                    '<h2 class="item__title">'+data.items[i].parent.title+'</h2>'+
                                    '<h3 class="item__year">'+data.items[i].parent.releaseYear+'</h3>'+
                                    '<ul class="item__rating"></ul>'+
                                    '<a href="#'+data.items[i].parent.uniqueId+'" class="item__btn scroll-to-anchor">See details and editions</a>'+
                                  '</div>'+
                                '</div>'+
                                '<div class="item__body">'+
                                  '<div class="parent-item__info">'+
                                    '<p>Released on '+thisReleaseMonthName+' '+data.items[i].parent.releaseDay+', '+data.items[i].parent.releaseYear+'</p>'+
                                    '<p>'+data.items[i].parent.label+' ('+data.items[i].parent.country+') '+data.items[i].parent.code+'</p>'+
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
                                    '<a href="#'+data.items[i].parent.uniqueId+'" class="item__close-btn scroll-to-anchor">Close "'+data.items[i].parent.title+'"</a>'+
                                  '</div>'+
                                '</div>'+
                              '</li>';
            }
            else{ //albums
              $thisItem = '<li id="'+data.items[i].parent.uniqueId+'" data-rating="'+data.items[i].parent.rating+'">'+
                                '<div class="item__header" style="background-color:'+data.items[i].parent.backgroundColor+'">'+
                                  '<img class="item__cover" src="'+data.items[i].parent.cover+'" alt="">'+
                                  '<div class="item__info">'+
                                    '<h2 class="item__title">'+data.items[i].parent.title+'</h2>'+
                                    '<h3 class="item__year">'+data.items[i].parent.releaseYear+'</h3>'+
                                    '<ul class="item__rating"></ul>'+
                                    '<a href="#'+data.items[i].parent.uniqueId+'" class="item__btn scroll-to-anchor">See details and editions</a>'+
                                  '</div>'+
                                '</div>'+
                                '<div class="item__body">'+
                                  '<div class="parent-item__info">'+
                                    '<p>Released on '+thisReleaseMonthName+' '+data.items[i].parent.releaseDay+', '+data.items[i].parent.releaseYear+'</p>'+
                                    '<p>'+data.items[i].parent.label+' ('+data.items[i].parent.country+') '+data.items[i].parent.code+'</p>'+
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
                                    '<a href="#'+data.items[i].parent.uniqueId+'" class="item__close-btn scroll-to-anchor">Close "'+data.items[i].parent.title+'"</a>'+
                                  '</div>'+
                                '</div>'+
                              '</li>';
            } // /else

              $thisItem = $($thisItem); //convers string to DOM element
              $('.items').append($thisItem);

              rating = data.items[i].parent.rating;

              for (j=0; j<rating; j++){
                $thisItem.find('.item__rating').append(
                  '<li><img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgNDc1LjA3NSA0NzUuMDc1IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NzUuMDc1IDQ3NS4wNzU7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNNDc1LjA3NSwxODYuNTczYzAtNy4wNDMtNS4zMjgtMTEuNDItMTUuOTkyLTEzLjEzNUwzMTUuNzY2LDE1Mi42TDI1MS41MjksMjIuNjk0Yy0zLjYxNC03LjgwNC04LjI4MS0xMS43MDQtMTMuOTktMTEuNzA0ICAgYy01LjcwOCwwLTEwLjM3MiwzLjktMTMuOTg5LDExLjcwNEwxNTkuMzEsMTUyLjZMMTUuOTg2LDE3My40MzhDNS4zMywxNzUuMTUzLDAsMTc5LjUzLDAsMTg2LjU3M2MwLDMuOTk5LDIuMzgsOC41NjcsNy4xMzksMTMuNzA2ICAgbDEwMy45MjQsMTAxLjA2OEw4Ni41MSw0NDQuMDk2Yy0wLjM4MSwyLjY2Ni0wLjU3LDQuNTc1LTAuNTcsNS43MTJjMCwzLjk5NywwLjk5OCw3LjM3NCwyLjk5NiwxMC4xMzYgICBjMS45OTcsMi43NjYsNC45OTMsNC4xNDIsOC45OTIsNC4xNDJjMy40MjgsMCw3LjIzMy0xLjEzNywxMS40Mi0zLjQyM2wxMjguMTg4LTY3LjM4NmwxMjguMTk3LDY3LjM4NiAgIGM0LjAwNCwyLjI4Niw3LjgxLDMuNDIzLDExLjQxNiwzLjQyM2MzLjgxOSwwLDYuNzE1LTEuMzc2LDguNzEzLTQuMTQyYzEuOTkyLTIuNzU4LDIuOTkxLTYuMTM5LDIuOTkxLTEwLjEzNiAgIGMwLTIuNDcxLTAuMDk2LTQuMzc0LTAuMjg3LTUuNzEybC0yNC41NTUtMTQyLjc0OWwxMDMuNjM3LTEwMS4wNjhDNDcyLjYwNCwxOTUuMzMsNDc1LjA3NSwxOTAuNzYsNDc1LjA3NSwxODYuNTczeiIgZmlsbD0iIzAwMDAwMCIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" /></li>'
                );
              }
              if (rating === 0.5 || rating === 1.5 || rating === 2.5 || rating === 3.5 || rating === 4.5){

                $thisItem.find('.item__rating').children('li:last-child').remove();
                $thisItem.find('.item__rating').append(
                  '<li class="item-rating__half-star"><img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgNDUzLjA5OCA0NTMuMDk4IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NTMuMDk4IDQ1My4wOTg7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNMzMxLjMyMywxMS43MDhMMjY3LjA5LDE0MS42MTNsLTE0My4zMjIsMjAuODM5Yy0xMC42NTYsMS43MTQtMTUuOTg2LDYuMDkxLTE1Ljk4NiwxMy4xMzQgICBjMCwzLjk5OSwyLjM4LDguNTY3LDcuMTM1LDEzLjcwNmwxMDMuOTIzLDEwMS4wNjRsLTI0LjU1MSwxNDIuNzUyYy0wLjM4MSwyLjY3LTAuNTcxLDQuNTcyLTAuNTcxLDUuNzE2ICAgYzAsMy45OTcsMC45OTksNy4zNzEsMi45OTYsMTAuMTM2YzEuOTk5LDIuNzU5LDQuOTk1LDQuMTM4LDguOTkzLDQuMTM4YzMuNDI2LDAsNy4yMzMtMS4xMzMsMTEuNDItMy40MjZsMTI4LjE5LTY3LjM4MlYwICAgQzMzOS42MDgsMCwzMzQuOTQ3LDMuOSwzMzEuMzIzLDExLjcwOHoiIGZpbGw9IiMwMDAwMDAiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" /></li>'
                );
              }

              tracks = data.items[i].parent.tracklist.length;

              for (k=0; k<tracks; k++){

                if (data.items[i].parent.numberOfDiscs > 1) {
                  if( data.items[i].parent.tracklist[k].track == 1){
                    $thisItem.find('.parent-item__tracklist tbody tr:last-child').after(
                      '<tr class="discnumber"><td colspan="3">Disc '+data.items[i].parent.tracklist[k].disc+'</td></tr>'
                    );
                  }
                }


                if( data.items[i].parent.tracklist[k].hit == true ){
                  thisTrack = '<tr>'+
                                    '<td><div class="tracknumber">'+data.items[i].parent.tracklist[k].track+'</div>'+data.items[i].parent.tracklist[k].title+'</td>'+
                                    '<td class="hit-or-gem"><img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgNDc1LjA3NSA0NzUuMDc1IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NzUuMDc1IDQ3NS4wNzU7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNNDc1LjA3NSwxODYuNTczYzAtNy4wNDMtNS4zMjgtMTEuNDItMTUuOTkyLTEzLjEzNUwzMTUuNzY2LDE1Mi42TDI1MS41MjksMjIuNjk0Yy0zLjYxNC03LjgwNC04LjI4MS0xMS43MDQtMTMuOTktMTEuNzA0ICAgYy01LjcwOCwwLTEwLjM3MiwzLjktMTMuOTg5LDExLjcwNEwxNTkuMzEsMTUyLjZMMTUuOTg2LDE3My40MzhDNS4zMywxNzUuMTUzLDAsMTc5LjUzLDAsMTg2LjU3M2MwLDMuOTk5LDIuMzgsOC41NjcsNy4xMzksMTMuNzA2ICAgbDEwMy45MjQsMTAxLjA2OEw4Ni41MSw0NDQuMDk2Yy0wLjM4MSwyLjY2Ni0wLjU3LDQuNTc1LTAuNTcsNS43MTJjMCwzLjk5NywwLjk5OCw3LjM3NCwyLjk5NiwxMC4xMzYgICBjMS45OTcsMi43NjYsNC45OTMsNC4xNDIsOC45OTIsNC4xNDJjMy40MjgsMCw3LjIzMy0xLjEzNywxMS40Mi0zLjQyM2wxMjguMTg4LTY3LjM4NmwxMjguMTk3LDY3LjM4NiAgIGM0LjAwNCwyLjI4Niw3LjgxLDMuNDIzLDExLjQxNiwzLjQyM2MzLjgxOSwwLDYuNzE1LTEuMzc2LDguNzEzLTQuMTQyYzEuOTkyLTIuNzU4LDIuOTkxLTYuMTM5LDIuOTkxLTEwLjEzNiAgIGMwLTIuNDcxLTAuMDk2LTQuMzc0LTAuMjg3LTUuNzEybC0yNC41NTUtMTQyLjc0OWwxMDMuNjM3LTEwMS4wNjhDNDcyLjYwNCwxOTUuMzMsNDc1LjA3NSwxOTAuNzYsNDc1LjA3NSwxODYuNTczeiIgZmlsbD0iIzAwMDAwMCIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" /> HIT</td>'+
                                    '<td>'+data.items[i].parent.tracklist[k].composer+'</td>'+
                                  '</tr>'
                }else if( data.items[i].parent.tracklist[k].gem == true ){
                  thisTrack = '<tr>'+
                                    '<td><div class="tracknumber">'+data.items[i].parent.tracklist[k].track+'</div>'+data.items[i].parent.tracklist[k].title+'</td>'+
                                    '<td class="hit-or-gem"><img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgMzI3LjUyMyAzMjcuNTI0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzMjcuNTIzIDMyNy41MjQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNMzI3LjM4MSwxMTIuMDU4Yy0wLjE2Mi0xLjA0NC0wLjQ5My0yLjA2Ni0wLjg5Ni0zLjA1Yy0wLjA5LTAuMjEzLTAuMDktMC40My0wLjE4Ni0wLjY0NiAgIGMtMC4wMTItMC4wMTItMC4wMy0wLjAzNi0wLjAzNi0wLjA0OGMwLTAuMDI0LTAuMDEyLTAuMDM2LTAuMDI0LTAuMDUxbC0zNi4yMjEtNzYuOTFjLTAuMDg0LTAuMTc3LTAuMjQtMC4zMzYtMC4zMzYtMC41MTYgICBjLTAuMTI2LTAuMjE2LTAuMTY4LTAuNDgtMC4zMDctMC42OTRjLTAuMjc2LTAuNDY4LTAuNjU0LTAuODMyLTAuOTc5LTEuMjQ5Yy0wLjMzLTAuNDI5LTAuNjMxLTAuODkyLTAuOTk3LTEuMjcyICAgYy0wLjU0LTAuNTY0LTEuMTU5LTEuMDQ1LTEuNzg5LTEuNTE0Yy0wLjM5Ni0wLjMxMi0wLjc2OS0wLjY1Ny0xLjIwMS0wLjkxYy0wLjczMi0wLjQ0MS0xLjUyNS0wLjc1Ni0yLjMzLTEuMDU3ICAgYy0wLjQwMi0wLjE1My0wLjc5Mi0wLjM4Ny0xLjIxMy0wLjUwNGMtMS4yNDktMC4zNTItMi41NDYtMC41NTMtMy44OTEtMC41NTNIMTYyLjk5OWgtOTkuNDljLTEuMjY3LDAtMi40OTUsMC4xNzctMy42OSwwLjQ4OSAgIGMtMC40MTcsMC4xMTEtMC43OTgsMC4zMjgtMS4yMSwwLjQ2OWMtMC43MzIsMC4yNzYtMS40ODMsMC41MTctMi4xNywwLjkxQzU2LDI1LjIwNSw1NS42NCwyNS41NDMsNTUuMjMxLDI1LjgyICAgYy0wLjU4OSwwLjQxNy0xLjE5OCwwLjgxNi0xLjcyMSwxLjMyMWMtMC4zNjksMC4zNjMtMC42NjMsMC43OTItMC45OTEsMS4yMDFjLTAuMzg3LDAuNDU0LTAuODQsMC44NjUtMS4xNTYsMS4zODFMMi4xNzMsMTA2LjYzNSAgIGMtMC4xODMsMC4zLTAuMjcsMC42NC0wLjQzNiwwLjk1OGMtMC4xNDEsMC4yNTItMC4zNzUsMC40NjgtMC40OTgsMC43NDRjLTAuMTI5LDAuMjg5LTAuMTM1LDAuNTkyLTAuMjU4LDAuODY4ICAgYy0wLjI2NCwwLjcwNS0wLjQ3NCwxLjQwOC0wLjY0LDIuMTM4Yy0wLjEyMywwLjU3OS0wLjIyOCwxLjE0Ni0wLjI4OCwxLjcxN2MtMC4wNjksMC43Mi0wLjA2MywxLjQzOC0wLjAyNywyLjE2NSAgIGMwLjA0NSwwLjU5MiwwLjA4NywxLjE3NCwwLjE4LDEuNzVjMC4xMjksMC43MDgsMC4zNTIsMS4zNzIsMC41NzcsMi4wNTRjMC4yMDQsMC41OCwwLjM4NywxLjE1OSwwLjY2MSwxLjcwNiAgIGMwLjA5LDAuMTg5LDAuMTI5LDAuNDA1LDAuMjE5LDAuNmMwLjI1OCwwLjQ4LDAuNjM5LDAuODU2LDAuOTU1LDEuMjg4YzAuMjUyLDAuMzc1LDAuNDA1LDAuNzY5LDAuNjkzLDEuMTA1bDE0OC42NzYsMTc1LjYwNyAgIGMyLjU2NCwzLjAyNiw2LjQwNyw1LjE3NiwxMC4yMzgsNS4wNjdjMC4wNDgsMCwwLjA5NywwLjAyNCwwLjEyOSwwLjAyNGMwLjIxNCwwLjAxMiwwLjQxOCwwLjAxMiwwLjYzNCwwLjAxMiAgIGMwLjAwNiwwLDAuMDA2LDAsMC4wMDYsMHMwLjAxMiwwLDAuMDI0LDBjMS4yODUsMCwyLjU0Ni0wLjI0LDMuNzU5LTAuNTY0YzAuMzYtMC4xMTQsMC42ODUtMC4yMjgsMS4wNDUtMC4zNjYgICBjMC44OTUtMC4zMTIsMS43NjYtMC43MzIsMi41OTQtMS4yMjVjMC4yNzYtMC4xNjIsMC41Ny0wLjMyNCwwLjg0MS0wLjUwNWMwLjk3OS0wLjY3OSwxLjg5Ny0xLjQ1OSwyLjY5LTIuNDAxTDMyNC4xNSwxMjMuNzczICAgYzAuMTkxLTAuMjI4LDAuMy0wLjUwNCwwLjQ2OC0wLjc0NWMwLjI0LTAuMzAzLDAuNTQxLTAuNTU1LDAuNzQ1LTAuODk4YzAuMjE2LTAuMzM5LDAuMzI0LTAuNzIsMC41MDQtMS4wODMgICBjMC4yNTMtMC40NjUsMC40OTItMC45MzQsMC42NzktMS40MzhjMC4yODItMC43MzIsMC40NzUtMS40NzUsMC42NDMtMi4yMTljMC4xMDgtMC41MDUsMC4yMjktMC45ODUsMC4yNzYtMS40ODkgICBjMC4wOTYtMC44MjksMC4wNi0xLjYzNywwLTIuNDU5QzMyNy40MjksMTEyLjk1NiwzMjcuNDUyLDExMi41MDIsMzI3LjM4MSwxMTIuMDU4eiIgZmlsbD0iIzAwMDAwMCIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" /> GEM</td>'+
                                    '<td>'+data.items[i].parent.tracklist[k].composer+'</td>'+
                                  '</tr>'
                }else{
                  thisTrack = '<tr>'+
                                    '<td><div class="tracknumber">'+data.items[i].parent.tracklist[k].track+'</div>'+data.items[i].parent.tracklist[k].title+'</td>'+
                                    '<td></td>'+
                                    '<td>'+data.items[i].parent.tracklist[k].composer+'</td>'+
                                  '</tr>'
                }

                $thisItem.find('.parent-item__tracklist tbody').append(thisTrack);

              }

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

            var thisChildReleaseMonthNumber = data.items[requestedItemNumber].editions[j].releaseMonth;
            var thisChildReleaseMonthName = months[thisChildReleaseMonthNumber - 1];

            var $thisChild = '<li>'+
                              '<div class="child-item__header">'+
                                '<h3 class="child-item__title">'+data.items[requestedItemNumber].editions[j].title+'</h3>'+
                                '<ul class="child-item__info">'+
                                  '<li>'+thisChildReleaseMonthName+' '+data.items[requestedItemNumber].editions[j].releaseDay+', '+data.items[requestedItemNumber].editions[j].releaseYear+'</li>'+
                                  '<li>'+data.items[requestedItemNumber].editions[j].label+' ('+data.items[requestedItemNumber].editions[j].country+')</li>'+
                                  '<li>'+data.items[requestedItemNumber].editions[j].format+'</li>'+
                                '</ul>'+
                              '</div>'+
                              '<div class="child-item__body">'+
                                '<div class="child-item__sidebar">'+
                                  '<div class="sticky-content">'+
                                    '<a href="'+data.items[requestedItemNumber].editions[j].amazonUs+'" target="_blank"><img class="child-item__cover" src="'+data.items[requestedItemNumber].editions[j].cover+'" alt="'+data.items[requestedItemNumber].editions[j].title+'"></a>'+
                                    '<a class="child-item__buy" href="'+data.items[requestedItemNumber].editions[j].amazonUs+'" target="_blank">Buy on amazon.com</a>'+
                                  '</div>'+
                                '</div>'+
                                '<div class="child-item__tracklist">'+
                                  '<pre>'+data.items[requestedItemNumber].editions[j].tracklist+'</pre>'+
                                '</div>'+
                              '</div>'+
                            '</li>';

            $thisChild = $($thisChild); //convers string to DOM element
            $('#'+itemId).find('.item__body').find('.child-items').append($thisChild);




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


    // Initial load of items
    loadItems(initialArtist, initialCategory);
    loadChildren();



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
      loadItems(currentArtist, currentCategory);
      loadChildren();
    }

    function resetSorting(){
      $('.sorting li').removeClass('sorting__current');
      $('#sorting-release').addClass('sorting__current');
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

        $('#current-category span').html('Albums');
        $('#category li').removeClass('selector__options__current');
        $('#category li:first-child').addClass('selector__options__current');

        //loads new items
        selectedArtist = $(this).attr('data-artist');
        currentArtist = selectedArtist;
        loadItems(selectedArtist,initialCategory);
        loadChildren();

        resetSorting();


      } // /else

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
        loadChildren();

        resetSorting();

      } // /else

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

    });


  }); // /get json




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
    }, 300);


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



}); // /document ready
