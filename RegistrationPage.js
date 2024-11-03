import React, { useState } from 'react';
import './RegistrationPage.css';
import axios from 'axios';

const RegistrationPage = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [isRegistered, setIsRegistered] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        'https://RegistrationPage.js-backend.cloud-stacks.com/api/register',
        form,
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (response.status === 201) {
        setIsRegistered(true);
        alert('Registration successful');
      }
    } catch (error) {
      alert('Error registering user');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'https://RegistrationPage.js-backend.cloud-stacks.com/api/login',
        { email: form.email, password: form.password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (response.status === 200) {
        alert('Logged in successfully');
      }
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="registration-page">
      <div className="form-container">
        <h1>{isRegistered ? 'Login' : 'Register'}</h1>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        {isRegistered ? (
          <button onClick={handleLogin}>Login</button>
        ) : (
          <button onClick={handleRegister}>Register</button>
        )}
      </div>
    </div>
  );
};

export default RegistrationPage;
