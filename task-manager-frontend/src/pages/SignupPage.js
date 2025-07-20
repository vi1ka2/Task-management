import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://task-management-7juw.onrender.com/auth/signup', {
        email,
        password
      });
      login(res.data.token);
      navigate('/tasks');
    } catch (err) {
      alert('Signup failed');
    }
  };

  return (
    <form className="auth-container" onSubmit={handleSignup}>
      <h2>Sign Up</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignupPage;
