import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './componenets/Navbar'
import HomePage from './componenets/HomePage'
import LoginPage from './componenets/LoginPage'
import { useState } from 'react'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = () => {
    setIsAuthenticated(true);
  }
  
  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} />
      
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/login' element={<LoginPage  onLogin={handleLogin}/>}/>
      </Routes>
    </>
  )
}

export default App
