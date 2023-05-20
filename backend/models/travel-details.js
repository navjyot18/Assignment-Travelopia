const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TravelDetailsSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    destination: {
        type: String,
    },
    travelers_count: {
        type: String,
    },
    budget_per_person: {
        type: String,
    },
});

const TravelDetailsSchemaExport = mongoose.model("travel-details2", TravelDetailsSchema);

module.exports = TravelDetailsSchemaExport;