(function ($) {
    
    // Init Wow
    wow = new WOW( {
        animateClass: 'animated',
        offset:       100
    });
    wow.init();
    
    // Navigation scrolls
    $('.navbar-nav li a').bind('click', function(event) {
        $('.navbar-nav li').removeClass('active');
        $(this).closest('li').addClass('active');
        var $anchor = $(this);
        var nav = $($anchor.attr('href'));
        if (nav.length) {
        $('html, body').stop().animate({				
            scrollTop: $($anchor.attr('href')).offset().top				
        }, 1500, 'easeInOutExpo');
        
        event.preventDefault();
        }
    });
    
    // About section scroll
    $(".overlay-detail a").on('click', function(event) {
        event.preventDefault();
        var hash = this.hash;
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 900, function(){
            window.location.hash = hash;
        });
    });
    
    //jQuery to collapse the navbar on scroll
    $(window).scroll(function() {
        if ($(".navbar-default").offset().top > 50) {
            $(".navbar-fixed-top").addClass("top-nav-collapse");
        } else {
            $(".navbar-fixed-top").removeClass("top-nav-collapse");
        }
    });
    
    $('.bxslider').bxSlider({
      adaptiveHeight: true,
      mode: 'fade'
    });
	
	map = new GMaps({
     el: '#map',
     lat: -0.4237207,
     lng: 36.9539251,
     zoom: 10,
     zoomControl : true,
     panControl : true,
     streetViewControl : true,
     mapTypeControlOptions: {
      mapTypeIds : ["hybrid", "roadmap", "satellite", "terrain", "osm", "esri-topo"]
    },
    overviewMapControl: false

   });

  map.addMapType("osm", {
      getTileUrl: function(coord, zoom) {
        return "http://tile.openstreetmap.org/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
      },
      tileSize: new google.maps.Size(256, 256),
      name: "OpenStreetMap",
      maxZoom: 18
    });
    map.addMapType("esri-topo", {
      getTileUrl: function(coord, zoom) {
        return "http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
      },
      tileSize: new google.maps.Size(256, 256),
      name: "esri-topo",
      maxZoom: 18
    });

    map.setMapTypeId("osm");


     map.addControl({
      position: 'top_right',
      content: 'Geolocate',
      style: {
        margin: '5px 6px 7px 0',
        padding: '1px 6px',
        fontSize: '16pt',
        fontFamily: 'monospace, lucida console',
        backgroundColor: '#e7e7e7',
        color: '#0e440b'
      },
      events: {
        click: function(){
          GMaps.geolocate({
            success: function(position){
              map.setCenter(position.coords.latitude, position.coords.longitude);
              map.addMarker({
                lat: position.coords.latitude,
                lng:  position.coords.longitude,
                title: 'Current Location',
                details: {
                  author: 'Our system determined that you are currently here'
                }
                });
            },
            error: function(error){
              alert('Geolocation failed: ' + error.message);
            },
            not_supported: function(){
              alert("Your browser does not support geolocation");
            }
          });
        }
      }
    });

    var searchControl = 
    '<form method="post" id="geocoding_form">'+
    '<div class="input">'+
    '<input type="text" id="address" class="geocode form-control " name="address" placeholder="Search Address/Location..."/>'+
    '<input type="submit" class="search btn btn-info" value="Search" /></div></form>';

 map.addControl({
      position: 'top_right',
      content: searchControl,
        style: {
        margin: '5px',
        backgroundColor: 'transparent'
      }
  });

    $('.search.btn').click(function(e){
		e.preventDefault();
       console.log('Click event');
      GMaps.geocode({
        address: $('#address').val().trim(),
        callback: function(results, status){
          if(status=='OK'){
            var latlng = results[0].geometry.location;
            map.setCenter(latlng.lat(), latlng.lng());
            map.addMarker({
              lat: latlng.lat(),
              lng: latlng.lng()
            });
          }
        }
      });
	return false;
    });


    
    
})(jQuery);
