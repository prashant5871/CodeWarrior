import {  Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Navbar from './componenets/Navbar'
import HomePage from './componenets/HomePage'
import LoginPage from './componenets/LoginPage'
import { useEffect, useState } from 'react'
import SignUpPage from './componenets/SignUpPage'
import {Toaster} from "react-hot-toast"
import ProblemPage from './pages/ProblemPage'
import Problem from './componenets/Problem'


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem("user"))
    {
      setIsAuthenticated(true);
    }else{
      setIsAuthenticated(false);
    }
  })
  
  
  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />

      <Toaster />
      
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={ <SignUpPage /> } />
        <Route path="/problems" element={ <ProblemPage /> } />
        <Route path="/problem/:problemId" element={ <Problem /> } />
      </Routes>
    </>
  )
}

export default App
