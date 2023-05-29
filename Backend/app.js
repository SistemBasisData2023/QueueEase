const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { testDatabaseConnection } = require('./src/config/config');
const usersRoutes = require('./src/routes/usersRoutes');
const customerRoutes = require('./src/routes/customerRoutes');
const tellerDeskRoutes = require('./src/routes/tellerDeskRoutes');
const queueRoutes = require('./src/routes/queueRoutes');
const transactionRoutes = require('./src/routes/transactionRoutes');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/users', usersRoutes);
app.use('/customers', customerRoutes);
app.use('/tellerdesk', tellerDeskRoutes);
app.use('/queue', queueRoutes);
app.use('/transaction', transactionRoutes);

testDatabaseConnection();
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
