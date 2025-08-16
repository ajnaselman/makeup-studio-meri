const fs = require('fs');
const path = require('path');

const servicesPath = path.join(__dirname, 'services.json');
const appointmentsPath = path.join(__dirname, 'appointments.json');

function readJSON(filePath) {
    if (!fs.existsSync(filePath)) return [];
    return JSON.parse(fs.readFileSync(filePath));
}

function writeJSON(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = {
    servicesPath,
    appointmentsPath,
    readJSON,
    writeJSON
};
