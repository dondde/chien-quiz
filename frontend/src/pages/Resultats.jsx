import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Resultats = () => {
  const [sessions, setSessions] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setMessage("Vous devez être connecté pour voir vos résultats.");
      return;
    }

    axios.get('http://127.0.0.1:8000/api/quiz/sessions/', {
      headers: {
        Authorization: `Token ${token}`
      }
    })
      .then(res => setSessions(res.data))
      .catch(err => {
        console.error(err);
        setMessage("Erreur lors du chargement des résultats.");
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2>Vos Résultats</h2>
      {message && <p>{message}</p>}

      {sessions.length === 0 && !message && <p>Aucun score enregistré pour l’instant.</p>}

      <ul className="list-group">
        {sessions.map((session) => (
          <li key={session.id} className="list-group-item d-flex justify-content-between">
            <span>Score : {session.score}/10</span>
            <span>Date : {new Date(session.date_played).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Resultats;
