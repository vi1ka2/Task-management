import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import TasksPage from './pages/TasksPage';
import HomePage from './pages/HomePage';

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
      <Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/signup" element={<SignupPage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/tasks" element={<PrivateRoute><TasksPage /></PrivateRoute>} />
  <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;


