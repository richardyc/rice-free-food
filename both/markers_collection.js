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
    lng: {
        type: Number,
        decimal: true,
        optional: true
    },

    lat: {
        type: Number,
        decimal: true,
        optional: true
    }
});

Markers.attachSchema(schema);