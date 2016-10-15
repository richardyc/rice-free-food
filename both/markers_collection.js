/**
 * Created by heyuc on 10/14/2016.
 */
Markers = new Mongo.Collection('markers');

const schema = new SimpleSchema({
    event_id: { // KEEP
        optional: true,
        type: String,
        label: "User ID",
        max: 50,
        index: 1
    },
    location: {
        type: Object,
        optional: true,
        label: "Location info"
    },
    "location.longitude": {
        type: Number,
        decimal: true,
        optional: true
    },

    "location.latitude": {
        type: Number,
        decimal: true,
        optional: true
    }
});

Markers.attachSchema(schema);