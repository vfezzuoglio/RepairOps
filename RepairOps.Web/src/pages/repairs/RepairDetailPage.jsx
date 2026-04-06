import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getTicketById, updateStatus, addNote, getNotes } from '../../api/repairApi';

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

  useEffect(() => {
    Promise.all([getTicketById(id), getNotes(id)])
      .then(([ticketRes, notesRes]) => {
        setTicket(ticketRes.data);
        setSelectedStatus(ticketRes.data.status);
        setNotes(notesRes.data);
      })
      .finally(() => setLoading(false));
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

  if (loading) return <p>Loading...</p>;
  if (!ticket) return <p>Ticket not found</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <button onClick={() => navigate('/')}>← Back to Queue</button>
      <h2>Ticket #{ticket.id}</h2>

      <div style={{ marginBottom: '20px' }}>
        <p><strong>Customer:</strong> {ticket.customerName}</p>
        <p><strong>Device:</strong> {ticket.deviceBrand} {ticket.deviceModel}</p>
        <p><strong>Issue:</strong> {ticket.issueDescription}</p>
        <p><strong>Intake Notes:</strong> {ticket.intakeNotes}</p>
        <p><strong>Assigned To:</strong> {ticket.assignedUserName}</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Update Status</h3>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <button onClick={handleStatusUpdate} style={{ marginLeft: '10px' }}>
          Update
        </button>
        <p><strong>Current Status:</strong> {ticket.status}</p>
      </div>

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