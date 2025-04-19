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

// Leu endpoint - shows query params and form
app.get('/leu/auth', (req, res) => {
  let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>LEU Page</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body class="bg-light">
      <div class="container mt-5">
        <div class="row">
          <div class="col-md-6 mx-auto">
            <div class="card mb-4">
              <div class="card-header bg-primary text-white">
                <h1 class="card-title">Query Parameters</h1>
              </div>
              <div class="card-body">
                <pre class="bg-light p-3">${JSON.stringify(req.query, null, 2)}</pre>
              </div>
            </div>

            <div class="card">
              <div class="card-header bg-primary text-white">
                <h2 class="card-title">Options Form</h2>
              </div>
              <div class="card-body">
                <form method="GET" action="/leu" class="mb-3">
                  <div class="mb-3">
                    <select name="option" class="form-select">
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </select>
                  </div>
                  <button type="submit" class="btn btn-primary">Confirm</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
  res.send(html);
});


// Leu endpoint - shows query params and form
app.get('/leu/v4/form', (req, res) => {
  let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Form Get</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body class="bg-light">
      <div class="container mt-5">
        <div class="row">
          <div class="col-md-6 mx-auto">
            <div class="card mb-4">
              <div class="card-header bg-secondary text-white">
                <h1 class="card-title">Query Parameters</h1>
              </div>
              <div class="card-body">
                <pre class="bg-light p-3">${JSON.stringify(req.query, null, 2)}</pre>
              </div>
            </div>

            <div class="card">
              <div class="card-header bg-secondary text-white">
                <h2 class="card-title">Options Form</h2>
              </div>
              <div class="card-body">
                <form method="GET" action="/leu" class="mb-3">
                  <div class="mb-3">
                    <select name="option" class="form-select">
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </select>
                  </div>
                  <button type="submit" class="btn btn-primary">Confirm</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
  res.send(html);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
