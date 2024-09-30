import {  Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Navbar from './componenets/Navbar'
import HomePage from './componenets/HomePage'
import LoginPage from './componenets/LoginPage'
import { useEffect, useState } from 'react'
import SignUpPage from './componenets/SignUpPage'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    localStorage.setItem("user","yes");
    setIsAuthenticated(true);
    navigate("/");
    
  }

  useEffect(() => {
    if(localStorage.getItem("user"))
    {
      setIsAuthenticated(true);
    }
  }, [])
  
  
  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/login' element={<LoginPage  onLogin={handleLogin}/>}/>
        <Route path='/register' element={ <SignUpPage /> } />
      </Routes>
    </>
  )
}

export default App
