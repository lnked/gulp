function googleMap()
{
	var arr = {
		'moscow': {
			city: 'г. Москва',
			title: 'Москва',
			street: 'Верхняя Масловка, д. 20, стр. 1.',
			phone: '(495) 645-83-54',
			email: 'info@itsntk.ru',
			coords: [ 55.795316,37.562272 ]
		},
		'krasnodar': {
			city: 'г. Краснодар',
			title: 'Краснодар',
			street: 'ул. Дальняя, 39/3',
			phone: '(861) 278-98-34',
			email: 'info@itsntk.ru',
			coords: [ 45.060932,38.964575 ]
		}
	};

	var mapOptions = {
		zoom: 13,
		zoomControl: !0,
		zoomControlOptions: {
			style: google.maps.ZoomControlStyle.LARGE,
			position: google.maps.ControlPosition.LEFT_TOP
		},
		panControl: !1,
		panControlOptions: {
			position: google.maps.ControlPosition.LEFT_TOP
		},
		scrollwheel: !1,
		navigationControl: !1,
		mapTypeControl: !1,
		scaleControl: !0,
		draggable: !0,
		disableDoubleClickZoom: !1,
		center: new google.maps.LatLng(arr.krasnodar.coords[0], arr.krasnodar.coords[1])
	};

	var map = new google.maps.Map(document.getElementById('map-conteiner'), mapOptions);

	function addMarker( ar, map )
	{
		var contentString = [
			'<div class="map-content">',
				'<h2 class="firstHeading">'+ ar['title'] + '</h2>',
				'<div class="map-bodyContent">',
					'<p>' + ar['city'] + '</p>',
					'<p>' + ar['street'] + '</p>',
					'<p><span>Телефон:</span>' + ar['phone'] + '</p>',
					'<p><span>Email:</span>' + ar['email'] + '</p>',
				'</div>',
			'</div>'
		].join('');

		var infowindow = new google.maps.InfoWindow({
			content: contentString,
			disableAutoPan: true,
			maxWidth: 500
		});

		var image = {
			url: './images/map-marker.png',
			size: new google.maps.Size(18, 25),
			origin: new google.maps.Point(0, 0),
			scaledSize: new google.maps.Size(18, 25),
			anchor: new google.maps.Point(18, 25)
		};

		var marker = new google.maps.Marker({
			position: new google.maps.LatLng( ar['coords'][0], ar['coords'][1] ),
			map: map,
			icon: image,
			flat: true,
			title: ar['title']
		});

		google.maps.event.addListener(marker, 'click', function() {
			if(infowindow)
			{
				infowindow.close();
			}

			infowindow.open(map, marker);
		});
	}
	
	for (var i in arr)
	{
		addMarker(arr[i], map);
	}

	$('body').on('click', '.js-toggle-class', function(e){
		var wrapper = $(this).closest('.js-toggle-wrapper'), city = '';

		if ($(this).data('city'))
		{
			city = $(this).data('city');
			map.setZoom(13);
			map.setCenter({lat: arr[city].coords[0], lng: arr[city].coords[1] });
		}
	});
}