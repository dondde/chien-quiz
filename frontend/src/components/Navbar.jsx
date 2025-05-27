import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">ChienQuiz</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto">
          {isAuthenticated && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/quiz">Quiz</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/resultats">Résultats</Link>
              </li>
            </>
          )}
        </ul>
        <ul className="navbar-nav">
          {isAuthenticated ? (
            <li className="nav-item">
              <button className="btn btn-outline-light" onClick={handleLogout}>
                Déconnexion
              </button>
            </li>
          ) : (
            <>
              <li className="nav-item me-2">
                <Link className="btn btn-outline-light" to="/login">Connexion</Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-outline-light" to="/register">Inscription</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
