import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getTicketById, updateStatus, addNote, getNotes } from '../../api/repairApi';
import { getTicketServices, addTicketService, removeTicketService, getTicketTotal, searchServicePrices } from '../../api/adminApi';

const STATUSES = [
  'New Intake', 'Checked In', 'Diagnosing', 'Waiting for Part',
  'In Repair', 'Testing', 'Ready for Pickup', 'Completed', 'Cancelled'
];

function RepairDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [ticketTotal, setTicketTotal] = useState(0);
  const [serviceSearch, setServiceSearch] = useState({ brand: '', model: '' });
  const [searchResults, setSearchResults] = useState([]);
  const [customService, setCustomService] = useState({ description: '', price: '' });
  const [showCustomForm, setShowCustomForm] = useState(false);

  const loadServices = async () => {
    const [servicesRes, totalRes] = await Promise.all([
      getTicketServices(id),
      getTicketTotal(id)
    ]);
    setServices(servicesRes.data);
    setTicketTotal(totalRes.data);
  };

  useEffect(() => {
    Promise.all([getTicketById(id), getNotes(id)])
      .then(([ticketRes, notesRes]) => {
        setTicket(ticketRes.data);
        setSelectedStatus(ticketRes.data.status);
        setNotes(notesRes.data);
      })
      .finally(() => setLoading(false));
    loadServices();
  }, [id]);

  const handleStatusUpdate = async () => {
    const res = await updateStatus(id, selectedStatus, '');
    setTicket(res.data);
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    const res = await addNote(id, parseInt(user.userId), newNote);
    setNotes([...notes, res.data]);
    setNewNote('');
  };

  const handleSearchServices = async () => {
    const res = await searchServicePrices(serviceSearch.brand, serviceSearch.model);
    setSearchResults(res.data);
  };

  const handleAddService = async (servicePriceId) => {
    await addTicketService(id, { servicePriceId, customDescription: '', customPrice: null });
    setSearchResults([]);
    setServiceSearch({ brand: '', model: '' });
    await loadServices();
  };

  const handleAddCustomService = async () => {
    if (!customService.description || !customService.price) return;
    await addTicketService(id, {
      servicePriceId: null,
      customDescription: customService.description,
      customPrice: parseFloat(customService.price)
    });
    setCustomService({ description: '', price: '' });
    setShowCustomForm(false);
    await loadServices();
  };

  const handleRemoveService = async (serviceId) => {
    await removeTicketService(serviceId);
    await loadServices();
  };

  if (loading) return <p>Loading...</p>;
  if (!ticket) return <p>Ticket not found</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <button onClick={() => navigate('/')}>← Back to Queue</button>
      <h2>Ticket #{ticket.id}</h2>

      <div style={{ marginBottom: '20px' }}>
        <p><strong>Customer:</strong> {ticket.customerName}</p>
        <p><strong>Device:</strong> {ticket.deviceBrand} {ticket.deviceModel}</p>
        <p><strong>Issue:</strong> {ticket.issueDescription}</p>
        <p><strong>Intake Notes:</strong> {ticket.intakeNotes}</p>
        <p><strong>Assigned To:</strong> {ticket.assignedUserName}</p>
      </div>

      {/* Status Update */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Update Status</h3>
        <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <button onClick={handleStatusUpdate} style={{ marginLeft: '10px' }}>Update</button>
        <p><strong>Current Status:</strong> {ticket.status}</p>
      </div>

      {/* Services */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Services & Quote</h3>

        {/* Search Price List */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <input
            placeholder="Brand (e.g. Apple)"
            value={serviceSearch.brand}
            onChange={(e) => setServiceSearch({ ...serviceSearch, brand: e.target.value })}
            style={{ padding: '6px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <input
            placeholder="Model (e.g. iPhone 14)"
            value={serviceSearch.model}
            onChange={(e) => setServiceSearch({ ...serviceSearch, model: e.target.value })}
            style={{ padding: '6px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <button onClick={handleSearchServices}>Search Services</button>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '10px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f3f4f6' }}>
                <th style={{ padding: '8px', textAlign: 'left' }}>Service</th>
                <th style={{ padding: '8px', textAlign: 'right' }}>Price</th>
                <th style={{ padding: '8px' }}></th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map(s => (
                <tr key={s.id}>
                  <td style={{ padding: '8px' }}>{s.serviceName}</td>
                  <td style={{ padding: '8px', textAlign: 'right' }}>${s.price}</td>
                  <td style={{ padding: '8px', textAlign: 'center' }}>
                    <button onClick={() => handleAddService(s.id)}>Add</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Custom Service */}
        <button onClick={() => setShowCustomForm(!showCustomForm)} style={{ marginBottom: '10px' }}>
          + Special Order / Custom Price
        </button>

        {showCustomForm && (
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <input
              placeholder="Description"
              value={customService.description}
              onChange={(e) => setCustomService({ ...customService, description: e.target.value })}
              style={{ padding: '6px', border: '1px solid #ccc', borderRadius: '4px', flex: 1 }}
            />
            <input
              placeholder="Price"
              value={customService.price}
              onChange={(e) => setCustomService({ ...customService, price: e.target.value })}
              style={{ padding: '6px', border: '1px solid #ccc', borderRadius: '4px', width: '100px' }}
            />
            <button onClick={handleAddCustomService}>Add</button>
          </div>
        )}

        {/* Services Added */}
        {services.length > 0 && (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '10px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f3f4f6' }}>
                <th style={{ padding: '8px', textAlign: 'left' }}>Service</th>
                <th style={{ padding: '8px', textAlign: 'right' }}>Price</th>
                <th style={{ padding: '8px' }}></th>
              </tr>
            </thead>
            <tbody>
              {services.map(s => (
                <tr key={s.id}>
                  <td style={{ padding: '8px' }}>{s.serviceName}</td>
                  <td style={{ padding: '8px', textAlign: 'right' }}>${s.price}</td>
                  <td style={{ padding: '8px', textAlign: 'center' }}>
                    <button
                      onClick={() => handleRemoveService(s.id)}
                      style={{ color: 'red' }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Total */}
        <div style={{ textAlign: 'right', fontSize: '20px', fontWeight: 'bold', borderTop: '2px solid #1e3a5f', paddingTop: '10px' }}>
          Total Quote: ${Number(ticketTotal).toFixed(2)}
        </div>
      </div>

      {/* Notes */}
      <div>
        <h3>Notes</h3>
        {notes.map((note) => (
          <div key={note.id} style={{ borderBottom: '1px solid #ccc', padding: '8px 0' }}>
            <strong>{note.userName}</strong> — {new Date(note.createdAt).toLocaleString()}
            <p>{note.note}</p>
          </div>
        ))}
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add a note..."
          style={{ width: '100%', height: '80px', marginTop: '10px' }}
        />
        <button onClick={handleAddNote}>Add Note</button>
      </div>
    </div>
  );
}

export default RepairDetailPage;