import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Routes
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';

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
app.use('/auth', authRoutes);

// Home route
app.get('/', (req, res) => {
  res.send(
    'Welcome to the API'
  )
});

app.listen(process.env.PORT, () => {
  
  console.log(`App listening on port: http://localhost:${process.env.PORT}`);

});