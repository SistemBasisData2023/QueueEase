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
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/users', usersRoutes);
app.use('/customers', customerRoutes);
app.use('/tellerdesk', tellerDeskRoutes);
app.use('/queue', queueRoutes(io));
app.use('/transaction', transactionRoutes);

app.use((req, res, next) => {
  req.io = io;
  next();
});


testDatabaseConnection();

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
