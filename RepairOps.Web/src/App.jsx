import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LoginPage from './pages/auth/LoginPage';
import RepairQueuePage from './pages/repairs/RepairQueuePage';
import RepairDetailPage from './pages/repairs/RepairDetailPage';
import InventoryPage from './pages/inventory/InventoryPage';
import AdminPage from './pages/admin/AdminPage';
import ServicePricePage from './pages/admin/ServicePricePage';
import ReportsPage from './pages/admin/ReportsPage';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={
        <ProtectedRoute>
          <RepairQueuePage />
        </ProtectedRoute>
      } />
      <Route path="/repairs/:id" element={
      <ProtectedRoute>
        <RepairDetailPage />
      </ProtectedRoute>
} />
      <Route path="/inventory" element={
        <ProtectedRoute>
          <InventoryPage />
        </ProtectedRoute>
      } />
      <Route path="/admin" element={
  <ProtectedRoute>
    <AdminPage />
  </ProtectedRoute>
} />
<Route path="/admin/services" element={
  <ProtectedRoute>
    <ServicePricePage />
  </ProtectedRoute>
} />
<Route path="/admin/reports" element={
  <ProtectedRoute>
    <ReportsPage />
  </ProtectedRoute>
} />
    </Routes>
  );
}

export default App;