import React from 'react';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router';
import HomePage from './components/HomePage';
import Problems from './components/Problems';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/problems" element={<Problems />} />
      </Routes>
    </>
  );
}

export default App;
