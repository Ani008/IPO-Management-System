import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import IPODashboard from './pages/IPODashboard'; // <-- make sure file name matches
import './style/IPODashboard.css'; // <-- import CSS for styling

function App() {
  // For now, show the IPO Dashboard directly.
  // Later you can use login logic to toggle between pages.
  const [page, setPage] = useState('dashboard'); 

  return (
    <>
      {page === 'login' && <LoginPage />}
      {page === 'admin' && <AdminLoginPage />}
      {page === 'dashboard' && <IPODashboard />}
    </>
  );
}

export default App;
