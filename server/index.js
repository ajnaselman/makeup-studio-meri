const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const servicesRoutes = require('./services');
const appointmentsRoutes = require('./appointments');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/services', servicesRoutes);
app.use('/appointments', appointmentsRoutes);


app.get('/api/data', (req, res) => {
    res.json({ message: 'Pozdrav iz backenda 🚀' });
});

app.get('/', (req, res) => {
    res.send('Makeup Studio Meri Backend is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


