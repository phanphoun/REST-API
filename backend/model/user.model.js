import db from '../database.js';

const User = {
    findAll: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM users', (err, results) => {
                if (err) {

                    reject(err);
                }
                resolve(results);
            });
        });
    },

    findById: (id) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
                if (err) {
                    reject(err);
                }
                resolve(results);
            });
        });
    },

    createUser: (name, email, gender) =>{
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO users (name, email, gender) VALUES (?, ?, ?)', [name, email, gender], (err, results) => {
                if (err) {
                    reject(err);
                }
                resolve(results);
            });
        });
    },

    // update user
    updateUser: (id, name, email, gender) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE users SET name = ?, email = ?, gender = ? WHERE id = ?', [name, email, gender, id], (err, results) => {
                if (err) {
                    reject(err);
                }
                resolve(results);
            });
        });
    },

    // delete user
    deleteUser: (id) =>{
        return new Promise((resolve, reject) =>{
            db.query('DELETE FROM users WHERE id = ?' , [id], (err, results) =>{
                if(err){
                    reject(err)
                }
                resolve(results)
            })
        })
    }
};

export default User;