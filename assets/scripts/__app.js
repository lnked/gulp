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
		
		initFastclick: function()
		{
			FastClick.attach(document.body);
		},

		initPopup: function()
		{
			$.popup.init('.js-open-popup', {
				cssPosition: false,
				wrapper: '.layout-wrapper'
			});
		},

		init: function()
		{

			this.initPopup();
			this.initMask();
			this.initSelect();
			this.initSandwich();
			this.initFastclick();

			this.ajaxForm.init();
			this.cart.init();

		}

	};

})( jQuery );