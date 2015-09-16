function initialize()
{
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
    	center: new google.maps.LatLng(55.750418,37.648874),
    	styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]
	};
    
    var image = {
        url: './images/map-label@2x.png',
        size: new google.maps.Size(305, 82),
        origin: new google.maps.Point(0, 0),
        scaledSize: new google.maps.Size(305, 82),
        anchor: new google.maps.Point(40, 82)
    };

    var map = new google.maps.Map(document.getElementById( 'map-conteiner' ), mapOptions);
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(55.750418,37.648874),
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
}