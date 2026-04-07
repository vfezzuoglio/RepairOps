import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { getTicketById, updateStatus, addNote, getNotes } from '../../api/repairApi';
import { useAuth } from '../../context/AuthContext';
import { getTicketServices, addTicketService, removeTicketService, getTicketTotal, searchServicePrices } from '../../api/repairApi';
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
  const [services, setServices] = useState([]);
  const [ticketTotal, setTicketTotal] = useState(0);
  const [serviceSearch, setServiceSearch] = useState({ brand: '', model: '' });
  const [searchResults, setSearchResults] = useState([]);
  const [customService, setCustomService] = useState({ description: '', price: '' });
  const [showCustomForm, setShowCustomForm] = useState(false);

  useEffect(() => {
    Promise.all([getTicketById(ticketId), getNotes(ticketId)])
      .then(([ticketRes, notesRes]) => {
        setTicket(ticketRes.data);
        setSelectedStatus(ticketRes.data.status);
        setNotes(notesRes.data);
      })
      .finally(() => setLoading(false));
    loadServices();
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
  const loadServices = async () => {
  const [servicesRes, totalRes] = await Promise.all([
    getTicketServices(ticketId),
    getTicketTotal(ticketId)
    ]);
    setServices(servicesRes.data);
    setTicketTotal(totalRes.data);
  };
  const handleSearchServices = async () => {
  const res = await searchServicePrices(serviceSearch.brand, serviceSearch.model);
  setSearchResults(res.data);
};

const handleAddService = async (servicePriceId) => {
  await addTicketService(ticketId, { servicePriceId, customDescription: '', customPrice: null });
  setSearchResults([]);
  setServiceSearch({ brand: '', model: '' });
  await loadServices();
};

const handleAddCustomService = async () => {
  if (!customService.description || !customService.price) return;
  await addTicketService(ticketId, {
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
      {/* Services & Quote */}
<Text style={styles.sectionTitle}>Services & Quote</Text>

<View style={{ flexDirection: 'row', gap: 8, marginBottom: 10 }}>
  <TextInput
    style={[styles.input, { flex: 1 }]}
    placeholder="Brand (e.g. Apple)"
    value={serviceSearch.brand}
    onChangeText={(v) => setServiceSearch({ ...serviceSearch, brand: v })}
  />
  <TextInput
    style={[styles.input, { flex: 1 }]}
    placeholder="Model (e.g. iPhone 14)"
    value={serviceSearch.model}
    onChangeText={(v) => setServiceSearch({ ...serviceSearch, model: v })}
  />
</View>
<TouchableOpacity style={styles.button} onPress={handleSearchServices}>
  <Text style={styles.buttonText}>Search Services</Text>
</TouchableOpacity>

{searchResults.map(s => (
  <View key={s.id} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f3f4f6', padding: 10, borderRadius: 8, marginBottom: 8 }}>
    <Text>{s.serviceName}</Text>
    <Text>${s.price}</Text>
    <TouchableOpacity
      style={{ backgroundColor: '#2563eb', padding: 6, borderRadius: 4 }}
      onPress={() => handleAddService(s.id)}
    >
      <Text style={{ color: 'white', fontSize: 12 }}>Add</Text>
    </TouchableOpacity>
  </View>
))}

<TouchableOpacity onPress={() => setShowCustomForm(!showCustomForm)}>
  <Text style={{ color: '#2563eb', marginBottom: 10 }}>+ Special Order / Custom Price</Text>
</TouchableOpacity>

{showCustomForm && (
  <View style={{ marginBottom: 10 }}>
    <TextInput
      style={styles.input}
      placeholder="Description"
      value={customService.description}
      onChangeText={(v) => setCustomService({ ...customService, description: v })}
    />
    <TextInput
      style={styles.input}
      placeholder="Price"
      value={customService.price}
      onChangeText={(v) => setCustomService({ ...customService, price: v })}
      keyboardType="numeric"
    />
    <TouchableOpacity style={styles.button} onPress={handleAddCustomService}>
      <Text style={styles.buttonText}>Add Custom Service</Text>
    </TouchableOpacity>
  </View>
)}

{services.map(s => (
  <View key={s.id} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f3f4f6', padding: 10, borderRadius: 8, marginBottom: 8 }}>
    <Text style={{ flex: 1 }}>{s.serviceName}</Text>
    <Text style={{ marginRight: 10 }}>${s.price}</Text>
    <TouchableOpacity onPress={() => handleRemoveService(s.id)}>
      <Text style={{ color: '#dc2626' }}>Remove</Text>
    </TouchableOpacity>
  </View>
))}

<View style={{ flexDirection: 'row', justifyContent: 'flex-end', borderTopWidth: 2, borderTopColor: '#1e3a5f', paddingTop: 10, marginBottom: 20 }}>
  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Total: ${Number(ticketTotal).toFixed(2)}</Text>
</View>

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