import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    username: '',
    password: '',
    re_password: ''
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

    console.log("Données envoyées :", form); // utile pour débogage

    try {
      const res = await axios.post(
        'http://127.0.0.1:8000/api/auth/users/',
        form,
        { headers: { 'Content-Type': 'application/json' } }
      );
      navigate('/login');
    } catch (error) {
      console.error('Erreur complète :', error);
      const detail = error.response?.data || error.message;
      setMessage('Erreur : ' + JSON.stringify(detail));
    }
  };

  
  return (
    <div className="container mt-4">
      <h2>Inscription</h2>
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
          type="text"
          name="username"
          placeholder="Nom d'utilisateur"
          value={form.username}
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
        <input
          type="password"
          name="re_password"
          placeholder="Confirmer le mot de passe"
          value={form.re_password}
          onChange={handleChange}
          required
          className="form-control mb-2"
        />
        <button type="submit" className="btn btn-primary">Créer un compte</button>
      </form>
      <p className="mt-3">{message}</p>
    </div>
  );
};

export default Register;
