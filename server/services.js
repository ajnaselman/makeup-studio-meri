const express = require('express');
const router = express.Router();
const { servicesPath, readJSON, writeJSON } = require('./db');

// Dohvati sve usluge
router.get('/', (req, res) => {
    const services = readJSON(servicesPath);
    res.json(services);
});

// Dodaj novu uslugu
router.post('/', (req, res) => {
    const services = readJSON(servicesPath);
    const newService = { id: Date.now(), ...req.body };
    services.push(newService);
    writeJSON(servicesPath, services);
    res.json(newService);
});

module.exports = router;
