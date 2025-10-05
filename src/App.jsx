import { useState } from 'react'

import LoginPage from './pages/LoginPage';

function App() {
  // For now, show the IPO Dashboard directly.
  // Later you can use login logic to toggle between pages.
  const [page, setPage] = useState('dashboard'); 

  return (
    <>
      <LoginPage />
    </>
  )
}

export default App;
