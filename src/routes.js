import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import LoadingSpinner from './components/Common/LoadingSpinner';

// Lazy loading for better performance
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./components/Auth/Login'));
const Register = lazy(() => import('./components/Auth/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Appointments = lazy(() => import('./pages/Appointments'));
const DoctorList = lazy(() => import('./components/Doctor/DoctorList'));
const DoctorProfile = lazy(() => import('./components/Doctor/DoctorProfile'));
const Profile = lazy(() => import('./pages/Profile'));
const CalendarView = lazy(() => import('./components/Appointment/CalendarView'));

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/appointments"
          element={
            <PrivateRoute>
              <Appointments />
            </PrivateRoute>
          }
        />
        <Route
          path="/doctors"
          element={
            <PrivateRoute>
              <DoctorList />
            </PrivateRoute>
          }
        />
        <Route
          path="/doctors/:id"
          element={
            <PrivateRoute>
              <DoctorProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/calendar"
          element={
            <PrivateRoute>
              <CalendarView />
            </PrivateRoute>
          }
        />

        {/* 404 redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;