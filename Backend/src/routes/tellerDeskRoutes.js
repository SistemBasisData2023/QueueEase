const express = require('express');
const router = express.Router();

const tellerDeskController = require('../controllers/tellerDeskControllers');

router.post('/checkin', tellerDeskController.checkIn);

router.put('/checkout', tellerDeskController.checkOut);

router.get('/checkDeskStatus', tellerDeskController.checkDeskStatus);

module.exports = router;
