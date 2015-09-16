/*
(function(){
	"use strict";

	var ua = navigator.userAgent.toLowerCase(),
		browser = {
			version: (ua.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [])[1],
			ie: (/msie/.test(ua)) && (!/opera/.test(ua)),
			opera: /opera/.test(ua),
			safari: /webkit/.test(ua),
			mozilla: (/mozilla/.test(ua)) && (!/(compatible|webkit)/.test(ua))
		},
		methods = [
			//'bind', 'unbind',
			//'load', 'unload',
			'onbeforeunload',
			'click', 'dblclick',
			'keyup', 'keydown', 'keypress',
			'ready', 'resize', 'scroll', 'select', 'submit',
			//'hover', 'focus', 'focusin', 'focusout', 'blur',
			'mouseup', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover'
		];

	methods.forEach(function(m) {
		Object.prototype[m] = function(e)
		{
			if (this.attachEvent)
			{
				return this.attachEvent('on' + m, arguments[0]);
			}
			return this.addEventListener(m, arguments[0], !1);
		}
	});

})();

window.onbeforeunload = function() {
    return 'Вы хотите покинуть страницу и отменить изменения?';
};

function is_touch_device(){
    return ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch || 'onmsgesturechange' in window);
}

function is_touch_device()
{
    var bool;

    if(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
      bool = true;
    } else {
      injectElementWithStyles(['@media (',prefixes.join('touch-enabled),('),mod,')','{#modernizr{top:9px;position:absolute}}'].join(''), function( node ) {
        bool = node.offsetTop === 9;
      });
    }

    return bool;
};
*/

/*
function() {
  define("appjs/widget/routes/fixed_on_scroll", ["jquery"], function(e) {
    return {
      create: function(t) {
        var n, r, i, s, o, u, a, f, l;
        r = 20, i = t, o = e(t).parents("section"), u = o.prev(), n = e(t.data("selector-bottom"));
        if(!i || !u || !n) return;
        return a = t.data("top-gap"), f = i.offset().top - (u.offset().top + u.outerHeight()) - a, e(window).on("scroll resize", function(t) {
          var s, o;
          return s = e(this).scrollTop(), s >= u.offset().top + u.outerHeight() + f ? (i.css("position", "fixed").css("right", i.data("right")), o = n.offset().top + n.outerHeight() - i.outerHeight() - s - r, o > a && (o = a), i.css("top", o)) : i.css("position", "").css("right", "").css("top", "")
        }), l = e(t.data("wrapper")), s = l.offset().left + l.outerWidth() - (i.offset().left + i.outerWidth()), e(window).on("resize", function(t) {
          return i.data("right", e(window).width - (l.offset().left + l.outerWidth()) + s)
        }), e(window).trigger("scroll").trigger("resize")
      }
    }
  })
}.call(this),


var array_merge = Function.prototype.apply.bind(Array.prototype.push);

array_merge(array1, array2);



document.addEventListener("DOMContentLoaded", function(e){
	
}, !1);

(function(){
var timer = 0;
function load()
{
    if(document.readyState==='complete')
    {
        clearTimeout(timer);
        console.log("document is ready now");
    }
}
timer = setTimeout(load,1000);
})();


ready
(function(exports, d) {
  function domReady(fn, context) {

    function onReady(event) {
      d.removeEventListener("DOMContentLoaded", onReady);
      fn.call(context || exports, event);
    }

    function onReadyIe(event) {
      if (d.readyState === "complete") {
        d.detachEvent("onreadystatechange", onReadyIe);
        fn.call(context || exports, event);
      }
    }

    d.addEventListener && d.addEventListener("DOMContentLoaded", onReady) ||
    d.attachEvent      && d.attachEvent("onreadystatechange", onReadyIe);
  }

  exports.domReady = domReady;
})(window, document);

domReady(function(event) {
    alert("dom is ready!");
  });



document.ready(function(e){
	alert("ready");
});

window.resize(function () {
    console.log("resize");
});

window.click(function () {
    console.log("click");
});

document.resize(function () {
    console.log("document click");
});
*/