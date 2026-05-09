import { useState, useEffect } from 'react';
import UserForm from './UserForm.jsx';
import { getUsers, createUser, updateUser, deleteUser } from './api/users.js';

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (err) {
      alert('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSave = async (data) => {
    try {
      if (editingUser) {
        await updateUser(editingUser.id, data);
      } else {
        await createUser(data);
      }
      setEditingUser(null);
      setShowForm(false);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save user');
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (err) {
      alert('Failed to delete user');
    }
  };

  const handleCancel = () => {
    setEditingUser(null);
    setShowForm(false);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>User Management</h1>

      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          style={{ marginBottom: '20px', padding: '8px 16px' }}
        >
          Add User
        </button>
      )}

      {showForm && (
        <UserForm
          user={editingUser}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center' }}>No users found</td>
              </tr>
            )}
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => handleEdit(user)} style={{ marginRight: '5px' }}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(user._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;