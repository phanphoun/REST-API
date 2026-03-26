
import authModel from '../model/auth.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register user

export const register = async (req, res) => {
    try {
        const { name, email, password, gender } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, and password are required'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await authModel.register({
            ...req.body,
            password: hashedPassword
        });
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                id: result.insertId,
                name,
                email,
                gender
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error registering user',
            error: err.message
        });
    }
}

// Login user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        if (!process.env.JWT_SECRET) {
            return res.status(500).json({
                success: false,
                message: 'JWT_SECRET is not configured'
            });
        }

        const users = await authModel.login(email);

        if (users.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        const user = users[0];

        const isPasswordValid = await bcrypt.compare(password, user.password);
        const isLegacyPasswordMatch = user.password === password;

        if (!isPasswordValid && !isLegacyPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        if (!isPasswordValid && isLegacyPasswordMatch) {
            const upgradedPassword = await bcrypt.hash(password, 10);
            await authModel.updatePassword(user.id, upgradedPassword);
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            success: true,
            message: 'User logged in successfully',
            data: {
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    gender: user.gender
                }
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error logging in user',
            error: err.message
        });
    }
}

