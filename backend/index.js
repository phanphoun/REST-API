const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Routes
const userRoutes = require('./routes/user.routes');

// Enable CORS for frontend
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3001'],
  credentials: true
}));

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Use routes
app.use('/users', userRoutes);

// Home route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port: http://localhost:${process.env.PORT}`);
});