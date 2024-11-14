/** 
 *  Name: Edale Miguel
 *  Date: November 13, 2024
 * 
 *  This code connects to an SQLite database and creates three tables for storing health-related data: 
 *  appointments, medications, and health logs. 
 */


const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./myhealthtracker.db', (err) => {
    if (err) {
        console.error('Error opening database', err);
    } else {
        console.log('Database connected');
    }
});

// Create appointments table 
db.run(`
    CREATE TABLE IF NOT EXISTS appointments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL,
        time TEXT NOT NULL,
        description TEXT NOT NULL,
        medication_id INTEGER,
        FOREIGN KEY (medication_id) REFERENCES medications(id)
    )
`, (err) => {
    if (err) {
        console.error('Error creating appointments table:', err);
    } else {
        console.log('Appointments table created (if it didn\'t exist already)');
    }
});

// Create medications table
db.run(`
    CREATE TABLE IF NOT EXISTS medications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        dosage TEXT NOT NULL,
        frequency TEXT NOT NULL,
        start_date TEXT NOT NULL
    )
`, (err) => {
    if (err) {
        console.error('Error creating medications table:', err);
    } else {
        console.log('Medications table created (if it didn\'t exist already)');
    }
});

// Create health_logs table 
db.run(`
    CREATE TABLE IF NOT EXISTS health_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL,
        notes TEXT,
        appointment_id INTEGER,
        FOREIGN KEY (appointment_id) REFERENCES appointments(id)
    )
`, (err) => {
    if (err) {
        console.error('Error creating health logs table:', err);
    } else {
        console.log('Health logs table created (if it didn\'t exist already)');
    }
});

module.exports = db;
