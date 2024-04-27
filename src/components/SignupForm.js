// SignupForm.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './SignupForm.css'; // Importing the CSS file
import axios from 'axios';

const SignupForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const dateOfBirth_str = dateOfBirth.toString();
      const roleCheck = role === 'user' ? 'User' : 'Company_HR';
      const object = {
        firstName,
        lastName,
        username,
        email,
        password,
        recoveryEmail,
        DOB: dateOfBirth_str,
        mobileNumber: phoneNumber,
        role: roleCheck,
      };

      const response = await axios('http://localhost:5000/users/signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: object,
      });
      if (response.status === 201) {
        toast.success('Signup successful');
        navigate('/login');
      } else {
        toast.error('Signup failed, please try again');
      }
    } catch (error) {
      toast.error('Signup failed, please try again');
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form className="form-signup">
        <div className="form-group">
          <label className="input-label" htmlFor="firstName">
            First Name:
          </label>
          <input
            className="input-signup"
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter your first name"
          />
        </div>

        <div className="form-group">
          <label className="input-label" htmlFor="lastName">
            Last Name:
          </label>
          <input
            className="input-signup"
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter your last name"
          />
        </div>

        <div className="form-group">
          <label className="input-label" htmlFor="username">
            Username:
          </label>
          <input
            className="input-signup"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </div>

        <div className="form-group">
          <label className="input-label" htmlFor="email">
            Email:
          </label>
          <input
            className="input-signup"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label className="input-label" htmlFor="password">
            Password:
          </label>
          <input
            className="input-signup"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        <div className="form-group">
          <label className="input-label" htmlFor="recoveryEmail">
            Recovery Email:
          </label>
          <input
            className="input-signup"
            type="email"
            id="recoveryEmail"
            value={recoveryEmail}
            onChange={(e) => setRecoveryEmail(e.target.value)}
            placeholder="Enter your recovery email"
          />
        </div>

        <div className="form-group">
          <label className="input-label" htmlFor="dateOfBirth">
            Date of Birth:
          </label>
          <input
            className="input-signup"
            type="date"
            id="dateOfBirth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            placeholder="Enter your date of birth"
          />
        </div>

        <div className="form-group">
          <label className="input-label" htmlFor="phoneNumber">
            Phone Number:
          </label>
          <input
            className="input-signup"
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your phone number"
          />
        </div>

        <div className="form-group">
          <label className="input-label" htmlFor="userType">
            User Role:
          </label>
          <select
            className="select-signup"
            id="userType"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="company_hr">Company HR</option>
          </select>
        </div>
        <button className="button-signup" type="button" onClick={handleSignup}>
          Sign Up
        </button>
      </form>
      <div className="login-link">
        <span>Already have an account?</span>{' '}
        <Link to="/login" style={{ color: 'blue' }}>
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignupForm;
