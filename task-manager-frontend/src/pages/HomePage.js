import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function HomePage() {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Task Manager</h1>
      <p className="home-subtitle">Manage your tasks with ease</p>
      <div className="home-buttons">
        <Link to="/login"><button className="home-btn">Log In</button></Link>
        <Link to="/signup"><button className="home-btn">Sign Up</button></Link>
      </div>
    </div>
  );
}

export default HomePage;

