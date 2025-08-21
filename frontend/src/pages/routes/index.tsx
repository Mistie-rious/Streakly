import { Routes, Route, Navigate } from "react-router-dom";
import SignUpPage from '../auth/signup';
import LoginPage from '../auth/login';
import Dashboard from '../dashboard';
import ProtectedRoute from '../../components/shared/ProtectedRoute';
import ManageHabits from '../managehabits';
import HabitDetail from '../habitdetails';


export default function AppRoutes() {
  const token = sessionStorage.getItem("token");
  return (
    <Routes>
    {/* Root route: redirect based on auth */}
    <Route
      path="/"
      element={
        token ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
      }
    />

    <Route path="/signup" element={<SignUpPage />} />
    <Route path="/login" element={<LoginPage />} />

    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/manage"
      element={
        <ProtectedRoute>
          <ManageHabits />
        </ProtectedRoute>
      }
    />
    <Route
      path="/habit/:id"
      element={
        <ProtectedRoute>
          <HabitDetail />
        </ProtectedRoute>
      }
    />
  </Routes>
  );
}
