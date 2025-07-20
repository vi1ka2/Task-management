import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://task-management-7juw.onrender.com/auth/login', {
        email,
        password
      });
      login(res.data.token);
      navigate('/tasks');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <form className="auth-container" onSubmit={handleLogin}>
      <h2>Log In</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Log In</button>
    </form>
  );
}

export default LoginPage;
