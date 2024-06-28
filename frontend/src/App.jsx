import React from 'react';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router';
import HomePage from './components/HomePage';
import Problems from './components/Problems';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/problems" element={<Problems />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignUpPage />} />
      </Routes>
    </>
  );
}

export default App;
