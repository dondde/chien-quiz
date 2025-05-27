import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Quiz from './pages/Quiz'; 
import Login from './pages/Login';
import Register from './pages/Register';
import RequireAuth from './components/RequireAuth';
import Navbar from './components/Navbar';
import Resultats from './pages/Resultats';
import Home from './pages/Home';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Navbar />
    <div className="container mt-4">
      <Routes>
        <Route path="/quiz" element={<RequireAuth><Quiz /></RequireAuth>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/resultats" element={<RequireAuth><Resultats /></RequireAuth>} />
        <Route path="/" element={<Home />} />

      </Routes>
    </div>
  </BrowserRouter>
);



