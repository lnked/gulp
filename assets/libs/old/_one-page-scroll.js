$(function(){
	if ($('.js-section').length > 1)
	{
		var $active, $next,
		scrollItem = '.page-scroll',
		section_class = 'js-section',
		section = '.' + section_class,
		sections = {},
		scrollingPause = 500,
		scrollingSpeed = 300,
		started = false,
		index = 0,
		prevTime = new Date().getTime(),
		curTime, timeDiff, debounce, timer, delta;

		$(section).height($(window).height());
		$(section).first().addClass('active');

		$(section).map(function(index) {
			$(this).attr('id', 'section-' + index);
			sections[index] = $(this).offset().top;
		});

		$(scrollItem).on('mousewheel DOMMouseScroll', function (e) {
			e.preventDefault ? e.preventDefault() : e.returnValue = false;
			
			curTime = new Date().getTime();

			debounce = setTimeout(function () {
				if (!started)
				{
					timeDiff = curTime-prevTime;
	                
					$active = $('.' + section_class + '.active');
					
					if (timeDiff > scrollingPause && $active.length && $active.hasClass(section_class))
					{
						started = true;
						delta = e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0 ? 1 : -1;
						
			        	$next = (delta < 0) ? $active.next(section) : $active.prev(section);
			        	
			        	if ($next.length)
			        	{
					        index = parseInt($next.attr('id').split('-')[1]);

				        	$(scrollItem)
		                    	.stop()
		                    	.animate({
			                        scrollTop: sections[index]
			                    }, 'medium', function(){
		                    		$active.removeClass('active');
									$next.addClass('active');

									setTimeout(function(){
										started = false;
										prevTime = curTime;
		                    		}, 300);
		                    	});
			            }
			            else {
			            	started = false;
			            }
					}
				}

				clearTimeout(debounce);

			}, scrollingSpeed);
		});
	}
});