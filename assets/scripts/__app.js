;( function( $ ) {
	"use strict";

	window.body = $('body');

	$.app = {
		
		initSandwich: function()
		{
			this.sandwich.init({
				keyHooks: !0,
				selector: '.js-sandwich-menu',
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

		initFancyBox: function()
		{
			if (!is_undefined($.fn.fancybox))
			{
				$('.fancybox').fancybox({
					helpers: {
						overlay: {
						  locked: false
						}
					}
				});

				$('.fancybox-media').fancybox({
					openEffect  : 'none',
					closeEffect : 'none',
					helpers : {
						media : {},
						overlay: {
						  locked: false
						}
					}
				});

				$(".various").fancybox({
					maxWidth	: 800,
					maxHeight	: 600,
					fitToView	: false,
					width		: '70%',
					height		: '70%',
					autoSize	: false,
					closeClick	: false,
					openEffect	: 'none',
					closeEffect	: 'none',
					helpers: {
						overlay: {
						  locked: false
						}
					}
				});
			}
		},

		carousel: function()
		{
			if ($('#carousel').length > 0 && $('#carousel').find('.carousel__item').length > 1)
			{
				$('#carousel').slick({
					infinite: true,
					dots: false,
					draggable: true,
					speed: 170,
					slidesToShow: 4,
		  			slidesToScroll: 1,
					prevArrow: '<button type="button" class="carousel__navigation carousel__navigation_prev slick-prev"></button>',
					nextArrow: '<button type="button" class="carousel__navigation carousel__navigation_next slick-next"></button>',
					responsive: [
						{
							breakpoint: 1024,
							settings: {
								slidesToShow: 3,
								slidesToScroll: 3,
								infinite: true,
								dots: true
							}
						},
						{
							breakpoint: 600,
							settings: {
								slidesToShow: 2,
								slidesToScroll: 2
							}
						},
						{
							breakpoint: 480,
							settings: {
								slidesToShow: 1,
								slidesToScroll: 1
							}
						}
					]
				});
			}
		},

		slider: function()
		{
			if ($('#slider').length > 0 && $('#slider').find('.slider__list__item').length > 1)
			{
				$('#slider').slick({
					infinite: true,
					dots: true,
					draggable: false,
					speed: 300,
					fade: true,
					autoplay: true,
					autoplaySpeed: 4500,
					pauseOnHover: false,
					cssEase: 'ease'
				});
			}
		},

		disableHover: function()
		{
			var timer;
			window.addEventListener('scroll', function() {
				clearTimeout(timer);
				
				if(!body.classList.contains('disable-hover')) {
					body.classList.add('disable-hover')
				}

				timer = setTimeout(function(){
					body.classList.remove('disable-hover')
				},500);
			}, false);
		},

		init: function()
		{
			this.disableHover();

			this.initFastclick();

			this.initPopup();
			this.initMask();
			this.initSelect();
			this.initSandwich();

			this.ajaxForm.init();
			this.cart.init();

			browser.init();
		}

	};

})( jQuery );