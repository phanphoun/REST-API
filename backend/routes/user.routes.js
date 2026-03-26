
import express from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../constroller/user.controller.js';
import { auth } from '../minddleware/auth.middleware.js';

const router = express.Router();

// Define routes
router.get('/', auth, getAllUsers);
router.get('/:id', auth, getUserById);
router.post('/', auth, createUser);
router.put('/:id', auth, updateUser);
router.delete('/:id', auth, deleteUser);



export default router;
