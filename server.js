const express = require('express');
const cors = require('cors');
const path = require('path');
const logger = require('morgan');

require('dotenv').config();

const app = express();
const connectDB = require('./db/db');
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(logger('dev'));
app.use(cors());

// API
app.use('/api', require('./routes/investments'));

// Serve static assets in production
if (
  process.env.NODE_ENV === 'production' ||
  process.env.NODE_ENV === 'staging'
) {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;
