import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUsers, deleteUser, updateUserRole } from '../../api/adminApi';
import api from '../../api/axios';

function UsersPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newUser, setNewUser] = useState({ fullName: '', email: '', password: '', role: 'Technician' });

  useEffect(() => {
    getAllUsers()
      .then(res => setUsers(res.data))
      .finally(() => setLoading(false));
  }, []);

  const handleRoleChange = async (id, role) => {
    await updateUserRole(id, role);
    setUsers(users.map(u => u.id === id ? { ...u, role } : u));
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    await deleteUser(id);
    setUsers(users.filter(u => u.id !== id));
  };

  const handleCreateUser = async () => {
    if (!newUser.fullName || !newUser.email || !newUser.password) return;
    await api.post('/auth/register', newUser);
    const res = await getAllUsers();
    setUsers(res.data);
    setNewUser({ fullName: '', email: '', password: '', role: 'Technician' });
    setShowCreateForm(false);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2>User Management</h2>
        <button onClick={() => navigate('/admin')}>← Back to Admin</button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          style={{ backgroundColor: '#2563eb', color: 'white', padding: '8px 16px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
        >
          + Add User
        </button>

        {showCreateForm && (
          <div style={{ backgroundColor: '#f3f4f6', padding: '20px', borderRadius: '8px', marginTop: '15px' }}>
            <h3 style={{ marginBottom: '15px' }}>Create New User</h3>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <input
                placeholder="Full Name"
                value={newUser.fullName}
                onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', flex: 1 }}
              />
              <input
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', flex: 1 }}
              />
              <input
                placeholder="Password"
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', flex: 1 }}
              />
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              >
                <option value="Admin">Admin</option>
                <option value="Technician">Technician</option>
                <option value="SalesRep">SalesRep</option>
              </select>
              <button
                onClick={handleCreateUser}
                style={{ backgroundColor: '#16a34a', color: 'white', padding: '8px 16px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
              >
                Create
              </button>
            </div>
          </div>
        )}
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#1e3a5f', color: 'white' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Email</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Role</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Created</th>
            <th style={{ padding: '12px', textAlign: 'center' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} style={{ backgroundColor: index % 2 === 0 ? 'white' : '#f9fafb' }}>
              <td style={{ padding: '12px', fontWeight: 'bold' }}>{user.fullName}</td>
              <td style={{ padding: '12px' }}>{user.email}</td>
              <td style={{ padding: '12px' }}>
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #ccc' }}
                >
                  <option value="Admin">Admin</option>
                  <option value="Technician">Technician</option>
                  <option value="SalesRep">SalesRep</option>
                </select>
              </td>
              <td style={{ padding: '12px', color: '#6b7280' }}>
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
              <td style={{ padding: '12px', textAlign: 'center' }}>
                <button
                  onClick={() => handleDelete(user.id)}
                  style={{ backgroundColor: '#dc2626', color: 'white', padding: '4px 12px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
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

export default UsersPage;