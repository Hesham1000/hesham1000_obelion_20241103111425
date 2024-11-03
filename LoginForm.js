import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css';

function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const data = isLogin ? { email, password } : { username, email, password };
    const url = isLogin 
      ? 'https://LoginForm.js-backend.cloud-stacks.com/api/login' 
      : 'https://LoginForm.js-backend.cloud-stacks.com/api/register';

    try {
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200 || response.status === 201) {
        alert(response.data.message);
        if (isLogin) {
          // Redirect to dashboard or another page
          window.location.href = '/dashboard';
        } else {
          toggleForm();
        }
      }
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit}>
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        {!isLogin && (
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {!isLogin && (
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        )}
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
        <button type="button" onClick={toggleForm}>
          {isLogin ? 'Create an account' : 'Back to Login'}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
