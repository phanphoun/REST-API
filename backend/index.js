const express = require('express');
require('dotenv').config();

const app = express();

// Routes
const userRoutes = require('./routes/user.routes');


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