import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';

export default function MetaMask ({ isValid }) {
  const navigate = useNavigate();
  const [userAddress, setUserAddress] = useState(null);

  useEffect(() => {
    // loadWeb3();
    if (isValid) {
        navigate("/dashboard");
        return;
      }
    }, [isValid, navigate]);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setUserAddress(accounts[0]);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('Please install MetaMask extension');
      alert('Please install MetaMask extension');
    }
  };

  const handleLogin = async (event) => {
    loadWeb3();
    try {
        const response = await fetch('/api/metamask', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ address: userAddress }),
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
    <button className="dark-btn" onClick={handleLogin}>
      Connect with MetaMask
    </button>
  );
};