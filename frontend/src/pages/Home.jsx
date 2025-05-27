import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const bgStyle = {
    backgroundImage: `url('/chien.avif')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '90vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div style={bgStyle}>
      <div className="text-center bg-white bg-opacity-75 p-5 rounded shadow-lg">
        <h1 className="display-4">Bienvenue sur ChienQuiz 🐶</h1>
        <p className="lead mt-3">
          Teste tes connaissances sur les races de chiens avec un quiz visuel amusant !
        </p>
        <div className="mt-4">
          <Link to="/quiz" className="btn btn-primary btn-lg me-3">Commencer le quiz</Link>
          <Link to="/resultats" className="btn btn-outline-secondary btn-lg">Voir mes résultats</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
