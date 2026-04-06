import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getAllTickets } from '../../api/repairApi';

function RepairQueuePage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getAllTickets()
      .then((res) => setTickets(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Repair Queue</h2>
        <div>
          <span>Welcome, {user?.fullName}</span>
          <button onClick={handleLogout} style={{ marginLeft: '10px' }}>
            Logout
          </button>
        </div>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Device</th>
            <th>Issue</th>
            <th>Status</th>
            <th>Assigned To</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr
              key={ticket.id}
              onClick={() => navigate(`/repairs/${ticket.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <td>#{ticket.id}</td>
              <td>{ticket.customerName}</td>
              <td>{ticket.deviceBrand} {ticket.deviceModel}</td>
              <td>{ticket.issueDescription}</td>
              <td>{ticket.status}</td>
              <td>{ticket.assignedUserName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RepairQueuePage;