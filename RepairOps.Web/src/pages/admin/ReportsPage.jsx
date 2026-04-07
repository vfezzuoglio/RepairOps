import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

function ReportsPage() {
  const navigate = useNavigate();
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/repairticket/reports/revenue')
      .then(res => setReport(res.data))
      .finally(() => setLoading(false));
  }, []);

  const totalRevenue = report.reduce((sum, r) => sum + r.totalRevenue, 0);
  const totalTickets = report.reduce((sum, r) => sum + r.ticketsCreated, 0);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2>Revenue Report</h2>
        <button onClick={() => navigate('/admin')}>← Back to Admin</button>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
        <div style={{ backgroundColor: '#1e3a5f', color: 'white', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
          <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0 }}>${totalRevenue.toFixed(2)}</p>
          <p style={{ margin: 0, opacity: 0.8 }}>Total Revenue</p>
        </div>
        <div style={{ backgroundColor: '#2563eb', color: 'white', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
          <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0 }}>{totalTickets}</p>
          <p style={{ margin: 0, opacity: 0.8 }}>Total Tickets</p>
        </div>
      </div>

      {/* Revenue by Rep Table */}
      <h3 style={{ marginBottom: '15px' }}>Revenue by Sales Rep</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#1e3a5f', color: 'white' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Sales Rep</th>
            <th style={{ padding: '12px', textAlign: 'center' }}>Tickets Created</th>
            <th style={{ padding: '12px', textAlign: 'right' }}>Total Revenue</th>
            <th style={{ padding: '12px', textAlign: 'right' }}>Avg per Ticket</th>
          </tr>
        </thead>
        <tbody>
          {report.map((row, index) => (
            <tr key={row.userId} style={{ backgroundColor: index % 2 === 0 ? 'white' : '#f9fafb' }}>
              <td style={{ padding: '12px', fontWeight: 'bold' }}>{row.repName}</td>
              <td style={{ padding: '12px', textAlign: 'center' }}>{row.ticketsCreated}</td>
              <td style={{ padding: '12px', textAlign: 'right' }}>${row.totalRevenue.toFixed(2)}</td>
              <td style={{ padding: '12px', textAlign: 'right' }}>
                ${row.ticketsCreated > 0 ? (row.totalRevenue / row.ticketsCreated).toFixed(2) : '0.00'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReportsPage;