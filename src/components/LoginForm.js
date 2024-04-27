// LoginForm.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './LoginForm.css'; // Importing the CSS file
import axios from 'axios';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const object = {
        username,
        password,
      };

      const response = await axios('http://localhost:5000/users/signIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: object,
      });
      if (response.status === 200) {
        onLogin(`accesstoken__` + response.data.token, response.data.role);
        toast.success('Login successful');
        if (response.data.role === 'User') {
          navigate('/user-dashboard');
        }
        if (response.data.role === 'Company_HR') {
          navigate('/company-hr-dashboard');
        }
      } else {
        toast.error('Login failed, please try again');
      }
    } catch (error) {
      console.error('Error logging in', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <div className="form-group">
          <label className="label-login" htmlFor="username">
            Username:
          </label>
          <input
            className="input-login"
            type="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your Username"
          />
        </div>
        <div className="form-group">
          <label className="label-login" htmlFor="password">
            Password:
          </label>
          <input
            className="input-login"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <button className="button-login" type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
      <div className="signup-link">
        <span>Don't have an account?</span>{' '}
        <Link to="/signup" style={{ color: 'blue' }}>
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
