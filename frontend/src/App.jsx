import { useState, useEffect } from 'react';
import { userAPI } from './services/api';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import Modal from './components/Modal';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getAllUsers();
      setUsers(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      showNotification('Failed to load users', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCreateUser = async (userData) => {
    try {
      await userAPI.createUser(userData);
      await fetchUsers();
      setIsModalOpen(false);
      showNotification('User created successfully');
    } catch (err) {
      showNotification(err.message, 'error');
    }
  };

  const handleUpdateUser = async (userData) => {
    try {
      await userAPI.updateUser(editingUser.id, userData);
      await fetchUsers();
      setIsModalOpen(false);
      setEditingUser(null);
      showNotification('User updated successfully');
    } catch (err) {
      showNotification(err.message, 'error');
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }
    try {
      await userAPI.deleteUser(id);
      await fetchUsers();
      showNotification('User deleted successfully');
    } catch (err) {
      showNotification(err.message, 'error');
    }
  };

  const openCreateModal = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>User Management</h1>
        <p>Manage your users with ease</p>
      </header>

      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <main className="app-main">
        <div className="toolbar">
          <button onClick={openCreateModal} className="btn-create">
            + Add New User
          </button>
          <button onClick={fetchUsers} className="btn-refresh">
            Refresh
          </button>
        </div>

        {loading && <div className="loading">Loading users...</div>}
        {error && <div className="error">Error: {error}</div>}
        {!loading && !error && (
          <UserList
            users={users}
            onEdit={openEditModal}
            onDelete={handleDeleteUser}
          />
        )}
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingUser ? 'Edit User' : 'Create New User'}
      >
        <UserForm
          onSubmit={editingUser ? handleUpdateUser : handleCreateUser}
          onCancel={closeModal}
          initialData={editingUser}
        />
      </Modal>
    </div>
  );
}

export default App;
