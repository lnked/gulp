
// __app.js

;( function( $ ) {
	"use strict";

	window.body = $('body');
	window._this = null;

	$.app = {
		
		initSandwich: function()
		{
			this.sandwich.init({
				keyHooks: !0,
				selector: '.js-sandwich-menu',
				wrapper: '.layout-wrapper',
				overlay: '#menu-overlay'
			});
		},

		initSlider: function()
		{
			this.slider.init({
				slider 	: '#slider',
				item 	: '.js-slider-slide',
				timeout : 6000
			});
		},
		
		initSelect: function()
		{
			$('select').selectbox();
		},

		initMask: function()
		{
			$(".js-date-watcher").mask("99/99/9999");
			$(".js-phone-watcher").mask("+ 7 (999) 999-99-99");
			$(".js-cartnumber-watcher").mask("999-999-999");
		},
		
		initFastclick: function()
		{
			FastClick.attach(document.body);
		},

		initPopup: function()
		{
			$.popup.init('.js-open-popup', {
				cssPosition: false,
				wrapper: '.layout-wrapper'
			});
		},
		
		initMagnific: function()
		{ 
			$('.zoom').magnificPopup({
			 	type:'image',
			 	preloader: true,
				gallery: {
					enabled: true
				},
				zoom: {
					enabled: true, // By default it's false, so don't forget to enable it

					duration: 300, // duration of the effect, in milliseconds
					easing: 'ease-in-out', // CSS transition easing function

					// The "opener" function should return the element from which popup will be zoomed in
					// and to which popup will be scaled down
					// By defailt it looks for an image tag:
					opener: function(openerElement) {
						// openerElement is the element on which popup was initialized, in this case its <a> tag
						// you don't need to add "opener" option if this code matches your needs, it's defailt one.
						return openerElement.is('img') ? openerElement : openerElement.find('img');
					}
				},
			 	closeOnContentClick: true
			 });
		},

		initFancyBox: function()
		{
			if (!is_undefined($.fn.fancybox))
			{
				$('.fancybox').fancybox({
					helpers: {
						overlay: {
						  locked: false
						}
					}
				});

				$('.fancybox-media').fancybox({
					openEffect  : 'none',
					closeEffect : 'none',
					helpers : {
						media : {},
						overlay: {
						  locked: false
						}
					}
				});

				$(".various").fancybox({
					maxWidth	: 800,
					maxHeight	: 600,
					fitToView	: false,
					width		: '70%',
					height		: '70%',
					autoSize	: false,
					closeClick	: false,
					openEffect	: 'none',
					closeEffect	: 'none',
					helpers: {
						overlay: {
						  locked: false
						}
					}
				});
			}
		},

		carousel: function()
		{
			if ($('#carousel').length > 0 && $('#carousel').find('.carousel__item').length > 1)
			{
				$('#carousel').slick({
					infinite: true,
					dots: false,
					draggable: true,
					speed: 170,
					slidesToShow: 4,
		  			slidesToScroll: 1,
					prevArrow: '<button type="button" class="carousel__navigation carousel__navigation_prev slick-prev"></button>',
					nextArrow: '<button type="button" class="carousel__navigation carousel__navigation_next slick-next"></button>',
					responsive: [
						{
							breakpoint: 1024,
							settings: {
								slidesToShow: 3,
								slidesToScroll: 3,
								infinite: true,
								dots: true
							}
						},
						{
							breakpoint: 600,
							settings: {
								slidesToShow: 2,
								slidesToScroll: 2
							}
						},
						{
							breakpoint: 480,
							settings: {
								slidesToShow: 1,
								slidesToScroll: 1
							}
						}
					]
				});
			}
		},

		slickSider: function()
		{
			if ($('#slider').length > 0 && $('#slider').find('.slider__item').length > 1)
			{
				$('#slider').slick({
					infinite: true,
					dots: true,
					draggable: false,
					speed: 300,
					fade: true,
					autoplay: true,
					autoplaySpeed: 4500,
					pauseOnHover: false,
					cssEase: 'ease',
					prevArrow: '<button type="button" class="slider__navigation slider__navigation_prev slick-prev"></button>',
					nextArrow: '<button type="button" class="slider__navigation slider__navigation_next slick-next"></button>'
				});
			}
		},

		disableHover: function()
		{
			var timer;
			window.addEventListener('scroll', function() {
				clearTimeout(timer);
				
				if(!body.hasClass('disable-hover')) {
					body.addClass('disable-hover');
				}

				timer = setTimeout(function(){
					body.removeClass('disable-hover');
				},500);
			}, false);
		},

		initTooltip: function()
		{
			var tooltip, item;

			body.on('click', function(e){
				if (!$(e.target).hasClass('tooltip') && !$(e.target).hasClass('js-tooltip') && $('.tooltip.show').length)
				{
					$('.tooltip.show').removeClass('animate');

					setTimeout(function(){
						$('.tooltip.show').removeClass('show');
					}, 300);
				}
			});

			body.on('click', '.js-tooltip', function(e){
				e.preventDefault();
				
				item = $(this);

				if ((item.data('tooltip') || item.find('.tooltip').length) && !$(e.target).hasClass('tooltip'))
				{
					tooltip = item.data('tooltip');

					if (!item.find('.tooltip').length)
					{
						var span = document.createElement('span');
						span.className = 'tooltip';
						span.innerHTML = tooltip;

						item.append(span);
					}

					if (item.find('.tooltip').hasClass('show'))
					{
						item.find('.tooltip').removeClass('animate');

						setTimeout(function(){
							item.find('.tooltip').removeClass('show');
						}, 200);
					}
					else
					{
						item.find('.tooltip').addClass('show');

						setTimeout(function(){
							item.find('.tooltip').addClass('animate');
						}, 10);
					}
				}
			});
		},

		init: function()
		{
			this.disableHover();

			this.initFastclick();

			this.initPopup();
			this.initMask();
			this.initSelect();
			this.initSandwich();

			this.ajaxForm.init();
			this.cart.init();

			browser.init();
		}

	};

})( jQuery );


// __lib.js

// TODO: wfloader проверить шрифты по отдельности, назначить обработчики ошибок
var waitForLoading = 0;
var loadCheck = loadChecker();

//--------------------------------------------------------------------------------------------------------------------

// Загрузка необходимых для выполнения скриптов. Удалить если не нужно.
// По загрузке всех нужных штук сработает событие window ready, если в скрипте будет висеть обработчик этого события,
// рекомендуется грузить его здесь во возможных избежание ощибок (вешать обработчик через ev.on);

function loadScript(src, callback) {
	var body = document.getElementsByTagName('body')[0];

	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = src;
	script.setAttribute('async', '');

	if (callback) {
		if (script.addEventListener) {
			script.addEventListener('load', callback, false);
		} else {
			script.attachEvent('onreadystatechange', function() {
				if (script.readyState == 'complete' || script.readyState == 'loaded') {
					callback();
				}
			});
		}
	}
	head.appendChild(script);
}

(function () {
	var sriptsToLoad = [];
	var head = document.getElementsByTagName('head')[0];
	var scripts = head.getAttribute('data-scripts');
	if (scripts == null || scripts == '') return;

	scripts = scripts.split(' ');
	for (var i = scripts.length - 1; i >= 0; i--) {
		if (scripts[i] && scripts[i] != '') {
			sriptsToLoad.push('/templates/redcollar/js/' + scripts[i] + '.js');
		}
	};

	// var sriptsToLoad = [
	// 	//перечислить здесь через запятую
	// 	'templates/millservice/js/main.js',
	// 	'templates/millservice/js/text.js'
	// ];

	waitForLoading++;
	var num = sriptsToLoad.length;



	function ckeckScripts() {
		var loaded = 0;
		var check = function() {
			loaded++;
			if (loaded == num) {
				loadCheck();
			}
		}
		return check;
	}
	var check = ckeckScripts();

	for (var i = 0; i < sriptsToLoad.length; i++) {
		loadScript(sriptsToLoad[i], check);
	}

})();

// всякие проверки загрузки--------------------------------------------------------------------------------------------------------------------
function loadChecker() {
	var loaded = 0;
	var check = function() {
		loaded++;
		if (loaded == waitForLoading) {
			externalReady();
		}
	}
	return check;
}

function externalReady() {
	if (IE.version > 8) {
		if (document.readyState === 'interactive' || document.readyState === 'complete') {
			allReady();
		} else {
			if (document.addEventListener) {
				document.addEventListener('DOMContentLoaded', function() {
					allReady.call(window);
				}, false);
			} else {
				document.attachEvent('onreadystatechange', function() {
					if (document.readyState == 'complete') {
						allReady.call(window);
					}
				});
			}
		}
	} else {
		if (document.readyState === 'complete') {
			allReady();
		} else {
			ev.on(window, 'load', function() {
				allReady();
			});
		}
	}
}

function allReady() {
	ev.trigger(window, 'allready');
};

//обработчик событий--------------------------------------------------------------------------------------------------------------------
var ev = {
	on: function(container, elem, eventName, handler) {

		var deligate = false;
		if (arguments.length == 3) {
			handler = eventName;
			eventName = elem;
		} else if (arguments.length == 4) {
			var deligate = true;
		}

		if (container.length && container != window) { //да-да, у window бывает lenght
			for (var i = 0; i < container.length; i++) {
				this.on(container[i], eventName, handler)
			};
		} else {
			if (!container._eventHandlers) {
				container._eventHandlers = [eventName];
			}
			if (!container._eventHandlers[eventName]) {
				container._eventHandlers[eventName] = [];
			}

			container._eventHandlers[eventName].push({
				'handler' : handler,
				'deligate': deligate,
				'element' : elem
			});

			if (container['on' + eventName] == null) {
				container['on' + eventName] = handle;
			} else if (container['on' + eventName] != handle) {
				container._eventHandlers[eventName].push({
					'handler' : container['on' + eventName],
					'deligate': false,
					'element' : elem
				});
				container['on' + eventName] = handle;
			}
		}
	},
	off: function(elem, eventName, handler) {
		if (!elem._eventHandlers) return;
		var handlers = elem._eventHandlers[eventName];
		if (!handlers) return;
		for(var i = 0; i < handlers.length; i++) {
			if (handlers[i].handler == handler) {
				handlers.splice(i--, 1);
			}
		}
	},
	trigger: function(elem, eventName) {
		if (!elem._eventHandlers) {
			return;
		} else if (!elem._eventHandlers[eventName]) {
			return;
		} else {
			var handlers = elem._eventHandlers[eventName];
			for (var i = 0; i < handlers.length; i++) {
				handlers[i].handler.apply(elem, [].slice.call(arguments, 1));
			}
		}
	},
	when: function(elem, eventName, handler) {
		if (elem.complete) {
			handler.call(elem);
		} else {
			this.on(elem, eventName, handler);
			if (IE.version < 100) {
				elem.src = elem.src;
			}
		}
	}
};

function fixEvent (event) {
	event.preventDefault = function() {
		this.returnValue = false;
	}
	event.stopPropagation = function() {
		this.cancelBubble = true;
	}
	return event;
}

function handle (event) {
	var elem  = this;

	event = event || window.event;
	if (!event.preventDefault) {
		fixEvent (event)
	}

	eventName = event.type;
	if (!elem._eventHandlers) {
		return;
	} else if (!elem._eventHandlers[eventName]) {
		return;
	} else {	
		var target = event.target || event.srcElement;

		var handlers = elem._eventHandlers[eventName];
		for (var i = 0; i < handlers.length; i++) {
			if (handlers[i].deligate) {
				if (!is(target, handlers[i].element)) {
					return;
				}
				handlers[i].handler.apply(target, [event]);
			} else {
				handlers[i].handler.apply(elem, [event]);
			}
		}
	}
}
//определение ie и его версии (if (IE.version < 8) {console.log('хуево')})--------------------------------------------------------------------------
var IE = {
	version: function(){
		var version = 999;;
		if (navigator.appVersion.indexOf("MSIE") != -1) 
			version = parseFloat(navigator.appVersion.split("MSIE")[1]);
		return version;
	}()
}
//получение элементов--------------------------------------------------------------------------------------------------------------------
function getElements(context, name) {
		if(!context) return false;
		if (name.charAt(0) == '.') {
			name = name.substr(1);
			var elems = document.getElementsByClassName ? context.getElementsByClassName(name) : (function() {
				if (context.querySelectorAll) {
					return context.querySelectorAll('.' + name);
				} else {
					var all = context.getElementsByTagName('*'),
						elements = [];
					for (var i = 0; i < all.length; i++) {
						if (all[i].className && (' ' + all[i].className + ' ').indexOf(' ' + name + ' ') > -1) elements.push(all[i]);
					}
					return elements;
				}
			})();
		} else {
			elems = context.getElementsByTagName(name);
		};
	return elems;
};

function getElement(context, name) {
	if(!context) return false;
	if (name.charAt(0) == '.') {
		name = name.substr(1);
		var elems = document.getElementsByClassName ? context.getElementsByClassName(name)[0] : (function() {
			if (context.querySelector) {
				return context.querySelector('.' + name);
			} else {
				var all = context.getElementsByTagName('*');
				for (var i = 0; i < all.length; i++) {
					if (all[i].className && (' ' + all[i].className + ' ').indexOf(' ' + name + ' ') > -1) {
					 	return all[i];
					}
				}
				return false;
			}
		})();
	} else if (name.charAt(0) == '#') {
		name = name.substr(1);
		return context.getElementById(name);
	} else {
		//console.log(context.getElementsByTagName(name));
		return context.getElementsByTagName(name)[0];
	}
	return elems;
};

//работа с классами и др--------------------------------------------------------------------------------------------------------------------
function is(elem, name) {
	if (name.charAt(0) == '.') {
		className = name.substr(1);
		return elem.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(elem.className);
	} else if (name.charAt(0) == '#') {
		id = name.substr(1);
		return elem.id == id;
	} else {
		tag = name.toUpperCase();
		return elem.tagName == tag;
	}
}
function addClass(elem, className) {
	if (elem) {
		var re = new RegExp("(^|\\s)" + className + "(\\s|$)", "g");
		if (re.test(elem.className)) return elem;
		elem.className = (elem.className + " " + className).replace(/\s+/g, " ").replace(/(^ | $)/g, "")
	}
	return elem;
}
function removeClass(elem, className) {
	if (elem) {
		var re = new RegExp("(^|\\s)" + className + "(\\s|$)", "g");
		if (!re.test(elem.className)) return elem;
		elem.className = elem.className.replace(re, "$1").replace(/\s+/g, " ").replace(/(^ | $)/g, "")
	}
	return elem;
}
function closest(elem, toFind) {
	var el = elem.parentNode;
	if (is(el, toFind)) {
		return el;
	} else {
		return closest(el, toFind);
	}
}

//аякс--------------------------------------------------------------------------------------------------------------------
var ajax = {};
ajax.x = function() {
	try {
		return new ActiveXObject('Msxml2.XMLHTTP')
	} catch (e1) {
		try {
			return new ActiveXObject('Microsoft.XMLHTTP')
		} catch (e2) {
			return new XMLHttpRequest()
		}
	}
};
ajax.send = function(url, callback, method, data, sync) {
	var x = ajax.x();
	x.open(method, url, sync);
	x.onreadystatechange = function() {
		if (x.readyState == 4) {
			callback(x.responseText)
		}
	};
	if (method == 'POST') {
		x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	}
	x.send(data)
};
ajax.get = function(url, data, callback, sync) {
	var query = [];
	for (var key in data) {
		query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
	}
	ajax.send(url + '?' + query.join('&'), callback, 'GET', null, sync)
};
ajax.post = function(url, data, callback, sync) {
	var query = [];
	for (var key in data) {
		query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
	}
	query.push(encodeURIComponent('action') + '=' + encodeURIComponent('send'));
	ajax.send(url, callback, 'POST', query.join('&'), sync)
};

//оффсет--------------------------------------------------------------------------------------------------------------------
function offset(elem) {
	if (elem.getBoundingClientRect) {
		return getOffsetRect(elem);
	} else {
		return getOffsetSum(elem);
	}
}
function getOffsetSum(elem) {
	var top = 0, left = 0;
	while(elem) {
		top = top + parseInt(elem.offsetTop);
		left = left + parseInt(elem.offsetLeft);
		elem = elem.offsetParent;
	}

	return {top: top, left: left};
}
function getOffsetRect(elem) {
	var box = elem.getBoundingClientRect();

	var body = document.body;
	var docElem = document.documentElement;

	var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
	var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

	var clientTop = docElem.clientTop || body.clientTop || 0;
	var clientLeft = docElem.clientLeft || body.clientLeft || 0;

	var top  = box.top +  scrollTop - clientTop;
	var left = box.left + scrollLeft - clientLeft;

	return { top: Math.round(top), left: Math.round(left) };
}


//определение размеров окна------------------------------------------------------------------------------------------------------
function windowSize() {
	var width = 0, height = 0;
	if( typeof( window.innerWidth ) == 'number' ) {
		width = window.innerWidth;
		height = window.innerHeight;
	} else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
		width = document.documentElement.clientWidth;
		height = document.documentElement.clientHeight;
	} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
		width = document.body.clientWidth;
		height = document.body.clientHeight;
	}
	return {
		height: height,
		width: width
	};
}
// //определение положения прокрутки------------------------------------------------------------------------------------------------------
// function getScroll() {
// 	if(window.pageYOffset != undefined) {
// 		return {
// 			x: pageXOffset,
// 			y: pageYOffset
// 		}
// 	} else {
// 		var sx, sy, d = document, r = d.documentElement, b = d.body;
// 		sx = r.scrollLeft || b.scrollLeft || 0;
// 		sy = r.scrollTop || b.scrollTop || 0;
// 		return {
// 			x: sx,
// 			y: sy
// 		};
// 	}
// }

function next(elem){
	do {
		elem = elem.nextSibling;
	} while (elem && elem.nodeType != 1);
	return elem;
}

function prev(elem){
	do {
		elem = elem.previousSibling;
	} while (elem && elem.nodeType != 1);
	return elem;
}

function getStyle(el, styleProp) {
	if (el.currentStyle)
		var result = el.currentStyle[styleProp];
	else if (window.getComputedStyle)
		var result = document.defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
	return result;
}

window.imgResizer = function() {
	var imgs = Array.prototype.concat.apply([], document.querySelectorAll('.resize'));
	var conts = [];
	var coefs = [];

	var wait = function(w, h, c, i, add) {

		if (imgs[i].tagName != 'IMG') {
			resizeSingle(w, h, c, i);
		} else {
			ev.when(imgs[i], 'load', function() {
				resizeSingle(w, h, c, i);
			});	
		}
	}

	var resizeSingle = function(w, h, c, i, add) {
		var coef = imgs[i].clientWidth/(imgs[i].clientHeight);
		if (c >= coef) {
			tmp = Math.floor(w/coef);
			imgs[i].style.width = w + 'px';
			imgs[i].style.height = 'auto';
			imgs[i].style.left = '0';
			imgs[i].style.top = Math.floor((h - tmp)/2) + 'px'; //ie не любит дробные значения
		} else {
			tmp = Math.floor(h*coef);
			imgs[i].style.width = 'auto';
			imgs[i].style.height = h + 'px';
			imgs[i].style.top = '0';
			imgs[i].style.left = Math.floor((w - tmp)/2) + 'px';
		}
	}

	var resizeOne = function(img) {
		var w, h, c, tmp;
		var cont = img.parentNode;
		if (is(img, '.moving')) {
			add = 200;
		} else {
			add = 0;
		}
		w = cont.clientWidth;
		h = cont.clientHeight + add;
		c = w/h;

		ev.when(img, 'load', function() {
			var coef = img.clientWidth/(img.clientHeight);
			if (c >= coef) {
				tmp = Math.floor(w/coef);
				if (tmp) {
					img.style.width = w + 'px';
					img.style.height = 'auto';
					img.style.left = '0';
					img.style.top = Math.floor((h - tmp)/2) + 'px'; //ie не любит дробные значения
				}
			} else {
				tmp = Math.floor(h*coef);
				if (tmp) {
					img.style.width = 'auto';
					img.style.height = h + 'px';
					img.style.top = '0';
					img.style.left = Math.floor((w - tmp)/2) + 'px';
				}
			}
		});	
	}

	var resize = function() {
		var add;
		var w, h, c, tmp;
		for (var i = 0; i <= imgs.length - 1; i++) {
			if (is(imgs[i], '.moving')) {
				add = 200;
			} else {
				add = 0;
			}
			w = conts[i].clientWidth;
			h = conts[i].clientHeight + add;
			c = w/h;
			wait(w, h, c, i);
		};
	}

	var init = function() {
		for (var i = 0; i <= imgs.length - 1; i++) {
		 	conts.push(imgs[i].parentNode);
		};
		resize();
	}

	var add = function(el) {
		imgs.push(el);
		conts.push(el.parentNode);
	}

	return {
		'init': init,
		'resize': resize,
		'resizeOne': resizeOne,
		'add': add
	}
}();



// _app.canvasmask.js

;( function( $ ){
	"use strict";

	/*
		$.app.canvasmask.init();
		$.app.canvasmask.canvasmask.mask($(this)[0], '../images/hex-mask.png');
	*/

	var imagecanvas, imagecontext, mask, img;

	$.app.canvasmask = {

		mask: function(image, mask_src)
		{
			img = document.createElement('img');
			img.src = image.src;
	      	
	      	img.onload = function() {
	      		var width = img.width, height = img.height;

	      		mask = document.createElement('img');
				mask.src = mask_src;

				mask.onload = function() {
					imagecanvas.width  = width;
					imagecanvas.height = height;

					imagecontext.drawImage(mask, 0, 0, width, height);
					imagecontext.globalCompositeOperation = 'source-atop';
					imagecontext.drawImage(img, 0, 0);

					image.src = imagecanvas.toDataURL();

					$(image).addClass('is-masked');
	      		}
	      	}

		},

		init: function(debug)
		{
			imagecanvas = document.createElement('canvas');
			imagecontext = imagecanvas.getContext('2d');

			if (debug)
			{
				document.body.appendChild(imagecanvas);
			}
		}

	};

})( jQuery );


// _app.cart.js

;(function ($) {
	"use strict";

	$.app = $.app = $.app || {};

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

	$.app.cart = {
		init: function()
		{
			$('.quantity').quantity();
		}
	};

})(jQuery);


// $.define('сounter', {
//     events: {
//         'b-inited': 'oninit',
//         'click .js-inc': 'onClickPlus',
//         'click .js-dec': 'onClickMinus'
//     },
//     methods: {
//         oninit: function() {
//             this.$info = this.$node.find('.js-info');
//             this.count = 0;
//         },

//         /**
//          * Обработчик клика на плюс
//          */
//         onClickPlus: function() {
//             this.inc();
//             this.update();
//         },

//         /**
//          * Обработчик клика на минус
//          */
//         onClickMinus: function() {
//             this.dec();
//             this.update();
//         },

//         /**
//          * Увеличить счетчик
//          */
//         inc: function() {
//             this.count += this.params.step;
//         },

//         /**
//          * Уменьшить счетчик
//          */
//         dec: function() {
//             this.count -= this.params.step;
//         },

//         /**
//          * Нарисует новое значение
//          */
//         update: function() {
//             this.$info.text(this.count);
//         }
//     }
// });

/*

;(function($) {
    $.cart = {
    	init: function()
    	{
    		$.cart.initBuy();
    		$.cart.initRemove();
    		$.cart.initControll();
    	},
    	initBuy: function()
    	{
    		$('.add-cart-trigger').on('click', function(e){
    			e.preventDefault();
    			$.cart.buyItem( $(this).attr('href').split('-')[1] );
    			return false;
    		});
    	},
    	initControll: function()
    	{
    		$('.increase-cart-trigger').on('click', function(e){
    			e.preventDefault();
    			$.cart.increase( $(this).attr('href').split('-')[1] );
    			return false;
    		});

			$('.decrease-cart-trigger').on('click', function(e){
    			e.preventDefault();
    			$.cart.decrease( $(this).attr('href').split('-')[1] );
    			return false;
    		});
    	},
    	initRemove: function()
    	{
    		$('.remove-cart-trigger').on('click', function(e){
    			e.preventDefault();
    			$.cart.removeItem($(this).attr('href').split('-')[1], this);
    			return false;
    		});
    	},
    	removeItem: function(id, _self_)
		{
			$.post('/ajax/cart/remove/', { item: id }, function(data) {
				if( $('#catalog-product-'+id).find('.incart').length > 0 )
				{
					$('#catalog-product-'+id).find('.incart').remove();
				}
				
				if($(_self_).hasClass('catalog-product-incart'))
				{
					$(_self_).remove();
				}
				else
				{
					$('#incart-item-'+id).html( '<a href="#item-'+id+'" title="Добавить в корзину" class="button-cart add-cart-trigger">Купить кресло</a>' );
					$.cart.initBuy();
				}

		        $.cart.addedItem('Товар удален из корзины.');
			});
		},
		buyItem: function(id)
		{
			var count = 1;
			var size = 0;
			
			if( $('#count-'+id).length > 0 ) {
				count = parseInt( $('#count-'+id).val() ) ;
			}

			if( $('#size-list').find('.current').length > 0 ) {
				size = parseInt( $('#size-list').find('.current').attr('href').split('-')[1] );
			}
			
			$.post('/ajax/cart/buy/', { item: id, size: size, count: count }, function(data) {
				if( $('#cart-count').length > 0 )
				{
					$('#cart-count').html( data.count );
				}
				
				if( $('#cart-price').length > 0 )
				{
					$('#cart-price').html( data.money );
				}
				
				if( $('#count-'+id).length > 0 )
				{
					$('#count-'+id).val(1);
				}

				if( $('#catalog-product-'+id).find('.incart').length == 0 ) {
					$('#incart-item-'+id).html( '<a href="#item-' + id + '" title="Удалить из корзины" class="button-remove remove-cart-trigger">Кресло в корзине</a>' );

					$.cart.initRemove();
				}

				$.cart.addedItem();
			}, 'JSON');
		},
		addedItem: function(text, large)
		{
		    text = !text ? 'Товар добавлен в корзину.' : text ;
		    large = !large ? false : large ;
		    var timeout = !large ? 1500 : 5000, addclass = !large ? '' : ' adding-large' ;
		    
		    if( $('body').find('#item-added-to-cart').length == 0 ) {
		        $('body').append('<div id="item-added-to-cart" class="showadding' + addclass + '"><div class="adding-inner"><div class="adding-content">' + text + '</div></div></div>');
		        setTimeout(function(){
		            $('body').find('#item-added-to-cart').remove() ;
		        },timeout);
		    }
		    else {
		        setTimeout(function(){
		            $('body').find('#item-added-to-cart').remove() ;
		        },timeout);
		    }
		},
		increase: function(id)
		{
			if( $('#count-'+id).length > 0 ) {
		        var value = parseInt( $('#count-'+id).val() ) ;
		            value = !value ? 0 : value ;
		            
		            value++ ;
		            
		            $('#count-'+id).val( value ) ;
		    }
			
			if($('#cart-table').length > 0)
			{
				$.cart.reTotal(id);
			}
		},
		decrease: function(id)
		{
			if( $('#count-'+id).length > 0 )
			{
				var value = parseInt( $('#count-'+id).val() ) ;
					value = !value ? 1 : value ;
					
					if( value >= 2 ) value-- ;
					else value = 1 ;
					
					$('#count-'+id).val( value ) ;
			}
			
			if($('#cart-table').length > 0)
			{
				$.cart.reTotal(id);
			}
		},
		reTotal: function(id)
		{
			if( $('#count-'+id).length > 0 )
			{
				var count = parseInt( $('#count-'+id).val() );
				
				$.post('/ajax/cart/recount/', { item: id, count: count }, function(data) {
					var price = parseInt( $('#cart-item-price-'+id).html() );
					var total = count * price;

					$('#cart-item-total-'+id).html(total) ;
					$('#cart-total-count').html(data.count);
					$('#cart-total-price').html(data.money);

					if( $('#cart-count').length > 0 )
					{
						$('#cart-count').html( data.count );
					}
					
					if( $('#cart-price').length > 0 )
					{
						$('#cart-price').html( data.money );
					}
				}, 'JSON');
			}
		}
	}

	$.cart.init();
})(jQuery);
*/


// _app.map.js

;(function ($) {
	"use strict";

	$.app = $.app = $.app || {};

	var map, _this;

	$.app.map = {
		
		google: function( mapid )
		{
			var map = new google.maps.Map(d.getElementById( 'map-conteiner-' + mapid ), {
				zoom: 14,
				zoomControl: !1,
				panControl: !1,
				scrollwheel: !1,
				navigationControl: !1,
				mapTypeControl: !1,
				scaleControl: !1,
				draggable: !0,
				disableDoubleClickZoom: !0,
				center: new google.maps.LatLng(45.053548,39.016056)
			});

			var mapOptions = {
			zoom: 17,
			zoomControl: !1,
			panControl: !1,
			scrollwheel: !1,
			navigationControl: !1,
			mapTypeControl: !1,
			scaleControl: !1,
			draggable: !0,
			disableDoubleClickZoom: !1,
			streetViewControl: !1,
			overviewMapControl: !1,
			center: new google.maps.LatLng(latitude, longitude)
			};

			var image = {
			url: '/images/marker@2x.png',
			size: new google.maps.Size(26, 32),
			origin: new google.maps.Point(0, 0),
			scaledSize: new google.maps.Size(26, 32),
			anchor: new google.maps.Point(26, 32)
			};

			var map = new google.maps.Map($(container), mapOptions);

			var marker = new google.maps.Marker({
			position: new google.maps.LatLng(latitude, longitude),
			map: map,
			icon: image,
			flat: true,
			title: 'г. Москва, Тессинский переулок, вл. 2-6, 19'
			});

			function toggleBounce()
			{
			if (marker.getAnimation() !== null) {
				marker.setAnimation(null);
			} else {
				marker.setAnimation(google.maps.Animation.BOUNCE);

				setTimeout(function(){
					marker.setAnimation(null);
				}, 2000);
			}
			}

			marker.addListener('click', toggleBounce);
		},

		yandex: function(data)
		{
			map = {
				ymap: null,

				draw: function()
				{
					this.ymap = new ymaps.Map(data.container, {
						center: [data.latitude, data.longitude],
						zoom: 14
					}, {
						searchControlProvider: 'yandex#map'
					});
				},

				controls: function()
				{
					// this.ymap.link.controls
					//     .add('smallZoomControl', { right: 10, top: 15 })
					//     .add(new ymaps.control.ScaleLine())
					//     .add('searchControl', { left: 20, top: 20 });
				},

				placemark: function()
				{
					// var GeoObject = new ymaps.GeoObject({
					// 	// Описание геометрии.
					// 	geometry: {
					// 		type: "Point",
					// 		coordinates: [data.latitude, data.longitude]
					// 	},
					// 	// Свойства.
					// 	properties: {
					// 		// Контент метки.
					// 		iconContent: 'Я тащусь',
					// 		hintContent: 'Ну давай уже тащи'
					// 	}
					// }, {
					// 	// Опции.
					// 	// Иконка метки будет растягиваться под размер ее содержимого.
					// 	preset: 'islands#blackStretchyIcon',
					// 	// Метку можно перемещать.
					// 	draggable: false
					// });

					this.ymap.geoObjects
						// .add(GeoObject)
						.add(new ymaps.Placemark([data.latitude, data.longitude], {
							balloonContent: 'цвет <strong>воды пляжа бонди</strong>'
						}, {
							preset: 'islands#icon',
							iconColor: '#0095b6'
						}))

					// this.ymap.link.geoObjects.add(
					// 	new ymaps.Placemark( [data.latitude, data.longitude], {}, {
			  //               iconImageHref: '/images/marker.png',
			  //               iconImageSize: [26, 32],
			  //               iconImageOffset: [-3, -42]
			  //           })
					// );
				},

				init: function()
				{
					this.draw();
					this.controls();
					this.placemark();
				}
			};

			ymaps.ready(function(){
				map.init();
			});
		},

		paste: function(data)
		{
			this[data.provider](data);
		},

		load: function()
		{
			_this = this;

			if (body.find('.js-load-map').length)
			{
				body.find('.js-load-map').each(function() {
					console.log($(this));
					if ($(this).data('latitude') && $(this).data('longitude') && $(this).data('provider') && $(this).data('container'))
					{
						_this.paste({
							container	: $(this).data('container'),
							provider 	: $(this).data('provider'),
							latitude	: $(this).data('latitude'),
							longitude	: $(this).data('longitude')
						});
					}
				});
			}
		}
	};

	// window.initialize = $.app.map.load;

	$.app.map.load();

})(jQuery);


// _app.plugin.js

;(function ($) {
	"use strict";

	$.app = $.app = $.app || {};

	$.app.plugin = {

		init: function()
		{

		}

	};

})(jQuery);



// ;(function (window) {
// 	"use strict";

// 	var app = window.app = window.app || {};

// 	app.browser = {
// 		name: 'Chrome',

// 		getUrl: function (url) {
// 			return chrome.extension.getURL(url);
// 		}
// 	};

// })(window);


// _app.preload.js

;( function( $ ) {
	"use strict";

	if (!$.app)
	{
		$.app = {};
	}

	$.app.preload = {

		progress: function()
		{

		},

		images: function(arr)
		{
			console.log(arr);

			return !1;
			function cache( s, c )
			{
				var a, g, i, x, p = { i: {}, ac: 0, c: 0 };
				
				for (x in s)
				{
					a = s[x];
					i = new Image();
					i.onload = function () {
						p.c++
					};
					i.src = a;
					p.i[a] = i;
					p.ac++
				}
				
				function l() {
					g = Math.round(p.c * 100 / p.ac);
					if ( g < 100 ) setTimeout(l, 200);
					else typeof c == 'function' ? c() : '';
				}
				
				l();
			}

			// var preload = ["a.gif", "b.gif", "c.gif"];
			// var promises = [];
			// for (var i = 0; i < preload.length; i++) {
			//     (function(url, promise) {
			//         var img = new Image();
			//         img.onload = function() {
			//           promise.resolve();
			//         };
			//         img.src = url;
			//     })(preload[i], promises[i] = $.Deferred());
			// }
			// $.when.apply($, promises).done(function() {
			//   alert("All images ready sir!");
			// });


		}
	};

})(jQuery);

//cache ([ 'images/1.png', 'images/2.jpg', 'images/3.jpg' ], function() { // loaded })

// function preloadimages(arr){
//     var newimages=[], loadedimages=0
//     var postaction=function(){}
//     var arr=(typeof arr!="object")? [arr] : arr
//     function imageloadpost(){
//         loadedimages++
//         if (loadedimages==arr.length){
//             postaction(newimages) //call postaction and pass in newimages array as parameter
//         }
//     }
//     for (var i=0; i<arr.length; i++){
//         newimages[i]=new Image()
//         newimages[i].src=arr[i]
//         newimages[i].onload=function(){
//             imageloadpost()
//         }
//         newimages[i].onerror=function(){
//             imageloadpost()
//         }
//     }
//     return { //return blank object with done() method
//         done:function(f){
//             postaction=f || postaction //remember user defined callback functions to be called when images load
//         }
//     }
// }
 
// preloadimages(['1.gif', '2.gif', '3.gif']).done(function(images){
//  //call back codes, for example:
//  alert(images.length) //alerts 3
//  alert(images[0].src+" "+images[0].width) //alerts '1.gif 220'
// })

// preloadimages(['ed.jpg', 'fei.jpg', 'budapest.gif', 'duck.jpg']).done(function(images){
//     images.sort(function(a,b){
//         return a.width-b.width //sort images by each image's width property, ascending
//     })
//     alert(images[0].src) //alerts the src of the smallest image width wise
// })


// _app.sandwich.js

;(function ($) {
	"use strict";

	$.app = $.app = $.app || {};

	var _this;

	$.app.sandwich = {

		config: {
			keyHooks: !1,
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

		isOpen: function()
		{
			return body.hasClass('page-visible');
		},

		hide: function()
		{
			body.removeClass('page-open');

	        setTimeout(function(){
				body.removeClass('page-visible');
			}, 10);

	        $(this.config.overlay).css({
	            'visibility': 'hidden'
	        });
		},

		toggle: function()
		{
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
		},

		sandwichTrigger: function()
		{
			_this = this;

			if (_this.config.keyHooks)
			{
				body.on('keydown', function(e) {
					if(e.keyCode == 27 && _this.isOpen())
					{
						_this.toggle();
					}
				});
	    	};

			body.on('click', _this.config.selector, function(e){
		        e.preventDefault ? e.preventDefault() : e.returnValue = false;
				_this.toggle();
			});
		},

		overlayTrigger: function()
		{
			_this = this;

			body.on('click', _this.config.overlay, function(e){
				_this.hide();
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


// _app.share.js

// (function($){
//     $.app = {
//         module: {},
//         util: {
//             random: function(max) {
//                 return Math.floor(Math.random()*max);
//             },
//             isIpad: (navigator.userAgent.match(/iPad/i) != null || navigator.userAgent.match(/iPhone/i) != null)
//         },
//         page: {}
//     };

//     $.app.module.sharing = {

//         vk_upload_url: null,

//         openPopup: function(link, popupTitle) {
//             var popup,
//                 width  = 700,
//                 height = 400,
//                 left   = ($(window).width()  - width)  / 2,
//                 top    = ($(window).height() - height) / 2,
//                 url    = this.href,
//                 opts   = 'status=1' +
//                     ',width='  + width  +
//                     ',height=' + height +
//                     ',top='    + top    +
//                     ',left='   + left;

//             popup = window.open(link, popupTitle, opts);
//             popup.focus();

//             return popup;
//         },
//         notifyBackend: function(url) {
//             $.ajax({
//                 url: url,
//                 type: 'get',
//                 dataType: 'json',
//                 success: function(response) {
//                     if(response.status) {
//                         $.app.command(response.command, response.data);
//                     }
//                 }
//             });
//         },
//         vkShare: function(notifyUrl) {
//             VK.Auth.login(function(response) {
//                 if (response.session) {
//                     VK.Api.call('photos.getWallUploadServer', {}, function(response) {
//                         $.ajax({
//                             url: $.app.module.sharing.vk_upload_url,
//                             type: 'post',
//                             dataType: 'json',
//                             data: response.response,
//                             success: function(response) {
//                                 VK.Api.call('photos.saveWallPhoto', response, function(response) {
//                                     var photo = response.response[0];
//                                     $.popup.message({
//                                         message: 'Подтвердите публикацию на стену ВКонтакте',
//                                         button: {
//                                             title: 'Опубликовать',
//                                             onclick: function() {
//                                                 VK.Api.call('wall.post', {
//                                                     message:
//                                                     'Присоединяйся к моей команде и помоги мне выиграть поездку на Финал Лиги Чемпионов УЕФА от ЮниКредит Банка!' +
//                                                     '\n\n' +
//                                                     'Участвуй в розыгрыше главного приза и футбольных мячей с символикой Финального матча турнира. ' +
//                                                     $('.slide-account__content__invite-link__widget a').attr('href'),
//                                                     attachments: photo.id
//                                                 }, function(response) {
//                                                     $.popup.closeAll(true);
//                                                     if (response.response && response.response.post_id)
//                                                     {
//                                                         if (notifyUrl)
//                                                         {
//                                                             $.app.module.sharing.notifyBackend(notifyUrl);
//                                                         }
//                                                     }
//                                                 });
//                                             }
//                                         }
//                                     });
//                                 });
//                             }
//                         });
//                     });
//                 }
//             });
//         },
//         init: function() {
//             var _self = $.app.module.sharing;

//             $('body').on('click', '.social-share', function(e) {
//                 var $link = $(this), href = $link.attr('href'), notifyUrl = $link.data('notifyurl');

//                 e.preventDefault();

//                 if(!$link.hasClass('state-inactive') && !$link.hasClass('state-disabled')) {

//                     if ($link.hasClass('ico-social_vk'))
//                     {
//                         _self.vkShare(notifyUrl);
//                     }
//                     else
//                     {
//                         var share_popup = _self.openPopup(href, null);
//                         if(notifyUrl) {
//                             var interval = setInterval(function() {
//                                 if (!share_popup || share_popup.closed)
//                                 {
//                                     _self.notifyBackend(notifyUrl);
//                                     clearInterval(interval);
//                                 }
//                             }, 1000);
//                         }
//                     }
//                 }
//             });
//         }
//     };
// })(jQuery);


// _app.slider.js

;(function ($) {
	"use strict";

	$.app = $.app = $.app || {};

	var _this, _slider, _timer, current, next, slider_interval;

	$.app.slider = {

		config: {
			slider: '.slider',
			item: '.js-slider-slide',
			nav: '.js-slider-nav',
			active: 'active',
			timeout: 3000,
			delay: 4000
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

		_getCurrent: function()
		{
			return _slider.find(_this.config.item + '.' + _this.config.active);
		},

		_getPrev: function(current)
		{	
			if (current.prev(_this.config.item).length)
			{
				next = current.prev(_this.config.item);    
			}
			else
			{
				next = _slider.find(_this.config.item).last();
			}

			return next;
		},

		_getNext: function(current)
		{	
			if (current.next(_this.config.item).length)
			{
				next = current.next(_this.config.item);    
			}
			else
			{
				next = _slider.find(_this.config.item).eq(0);
			}

			return next;
		},
		
		animateSlider: function(current, next)
		{
			current = _this._getCurrent();
			next = _this._getNext(current);

			if (typeof(next) !== 'undefined')
			{
				next.addClass(_this.config.active);
				current.removeClass(_this.config.active);
			}
		},

		initNavigation: function()
		{
			$('body').on('click', _this.config.nav, function(){
				var direction = $(this).data('direction');

				clearInterval(slider_interval);
				current = _this._getCurrent();

				if (direction == 'prev')
				{
					next = _this._getPrev(current);
				}
				else if (direction == 'next')
				{
					next = _this._getNext(current);
				}

				_this.animateSlider(current, next);

				_this.startInterval();
			});
		},
		
		startInterval: function()
		{
			if (_this.config.delay < _this.config.timeout)
			{
				current = _this._getCurrent();
				next = _this._getNext(current);

				next.addClass(_this.config.active);
				current.removeClass(_this.config.active);
			}

			slider_interval = setInterval(function(){
				_this.animateSlider(current, next);
			}, _this.config.timeout );
		},

		initSlider: function()
		{
			_this = this;

			_slider = $(_this.config.slider);

			if (_slider.find(_this.config.item).length > 1)
			{

				clearInterval(slider_interval);

				_this.startInterval();

				_this.initNavigation();
			}
		},

		init: function(config)
		{
			_this = this;

			this.extend(config);
			this.initSlider();
		}

	};

})(jQuery);


// _app.stick.js

;(function ($) {
	"use strict";

	$.app = $.app = $.app || {};

	var body = $('body'), _this, _scrollTop, _timeout;

	$.app.stick = {

		config: {
			delay: 10,
			element: '.js-stick'
		},

		cache: [],

		calc: function()
		{
			_this = this;

			if ($(_this.config.element).length)
			{
				$(_this.config.element).map(function(index) {
					$(this).addClass('js-stick-' + index);
					_this.cache[index] = $(this).offset().top;
				});
			}
		},

		check: function()
		{
			_this = this;

			_scrollTop = $(window).scrollTop();

			var x, stick;

			for(x in _this.cache)
			{
				stick = $('.js-stick-' + x);

				if (_scrollTop >= _this.cache[x])
				{
					if (!stick.hasClass('sticked'))
					{
						stick.addClass('sticked');
					}
				}
				else
				{
					if (stick.hasClass('sticked'))
					{
						stick.removeClass('sticked');
					}
				}
			}
		},

		initScroll: function()
		{
			_this = this;

			$(window).on('scroll', function(e){

				clearTimeout(_timeout);

				_timeout = setTimeout(function() {

					_this.check();

				}, _this.config.delay);
				
			});
		},

		init: function()
		{
			this.calc();
			this.check();
			
			this.initScroll();
		}

	};

})(jQuery);


// _app.tabs.js

;(function ($) {
    "use strict";

    $.app = $.app = $.app || {};

    $.app.tabs = {

        config: {
            mouseevent:   'click',
            attribute:    'href',
            animation:    false,
            autorotate:   false,
            pauseonhover: true,
            delay:        2000,
            active:       1,
            container:    false,
            controls:     {
                prev: '.prev',
                next: '.next'
            }
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

        init: function(config)
        {
            this.extend(config);
        }

    };

})(jQuery);


// _fns.js

var tools = {
    isString: function (obj) {
        return typeof obj === 'string';
    },
    isObject: function (obj) {
        return typeof obj === 'object';
    },
    isNumber: function (obj) {
        return typeof obj === 'number';
    },
    isUndefined: function (value) {
        return typeof value === 'undefined';
    },
    isDefined: function (value) {
        return typeof value !== 'undefined';
    }
};

function is_null(x)
{
	return x == null;
}

function is_undefined(x)
{
	return typeof(x) == 'undefined';
}

function is_touch_device()
{
    return ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch || 'onmsgesturechange' in window);
}

function declOfNum(number, titles) {  
    cases = [2, 0, 1, 1, 1, 2];  
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];  
}
// declOfNum(count, ['найдена', 'найдено', 'найдены']);

var shuffle = function( array ) {
	return array.sort( function() {
		return Math.random() - 0.5;
	} );
};

function updateCaptcha(captcha, ev)
{
    ev.preventDefault();

    if ($(captcha).length)
    {
        $(captcha).attr('src', $(captcha).attr('src').split( '?' )[0] + '?v=' + Math.random());
    }

    return !1;
}

// Возвращает функцию, которая не будет срабатывать, пока продолжает вызываться.
// Она сработает только один раз через N миллисекунд после последнего вызова.
// Если ей передан аргумент `immediate`, то она будет вызвана один раз сразу после
// первого запуска.
function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

// Использование
// var myEfficientFn = debounce(function() {
// All the taxing stuff you do
// }, 250);
// window.addEventListener('resize', myEfficientFn);


function once(fn, context) { 
    var result;

    return function() { 
        if(fn) {
            result = fn.apply(context || this, arguments);
            fn = null;
        }

        return result;
    };
}

// // Пример использования
// var canOnlyFireOnce = once(function() {
//     console.log('Запущено!');
// });

// canOnlyFireOnce(); // "Запущено!"
// canOnlyFireOnce(); // Не запущено


var getAbsoluteUrl = (function() {
    var a;

    return function(url) {
        if(!a) a = document.createElement('a');
        a.href = url;

        return a.href;
    };
})();

// Пример использования
// getAbsoluteUrl('/something');


/**
 * @param {string} s1 Исходная строка
 * @param {string} s2 Сравниваемая строка
 * @param {object} [costs] Веса операций { [replace], [replaceCase], [insert], [remove] }
 * @return {number} Расстояние Левенштейна
 */
function levenshtein(s1, s2, costs) {
    var i, j, l1, l2, flip, ch, chl, ii, ii2, cost, cutHalf;
    l1 = s1.length;
    l2 = s2.length;

    costs = costs || {};
    var cr = costs.replace || 1;
    var cri = costs.replaceCase || costs.replace || 1;
    var ci = costs.insert || 1;
    var cd = costs.remove || 1;

    cutHalf = flip = Math.max(l1, l2);

    var minCost = Math.min(cd, ci, cr);
    var minD = Math.max(minCost, (l1 - l2) * cd);
    var minI = Math.max(minCost, (l2 - l1) * ci);
    var buf = new Array((cutHalf * 2) - 1);

    for (i = 0; i <= l2; ++i) {
        buf[i] = i * minD;
    }

    for (i = 0; i < l1; ++i, flip = cutHalf - flip) {
        ch = s1[i];
        chl = ch.toLowerCase();

        buf[flip] = (i + 1) * minI;

        ii = flip;
        ii2 = cutHalf - flip;

        for (j = 0; j < l2; ++j, ++ii, ++ii2) {
            cost = (ch === s2[j] ? 0 : (chl === s2[j].toLowerCase()) ? cri : cr);
            buf[ii + 1] = Math.min(buf[ii2 + 1] + cd, buf[ii] + ci, buf[ii2] + cost);
        }
    }
    return buf[l2 + cutHalf - flip];
}
	
// function doOnOrientationChange()
// {
// 	switch(window.orientation) 
// 	{  
// 		case -90:
// 		case 90:
// 		alert('landscape');
// 		break; 
// 		default:
// 		alert('portrait');
// 		break; 
// 	}
// }

// window.addEventListener('orientationchange', doOnOrientationChange);

// doOnOrientationChange();


// Smoothly Scroll to page anchors
// var jump = function (e) {
// // Stop the "hard" jump.
// e.preventDefault();
// //Get the target
// var target = $(this).attr("href");
// // Use animated scrolling.  The .stop() prevents scroll queue.
// $('html,body').stop().animate({
//   // Find top-position of target-element and set it as scroll target.
//   scrollTop: $(target).offset().top
//   // Animation Delay:
//   }, 500, function () {
//     // Attach the hash (#jumptarget) to the page url.
//     location.hash = target;
//   });
// }

// // Instantiate this as follows in your document.ready();
// //$(document).ready(function () {
// //$('a[href*=#]').bind("click", jump);
// //return false;
// //});


// _modal.js

/*
$.modal.init('.trigger-popup');
$.modal.open('popup-choose-photo-source');
$.modal.open('popup-choose-photo-source/nested-tab');
*/

;(function ($) {
	"use strict";
	
	var _this, body = $('body'), win = $(window), doc = $(document), popup = null, noty = null, temp = null, nested = [], dialog = '', trigger = '', selector_cache, notify_timeout, resizeTimeout;

	$.modal = function(power) {
	// $.modal = {
		
		// _config: {
		// 	wrapper			: 	'body',
		// 	popup 			: 	'.popup',
		// 	trigger 		: 	'.js-open-popup',
		// 	dialog 			: 	'.js-popup-dialog',
		// 	speed 			: 	550,
		// 	overlay 		: 	{
		// 		enable	: !0,
		// 		element	: '#overlay'
		// 	},
		// 	overlayclose	: 	!0,
		// 	cssPosition		: 	!0,
		// 	bodyclass		: 	!0,
		// 	hashCheck		: 	!0,
		// 	hashChange		: 	!0,
		// 	keyHooks		: 	!0,
		// 	template		: 	{
		// 		error: 'tmpl-popup-error',
		// 		message: 'tmpl-popup-message',
		// 		notification: 'tmpl-notification'
		// 	}
		// },

		// _extend: function(config)
		// {
		// 	if (typeof config !== 'undefined')
	 //    	{
	 //    		var x;
	 //    		for (x in config)
	 //    		{
	 //    			if (typeof _this._config[x] !== 'undefined')
	 //    				_this._config[x] = config[x];
	 //    		}
	 //    	}
		// },

		// private: {
		// 	open: function()
		// 	{

		// 	},

		// 	preload: function()
		// 	{},
			
		// 	_getPopup: function(selector)
		// 	{},

		// 	_getPosition: function(popup)
		// 	{},

		// 	_changePosition: function(selector)
		// 	{},

		// 	_checkScroll: function(popup)
		// 	{

		// 	},

		// 	close: function(element, callback)
		// 	{

		// 	},

		// 	initWrapClose: function()
	 //    	{
	 //    	},

		// 	hooks: function()
	 //        {

	 //        },

		// 	show: function(selector, overlay, bodyclass)
		// 	{

		// 	},

		// 	clicks: function(trigger)
		// 	{

		// 	}
		// },

		// public: {
		// 	open: function(selector, overlay, bodyclass)
		// 	{
			
		// 	},

		// 	notification: function(title, message)
		// 	{

		// 	},

		// 	message: function(title, message, btn)
		// 	{

		// 	},

		// 	error: function(title, message)
		// 	{

		// 	}
		// },

		// open: function()
		// {

		// },
	
		// init: function(trigger, config)
		// {
		// 	_this = this;
		// 	_this._extend(config);
		// }
	};

	$.modal({
		//'.js-open-popup'
		cssPosition: false,
		wrapper: '.layout-wrapper'
	});


})(jQuery);


// _popover.js

;( function( $ ) {
	"use strict";

	$.fn.extend({
		popover: function(options)
		{
			this.defaults = {};
			var settings = $.extend( {}, this.defaults, options );

			return this.each(function() {
				var that = $(this), $dropdown, $target, isopen = false;

				function hideDropdown(ignore)
				{
					if (isopen)
					{
						if (typeof(ignore) !== 'undefined' && $('#dropdown-' + ignore).hasClass('open'))
						{
							$dropdown = $('.dropdown.open').not('#dropdown-' + ignore);
						}
						else
						{
							$dropdown = $('.dropdown.open');
						}

						$dropdown.removeClass('animate');
					
						setTimeout(function(){
				  			$dropdown.removeClass('open');
				  		}, 400);

				  		isopen = false;
				  	}
				}

				function getPosition(target) {
					var left = 0, ww = $(window).width(), top = 0;

					if ($(target).hasClass('trigger-dropdown'))
					{
						$target = $(target);
					}
					else {
						$target = $(target).closest('.trigger-dropdown');
					}

					left = $target.offset().left + $target.width();
					top = $target.offset().top + $target.height() + 17;
					
					return { 'left': left, 'top': top };
				}

				that.check = function() {
				
				};

				that.clicks = function() {
					that.on('click', function(e) {
						e.preventDefault();

						var block = $(this).data('dropdown'), $dropdown, onOpenScrollTop;

						if ($('#dropdown-' + block).length > 0 && $('#dropdown-' + block).hasClass('open'))
						{
							hideDropdown();
						}
						else {

							if ($('#dropdown-' + block).length == 0)
							{
								$dropdown = $(tmpl('tmpl_dropdown_' + block, {}));
								$('body').append($dropdown);
							}
							else
							{
								$dropdown = $('#dropdown-' + block);
							}
							
							if (!$('#dropdown-' + block).hasClass('open'))
							{
								onOpenScrollTop = $(window).scrollTop();
								
								$dropdown.css(getPosition(e.target));
								$dropdown.toggleClass('open').timeoutClass('animate');

								setTimeout(function(){
									isopen = true;
								}, 10);
							}
						}
					});

					$('body').on('click', function(e){
						if ((isopen === true || $('.dropdown.open').length) && $(e.target).closest('.dropdown').length == 0)
						{
							if ($(e.target).closest('.trigger-dropdown').length || $(e.target).hasClass('trigger-dropdown'))
							{
								var ignore = '';

								if ($(e.target).closest('.trigger-dropdown').length)
								{
									ignore = $(e.target).closest('.trigger-dropdown').data('dropdown');
								}
								else if ($(e.target).hasClass('trigger-dropdown'))
								{
									ignore = $(e.target).data('dropdown');
								}

								hideDropdown(ignore);
							}
							else
							{
								hideDropdown();
							}
						}
				    });

					$(window).scroll(function(){
						if (isopen === true && (((onOpenScrollTop + scrollShift) < $(window).scrollTop()) || ((onOpenScrollTop - scrollShift) > $(window).scrollTop())))
						{
							hideDropdown();
						}
					});
				};

				that.init = function() {
					that.clicks();
					that.check();
				}

				that.init();
			});
		}
	});
})( jQuery );


// _upload.js

;( function( $ ){
	"use strict";

	$.app = $.app = $.app || {};

	var _this, body = $('body');

	$.app.upload = {

		config: {
			size: [120, 120],
			selector: '.js-file-preview',
			container: '.js-file-container',
			wrapper: '.js-file-wrapper',
			image: '.js-file-image'
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

		_load: function(evt)
		{
			// im.width = 111;
			// im.height = 109;

			// $.app.canvasmask.mask(im, '../images/hex-mask.png', {
			// 	w: 111, h: 109
			// });
		},

		initUpload: function()
		{
			_this = this;

			body.on('change', _this.config.selector, function(e){
				
				var wrapper = $(this).closest(_this.config.wrapper),
					container = wrapper.find(_this.config.container),
					preview, reader, file, image, width, height, sourceX, sourceY, destX, destY, canvas, context;
					
				if (container.find(_this.config.image).length)
				{
					container.find(_this.config.image).remove();
				}
			
				preview 				= document.createElement('img');
				preview.className		= 'profile-picture__image__src' + _this.config.image.replace('.', ' ');

				canvas = document.createElement('canvas');
				context = canvas.getContext('2d');
			
				if ($(this).prop('files'))
				{
					file = $(this).prop('files')[0];

					if (typeof FileReader !== "undefined" && (/image/i).test(file.type)) 
					{
						image = new Image();
						image.src = URL.createObjectURL(file);

						image.onload = function()
						{
							if (image.width > _this.config.size[0])
							{
								width = Math.ceil( (image.width * _this.config.size[0]) / image.height );
								height = _this.config.size[0];
							}
							else
							{
								height = Math.ceil( (image.height * _this.config.size[0]) / image.width );
								width = _this.config.size[0];
							}

							canvas.width  = width;
							canvas.height = height;

							sourceX = Math.ceil(_this.config.size[0]/2 - width/2);
							sourceY =  Math.ceil(_this.config.size[1]/2 - height/2);

							destX = canvas.width / 2 - image.width / 2;
							destY = canvas.height / 2 - image.height / 2;

					        context.drawImage(image, 0,0, image.width, image.height, 0,0, width, height);

							preview.width  = width;
							preview.height = height;
							preview.src = canvas.toDataURL();

							container.append(preview);
						}

						// image.onload = function()
						// {
						// 	preview.src = URL.createObjectURL(file);
							
						// 	reader = new FileReader();

						// 	reader.onload = (function (im) {
						// 		return function (evt) {
						// 			im.src = evt.target.result;
						// 			_this._load(im);
						// 		};
						// 	}(preview));

						// 	reader.readAsDataURL(file);

						// 	console.log(preview, file);
						// }
					}
				}
			});

		},

		init: function(config)
		{
			this.extend(config);
			this.initUpload();
		}

	};

})( jQuery );


// _viewport.js

;(function ( $, window, document ) {
	"use strict";

	var viewport = 0,
    	wheight = $(window).height(),
    	scrollTop;

    $.fn.viewport = function ( options ) {
        options = $.extend( {}, $.fn.viewport.options, options );

        $.fn.viewport.options.items = this;

        if (!$.fn.viewport.options.elements.length)
		{
			$.fn.viewport.calculate();
		}

		if ($.fn.viewport.options.elements.length)
		{
			$.fn.viewport.animate();
	    }

	    $(window).scroll(function(){
			$.fn.viewport.animate();
		});

	    $(window).resize(function(){
			$.fn.viewport.calculate();
		});
    };

    $.fn.viewport.options = {
        items: {},
        elements: {}
    };

	$.fn.viewport.calculate = function() {
		$.fn.viewport.options.elements = $.fn.viewport.options.items.map(function(){
			if ($(this).length) {
				return $(this);
			}
        });
	}

    $.fn.viewport.animate = function() {
		scrollTop = $(window).scrollTop();

		$.fn.viewport.options.elements.map(function(){
			viewport = scrollTop + wheight;

	        if ($(this).offset().top <= viewport && !$(this).hasClass('active'))
	        {
	        	$(this).addClass('active');
	        }
	    });
	}

})( jQuery, window, document );

//$('.effected').viewport();


// init.js

$(window).load(function() {
	$.app.init();
});

basket.require(
    { url: 'require.js' },
    { url: 'require.config.js', skipCache: true },
    { url: 'libs.js' }
);

basket.require(
    { url: 'require.js' },
    { url: 'require.config.js', skipCache: true },
    { url: 'libs.js' }
);

basket
    .require({ url: 'missing.js' })
    .then(function () {
        // Success
    }, function (error) {
        // There was an error fetching the script
        console.log(error);
    });

    basket.require({ url: 'jquery-2.0.0.min.js', key: 'jquery' });

basket.require({ url: 'jquery.min.js', expire: 2 })
basket.require({ url: 'jquery.min.js', execute: false });

// fetch and cache the file
basket.require({ url: 'jquery.min.js' });
// fetch and cache again
basket.require({ url: 'jquery.min.js', unique: 123 });


var whiteCSS = 'body { background-color: white; }';
var blackCSS = 'body { background-color: black; }';
var duration = 1000;
var stopped = false;
var css = null;
var intervalId = null;
function start(node) {
    css = css === whiteCSS ? blackCSS : whiteCSS;
    stylesheet.replaceStyleSheet(node, css, function (err, style) {
        if (err) {
            alert(err); // For IE8. I don't like it but this should never happen.
        } else {
            if (!stopped) {
                setTimeout(function () {
                    start(style);
                }, duration);
            }
        }
    });
}
function stop() {
    stopped = true;
}
start();




stylesheet.ignoreKB262161 = false; // Toggle this for different results.
        var TOO_MANY_STYLES = 100;
        var css = 'body { background-color: grey }';
        var callbacks = [];
        var x;
        for (x = 0; x < TOO_MANY_STYLES; x++) {
            callbacks.push(async.apply(stylesheet.appendStyleSheet, css));
        }
        async.parallel(callbacks, function(err, styles) {
            if (err) {
                alert(err);
            } else {
                alert('Successfully created ' + styles.length);
            }
        });

