const express = require('express');
const router = express.Router();

const queueController = require('../controllers/queueControllers');

router.post('/add', queueController.createQueue);

router.get('/getAll', queueController.getAllQueues);

router.get('/get/:id', queueController.getQueueById);

router.put('/take', queueController.takeQueueById);

router.put('/finish/:id', queueController.finishQueueById);

module.exports = router;
