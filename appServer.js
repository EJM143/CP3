/**
 *  Name: Edale Miguel
 *  Date: November 13, 2024
 * 
 *  This code sets up a simple Express server for managing appointments, medications, and health logs 
 *  in a health care tracking system. It includes routes to retrieve and add data for each category, 
 *  along with basic error handling and middleware for parsing JSON requests. The server runs on port 3000 
 * and serves static files from the 'public' directory.
 */

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database'); 
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); 

// Store data 
let appointments = [];
let medications = [];
let healthLogs = [];

// Routes

// Get all appointments
app.get('/appointments', (req, res) => {
    res.json(appointments); 
});

// Add a new appointment

app.post('/appointments', (req, res) => {
    const { date, time, description } = req.body;
    if (!date || !time || !description) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const newAppointment = { date, time, description };
    appointments.push(newAppointment);
    res.json(newAppointment);
});


// Get all medications
app.get('/medications', (req, res) => {
    res.json(medications); 
});

// Add a new medication
app.post('/medications', (req, res) => {
    const { name, dosage, frequency, startDate } = req.body;
    if (!name || !dosage || !frequency || !startDate) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const newMedication = { name, dosage, frequency, startDate };
    medications.push(newMedication); 
    res.json(newMedication); 
});

// Get all health logs
app.get('/healthLogs', (req, res) => {
    res.json(healthLogs); 
});

// Add a new health log
app.post('/healthLogs', (req, res) => {
    const { date, notes } = req.body;
    if (!date || !notes) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const newHealthLog = { date, notes };
    healthLogs.push(newHealthLog); 
    res.json(newHealthLog); 
});

// Error handler 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
