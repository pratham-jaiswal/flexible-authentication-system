import React, { useEffect, useState } from 'react';
import EmailValidation from '../models/EmailValidation.js';
import PasswordValidation from '../models/PasswordValidation.js';
import NameValidation from '../models/NameValidation.js';
import { isEmailValid, isValidPassword } from '../utils/register.utils.js';
import { useNavigate } from 'react-router-dom';

export default function Register({ isValid }) {
  
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isValid) {
      navigate("/dashboard");
      return;
    }
  }, [isValid, navigate]);

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

  const handleRegister = async (event) => {
    event.preventDefault();

    if (!isRegisterFormValid()) {
      console.error('Invalid form data');
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        if (data.message === 'Register successful') {
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
          <h1>Create an Account</h1>
          <form className="form-area" onSubmit={handleRegister}>
            <div className="input-container">
              <label htmlFor="name">Name</label>
              <input type="text" placeholder="PrathamJaiswal" name="name" value={name} onChange={handleNameChange} onFocus={() => setNameInputFocused(true)} />
              { nameInputFocused && <NameValidation name={name} /> }
            </div>  
            <div className="input-container">
              <label htmlFor="email">Email</label>
              <input type="text" placeholder="email@example.com" name="email" value={email} onChange={handleEmailChange} onFocus={() => setEmailInputFocused(true)} />
              { emailInputFocused && <EmailValidation email={email} /> }
            </div>
            <div className="input-container">
              <label htmlFor="password">Password</label>
              <input type="password" placeholder="Password@123" name="password" value={password} onChange={handlePasswordChange} onFocus={() => setPasswordInputFocused(true)} />
              { passwordInputFocused && <PasswordValidation password={password} /> }
            </div>
            <button className="dark-btn" type="submit" disabled={!isRegisterFormValid()}>Register</button>
            <p><a href="/login">Already have an account? Sign in!</a></p>
          </form>
        </div>
      </div>
    </div>
  );
};