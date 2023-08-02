import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home.js";
import Login from "./pages/login.js";
import Register from "./pages/register.js";
import Dashboard from "./pages/dashboard.js";
import './index.css'
import React, { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data');
        const recvData = await response.json();
        setData(recvData);
      } catch (error) {
        setData({ isValid: false });
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login isValid={data.isValid} />} />
          <Route path="/register" element={<Register isValid={data.isValid} />} />
          <Route path="/dashboard" element={<Dashboard isValid={data.isValid} userData={data.userData} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;