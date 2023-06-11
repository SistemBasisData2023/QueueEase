const { pool } = require('../config/config');
const desk_status = require('../utils/desk_status');

const tellerDeskController = {
  checkIn: async (req, res) => {
    try {
      // TODO : Create a query to check if if teller_id is teller type
      const { teller_id, desk_no } = req.body;

      // Create a query to check if there is any desk occupied
      const checkDeskQuery = `
            SELECT * FROM teller_desk
            WHERE status = $1 AND desk_no = $2
          `;
      const checkDeskValues = [desk_status.attending, desk_no];

      const result = await pool.query(checkDeskQuery, checkDeskValues);
      const desk = result.rows[0];

      if (desk) {
        return res.status(400).json({ message: 'Desk is occupied' });
      }

      // Create a query to update desk status
      const updateDeskQuery = `
            INSERT INTO teller_desk (desk_no, teller_id, status)
            VALUES ($1, $2, $3)
            RETURNING desk_no
          `;
      const updateDeskValues = [desk_no, teller_id, desk_status.attending];

      const updateResult = await pool.query(updateDeskQuery, updateDeskValues);
      const updatedDeskId = updateResult.rows[0].desk_no;

      res.status(200).json({
        success: true,
        message: 'Desk checked in successfully',
        desk_id: updatedDeskId,
      });
    } catch (error) {
      console.error('Error checking in desk:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  checkOut: async (req, res) => {
    try {
      const { desk_no } = req.body;

      // Create a query to check if the desk exists
      const checkDeskQuery = `
        SELECT * FROM teller_desk
        WHERE desk_no = $1
      `;
      const checkDeskValues = [desk_no];

      const result = await pool.query(checkDeskQuery, checkDeskValues);
      const desk = result.rows[0];

      if (!desk) {
        return res.status(400).json({ message: 'Desk does not exist' });
      }

      //create a query to check if the desk is not occupied and if the teller id is the same
      const checkDeskStatusQuery = `
        SELECT * FROM teller_desk
        WHERE status = $1 AND desk_no = $2
      `;
      const checkDeskStatusValues = [desk_status.attending, desk_no];

      const result2 = await pool.query(
        checkDeskStatusQuery,
        checkDeskStatusValues
      );

      if (!result2.rows[0]) {
        return res.status(400).json({ message: 'Desk is not occupied' });
      }

      // Create a query to update desk status, end time, and calculate duration
      const updateDeskQuery = `
        UPDATE teller_desk
        SET status = $1,
            end_time = CURRENT_TIMESTAMP,
            duration = CURRENT_TIMESTAMP - start_time
        WHERE desk_no = $2 AND status = $3
        RETURNING desk_no
      `;
      const updateDeskValues = [
        desk_status.finished,
        desk_no,
        desk_status.attending,
      ];

      const updateResult = await pool.query(updateDeskQuery, updateDeskValues);
      const updatedDeskId = updateResult.rows[0].desk_no;

      res.status(200).json({
        message: 'Desk checked out successfully',
        desk_id: updatedDeskId,
      });
    } catch (error) {
      console.error('Error checking out desk:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  checkDeskStatus: async (req, res) => {
    try {
      // Create a query to retrieve all desk statuses
      const checkAllDesksQuery = `
        SELECT desk_no, status FROM teller_desk
      `;

      const result = await pool.query(checkAllDesksQuery);
      const desks = result.rows;

      // Map the desks to an object with desk_no as key and status as value
      const deskStatusMap = desks.reduce((acc, { desk_no, status }) => {
        acc[desk_no] = status;
        return acc;
      }, {});

      res.status(200).json({ deskStatus: deskStatusMap });
    } catch (error) {
      console.error('Error checking desk status:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getTellerInfo: async (req, res) => {
    try {
      // Query to fetch teller info
      const query = `
        SELECT
          a.account_id AS teller_id,
          a.full_name AS Nama,
          a.email,
          SUM(d.duration) AS "total_duration"
        FROM account a
        LEFT JOIN teller_desk d ON a.account_id = d.teller_id
        LEFT JOIN transaction t ON a.account_id = t.teller_id
        WHERE a.type_id = 2
        GROUP BY a.account_id
      `;
  
      // Execute the query
      const result = await pool.query(query);
  
      // Send the fetched data as the response
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = tellerDeskController;
