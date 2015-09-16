// Scroll To Anchor

/*
// what should we do when scrolling occurs
var runOnScroll =  function(evt) {
  // not the most exciting thing, but a thing nonetheless
  console.log(evt.target);
};

// grab elements as array, rather than as NodeList
var elements = d.querySelectorAll("...");
elements = Array.prototype.slice.call(elements);

// and then make each element do something on scroll
elements.forEach(function(element) {
  window.addEventListener("scroll", runOnScroll);
});


var p = d.getElementById('par');
console.log(p.offsetLeft, p.offsetTop);

/// ----

offset: function( options ) {
    //...

    var docElem, win, rect, doc,
        elem = this[ 0 ];

    if ( !elem ) {
        return;
    }

    rect = elem.getBoundingClientRect();

    // Make sure element is not hidden (display: none) or disconnected
    if ( rect.width || rect.height || elem.getClientRects().length ) {
        doc = elem.ownerd;
        win = getWindow( doc );
        docElem = doc.dElement;

        return {
            top: rect.top + win.pageYOffset - docElem.clientTop,
            left: rect.left + win.pageXOffset - docElem.clientLeft
        };
    }
}

/// ----

function getElementOffset(element)
{
    var de = d.dElement;
    var box = element.getBoundingClientRect();
    var top = box.top + window.pageYOffset - de.clientTop;
    var left = box.left + window.pageXOffset - de.clientLeft;
    return { top: top, left: left };
}

/// ----

function getWindowRelativeOffset(parentWindow, elem) {
    var offset = {
        left : 0,
        top : 0
    };
    // relative to the target field's d
    offset.left = elem.getBoundingClientRect().left;
    offset.top = elem.getBoundingClientRect().top;
    // now we will calculate according to the current d, this current
    // d might be same as the d of target field or it may be
    // parent of the d of the target field
    var childWindow = elem.d.frames.window;
    while (childWindow != parentWindow) {
        offset.left = offset.left + childWindow.frameElement.getBoundingClientRect().left;
        offset.top = offset.top + childWindow.frameElement.getBoundingClientRect().top;
        childWindow = childWindow.parent;
    }

    return offset;
};

getWindowRelativeOffset(top, inputElement);
*/

(function($) {
    "use strict";

    var snatch = {
        config:
        {
            menu: '',
            link: '',
            anchor: '',
            direction: 'vertical',
            currentclass: '',
            menuHeight: 0,
            lastId: '',
            scrollItems: [],
            menuItems: [],
            menuPosition: 0
        },
        change: function(scrollTop)
        {
            scrollTop += snatch.config.menuHeight;
            
            var cur = snatch.config.scrollItems.map(function(){
                if ($(this).offset().top < scrollTop)
                {
                    return this;
                }
            });
            
            cur = cur[cur.length-1];
            var id = cur && cur.length ? cur[0].id : "";
            
            if (snatch.config.lastId !== id)
            {
                var section = id.split('-')[0];

                snatch.config.lastId = id;
                snatch.config.menuItems.removeClass(snatch.config.currentclass);
                snatch.config.menuItems.filter("[href=#"+section+"]").addClass(snatch.config.currentclass);
            }
        },
        calc: function()
        {
            var $item;

            snatch.config.scrollItems = snatch.config.menuItems.map(function(){
                if (this.hash.length)
                {
                    $item = $(this.hash + snatch.config.anchor);
                    /*
                    var item, tmp = $(this).attr("href").split('#');

                    if (typeof(tmp[1]) !== 'undefined' && $('#' + tmp[1] + '-anchor').length)
                    {
                        item = $('#' + tmp[1] + '-anchor');
                        
                        if (item.length) {
                            return item;
                        }
                    }
                    */
                }

                if ($item.length)
                {
                    return $item;
                }
            });
        },
        scrollSection: function(hash, animate)
        {
            hash = hash + snatch.config.anchor;
            
            var $target = $(hash);

            if ($target.length)
            {
                var top = $target.offset().top;
                
                if (animate)
                {
                    $('html,body').stop().animate({ 'scrollTop': top }, 'fast');
                }
                else
                {
                    $('html,body').scrollTop(top);
                }
            }
        },
        events: function()
        {
            /*
            window.addEventListener("scroll", function(evt) {
                console.log(evt.target);
            });

            window.addEventListener('resize', function(evt){
                console.log(evt.target);
            });

            $(window).scroll(function(){
                snatch.change($(document).scrollTop());
            });

            $(window).resize(function(){
                snatch.calc();
            });
            */
        },
        init: function(config)
        {
            snatch.config = $.extend(config);
            
            //var menu = $(snatch.config.menu);
            
            var menu = document.getElementById(this.config.menu);
            
            if (menu)
            {
                menu.style.border = '1px solid red';

                snatch.events();
            }

            /*
            if (menu.length)
            {
                snatch.calc();
    
                snatch.config.menuHeight = menu.outerHeight();
                snatch.config.menuItems = menu.find(snatch.config.link);
                snatch.config.menuPosition = menu.position().top;
                 
                snatch.config.menuItems.on('click', function(e) {
                    snatch.scrollSection(this.hash, true);
                });
        
                snatch.change($(document).scrollTop());

                snatch.events();
                
                setTimeout(function(){
                    if (window.location.hash.length > 1)
                    {
                        snatch.scrollSection(window.location.hash, false);
                    }
                }, 150);
            }
            */
        }
    }

    snatch.init({
        menu: 'navigation',
        link: '.navigation-link-trigger',
        anchor: '-anchor',
        currentclass: 'navigation__link_current'
    });
})(jQuery);



/*
Object.prototype.ev = function(e)
{
    if (this.attachEvent)
    {
        return this.attachEvent('on' + arguments[0], arguments[1]);
    }

    return this.addEventListener(arguments[0], arguments[1], false);
}

Object.prototype.resize = function(e)
{
    console.log(this);
    console.log(arguments[0]);
    console.log(arguments[1]);

    if (this.attachEvent)
    {
        return this.attachEvent('onresize', arguments[0]);
    }

    return this.addEventListener('resize', arguments[0], false);
}

window.resize(function () {
    console.log("resize");
});


window.ev('resize', function (e) {
    //console.log("resize");
});

window.ev('scroll', function (e) {
    console.log("scroll");
});
*/

/*
window.addEventListener("scroll", function(evt) {
    console.log(evt.target);
});

window.addEventListener('resize', function(evt){
    console.log(evt.target);
});

function addEvent(element, evnt, funct){
  if (element.attachEvent)
   return element.attachEvent('on'+evnt, funct);
  else
   return element.addEventListener(evnt, funct, false);
}

addEvent(document.getElementById('myElement'), 'click', function () { alert('hi!'); });

function scroll(e)
{
    alert(e);
} 

var el = window;

if(el.addEventListener)
{
    el.addEventListener('scroll', scroll, false);   
}
else if (el.attachEvent)
{
    el.attachEvent('onscroll', scroll);
}

window.onscroll = function (e) {
    // called when the window is scrolled.
}


var myFunctionReference = function() {
    
}

element.attachEvent('onclick', myFunctionReference);
element.addEventListener('click', myFunctionReference , false);


element.onclick = function () { };


var myimage = document.getElementById("myimage");
if (myimage.addEventListener) {
    // IE9, Chrome, Safari, Opera
    myimage.addEventListener("mousewheel", MouseWheelHandler, false);
    // Firefox
    myimage.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
}
// IE 6/7/8
else myimage.attachEvent("onmousewheel", MouseWheelHandler);



function MouseWheelHandler(e) {

    // cross-browser wheel delta
    var e = window.event || e; // old IE support
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    myimage.style.width = Math.max(50, Math.min(800, myimage.width + (30 * delta))) + "px";

    return false;
}



window.addEventListener('resize', function(event){
  // do stuff here
});



if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt)
  {
    var len = this.length >>> 0;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}

Image.prototype.resize = function(){
    alert('resize');
}

var img = new Image();
img.resize();

Object.prototype.resize = function(){

}



function Type() {}

var types = [
  new Array(),
  [],
  new Boolean(),
  true,             // останется неизменным
  new Date(),
  new Error(),
  new Function(),
  function() {},
  Math,
  new Number(),
  1,                // останется неизменным
  new Object(),
  {},
  new RegExp(),
  /(?:)/,
  new String(),
  'тест'            // останется неизменным
];

for (var i = 0; i < types.length; i++) {
  types[i].constructor = Type;
  types[i] = [types[i].constructor, types[i] instanceof Type, types[i].toString()];
}

console.log(types.join('\n'));

*/