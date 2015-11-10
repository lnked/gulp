;(function ($) {
	"use strict";

	$.app = $.app = $.app || {};

	var body = $('body'), _this;

	$.app.sandwich = {

		config: {
			selector: '.js-sandwich-menu',
            wrapper: '.layout-wrapper',
            overlay: '.overlay'
		},

		extend: function(config)
		{
			_this = this;

			if (typeof config !== 'undefined')
        	{
        		var x;
        		for (x in config)
        		{
        			if (typeof _this.config[x] !== 'undefined')
        				_this.config[x] = config[x];
        		}
        	}
		},

		sandwichTrigger: function()
		{
			body.on('click', _this.config.selector, function(e){
		        e.preventDefault ? e.preventDefault() : e.returnValue = false;
				
				if (body.hasClass('page-visible'))
				{
					setTimeout(function(){
						body.removeClass('page-visible');
					}, 10);
				}
				else
				{
					setTimeout(function(){
						body.addClass('page-visible');
					}, 10);
				}

				body.toggleClass('page-open');

				var visibility = 'visible';

		        if (!body.hasClass('page-open'))
		        {
		            visibility = 'hidden'
		        }
		        
		        $(_this.config.overlay).css({
		            'visibility': visibility
		        });
			});
		},

		overlayTrigger: function()
		{
			body.on('click', _this.config.overlay, function(e){
				body.removeClass('page-open');

		        setTimeout(function(){
					body.removeClass('page-visible');
				}, 10);

		        $(_this.config.overlay).css({
		            'visibility': 'hidden'
		        });
		    });
		},

		init: function(config)
		{
			this.extend(config);
			
			this.sandwichTrigger();
			this.overlayTrigger();
		}

	};

})(jQuery);