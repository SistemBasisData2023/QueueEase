const express = require('express');
const router = express.Router();

const tellerDeskController = require('../controllers/tellerDeskControllers');

router.post('/checkin', tellerDeskController.checkIn);

router.put('/checkout', tellerDeskController.checkOut);

module.exports = router;
