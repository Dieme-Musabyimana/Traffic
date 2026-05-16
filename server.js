const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');
const { questions } = require('./mockDatabase');
const { initializeCache } = require('./cacheService');


const app = express();
const PORT = process.env.PORT || 3000;

// Initialize cache with questions
initializeCache(questions);

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public' directory

// API Routes
app.use('/api', routes);

// Catch-all for SPA routing (if using client-side routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});