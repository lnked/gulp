;(function ($) {
	"use strict";

	$.app = $.app = $.app || {};

	var _this, _slider, _timer, current, next;

	$.app.slider = {

		config: {
			slider: '.slider',
			item: '.js-slider-slide',
			active: 'active',
			timeout: 3000
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

		initSlider: function()
		{
			_this = this;

			_slider = $(_this.config.slider);

			if (_slider.find(_this.config.item).length > 1)
			{
				
				// current, next

				_timer = setInterval(function(){
					
					next = null;
					current = _slider.find(_this.config.item + '.' + _this.config.active);

					if (current.next(_this.config.item).length)
					{
						next = current.next(_this.config.item);    
					}
					else
					{
						next = _slider.find(_this.config.item).eq(0);   
					}

					if (typeof(next) !== 'undefined')
					{
						next.addClass(_this.config.active);
						current.removeClass(_this.config.active);
					}

				}, _this.config.timeout );
			}
		},

		init: function(config)
		{
			this.extend(config);
			this.initSlider();
		}

	};

})(jQuery);