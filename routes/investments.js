const express = require('express');

const Investment = require('../models/Investment');

const router = express.Router();

router.post('/investments', async (req, res) => {
  if (!req.body.investors || !req.body.investee) {
    return res.status(400).json({ message: 'Missing value' });
  }
  try {
    if (req.body.date) {
      console.log(req.body.date);
    }
    await Investment.create(req.body).then((newInvestment) => {
      res.status(200).json(newInvestment);
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', errors: err });
  }
});

router.get('/investments', async (req, res) => {
  try {
    await Investment.find().then((found) => {
      found
        ? res.status(200).json(found)
        : res.status(404).json({ message: 'Investments not found' });
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', errors: err });
  }
});

module.exports = router;
