import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { getTicketById, updateStatus, addNote, getNotes } from '../../api/repairApi';
import { useAuth } from '../../context/AuthContext';

const STATUSES = [
  'New Intake', 'Checked In', 'Diagnosing', 'Waiting for Part',
  'In Repair', 'Testing', 'Ready for Pickup', 'Completed', 'Cancelled'
];

export default function RepairDetailScreen({ route, navigation }) {
  const { ticketId } = route.params;
  const { user } = useAuth();

  const [ticket, setTicket] = useState(null);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getTicketById(ticketId), getNotes(ticketId)])
      .then(([ticketRes, notesRes]) => {
        setTicket(ticketRes.data);
        setSelectedStatus(ticketRes.data.status);
        setNotes(notesRes.data);
      })
      .finally(() => setLoading(false));
  }, [ticketId]);

  const handleStatusUpdate = async (status) => {
    const res = await updateStatus(ticketId, status, '');
    setTicket(res.data);
    setSelectedStatus(status);
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    const res = await addNote(ticketId, parseInt(user.userId), newNote);
    setNotes([...notes, res.data]);
    setNewNote('');
  };

  if (loading) return (
    <View style={styles.center}>
      <Text>Loading...</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.back}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Ticket #{ticket.id}</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Customer: <Text style={styles.value}>{ticket.customerName}</Text></Text>
        <Text style={styles.label}>Device: <Text style={styles.value}>{ticket.deviceBrand} {ticket.deviceModel}</Text></Text>
        <Text style={styles.label}>Issue: <Text style={styles.value}>{ticket.issueDescription}</Text></Text>
        <Text style={styles.label}>Intake Notes: <Text style={styles.value}>{ticket.intakeNotes}</Text></Text>
        <Text style={styles.label}>Assigned To: <Text style={styles.value}>{ticket.assignedUserName}</Text></Text>
        <Text style={styles.label}>Status: <Text style={[styles.value, { color: '#2563eb' }]}>{ticket.status}</Text></Text>
      </View>

      <Text style={styles.sectionTitle}>Update Status</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statusRow}>
        {STATUSES.map((s) => (
          <TouchableOpacity
            key={s}
            style={[styles.statusButton, selectedStatus === s && styles.statusButtonActive]}
            onPress={() => handleStatusUpdate(s)}
          >
            <Text style={[styles.statusButtonText, selectedStatus === s && styles.statusButtonTextActive]}>
              {s}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Notes</Text>
      {notes.map((note) => (
        <View key={note.id} style={styles.noteCard}>
          <Text style={styles.noteAuthor}>{note.userName}</Text>
          <Text style={styles.noteDate}>{new Date(note.createdAt).toLocaleString()}</Text>
          <Text>{note.note}</Text>
        </View>
      ))}

      <TextInput
        style={styles.input}
        placeholder="Add a note..."
        value={newNote}
        onChangeText={setNewNote}
        multiline
        numberOfLines={3}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddNote}>
        <Text style={styles.buttonText}>Add Note</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  back: { color: '#2563eb', fontSize: 16, marginBottom: 15 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  section: { backgroundColor: '#f3f4f6', padding: 15, borderRadius: 8, marginBottom: 20 },
  label: { fontWeight: 'bold', marginBottom: 5 },
  value: { fontWeight: 'normal' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  statusRow: { marginBottom: 20 },
  statusButton: { borderWidth: 1, borderColor: '#2563eb', padding: 8, borderRadius: 5, marginRight: 8 },
  statusButtonActive: { backgroundColor: '#2563eb' },
  statusButtonText: { color: '#2563eb' },
  statusButtonTextActive: { color: 'white' },
  noteCard: { backgroundColor: '#f3f4f6', padding: 10, borderRadius: 8, marginBottom: 10 },
  noteAuthor: { fontWeight: 'bold' },
  noteDate: { color: '#6b7280', fontSize: 12, marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginBottom: 10, height: 80 },
  button: { backgroundColor: '#2563eb', padding: 15, borderRadius: 5, alignItems: 'center', marginBottom: 30 },
  buttonText: { color: 'white', fontWeight: 'bold' }
});