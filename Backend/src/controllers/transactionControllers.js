const { v4: uuidv4 } = require('uuid');
const { pool } = require('../config/config');

const transactionController = {
  createTransaction: async (req, res) => {
    try {
      const {
        customer_id,
        teller_id,
        trans_type_id,
        trans_desc,
        trans_amount,
      } = req.body;
      const transaction_id = uuidv4(); // Generate a new UUID for the transaction_id

      // Check if customer_id exists
      const checkCustomerQuery = `
        SELECT customer_id FROM Customer WHERE customer_id = $1
      `;
      const checkCustomerValues = [customer_id];

      const customerResult = await pool.query(
        checkCustomerQuery,
        checkCustomerValues
      );
      const customer = customerResult.rows[0];

      if (!customer) {
        return res.status(400).json({ message: 'Invalid customer ID' });
      }

      // Check if teller_id exists
      const checkTellerQuery = `
        SELECT account_id FROM Account WHERE account_id = $1
      `;
      const checkTellerValues = [teller_id];

      const tellerResult = await pool.query(
        checkTellerQuery,
        checkTellerValues
      );
      const teller = tellerResult.rows[0];

      if (!teller) {
        return res.status(400).json({ message: 'Invalid teller ID' });
      }

      // Proceed with transaction creation
      const insertTransactionQuery = `
        INSERT INTO Transaction (transaction_id, customer_id, teller_id, trans_type_id, trans_date, trans_desc, trans_amount)
        VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, $5, $6)
      `;
      const insertTransactionValues = [
        transaction_id,
        customer_id,
        teller_id,
        trans_type_id,
        trans_desc,
        trans_amount,
      ];

      await pool.query(insertTransactionQuery, insertTransactionValues);

      res.status(201).json({ message: 'Transaction created successfully' });
    } catch (error) {
      console.error('Error creating transaction:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getTransactions: async (req, res) => {
    try {
      const { transaction_id } = req.params;
      
        const getTransactionsQuery = `
            SELECT * FROM Transaction WHERE transaction_id = $1
        `;
        const getTransactionsValues = [transaction_id];

        const result = await pool.query(getTransactionsQuery, getTransactionsValues);
        const transactions = result.rows;
        if (!transactions) {
          return res.status(404).json({ message: 'Transaction not found' });
        }
        res.status(200).json(transactions);

    } catch (error) {
      console.error('Error getting transactions:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = transactionController;
