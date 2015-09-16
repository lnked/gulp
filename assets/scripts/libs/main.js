$(document).ready(function(){

/*
	$(".carousel").carousel();

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

	;(function(){
		var countdown = $('#countdown'),
		update = function(){
	        var now = moment(),
	            startdate = moment({ year: 2015, month: 4, day: 14, hour: 15, minute: 10, second: 3, millisecond: 123 }),
	            diffSec = startdate.diff(now, 'seconds'),
	            days = Math.floor(diffSec / 86400),
	            diffSec = diffSec - days * 86400,
	            hours = Math.floor(diffSec / 3600),
				diffSec = diffSec - hours * 3600,
	            minutes = Math.floor(diffSec / 60);
        	
        	countdown.html('<span class="video__countdown_big">' + days + '</span> дней <span class="video__countdown_big">' + hours + '</span> часов <span class="video__countdown_big">' + minutes + '</span> минут');
	    };

		if (moment().day() != 1)
		{
		    update();
		    setInterval(update, 1000);
		}
	})();
	
	$('.trigger-anchor').on('click', function(e) {
		e.preventDefault();

		$('html, body').animate({ scrollTop: $(window).height() }, 'fast');

		return false;
	});

	$('.trigger-review').on('click', function(e) {
		e.preventDefault();
		var direction = $(this).data('direction'), review = $('#review'), list = review.find('.review__item');
		
		if (list.length > 1 && !review.hasClass('process-active'))
		{
			review.addClass('process-active');

			var active = review.find('.review__item-active'), next;

			if (direction == 'next')
			{
				if (active.next('.review__item-passive').length > 0)
		        {
		            next = active.next('.review__item-passive');
		        }
		        else
		        {
		        	next = review.find('.review__item-passive:first-child');
		        }
			}
			else
			{
				if (active.prev('.review__item-passive').length > 0)
		        {
		            next = active.prev('.review__item-passive');
		        }
		        else
		        {
		        	next = review.find('.review__item-passive:last-child');
		        }
			}
			
			if (typeof(next) !== 'undefined')
        	{
        		active.addClass('review__item-passive').removeClass('review__item-active');
        		next.removeClass('review__item-passive').addClass('review__item-active');
        	}

        	review.removeClass('process-active');
		}

		return false;
	});
	
	$('body').on('submit', '.form-search', function(e) {
		e.preventDefault();

        var $form = $(this);
        
        $.ajax({
            url: $form.attr('action'),
            type: ($form.attr('method') || 'post'),
            data: $form.serialize(),
            dataType: 'JSON',
            success: function(response)
            {
                if($form.data('callback') && $.app.callback_stack.hasOwnProperty($form.data('callback'))) {
                    $.app.callback_stack[$form.data('callback')]($form, response);
                }
                else {
                    $.app.callback_stack.form_ajax_default($form, response);
                }

                if( response.status === true && response.message !== '' )
                {
                    $.popup.message( response.title, response.message );
                }
            },
            error: function(response)
            {
                alert("error");
            }
        });
    });

	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {};

	$("img, a").on("dragstart", function(e) {
		e.preventDefault();
	});
*/
});