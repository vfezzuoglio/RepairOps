import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LoginPage from './pages/auth/LoginPage';
import RepairQueuePage from './pages/repairs/RepairQueuePage';
import RepairDetailPage from './pages/repairs/RepairDetailPage';

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
    </Routes>
  );
}

export default App;