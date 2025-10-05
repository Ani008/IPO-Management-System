import React, { useState } from 'react';
import '../Style/loginPageStyle.css';

const withRetry = async (fn, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries - 1) throw error;
      const delay = Math.pow(2, i) * 1000;
      console.warn(`Attempt ${i + 1} failed. Retrying in ${delay / 1000}s...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

// Main App Component
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // --- Backend Integration Placeholder Functions ---

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage('Please enter both email and password.');
      return;
    }

    setLoading(true);
    setMessage('');

    // --- Backend Space (SQL/API Integration Point) ---
    try {
      // ** 1. API Call (Replace with your actual backend/SQL endpoint) **
      const apiCall = () => fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      // We wrap the API call with retry logic for robustness
      // const response = await withRetry(apiCall);
      // const data = await response.json();

      // Placeholder simulation of a successful login
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      console.log(`Attempting login for: ${email}`);
      
      setMessage('Login successful! Redirecting...');
      // In a real app, you would save auth token here and redirect
      
    } catch (error) {
      // In a real app, you would show the error response from the server
      console.error('Login error:', error);
      setMessage('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    // This is typically a link to a /register page, 
    // but here we simulate a quick action.
    setMessage('Redirecting to Registration Page...');
    // In a real app, you would use a router or window.location.href
    await new Promise(resolve => setTimeout(resolve, 800)); 
    setMessage('Registration is not implemented in this demo.');
  };

  // --- UI Rendering ---
  return (
    <div className="app-container">
      <div className="auth-card">
        
        {/* Left Side: Login Form */}
        <div className="login-panel">
          <div className="welcome-text">
            <h1 className="title">Welcome <br/> to IPO Portal</h1>
            <p className="subtitle">Sign in to your account</p>
          </div>
          
          <form onSubmit={handleLogin} className="form-group">
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              required
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              required
            />
            
            <button 
              type="submit" 
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? 'Logging In...' : 'Login'}
            </button>
            
            <button 
              type="button" 
              onClick={handleRegister}
              className="btn btn-secondary"
            >
              Register
            </button>
          </form>

          {message && <p className={`message ${message.includes('successful') ? 'success' : 'error'}`}>{message}</p>}
        </div>
        
        {/* Right Side: Graphic/Visual */}
        <div className="graphic-panel">
          <svg className="growth-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
            <polyline points="17 6 23 6 23 12"></polyline>
          </svg>
        </div>

      </div>
      </div>
  );
};

export default LoginPage;
