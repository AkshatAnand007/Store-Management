const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Product Inventory API is running' });
});

// routes
const productsRouter = require('./routes/products');
app.use('/products', productsRouter);

// error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/productdb';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
})
  .then(() => {
    console.log('✓ MongoDB connected successfully');
    // Start server ONLY after MongoDB connects
    startServer();
  })
  .catch(err => {
    console.error('✗ MongoDB connection error:', err.message);
    process.exit(1);
  });

// MongoDB connection events
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB error:', err.message);
});

// Start server function
function startServer() {
  const PORT = process.env.PORT || 5000;
  const server = app.listen(PORT, () => {
    console.log(`✓ Server running on port ${PORT}`);
  });

  // handle port already in use
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`✗ Port ${PORT} is already in use`);
      console.log(`Try: netstat -ano | findstr :${PORT}`);
      console.log(`Then: taskkill /PID <PID> /F`);
      process.exit(1);
    }
  });

  // graceful shutdown
  process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully...');
    server.close(() => {
      console.log('Server closed');
      mongoose.connection.close(false, () => {
        console.log('MongoDB connection closed');
        process.exit(0);
      });
    });
  });
}
