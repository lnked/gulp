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