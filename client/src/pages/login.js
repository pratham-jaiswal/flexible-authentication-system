import React, { useEffect, useState } from 'react';
import { isEmailValid, isPassEightChars } from '../utils/register.utils.js';
import { useNavigate } from 'react-router-dom';

export default function Login({ isValid }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (isValid) {
      navigate("/dashboard");
      return;
    }
  }, [isValid, navigate]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value.trim());
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value.trim());
  };

  const isLoginFormValid = () => {
    return isEmailValid(email) && isPassEightChars(password);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!isLoginFormValid()) {
      console.error('Invalid form data');
      return;
    }

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        if (data.message === 'Login successful') {
          window.location.href = '/dashboard';
        }
        else{
          alert(data.message);
        }
      } else {
        const errorData = await response.json();
        console.error(errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div className="center-content">
        <div className="card">
          <h1>Login</h1>
          <form className="form-area" onSubmit={handleLogin}>
            <div className="input-container">
              <label htmlFor="email">Email</label>
              <input type="text" placeholder="email@example.com" name="email" value={email} onChange={handleEmailChange} required />
            </div>
            <div className="input-container">
              <label htmlFor="password">Password</label>
              <input type="password" placeholder="Password@123" name="password" value={password} onChange={handlePasswordChange} required />
            </div>
            <button className="dark-btn" type="submit" disabled={!isLoginFormValid()}>Login</button>
            <p><a href="/register">Don't have an account? Sign up!</a></p>
          </form>
        </div>
      </div>
    </div>
  );
};