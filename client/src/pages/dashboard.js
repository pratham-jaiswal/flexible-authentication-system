import React, { useEffect } from 'react';
import Logout from '../models/logout.js';
import { useNavigate } from 'react-router-dom';

export default function Dashboard({ isValid, userData }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isValid) {
      navigate("/login");
      return;
    }
  }, [isValid, navigate]);

  try{
    const name = userData.name || null;
    const email = userData.email || null;
    const web3address = userData.address || null;
    return (
      <div>
        <div className="center-content">
          <div className="card">
            <h1>Your Details</h1>
            <form className="form-area">
              <div className="input-container">
                <p>Name: <span> { name }</span></p>
              </div>
              <div className="input-container">
                <p>Email: <span></span>{ email }</p>
              </div>
              <div className="input-container">
                <p>MetaMask Address: <span>{ web3address }</span></p>
              </div>
              <Logout />
            </form>
          </div>
        </div>
      </div>
    );
  }
  catch (error){
    navigate("/login");
  }
};