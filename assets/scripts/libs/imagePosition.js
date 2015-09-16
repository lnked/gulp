;(function($) {
 
	var imagePosition = function(img) {
		var imgW, imgH, wrapperW, wrapperH, $img, $wrapper, fInit, fResize, fParsePosition, position;
 
		fInit = function() {
			$img = $(img);
			$wrapper = $img.parent();

			if($img.get(0).complete) {
				imgW = img.naturalWidth;
				imgH = img.naturalHeight;

				fResize();
			}
			else {
				$img.on('load', function() {
					imgW = img.naturalWidth;
					imgH = img.naturalHeight;

					setTimeout(function() {
						fResize()
					}, 150);
				});
			}
			$(window).resize(fResize);
		};
 
		fResize = function() {
			wrapperW = $wrapper.width();
			wrapperH = $wrapper.height();
			
			console.log(imgW, imgH, $img.attr('src'));

			if(imgW >= imgH) {
				if(((imgH/imgW)*wrapperW) < wrapperH) {
					$img.css({'width': 'auto','height': '100.1%', 'top': 0, 'left': (Math.floor(Math.floor((imgW/imgH)*wrapperH)-wrapperW)/2)*-1});
				}
				else {
					$img.css({'width': '100.1%', 'height': 'auto', 'top': (Math.floor(Math.floor((imgH/imgW)*wrapperW)-wrapperH)/2)*-1, 'left': 0});
				}
			}
		};
		
		fParsePosition = function() {
			var _position = $img.data('image-position');
 
			if(typeof(_position) == 'object') {
				position = _position;
			}
			else if(typeof(_position) == 'string') {
				_position = _position.split(' ');
				if(_position.length > 1) {
					position = {
						x: (['left', 'center', 'right'].indexOf(_position[0]) > -1) ? _position[0] : 'left',
						y: (['top', 'center', 'bottom'].indexOf(_position[1]) > -1) ? _position[1] : 'top',
					}
				}
			}
		};
 
		fInit();
	};
 
	$.fn.imagePosition = function() {
 
		return this.each(function() {
			new imagePosition(this);
		});
 
	}
 
})(jQuery);