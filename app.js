require('dotenv').config();
const express = require('express');
const app = express();
const basicAuth = require('express-basic-auth');

// Validate required environment variables
if (!process.env.TEST_USER || !process.env.TEST_PASSWORD) {
  console.error('ERROR: TEST_USER and TEST_PASSWORD environment variables must be set');
  process.exit(1);
}

// Basic Auth configuration
const authMiddleware = basicAuth({
  users: { 
    [process.env.TEST_USER]: process.env.TEST_PASSWORD 
  },
  unauthorizedResponse: { 
    status: 500,
    message: 'authentication failed.' 
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

// Test connection endpoint
app.get('/system/v1.0/testconnection', authMiddleware, (req, res) => {
  res.status(200).json({ status: 'success' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
