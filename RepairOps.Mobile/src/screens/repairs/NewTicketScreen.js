import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';
import { createTicket } from '../../api/repairApi';

export default function NewTicketScreen({ route, navigation }) {
  const { customer, device, assignedUserId } = route.params;
  const [issueDescription, setIssueDescription] = useState('');
  const [intakeNotes, setIntakeNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleCreateTicket = async () => {
    if (!issueDescription.trim()) return;
    setSubmitting(true);
    try {
      await createTicket({
        customerId: customer.id,
        deviceId: device.id,
        assignedUserId: assignedUserId,
        createdByUserId: assignedUserId,
        issueDescription,
        intakeNotes
      });
      navigation.navigate('RepairQueue');
    } catch (error) {
      console.log('Error creating ticket:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>New Repair Ticket</Text>

      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Summary</Text>
        <Text style={styles.label}>Customer: <Text style={styles.value}>{customer.fullName}</Text></Text>
        <Text style={styles.label}>Device: <Text style={styles.value}>{device.brand} {device.model}</Text></Text>
        <Text style={styles.label}>Serial: <Text style={styles.value}>{device.serialNumber}</Text></Text>
      </View>

      <Text style={styles.sectionTitle}>Issue Description</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        placeholder="Describe the issue..."
        value={issueDescription}
        onChangeText={setIssueDescription}
        multiline
        numberOfLines={4}
      />

      <Text style={styles.sectionTitle}>Intake Notes</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        placeholder="Any additional notes..."
        value={intakeNotes}
        onChangeText={setIntakeNotes}
        multiline
        numberOfLines={3}
      />

      <TouchableOpacity
        style={[styles.button, submitting && styles.buttonDisabled]}
        onPress={handleCreateTicket}
        disabled={submitting}
      >
        <Text style={styles.buttonText}>
          {submitting ? 'Creating...' : 'Create Ticket'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  summary: { backgroundColor: '#f3f4f6', padding: 15, borderRadius: 8, marginBottom: 20 },
  summaryTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 10 },
  label: { fontWeight: 'bold', marginBottom: 5 },
  value: { fontWeight: 'normal' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginBottom: 15 },
  multiline: { height: 100, textAlignVertical: 'top' },
  button: { backgroundColor: '#2563eb', padding: 15, borderRadius: 5, alignItems: 'center', marginBottom: 30 },
  buttonDisabled: { backgroundColor: '#93c5fd' },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});