
if (Meteor.isClient) {
    var MAP_ZOOM = 16;

    Template.map.onCreated(function() {
        GoogleMaps.ready('map', function(map) {

            var markers = {};
            var latLng = Geolocation.latLng();
            var myloc = new google.maps.Marker({
                position: new google.maps.LatLng(latLng.lat, latLng.lng),
                icon: {
                    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                    scale: 5
                },
                map: map.instance
            });

            Markers.find().observe({

                added: function (document) {
                    var event = Events.find({_id: document.event_id}).fetch()[0];

                    var marker = new google.maps.Marker({
                        animation: google.maps.Animation.DROP,
                        position: new google.maps.LatLng(document.lat, document.lng),
                        map: map.instance,
                        // We store the document _id on the marker in order
                        // to update the document within the 'dragend' event below.
                        id: document._id
                    });


                    var contentString = '<div id="content">'+
                        '<div id="siteNotice">'+
                            '<input id =' + document._id + ' type=button value="Delete Markers">'+
                        '</div>'+
                        '<h1 id="firstHeading" class="firstHeading">' + event.food_type + " at "+event.name + '</h1>'+
                        '<div id="bodyContent">'+
                        '<p>' + "Location: " + event.place + '</p>'+
                        '<p>' + event.description + '</p>'+
                        '</div>';

                    var infowindow = new google.maps.InfoWindow({
                        content: contentString,
                        maxWidth: 200
                    });

                    google.maps.event.addListener(infowindow,'domready',function(){
                        $('#siteNotice').click(function() {
                            Markers.remove(marker.id);
                        });
                    });

                    marker.addListener('click', function() {
                        infowindow.open(map, marker);
                    });

                    markers[document._id] = marker;
                },
                changed: function (newDocument, oldDocument) {
                    markers[newDocument._id].setPosition({ lat: newDocument.lat, lng: newDocument.lng });
                },
                removed: function (oldDocument) {
                    markers[oldDocument._id].setMap(null);
                    google.maps.event.clearInstanceListeners(markers[oldDocument._id]);
                    delete markers[oldDocument._id];
                }
            });
        });
    });

    Meteor.startup(function() {
        GoogleMaps.load({ v: '3', key: 'AIzaSyDVKrva_571qoW2M01JF9RBVJFbhSpr6pQ', libraries: 'geometry,places' });
    });

    Template.map.helpers({
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
}