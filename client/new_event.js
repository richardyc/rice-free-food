var MAP_ZOOM = 16;

var previous_marker = null;
Template.NewEvent.events({
   'click #submit_event': function() {
       if(!previous_marker) {
           alert('Must fill in information and location');
       } else {
           var name = $("#name").val();
           console.log('event name: ' + name);
           var description = $("#description").val();
           var place = $('#place').val();
           var type = $('#type').val();


           var lat = previous_marker.position.lat();
           console.log('event lat: ' + lat);

           var long = previous_marker.position.lng();
           
           var tomorrow = new Date();
           tomorrow.setDate(tomorrow.getDate() + 1);

           var id = Events.insert({name: name, description: description, food_type: type, expiration_time: tomorrow, place:place});
           Markers.insert({event_id: id, lat: lat, lng:long});
           Router.go('/');
       }
   }
});

Template.addMap.onCreated(function() {
    GoogleMaps.ready('map', function(map) {
        google.maps.event.addListener(map.instance, 'click', function(event) {
            if (previous_marker) {
                previous_marker.setMap(null);
            }
            var marker = new google.maps.Marker({
                draggable: true,
                animation: google.maps.Animation.DROP,
                position: new google.maps.LatLng(event.latLng.lat(), event.latLng.lng()),
                map: map.instance
                //id: document._id
            });

            previous_marker = marker;


            google.maps.event.addListener(marker, 'dragend', function(e) {
                Markers.update(marker.id, { $set: { lat: e.latLng.lat(), lng: e.latLng.lng() }});
            });
        });

        var latLng = Geolocation.latLng();
        var myloc = new google.maps.Marker({
            position: new google.maps.LatLng(latLng.lat, latLng.lng),
            icon: {
                path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                scale: 5
            },
            map: map.instance
        });

    });
});


Template.addMap.helpers({
    geolocationError: function() {
        var error = Geolocation.error();
        return error && error.message;
    },
    mapOptions: function() {
        var latLng = Geolocation.latLng();
        // Initialize the map once we have the latLng.
        if (GoogleMaps.loaded() && latLng) {
            return {
                center: new google.maps.LatLng(latLng.lat, latLng.lng),
                zoom: MAP_ZOOM
            };
        }
    }
});