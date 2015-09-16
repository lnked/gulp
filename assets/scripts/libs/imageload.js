var Stack = function() {
	var stack = {}, minItem;
	
	//this.length = 0;

	return {
		length: 0,
		shift: function() {
			var value, stackKeys = Object.keys(stack);
			if(stackKeys.length) {
				value = stack[stackKeys[0]];
				if(value.length) {
					var ss = value.shift();
					if(value.length < 1) {
						delete stack[stackKeys[0]];
						this.length--;
					}
					return ss;
					//return value.shift();
				}
			}

			return undefined;
		},
		push: function(idx, value) {
			var currentValue = [], lengthAddNum = 1;

			if(stack.hasOwnProperty(idx) && Object.prototype.toString.call(stack[idx]) === '[object Array]') {
				currentValue = stack[idx];
				lengthAddNum = 0;
			}
			
			currentValue.push(value);
			stack[idx] = currentValue;
			this.length+= lengthAddNum;
		}
	}
};

;(function($) {
	var loadQueue = new Stack(), isBusy = false, fReturnPromise;
	
	fReturnPromise = function(deferred, isResolve) {
		var isResolve = Boolean(isResolve);

		if(deferred) {
			if(isResolve) {
				setTimeout(function() {
					deferred.resolve();
				}, 25);
			}
			return deferred.promise();
		}

		return;
	};

	$.loadImage = function(el, isPromise, onLoad) {
		var imgSrc, img, deferred = false, loadPriority, onloadStack, deferredStack;

		if(isPromise) {
			if(typeof(isPromise.promise) == 'function') {
				deferred = isPromise;
			}
			else {
				deferred = $.Deferred();
			}
		}

		if($(el).data('load-state') == 'loaded') {
			if(typeof(onLoad) == 'function') {
				onLoad.apply(el);
			}

			return fReturnPromise(deferred, true);
		}
		else if($(el).data('load-state') == 'progress' || $(el).data('load-state') == 'queue') {
			if(typeof(onLoad) == 'function') {
				onloadStack = $(el).data('onload-stack');
				if(!onloadStack) {
					onloadStack = [];
				}
				onloadStack.push(onLoad);

				$(el).data('onload-stack', onloadStack);
			}

			if(deferred) {
				deferredStack = $(el).data('deferred-stack');
				if(!deferredStack) {
					deferredStack = [];
				}
				deferredStack.push(deferred);
				
				$(el).data('deferred-stack', deferredStack);
			}

			return fReturnPromise(deferred);
		}
		else if($(el).data('load-state') != 'queue' && (loadPriority = $(el).data('priority'))) {

			if(isBusy) {
				loadQueue.push(loadPriority, [el, deferred, onLoad]);
				$(el).data('load-state', 'queue');

				return fReturnPromise(deferred);
			}
		}

		if(typeof(el) == 'object') {
			imgSrc = $(el).attr('src');
			if(!imgSrc) {
				imgSrc = $(el).data('src');
			}
		}
		else {
			imgSrc = el;
		}
		
		$(el).data('load-state', 'progress');
		
		/* Р·Р°СЃС‡РёС‚С‹РІР°РµРј С„Р»Р°Рі Р·Р°РЅСЏС‚РѕСЃС‚Рё С‚РѕР»СЊРєРѕ РµСЃР»Рё РїСЂРµРґРїРѕР»Р°РіР°РµС‚СЃСЏ Р·Р°РіСЂСѓР¶Р°С‚СЊ Р°СЃРёРЅС…СЂРѕРЅРЅРѕРµ РёР·РѕСЂР°Р¶РµРЅРёРµ */
		if(loadPriority) { isBusy = true; }

		img = new Image();
		img.onload = function() {
			var onloadStack = $(el).data('onload-stack'),
				deferredStack = $(el).data('deferred-stack'), i, onloadStackLength, deferredStackLength, loadQueueArgs;

			$(el).attr('src', img.src);
			$(el).data('naturalWidth', img.naturalWidth);
			$(el).data('naturalHeight', img.naturalHeight);

			$(el).data('load-state', 'loaded');

			if(typeof(onLoad) == 'function') {
				onLoad.apply(el);
			}

			if(typeof(onloadStack) == 'object' && onloadStack.length > 0) {
				for(i=0, onloadStackLength=onloadStack.length; i<onloadStackLength; i++) {
					onloadStack[i].apply(el);
				}
				
				$(el).data('onload-stack', null);
			}
			
			if(typeof(deferredStack) == 'object' && deferredStack.length > 0) {
				for(i=0, deferredStackLength=deferredStack.length; i<deferredStackLength; i++) {
					deferredStack[i].resolve();
				}
				
				$(el).data('onload-stack', null);
			}
			
			if(typeof(el) == 'object') {
				$(el).trigger('load.image-load', this);
			}
			if(isPromise) {
				deferred.resolve();
			}

			if(loadPriority) { isBusy = false; }
			
			if(loadQueue.length) {
				loadQueueArgs = loadQueue.shift();
				if(typeof(loadQueueArgs[0]) == 'object') {
					$(loadQueueArgs[0]).data('load-state', 'preload');
					$.loadImage.apply(null, loadQueueArgs);
				}
			}
		}
		img.onerror = function() {

			if(typeof(el) == 'object') {
				$(el).trigger('load.image-load', this);
			}
			if(isPromise) {
				deferred.resolve();
			}

			if(loadPriority) { isBusy = false; }
		}
		img.src = imgSrc;

		return fReturnPromise(deferred);
	};

	$.fn.imageLoad = function(onLoad) {
		return this.each(function() {
			$.loadImage(this, false, typeof(onLoad) == 'function' ? onLoad : null);
		});
	}

})(jQuery);