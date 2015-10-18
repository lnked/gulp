(function( $ ){

  var methods = {
    init : function( options ) { 
      // А ВОТ ЭТОТ
    },
    show : function( ) {
      // ПОДХОД
    },
    hide : function( ) {
      // ПРАВИЛЬНЫЙ
    },
    update : function( content ) {
      // !!!
    }
  };

  $.fn.tooltip = function( method ) {
    
    // логика вызова метода
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Метод с именем ' +  method + ' не существует для jQuery.tooltip' );
    } 
  };

})( jQuery );

// вызывает метод init
$('div').tooltip(); 

// вызывает метод init
$('div').tooltip({
  foo : 'bar'
});

// вызывает метод hide
$('div').tooltip('hide'); 