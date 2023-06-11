const express = require('express');
const router = express.Router();

const queueController = require('../controllers/queueControllers');

module.exports = function (io) {
  router.post('/add', queueController.createQueue);

  router.get('/getAll', (req, res) => {
    queueController.getAllQueues(req, res, io);
  });

  router.get('/get/:id', queueController.getQueueById);

  router.put('/take', (req, res) => {
    queueController.takeQueueById(req, res, io);
  });

  router.put('/finish/:id', queueController.finishQueueById);

  router.get('/getWaitingQueue', queueController.getWaitingQueue);

  router.get('/getByTeller', queueController.getQueueByTeller);

  router.get('/reset', (req, res) => {
    queueController.reset(req, res, io);
  });

 

  return router;
};
