import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { getDevices, createDevice } from '../../api/repairApi';

export default function NewDeviceScreen({ route, navigation }) {
  const { customer, assignedUserId } = route.params;
  const [devices, setDevices] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newDevice, setNewDevice] = useState({ brand: '', model: '', serialNumber: '' });

  useEffect(() => {
    getDevices(customer.id).then(res => setDevices(res.data));
  }, []);

  const handleSelectDevice = (device) => {
    navigation.navigate('NewTicket', { customer, device, assignedUserId });
  };

  const handleCreateDevice = async () => {
    const res = await createDevice({
      customerId: customer.id,
      brand: newDevice.brand,
      model: newDevice.model,
      serialNumber: newDevice.serialNumber
    });
    handleSelectDevice(res.data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Device</Text>
      <Text style={styles.subtitle}>Customer: {customer.fullName}</Text>

      {devices.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Existing Devices</Text>
          <FlatList
            data={devices}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.card} onPress={() => handleSelectDevice(item)}>
                <Text style={styles.cardTitle}>{item.brand} {item.model}</Text>
                <Text>SN: {item.serialNumber}</Text>
              </TouchableOpacity>
            )}
          />
        </>
      )}

      <TouchableOpacity onPress={() => setShowCreateForm(!showCreateForm)}>
        <Text style={styles.link}>+ Add New Device</Text>
      </TouchableOpacity>

      {showCreateForm && (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Brand (e.g. Apple)"
            value={newDevice.brand}
            onChangeText={(v) => setNewDevice({ ...newDevice, brand: v })}
          />
          <TextInput
            style={styles.input}
            placeholder="Model (e.g. iPhone 14)"
            value={newDevice.model}
            onChangeText={(v) => setNewDevice({ ...newDevice, model: v })}
          />
          <TextInput
            style={styles.input}
            placeholder="Serial Number"
            value={newDevice.serialNumber}
            onChangeText={(v) => setNewDevice({ ...newDevice, serialNumber: v })}
          />
          <TouchableOpacity style={styles.button} onPress={handleCreateDevice}>
            <Text style={styles.buttonText}>Add Device</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 5 },
  subtitle: { color: '#6b7280', marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginBottom: 10 },
  button: { backgroundColor: '#2563eb', padding: 15, borderRadius: 5, alignItems: 'center', marginBottom: 15 },
  buttonText: { color: 'white', fontWeight: 'bold' },
  card: { backgroundColor: '#f3f4f6', padding: 15, borderRadius: 8, marginBottom: 10 },
  cardTitle: { fontWeight: 'bold', fontSize: 16 },
  link: { color: '#2563eb', textAlign: 'center', marginTop: 10, fontSize: 16 }
});