import React, { useState } from 'react';
import EmailValidation from '../models/EmailValidation.js';
import PasswordValidation from '../models/PasswordValidation.js';
import NameValidation from '../models/NameValidation.js';
import { isEmailValid, isValidPassword } from '../utils/register.utils.js';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameInputFocused, setNameInputFocused] = useState(false);
  const [emailInputFocused, setEmailInputFocused] = useState(false);
  const [passwordInputFocused, setPasswordInputFocused] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value.trim());
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value.trim());
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value.trim());
  };

  const isRegisterFormValid = () => {
    return isEmailValid(email) && isValidPassword(password);
  };

  return (
    <div>
      <div class="center-content">
        <div class="card">
          <h1>Create an Account</h1>
          <form class="form-area" action="/login" method="POST">
            <div class="input-container">
              <label for="name">Name</label>
              <input type="text" placeholder="PrathamJaiswal" value={name} onChange={handleNameChange} onFocus={() => setNameInputFocused(true)} />
              { nameInputFocused && <NameValidation name={name} /> }
            </div>  
            <div class="input-container">
              <label for="email">Email</label>
              <input type="text" placeholder="email@example.com" value={email} onChange={handleEmailChange} onFocus={() => setEmailInputFocused(true)} />
              { emailInputFocused && <EmailValidation email={email} /> }
            </div>
            <div class="input-container">
              <label for="password">Password</label>
              <input type="password" placeholder="Password@123" value={password} onChange={handlePasswordChange} onFocus={() => setPasswordInputFocused(true)} />
              { passwordInputFocused && <PasswordValidation password={password} /> }
            </div>
            <button class="dark-btn" type="submit" disabled={!isRegisterFormValid()}>Login</button>
            <p><a href="/login">Already have an account? Sign in!</a></p>
          </form>
        </div>
      </div>
    </div>
  );
};