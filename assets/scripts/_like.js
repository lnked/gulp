/*
	<a href="./json/like2.json" class="like">101</a>
	
	# json format

	{
		"count": 10
	}
*/

;(function( $ ){
  	$.fn.like = function() {
			
		$(this).on('click', function(e){
			e.preventDefault ? e.preventDefault() : e.returnValue = false;
			
			if (!$like.hasClass('used'))
			{
				var action = $(this).attr('href');

				try {
			        if (typeof action !== 'undefined' && action !== '')
			        {
				        $.ajax({
				            url: action,
				            type: 'get',
				            dataType: 'JSON',
				            success: function(response)
				            {
				                if (typeof response.count !== 'undefined' && response.count !== '') {
					            	setTimeout(function(){
										$like.addClass('used');
										$like.html(response.count);
									});    	
				                }
				            }
						});
					}
			    } catch(e){}
		  	}

		  	return !1; 
		});

  	};
})( jQuery );