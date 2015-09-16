window.DynamicToolbarPreloadImages = function () {
    var not_loaded = arguments.length;
    for (var i = 0; i < arguments.length; i++) {
        $(new Image()).load(function () {
            if (--not_loaded < 1) {
                // Callback all images are loaded
            }
        }).attr('src', arguments[i])
    }
}

var imageUrlPrefixPreloaded = 'http://217.118.92.254:8080/image/'
window.DynamicToolbarPreloadImages(
    imageUrlPrefixPreloaded + 'tm.png',
    imageUrlPrefixPreloaded + 'tl.png',
    imageUrlPrefixPreloaded + 'trmb.png',
    imageUrlPrefixPreloaded + 'upbtib.png'
)
