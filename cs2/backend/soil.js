// soilMoistureModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const soilMoistureSchema = new Schema({
    soil_moisture: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date
    },
    soil_status: {
        type: String,
        required: true
    }
});

const SoilMoisture = mongoose.model('SoilMoisture', soilMoistureSchema);

module.exports = SoilMoisture;
