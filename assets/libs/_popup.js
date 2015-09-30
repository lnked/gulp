;(function ($) {

	$.fn.popup = function(element) {
		
		var options = {};

		var settings = $.extend({
            effect: 'topmove',
            effects: [
            	'zoom',
            	'newspaper',
            	'h-move',
            	'topmove',
            	'3d-unfold',
            	'zoom-out'
            ]
        }, options );
 
       	var $win = $(window), $doc = $(document), $body = $('body');

       	/*
       	Эффекты
       	http://codepen.io/dimsemenov/pen/GAIkt
   		*/
   	
       	var module = {
       		config: {
       			ww: 0,
                wh: 0,
                dw: 0,
                dh: 0,
                pw: 0,
                ph: 0,
                st: 0
       		},
       		init: function()
       		{
       			this.ww = $win.width();
				this.wh = $win.height();
				this.dw = $doc.width();
				this.dh = $doc.height();
				this.pw = $popup.outerWidth();
				this.ph = $popup.outerHeight();
				this.st = $win.scrollTop();

       		},
       		getPosition: function($popup) {
	        	var left = 0,
	                top = 0,
	                css = {},
	                posType = $popup.attr('data-position');

	            css.display = 'none';
	            css.position = 'fixed';
	            css.margin = '60px auto 60px';
	            css.left = 0;
	            css.right = 0;

				return css;
	        }
       	};

		return this.each(function() {

       		var $popup = $($(this)),
	       		animationSetup = {
	                'opacity': 'show'
	            },
	            position = module.getPosition($popup);

            if(module.config.ph >= module.config.wh)
            {
                position.position = 'relative';
                $popup.wrap( "<div class='popup__wrapper'></div>");
            }
           	
           	$body.css('overflow','hidden');

           	$popup.css(position);

           	$popup.animate(animationSetup, 250, function() {
                $('body').trigger('popup.after_open', $popup);
            }).addClass('is-open');

			return this;
		});

	};
	 	
 	$.initPopups = function() {

 		//$('#popup-demo').popup();

        $(document).on('click', '.open-popup', function(e) {
        	e.preventDefault ? e.preventDefault() : e.returnValue = false;

        	$($(this).attr('href')).popup();

        	/*
            var selector, isResetForm, isClearError, isOverlay = true;

            isClearError = !$(this).data('noclear-form');
            isResetForm = !$(this).data('noreset-form');

            if (typeof($(this).data('overlay')) !== 'undefined')
            {
                isOverlay = !!$(this).data('overlay');
            }

            if($(this).get(0).tagName == 'A') {
                selector = $(this).attr('href');
                popup.open(selector.substr(1), isClearError, isResetForm, isOverlay);
            }
            */
           
			return !1;
        });

        $(document).on('click', '.popup__btn-close, .btn-close', function(e) {
            e.preventDefault ? e.preventDefault() : e.returnValue = false;
            
            $('#popup-demo').animate({opacity: 'hide'}, 250, function(){
            	$('#popup-demo').unwrap();
            });

            return !1;
        });

        /*
        $(document).on('keydown', function(e) {
            if(e.keyCode == 27) {
                popup.closeAll(true, true);
            }
        });

        $(document).on('overlay.click', function() {
            
            popup.closeAll(true);
        });

        $(document).on('click', '.popup__wrapper', function(e) {
            if( $(e.target).closest('.popup').length == 0 )
            {
                popup.closeAll(true);
            }
        });

        $win.on('resize.popup', function() {
            var $popups;

            if(popupIsOpen) {
                $('body').find('.popup.is-open').each(function() {
                    popup.rePosition($(this));
                });
            }
        });
        */
    };

    if( typeof $.initPopups !== 'undefined' )
    {
        $.initPopups();

        if(window.location.hash.length > 1 && $(window.location.hash).hasClass('popup') )
        {
            try {
                $.popup.open(window.location.hash.substr(1));
            }
            catch(e) {}
        }
    }

}( jQuery ));