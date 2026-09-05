import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      localStorage.setItem('token', res.data.token);
      alert('Login Successful!');
      navigate('/admin');
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message;
      alert('Error: ' + errorMsg);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 style={{marginBottom:'5px'}}>Admin Login</h2>
        <p style={{color:'#666', fontSize:'14px', marginBottom:'25px'}}>Access your news dashboard</p>
        
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button type="submit" className="publish-btn">
            Login to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;