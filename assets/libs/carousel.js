(function ( $ ) {

 	$.fn.carousel = function(settings) {
		
		settings = $.extend({
            list: ".carousel__list",
            item: ".carousel__item",
            wrap: ".carousel__wrap",
            count: 4,
            prevButton: ".carousel__controll_prev",
            nextButton: ".carousel__controll_next"
        }, settings );

		return this.each(function() {

			var _this = $(this);

			if (!_this.find(settings.list).length)
			{
				return !1;
			}

			if (_this.data('count'))
			{
				settings.count = _this.data('count');
			}

			var list = _this.find(settings.list),
				wrap = _this.find(settings.wrap),
				ci_height = list.find(settings.item).eq(0).outerHeight(),
				ci_count = list.find(settings.item).length,
				ci_maxHeight = settings.count * ci_height,
				ci_originalHeight = ci_count * ci_height;

			if (ci_count < settings.count)
			{
				ci_maxHeight = ci_count * ci_height;
			}

			wrap.css({
				"height": ci_maxHeight
			});

			list.css({
				"height": ci_originalHeight,
				"position": "absolute",
				"top": 0
			});

			if (ci_originalHeight > ci_maxHeight)
			{
				_this.addClass('initial');
				_this.find(settings.prevButton).addClass('active');
				_this.find(settings.nextButton).addClass('active');
			}

			function addElement(data, dir)
			{
				var number = dir == 'before' ? 0 : ci_count - 1,
					element = list.find(settings.item).eq(number);
				
				if (dir == 'after')
				{

					list.css({
						"top": data.shift - ci_height
					});

					element.clone(true).prependTo(list).addClass('item-cloned');
				}
				else if (dir == 'before')
				{
					element.clone(true).appendTo(list).addClass('item-cloned');
				}

				ci_count = list.find(settings.item).length;

				return element;
			}
			
			function _lock()
			{
				_this.addClass('locked');
			}

			function _unlock()
			{
				_this.removeClass('locked');
			}

			function _locked()
			{
				return (_this.hasClass('locked'));
			}

			function _getData(element)
			{
				if (typeof(element) == 'undefined')
				{
					element = list.find(settings.item).eq(0);
				}

				var data = {};

				data.element = element;
				data.shift = parseInt(list.css('top'));
				data.order = Math.floor($(element).position().top / ci_height) + 1;
			
				return data;
			}

			function _checkAdd(count)
			{
				var max = Math.floor(settings.count / 2);
				return (max > count);
			}

			function _clean(data, dir)
			{
				_unlock();

				if (dir == 'prev')
				{
					list.css({
						"top": data.shift
					});

					list.find(settings.item).eq(ci_count-1).remove();
				}
				else if (dir == 'next')
				{
					list.css({
						"top": data.shift + ci_height
					});

					list.find(settings.item).eq(0).remove();
				}

				ci_count = list.find(settings.item).length;
			}

			function next(data)
			{
				if (typeof(data) == 'undefined')
				{
					var data = _getData();
				}
				
				if (_checkAdd($(data.element).nextAll('.carousel__item').length))
				{
					addElement(data, 'before');
				}

				data.shift = data.shift - ci_height;

				_animate(data, "next");
			}

			function prev(data)
			{
				if (typeof(data) == 'undefined')
				{
					var data = _getData();
				}
				
				if (_checkAdd($(data.element).prevAll('.carousel__item').length))
				{
					addElement(data, 'after');
				}

				_animate(data, "prev");
			}

			function _animate(data, dir)
			{
				_lock();

				ci_count = list.find(settings.item).length;
				ci_originalHeight = ci_count * ci_height;

				list.css({
					"height": ci_originalHeight
				});

				list.stop().animate({
						"top": data.shift
					}, 300,
					function(){
						_clean(data, dir);
					});
			}

			list.on('click', settings.item, function(e){
				e.preventDefault();
				
				if (_locked())
				{
					return !1;
				}

				var data = _getData($(this)),
					direction = Math.abs(Math.abs(data.shift / ci_height) - data.order) > Math.floor(settings.count / 2) ? 'next' : 'prev';
				
				if (direction == 'next')
				{
					next(data);
				}

				if (direction == 'prev')
				{
					prev(data);
				}

				return !1;
			});
		
			_this.on('click', [settings.prevButton, settings.nextButton], function(e){
				e.preventDefault();
				
				if (_locked())
				{
					return !1;
				}

				var data = _getData();

				if ($(e.target).hasClass(settings.prevButton.substr(1)))
				{
					data.element = list.find(settings.item).eq(0);
					prev(data);
				}

				else if ($(e.target).hasClass(settings.nextButton.substr(1)))
				{
					data.element = list.find(settings.item).eq(ci_count-1);
					next(data);
				}

				return !1;
			});

			return _this;
		});
	};
 
}( jQuery ));