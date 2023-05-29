const { pool } = require('../config/config');
const { v4: uuidv4 } = require('uuid');

const customerController = {
  createCustomer: async (req, res) => {
    try {
      const {
        full_name,
        email,
        phone_number,
        address,
        city,
        postal_code,
        bank_account_id,
      } = req.body;

      const customer_id = uuidv4();

      const createCustomerQuery = `
        INSERT INTO Customer (
          customer_id,
          full_name,
          email,
          phone_number,
          address,
          city,
          postal_code,
          bank_account_id
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING customer_id
      `;
      const createCustomerValues = [
        customer_id,
        full_name,
        email,
        phone_number,
        address,
        city,
        postal_code,
        bank_account_id,
      ];

      const result = await pool.query(
        createCustomerQuery,
        createCustomerValues
      );
      const newCustomerId = result.rows[0].customer_id;

      res.status(201).json({ customer_id: newCustomerId });
    } catch (error) {
      console.error('Error creating customer', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  getAllCustomers: async (req, res) => {
    try {
      const getAllCustomersQuery = 'SELECT * FROM Customer';
      const result = await pool.query(getAllCustomersQuery);
      const customers = result.rows;
      res.status(200).json(customers);
    } catch (error) {
      console.error('Error getting all customers', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  getCustomerById: async (req, res) => {
    try {
      const customerId = req.params.id;

      const getCustomerByIdQuery =
        'SELECT * FROM Customer WHERE customer_id = $1';
      const result = await pool.query(getCustomerByIdQuery, [customerId]);
      const customer = result.rows[0];

      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }

      res.status(200).json(customer);
    } catch (error) {
      console.error('Error getting customer by ID', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  updateCustomerById: async (req, res) => {
    try {
      const customerId = req.params.id;
      const {
        full_name,
        email,
        phone_number,
        address,
        city,
        postal_code,
        bank_account_id,
      } = req.body;

      const updateCustomerQuery = `
        UPDATE Customer
        SET
          full_name = $1,
          email = $2,
          phone_number = $3,
          address = $4,
          city = $5,
          postal_code = $6,
          bank_account_id = $7
        WHERE customer_id = $8
      `;
      const updateCustomerValues = [
        full_name,
        email,
        phone_number,
        address,
        city,
        postal_code,
        bank_account_id,
        customerId,
      ];

      const result = await pool.query(
        updateCustomerQuery,
        updateCustomerValues
      );

      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Customer not found' });
      }

      res.status(200).json({ message: 'Customer updated successfully' });
    } catch (error) {
      console.error('Error updating customer by ID', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  deleteCustomerById: async (req, res) => {
    try {
      const customerId = req.params.id;

      const deleteCustomerQuery = 'DELETE FROM Customer WHERE customer_id = $1';
      const result = await pool.query(deleteCustomerQuery, [customerId]);

      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Customer not found' });
      }

      res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (error) {
      console.error('Error deleting customer by ID', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};

module.exports = customerController;
