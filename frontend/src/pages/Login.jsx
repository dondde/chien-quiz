import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    console.log("Tentative de login avec :", form);

    try {
      const res = await axios.post(
        'http://127.0.0.1:8000/api/auth/token/login/',
        form,
        { headers: { 'Content-Type': 'application/json' } }
      );

      const token = res.data.auth_token;
      localStorage.setItem('token', token);

      navigate('/quiz');
    } catch (error) {
      console.error('Erreur complète :', error);
      const detail = error.response?.data || error.message;
      setMessage('Erreur : ' + JSON.stringify(detail));
    }
  };

  return (
    <div className="container mt-4">
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="form-control mb-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={form.password}
          onChange={handleChange}
          required
          className="form-control mb-2"
        />
        <button type="submit" className="btn btn-success">Se connecter</button>
      </form>
      <p className="mt-3">{message}</p>
    </div>
  );
};

export default Login;
