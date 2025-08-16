const express = require('express');
const router = express.Router();
const { appointmentsPath, readJSON, writeJSON } = require('./db');

// Dohvati sve termine
router.get('/', (req, res) => {
    const appointments = readJSON(appointmentsPath);
    res.json(appointments);
});

// Dodaj novi termin
router.post('/', (req, res) => {
    const appointments = readJSON(appointmentsPath);
    const newAppointment = { id: Date.now(), ...req.body };
    appointments.push(newAppointment);
    writeJSON(appointmentsPath, appointments);
    res.json(newAppointment);
});

module.exports = router;
