import React from "react";

export default function Logout() {
  const handleLogout = async () => {
    try {

      if (window.ethereum && window.ethereum.isMetaMask) {
        try {
          window.ethereum.request({ method: 'eth_logout' });
        }
        catch (error) {
          console.error('Error logging out of MetaMask:', error);
        }
      }

      const response = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        window.location.href = '/';
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <button className="dark-btn" onClick={handleLogout}>
      Logout
    </button>
  );
}
