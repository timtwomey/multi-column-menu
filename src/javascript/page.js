// Browserify entry point for the page.js bundle (yay JavaScript!)

var $ = require('jquery');

$(document).ready( function () {

  var content = $('.menu-list'),
      html = '',
      columnList = [''],
      heightLimit = 300,
      counter = 0,
      i, j,
      subTotal;

  content.children('li').each( function (i, li) {
    if( columnList[counter].length === 0 ) {
      columnList[counter] = new Array(li);
    } else {
      subTotal = 0;
      for( i=0; i<columnList[counter].length; i++ ) {
        subTotal += $(columnList[counter][i]).height();
      }
      console.log(subTotal);
      if( subTotal + $(li).height() < heightLimit ) {
        columnList[counter].push(li);
      } else {
        counter++;
        columnList[counter] = new Array(li);
      }  
    }
    
  });

  html = '<ul class="menu-list__block-grid">';
  
  for( i=0; i < columnList.length; i++ ) {
    html += '<li><ul>';
    for( j=0; j < columnList[i].length; j++ ) {
     html += '<li>' + $(columnList[i][j]).html() + '</li>';
   }
   html += '</ul></li>';
  }
  
  html += '</ul>';

  content.replaceWith( html );
  setTimeout( function () {
    i = $('.menu-list__block-grid').height();
    $('.menu-list__block-grid > li').height( $('.menu-list__block-grid').height() );
  }, 50);

});

console.log('page.js loaded!');
