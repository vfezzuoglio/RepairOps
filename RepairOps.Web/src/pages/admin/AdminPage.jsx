import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function AdminPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
        <div>
          <h2>Admin Panel</h2>
          <p style={{ color: '#6b7280' }}>Welcome, {user?.fullName}</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => navigate('/')}>← Back to Queue</button>
          <button onClick={handleLogout} style={{ color: 'red' }}>Logout</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        <div
          onClick={() => navigate('/admin/services')}
          style={{ backgroundColor: '#f3f4f6', padding: '30px', borderRadius: '8px', cursor: 'pointer', textAlign: 'center' }}
        >
          <h3>💰 Service Prices</h3>
          <p style={{ color: '#6b7280' }}>Manage repair service pricing</p>
        </div>

        <div
          onClick={() => navigate('/admin/reports')}
          style={{ backgroundColor: '#f3f4f6', padding: '30px', borderRadius: '8px', cursor: 'pointer', textAlign: 'center' }}
        >
          <h3>📊 Reports</h3>
          <p style={{ color: '#6b7280' }}>View revenue and ticket reports</p>
        </div>

        <div
          onClick={() => navigate('/admin/users')}
          style={{ backgroundColor: '#f3f4f6', padding: '30px', borderRadius: '8px', cursor: 'pointer', textAlign: 'center' }}
        >
          <h3>👥 Users</h3>
          <p style={{ color: '#6b7280' }}>Manage staff accounts</p>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;