export default function UserList({ users, onEdit, onDelete }) {
  if (!users || users.length === 0) {
    return (
      <div className="empty-state">
        <p>No users found. Create your first user to get started.</p>
      </div>
    );
  }

  return (
    <div className="user-list">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.gender}</td>
              <td className="actions">
                <button
                  onClick={() => onEdit(user)}
                  className="btn-edit"
                  aria-label="Edit user"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(user.id)}
                  className="btn-delete"
                  aria-label="Delete user"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
