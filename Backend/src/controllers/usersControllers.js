const bcrypt = require('bcrypt');
const { pool } = require('../config/config');
const { v4: uuidv4 } = require('uuid');

const usersController = {
  registerUser: async (req, res) => {
    try {
      const { username, password, email, full_name, type_id } = req.body;
      console.log(req.body);
      // Check if the username or email already exists
      const existingUserQuery =
        'SELECT * FROM Account WHERE username = $1 OR email = $2';
      const existingUserValues = [username, email];
      const existingUserResult = await pool.query(
        existingUserQuery,
        existingUserValues
      );

      if (existingUserResult.rowCount > 0) {
        return res
          .status(400)
          .json({ message: 'Username or email already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Generate account ID
      const account_id = uuidv4();

      // Insert the new user into the Account table
      const registerUserQuery = ` INSERT INTO Account (account_id, username, password, email, full_name, type_id) 
          VALUES ($1, $2, $3, $4, $5, $6)
        `;
      const registerUserValues = [
        account_id,
        username,
        hashedPassword,
        email,
        full_name,
        type_id,
      ];
      await pool.query(registerUserQuery, registerUserValues);

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Check if the user exists
      const userQuery = 'SELECT * FROM Account WHERE username = $1';
      const userValues = [username];
      const userResult = await pool.query(userQuery, userValues);

      if (userResult.rowCount === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Check if the password is correct
      const user = userResult.rows[0];
      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (!isPasswordCorrect) {
        return res.status(401).json({ message: 'Incorrect password' });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error('Error logging in user', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  getUserById: async (req, res) => {
    try {
      const { id } = req.params;

      // Check if the user exists
      const userQuery = 'SELECT * FROM Account WHERE account_id = $1';
      const userValues = [id];
      const userResult = await pool.query(userQuery, userValues);

      if (userResult.rowCount === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      const user = userResult.rows[0];

      res.status(200).json({ user });
    } catch (error) {
      console.error('Error getting user by ID', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  updateUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const { username, password, email, full_name, type_id } = req.body;

      // Check if the username or email already exists
      const existingUserQuery =
        'SELECT * FROM Account WHERE username = $1 OR email = $2';
      const existingUserValues = [username, email];
      const existingUserResult = await pool.query(
        existingUserQuery,
        existingUserValues
      );

      if (existingUserResult.rowCount > 0) {
        return res
          .status(400)
          .json({ message: 'Username or email already exists' });
      }

      // Check if the user exists
      const userQuery = 'SELECT * FROM Account WHERE account_id = $1';
      const userValues = [id];
      const userResult = await pool.query(userQuery, userValues);

      if (userResult.rowCount === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Update the user
      const updateUserQuery = ` UPDATE Account
          SET username = $1, password = $2, email = $3, full_name = $4, type_id = $5
          WHERE account_id = $6
        `;
      const updateUserValues = [
        username,
        hashedPassword,
        email,
        full_name,
        type_id,
        id,
      ];
      await pool.query(updateUserQuery, updateUserValues);

      res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      console.error('Error updating user by ID', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  deleteUserById: async (req, res) => {
    try {
      const { id } = req.params;

      // Check if the user exists
      const userQuery = 'SELECT * FROM Account WHERE account_id = $1';
      const userValues = [id];
      const userResult = await pool.query(userQuery, userValues);

      if (userResult.rowCount === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Delete the user
      const deleteUserQuery = 'DELETE FROM Account WHERE account_id = $1';
      await pool.query(deleteUserQuery, userValues);

      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user by ID', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};

module.exports = usersController;
