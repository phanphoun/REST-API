
const userModel = require('../model/user.model');

// Get all users
exports.getAllUsers = (req, res) => {
    userModel.findAll().then((users) => {
        res.json(users);
    });
};

// Get user by id
exports.getUserById = (req, res) => {
    const id = req.params.id;
    userModel.findById(id).then((user) => {
        res.json(user);
    });
};

// Create user
exports.createUser = (req, res) => {
    const { name, email, gender } = req.body;
    userModel.createUser(name, email, gender).then((user) => {
        res.json(user);
    });
};

// Update user
exports.updateUser = (req, res) => {
    const { name, email, gender } = req.body;
    const id = req.params.id;
    userModel.updateUser(id, name, email, gender).then((user) => {
        res.json(user);
    });
};

// Delete user

exports.deleteUser = (req, res) => {
    const id = req.params.id;
    userModel.deleteUser(id).then((user) => {
        res.json(user);
    });
}

