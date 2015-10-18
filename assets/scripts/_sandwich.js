(function($) {
	$.fn.sandwich = function(settings) {
		var settings = $.extend({
            wrapper: '.wrap',
            overlay: '.overlay'
        }, settings);

		var $trigger = $(this), $body = $('body');
		
		$trigger.on('click', function(e){
			e.preventDefault();
			
			if ($body.hasClass('page-visible'))
			{
				setTimeout(function(){
					$body.removeClass('page-visible');
				}, 10);
			}
			else
			{
				setTimeout(function(){
					$body.addClass('page-visible');
				}, 10);
			}
			
			$body.toggleClass('page-open');
			
	        var visibility = 'visible';

	        if (!$body.hasClass('page-open'))
	        {
	            visibility = 'hidden'
	        }
	        
	        $(settings.overlay).css({
	            'visibility': visibility
	        });
		});

		$body.on('click', settings.overlay, function(e){
			$body.removeClass('page-open');

	        setTimeout(function(){
				$body.removeClass('page-visible');
			}, 10);

	        $(settings.overlay).css({
	            'visibility': 'hidden'
	        });
	    });
	};
}(jQuery));