import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useState } from 'react';
import { getCustomers, createCustomer } from '../../api/repairApi';
import { useAuth } from '../../context/AuthContext';

export default function NewIntakeScreen({ navigation }) {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ fullName: '', phone: '', email: '' });

  const handleSearch = async () => {
    const res = await getCustomers(searchTerm);
    setCustomers(res.data);
  };

  const handleSelectCustomer = (customer) => {
    navigation.navigate('NewDevice', { customer, assignedUserId: parseInt(user.userId) });
  };

  const handleCreateCustomer = async () => {
    const res = await createCustomer(newCustomer);
    handleSelectCustomer(res.data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find Customer</Text>

      <TextInput
        style={styles.input}
        placeholder="Search by name, phone, or email"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>

      <FlatList
        data={customers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => handleSelectCustomer(item)}>
            <Text style={styles.cardTitle}>{item.fullName}</Text>
            <Text>{item.phone}</Text>
            <Text>{item.email}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity onPress={() => setShowCreateForm(!showCreateForm)}>
        <Text style={styles.link}>+ Create New Customer</Text>
      </TouchableOpacity>

      {showCreateForm && (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={newCustomer.fullName}
            onChangeText={(v) => setNewCustomer({ ...newCustomer, fullName: v })}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            value={newCustomer.phone}
            onChangeText={(v) => setNewCustomer({ ...newCustomer, phone: v })}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={newCustomer.email}
            onChangeText={(v) => setNewCustomer({ ...newCustomer, email: v })}
          />
          <TouchableOpacity style={styles.button} onPress={handleCreateCustomer}>
            <Text style={styles.buttonText}>Create Customer</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginBottom: 10 },
  button: { backgroundColor: '#2563eb', padding: 15, borderRadius: 5, alignItems: 'center', marginBottom: 15 },
  buttonText: { color: 'white', fontWeight: 'bold' },
  card: { backgroundColor: '#f3f4f6', padding: 15, borderRadius: 8, marginBottom: 10 },
  cardTitle: { fontWeight: 'bold', fontSize: 16 },
  link: { color: '#2563eb', textAlign: 'center', marginTop: 10, fontSize: 16 }
});