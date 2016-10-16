Events = new Mongo.Collection('events');

const schema = new SimpleSchema({
    name: {
        type: String,
        optional: false,
        label: "Event name"
    }, food_type: {
        type: String,
        optional: false,
        label: "Food type"
    }, description: {
        type: String,
        optional: false,
        label: "Description"
    },
    expiration_time: {
        type: Date,
        optional: false
    }, place: {
        type: String,
        optional: false
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
Events.attachSchema(schema);