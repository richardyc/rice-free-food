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
    }, expiration_time: {
        type: Date,
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