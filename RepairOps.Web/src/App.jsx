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
const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (user.role !== 'Admin') return <Navigate to="/" />;
  return children;
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
        <AdminRoute>
          <AdminPage />
        </AdminRoute>
      } />
      <Route path="/admin/services" element={
        <AdminRoute>
          <ServicePricePage />
        </AdminRoute>
      } />
      <Route path="/admin/reports" element={
        <AdminRoute>
          <ReportsPage />
        </AdminRoute>
      } />
    </Routes>
  );
}

export default App;