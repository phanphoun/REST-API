import userModel from '../model/user.model.js';

// Get all users
export const getAllUsers = (req, res) => {
    userModel.findAll()
        .then((users) => {
            res.json({
                success: true,
                message: 'Users retrieved successfully',
                data: users,
                count: users.length
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Error retrieving users',
                error: err.message
            });
        });
};

// Get user by id
export const getUserById = (req, res) => {
    const id = req.params.id;
    userModel.findById(id)
        .then((user) => {
            if (user.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found',
                    data: null
                });
            }
            res.json({
                success: true,
                message: 'User retrieved successfully',
                data: user[0]
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Error retrieving user',
                error: err.message
            });
        });
};

// Create user
export const createUser = (req, res) => {
    const { name, email, gender } = req.body;
    
    // Basic validation
    if (!name || !email) {
        return res.status(400).json({
            success: false,
            message: 'Name and email are required',
            data: null
        });
    }
    
    userModel.createUser(name, email, gender)
        .then((result) => {
            res.status(201).json({
                success: true,
                message: 'User created successfully',
                data: {
                    id: result.insertId,
                    name,
                    email,
                    gender
                }
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Error creating user',
                error: err.message
            });
        });
};

// Update user
export const updateUser = (req, res) => {
    const { name, email, gender } = req.body;
    const id = req.params.id;
    
    // Basic validation
    if (!name || !email) {
        return res.status(400).json({
            success: false,
            message: 'Name and email are required',
            data: null
        });
    }
    
    userModel.updateUser(id, name, email, gender)
        .then((result) => {
            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found',
                    data: null
                });
            }
            res.json({
                success: true,
                message: 'User updated successfully',
                data: {
                    id: parseInt(id),
                    name,
                    email,
                    gender
                }
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Error updating user',
                error: err.message
            });
        });
};

// Delete user
export const deleteUser = (req, res) => {
    const id = req.params.id;
    userModel.deleteUser(id)
        .then((result) => {
            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found',
                    data: null
                });
            }
            res.json({
                success: true,
                message: 'User deleted successfully',
                data: {
                    id: parseInt(id)
                }
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Error deleting user',
                error: err.message
            });
        });
};

