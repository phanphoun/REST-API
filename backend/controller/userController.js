import User from '../model/User.js';

export const getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch {
        res.status(404).json({ message: 'User not found' });
    }
};

export const createUser = async (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ message: 'Name and email are required' });
    }
    try {
        const user = await User.create({ name, email });
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted' });
    } catch {
        res.status(404).json({ message: 'User not found' });
    }
};
