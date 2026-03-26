


import express from 'express';
import { register, login } from '../constroller/auth.controller.js';

const router = express.Router();

// Define routes
router.post('/register', register);
router.post('/login', login);

export default router;
