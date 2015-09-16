;( function( $ ){
	"use strict";

	$.fn.extend( {
		quantity: function(options)
		{
			this.defaults = {};
			var settings = $.extend( {}, this.defaults, options );

			return this.each(function() {
				var that = $(this);

				that.count = that.find('.sense-quantity-count');

				// Controls
				that.decrease = that.find('.trigger-quantity[data-method="decrease"]');
				that.increase = that.find('.trigger-quantity[data-method="increase"]');

				that.check = function() {
					var value = parseInt(that.count.val());
					
					if (value == 1)
					{
						that.decrease.addClass('disabled');
					}
					
					else if (that.decrease.hasClass('disabled'))
					{
						that.decrease.removeClass('disabled');
					}
				};

				that.clicks = function() {
					that.on('click', '.trigger-quantity', function(e){
						var method = $(this).data('method'),
							value = parseInt(that.count.val());
						
						if (method == 'decrease' && value > 1)
						{
							--value;
						}

						if (method == 'increase')
						{
							value++;
						}

						that.count.val(value);

						that.check();
					});
				};

				that.tracking = function() {
					that.on('keydown', that.count, function (e) {
						if (e.which == 38 || e.which == 40)
						{
							e.preventDefault();
							
							var value = parseInt(that.count.val());
							
							if (e.which == 38)
							{
								value++;
							}
							else if (e.which == 40 && value > 1)
							{
								--value;
							}

							that.count.val(value);
							that.check();
						}
					});
				};

				that.init = function() {
					that.clicks();
					that.tracking();
					that.check();
				}

				that.init();
			});
		}
	});

})( jQuery );