import React, { useState } from 'react';
import { isEmailValid, isPassEightChars } from '../utils/register.utils.js';

export default function Login() {
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

  return (
    <div>
      <div class="center-content">
        <div class="card">
          <h1>Login</h1>
          <form class="form-area" action="/login" method="POST">
            <div class="input-container">
              <label for="email">Email</label>
              <input type="text" placeholder="email@example.com" value={email} onChange={handleEmailChange} required />
            </div>
            <div class="input-container">
              <label for="password">Password</label>
              <input type="password" placeholder="Password@123" value={password} onChange={handlePasswordChange} required />
            </div>
            <button class="dark-btn" type="submit" disabled={!isLoginFormValid()}>Login</button>
            <p><a href="/register">Don't have an account? Sign up!</a></p>
          </form>
        </div>
      </div>
    </div>
  );
};