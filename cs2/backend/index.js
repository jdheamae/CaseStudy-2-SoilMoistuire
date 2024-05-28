const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const SoilMoisture = require('./soil'); 
const cors = require('cors');
const app = express();
const port = 5001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://192.168.100.161:27017/soilMoistureDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Routes
app.post('/api/soilMoistureDB', async (req, res) => {
    const { soil_moisture, timestamp, date, soil_status } = req.body;

    if (soil_moisture === undefined ||  soil_status === undefined) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const newRecord = new SoilMoisture({
            soil_moisture,
            timestamp: new Date(),
            date,
            soil_status
        });
        await newRecord.save();
        res.status(201).json({ message: 'Data saved successfully', data: newRecord });
    } catch (error) {
        console.error(error); // Log error for debugging
        res.status(500).json({ error: 'Failed to save data' });
    }
});

// GET route to fetch data
app.get('/api/soilMoistureDB', async (req, res) => {
    try {
        const data = await SoilMoisture.find({});
        res.status(200).json(data);
    } catch (error) {
        console.error(error); // Log error for debugging
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});