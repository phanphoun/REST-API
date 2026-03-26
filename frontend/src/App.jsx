import { useState, useEffect } from 'react';
import { authAPI, userAPI } from './services/api';
import AuthForm from './components/AuthForm';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import Modal from './components/Modal';
import './App.css';

function App() {
  const [authMode, setAuthMode] = useState('login');
  const [authUser, setAuthUser] = useState(() => {
    const savedUser = localStorage.getItem('authUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [authLoading, setAuthLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchUsers();
    }
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getAllUsers();
      setUsers(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      if (err.message.toLowerCase().includes('token')) {
        handleLogout(false);
      }
      showNotification(err.message || 'Failed to load users', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAuthSuccess = (user, token, successMessage) => {
    localStorage.setItem('token', token);
    localStorage.setItem('authUser', JSON.stringify(user));
    setAuthUser(user);
    setUsers([]);
    setError(null);
    showNotification(successMessage);
    fetchUsers();
  };

  const handleRegister = async (formData) => {
    try {
      setAuthLoading(true);
      await authAPI.register(formData);
      setAuthMode('login');
      showNotification('Registration successful. Sign in to continue.');
    } catch (err) {
      showNotification(err.message, 'error');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogin = async (formData) => {
    try {
      setAuthLoading(true);
      const response = await authAPI.login(formData);
      handleAuthSuccess(
        response.data.user,
        response.data.token,
        'Login successful'
      );
    } catch (err) {
      showNotification(err.message, 'error');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = (showMessage = true) => {
    localStorage.removeItem('token');
    localStorage.removeItem('authUser');
    setAuthUser(null);
    setUsers([]);
    setError(null);
    setLoading(false);
    setIsModalOpen(false);
    setEditingUser(null);

    if (showMessage) {
      showNotification('Logged out successfully');
    }
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

  if (!authUser) {
    return (
      <div className="app auth-shell">
        {notification && (
          <div className={`notification ${notification.type}`}>
            {notification.message}
          </div>
        )}

        <main className="auth-layout">
          <section className="auth-hero">
            <p className="auth-kicker">REST API Control Panel</p>
            <h1>Secure the dashboard before you manage the data.</h1>
            <p className="auth-copy">
              Sign in with your existing account or create a new one to unlock
              the protected user endpoints.
            </p>
          </section>

          <section className="auth-card">
            <div className="auth-switch">
              <button
                type="button"
                className={authMode === 'login' ? 'auth-tab active' : 'auth-tab'}
                onClick={() => setAuthMode('login')}
              >
                Login
              </button>
              <button
                type="button"
                className={authMode === 'register' ? 'auth-tab active' : 'auth-tab'}
                onClick={() => setAuthMode('register')}
              >
                Register
              </button>
            </div>

            <div className="auth-card-body">
              <h2>{authMode === 'login' ? 'Welcome back' : 'Create your account'}</h2>
              <p>
                {authMode === 'login'
                  ? 'Use your email and password to access the user dashboard.'
                  : 'Register a user account that can authenticate against the backend.'}
              </p>

              <AuthForm
                mode={authMode}
                loading={authLoading}
                onSubmit={authMode === 'login' ? handleLogin : handleRegister}
              />
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <p className="auth-kicker">Authenticated Session</p>
          <h1>User Management</h1>
          <p>Manage your users with a valid access token</p>
        </div>
        <div className="session-card">
          <span>{authUser.name}</span>
          <strong>{authUser.email}</strong>
          <button onClick={() => handleLogout()} className="btn-logout">
            Logout
          </button>
        </div>
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
