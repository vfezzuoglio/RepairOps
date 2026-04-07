import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView, RefreshControl  } from 'react-native';
import { useState, useEffect } from 'react';
import { getAllTickets } from '../../api/repairApi';
import { useAuth } from '../../context/AuthContext';
import { useIsFocused } from '@react-navigation/native';

export default function RepairQueueScreen({ navigation }) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const { user, logout } = useAuth();
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);

useEffect(() => {
  if (isFocused) {
    setLoading(true);
    getAllTickets()
      .then(res => setTickets(res.data))
      .finally(() => setLoading(false));

    // Poll every 30 seconds
    const interval = setInterval(() => {
      getAllTickets().then(res => setTickets(res.data));
    }, 30000);

    return () => clearInterval(interval);
  }
}, [isFocused]);

  const handleLogout = async () => {
    await logout();
    navigation.replace('Login');
  };
  const handleRefresh = async () => {
  setRefreshing(true);
  getAllTickets()
    .then(res => setTickets(res.data))
    .finally(() => setRefreshing(false));
};

  const filteredTickets = filter === 'All'
    ? tickets
    : tickets.filter(t => t.status === filter);

  const getStatusColor = (status) => {
    switch (status) {
      case 'New Intake': return '#6b7280';
      case 'Checked In': return '#2563eb';
      case 'Diagnosing': return '#d97706';
      case 'Waiting for Part': return '#dc2626';
      case 'In Repair': return '#7c3aed';
      case 'Testing': return '#0891b2';
      case 'Ready for Pickup': return '#16a34a';
      case 'Completed': return '#15803d';
      case 'Cancelled': return '#9ca3af';
      default: return '#6b7280';
    }
  };

  if (loading) return (
    <View style={styles.center}>
      <Text>Loading...</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>RepairOps</Text>
          <Text style={styles.headerSubtitle}>Welcome, {user?.fullName}</Text>
        </View>
        <View style={styles.headerActions}>
        {(user?.role === 'SalesRep' || user?.role === 'Admin') && (
          <TouchableOpacity
            style={styles.newButton}
            onPress={() => navigation.navigate('NewIntake')}
          >
            <Text style={styles.newButtonText}>+ New Intake</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      </View>

      {/* Stats Bar */}
      <View style={styles.statsBar}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{tickets.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {tickets.filter(t => t.status === 'In Repair').length}
          </Text>
          <Text style={styles.statLabel}>In Repair</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {tickets.filter(t => t.status === 'Ready for Pickup').length}
          </Text>
          <Text style={styles.statLabel}>Ready</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {tickets.filter(t => t.status === 'Waiting for Part').length}
          </Text>
          <Text style={styles.statLabel}>Waiting</Text>
        </View>
      </View>

      {/* Filter Bar */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterBar}>
        {['All', 'New Intake', 'Checked In', 'Diagnosing', 'Waiting for Part', 'In Repair', 'Testing', 'Ready for Pickup', 'Completed', 'Cancelled'].map((s) => (
          <TouchableOpacity
            key={s}
            style={[styles.filterButton, filter === s && styles.filterButtonActive]}
            onPress={() => setFilter(s)}
          >
            <Text style={[styles.filterButtonText, filter === s && styles.filterButtonTextActive]}>
              {s}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Ticket List */}
      <FlatList
        data={filteredTickets}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('RepairDetail', { ticketId: item.id })}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.cardId}>Ticket #{item.id}</Text>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>
            <Text style={styles.cardCustomer}>{item.customerName}</Text>
            <Text style={styles.cardDevice}>{item.deviceBrand} {item.deviceModel}</Text>
            <Text style={styles.cardIssue} numberOfLines={2}>{item.issueDescription}</Text>
            <Text style={styles.cardTech}>Assigned: {item.assignedUserName}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f5f9' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1e3a5f',
    paddingHorizontal: 24,
    paddingVertical: 16,
    paddingTop: 50,
  },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: 'white' },
  headerSubtitle: { fontSize: 14, color: '#93c5fd', marginTop: 2 },
  headerActions: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  newButton: { backgroundColor: '#2563eb', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8 },
  newButtonText: { color: 'white', fontWeight: 'bold', fontSize: 14 },
  logoutButton: { paddingHorizontal: 12, paddingVertical: 10 },
  logoutText: { color: '#fca5a5', fontSize: 14 },

  statsBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  statItem: { flex: 1, alignItems: 'center' },
  statNumber: { fontSize: 22, fontWeight: 'bold', color: '#1e3a5f' },
  statLabel: { fontSize: 12, color: '#6b7280', marginTop: 2 },

  filterBar: { paddingHorizontal: 16, paddingVertical: 10, backgroundColor: 'white' },
  filterButton: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, borderWidth: 1, borderColor: '#cbd5e1', marginRight: 8 },
  filterButtonActive: { backgroundColor: '#1e3a5f', borderColor: '#1e3a5f' },
  filterButtonText: { color: '#475569', fontSize: 13 },
  filterButtonTextActive: { color: 'white' },

  listContent: { padding: 16 },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  cardId: { fontSize: 14, fontWeight: 'bold', color: '#6b7280' },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  statusText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
  cardCustomer: { fontSize: 18, fontWeight: 'bold', color: '#1e293b', marginBottom: 4 },
  cardDevice: { fontSize: 14, color: '#475569', marginBottom: 4 },
  cardIssue: { fontSize: 14, color: '#64748b', marginBottom: 8 },
  cardTech: { fontSize: 12, color: '#94a3b8' },
});