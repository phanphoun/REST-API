import { useState, useEffect } from 'react';

function UserForm({ user, onSave, onCancel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    } else {
      setName('');
      setEmail('');
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, email });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h3>{user ? 'Edit User' : 'Add User'}</h3>
      <div style={{ marginBottom: '10px' }}>
        <label>Name: </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ padding: '5px', width: '200px' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Email: </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: '5px', width: '200px' }}
        />
      </div>
      <button type="submit" style={{ marginRight: '10px', padding: '5px 15px' }}>
        {user ? 'Update' : 'Create'}
      </button>
      {onCancel && (
        <button type="button" onClick={onCancel} style={{ padding: '5px 15px' }}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default UserForm;
