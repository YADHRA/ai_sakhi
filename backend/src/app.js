const express = require('express');
const cors = require('cors');
const config = require('./config/env');
const chatRoutes = require('./chat/routes');
const errorHandler = require('./middleware/errorHandler');
const { logRequest } = require('./utils/logger');

const app = express();

app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());
app.use(logRequest);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api', chatRoutes);

app.use(errorHandler);

module.exports = app;