
import db from '../database.js';

const Auth = {
    register: (userData) => {
        const user = {
            name: userData.name,
            email: userData.email,
            password: userData.password,
            gender: userData.gender
        }
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO users (name, email, password, gender) VALUES (?, ?, ?, ?)', [user.name, user.email, user.password, user.gender], (err, results) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(results);
            });
        });
    },
    
    login: (email) =>{
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(results);
            });
        });
    },

    updatePassword: (id, password) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE users SET password = ? WHERE id = ?', [password, id], (err, results) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(results);
            });
        });
    }
}

export default Auth;
