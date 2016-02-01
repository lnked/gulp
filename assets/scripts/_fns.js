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