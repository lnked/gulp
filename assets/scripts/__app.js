;( function( $ ) {
	"use strict";

	$.app = {
		
		initSandwich: function()
		{
			$('.menu-trigger').sandwich({
				wrapper: '.layout-wrapper',
				overlay: '#menu-overlay'
			});
		},

		initSelect: function()
		{
			$('select').selectbox();
		},

		initMask: function()
		{
			$(".watch-datemask").mask("99/99/9999");
			$(".watch-phonemask").mask("+ 7 (999) 999-99-99");
			$(".watch-cartnumber").mask("999-999-999");
		},
		
		initPopover: function()
		{
			$('.trigger-dropdown').popover();
		},

		initPopup: function()
		{
			// body.on('popup.init_nested', function(e, data){
			// 	alert("nested " + data.popup + ' = '  + data.nested);
			// });

			$.popup.init('.js-open-popup', {
				cssPosition: true,
				wrapper: '.layout-wrapper'
			});
		},

		init: function()
		{

			this.initPopup();
			this.initMask();
			this.initSelect();
			this.initSandwich();

			this.ajaxForm.init();
			this.cart.init();

		}

	};

})( jQuery );