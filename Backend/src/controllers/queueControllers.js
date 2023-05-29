const { pool } = require('../config/config');
const status = require('../utils/status');

const queueController = {
  createQueue: async (req, res) => {
    try {
      const { customer_id } = req.body;

      const createQueueQuery = `
            INSERT INTO Queue (
                customer_id,
                process_status
            )
            VALUES ($1, $2)
            RETURNING queue_id
            `;

      const process_status = status.in_queue;
      const createQueueValues = [customer_id, process_status];

      const result = await pool.query(createQueueQuery, createQueueValues);
      const newQueueId = result.rows[0].queue_id;

      res.status(201).json({ queue_id: newQueueId });
    } catch (error) {
      console.error('Error creating queue', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  getAllQueues: async (req, res) => {
    try {
      const getAllQueuesQuery = 'SELECT * FROM Queue';
      const result = await pool.query(getAllQueuesQuery);
      const queues = result.rows;
      res.status(200).json(queues);
    } catch (error) {
      console.error('Error getting all queues', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  getQueueById: async (req, res) => {
    try {
      const { id } = req.params;
      const getQueueByIdQuery = 'SELECT * FROM Queue WHERE queue_id = $1';
      const getQueueByIdValues = [id];
      const result = await pool.query(getQueueByIdQuery, getQueueByIdValues);
      const queue = result.rows;
      res.status(200).json(queue);
    } catch (error) {
      console.error('Error getting queue by id', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  takeQueueById: async (req, res) => {
    try {
      const { teller_id, desk_id } = req.body;
  
      // Check if teller_id or desk_id is missing
      if (!teller_id || !desk_id) {
        return res.status(400).json({ error: 'Missing teller_id or desk_id' });
      }
  
      // Find the queue entry with the lowest serial ID that is still in queue
      const { rows: queueToUpdate } = await pool.query(
        `SELECT * FROM Queue WHERE process_status = 'IN QUEUE' ORDER BY queue_id LIMIT 1`
      );
  
      console.log(queueToUpdate);
      console.log(req.body);
      if (queueToUpdate.length === 0) {
        return res
          .status(404)
          .json({ error: 'No queue entry in queue status found' });
      }
  
      const queueIdToUpdate = queueToUpdate[0].queue_id;
  
      // Update the teller ID and change the status to 'PROCESSING'
      await pool.query(
        `UPDATE Queue SET teller_id = $1, process_status = $2, desk_id = $3 WHERE queue_id = $4`,
        [teller_id, status.processing, desk_id, queueIdToUpdate]
      );
  
      res.status(200).json({ message: 'Queue entry updated successfully' });
    } catch (error) {
      console.error('Error updating queue entry:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  

  finishQueueById: async (req, res) => {
    try {
      const { id } = req.params;

      // Find the queue entry with the specified ID
      const { rows: queueToUpdate } = await pool.query(
        `SELECT * FROM Queue WHERE queue_id = $1`,
        [id]
      );

      if (queueToUpdate.length === 0) {
        return res.status(404).json({ error: 'No queue entry found' });
      }

      // Update the status to 'DONE'
      await pool.query(
        `UPDATE Queue SET process_status = $1 WHERE queue_id = $2`,
        [status.finished, id]
      );

      res.status(200).json({ message: 'Queue entry updated successfully' });
    } catch (error) {
      console.error('Error updating queue entry:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = queueController;
