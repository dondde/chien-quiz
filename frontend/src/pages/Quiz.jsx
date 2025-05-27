import React, { useEffect, useState, useRef } from 'react';
import { getRandomDogImage, getAllBreeds } from '../api/dogAPI';
import { getCurrentUser } from '../api/auth';
import axios from 'axios';

const Quiz = () => {
  const [question, setQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState(null);
  const [user, setUser] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [finished, setFinished] = useState(false);
  const [timer, setTimer] = useState(10);
  const timerRef = useRef(null);

  useEffect(() => {
    getCurrentUser().then(setUser);
    loadData();
  }, []);

  useEffect(() => {
    if (!answered && question && !finished) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            clearInterval(timerRef.current);
            handleAnswer("time_expired");
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [questionNumber, question]);

  const loadData = async () => {
    try {
      const image = await getRandomDogImage();
      const allBreeds = await getAllBreeds();

      const correctBreed = image.breeds[0];
      const incorrect = allBreeds
        .filter(b => b.name !== correctBreed.name)
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);

      const options = [...incorrect, correctBreed].sort(() => 0.5 - Math.random());

      setQuestion({
        url: image.url,
        correct: correctBreed.name,
        options,
      });

      setAnswered(false);
      setTimer(10);
    } catch (error) {
      console.error("Erreur dans loadData:", error);
    }
  };

  const handleAnswer = (choice) => {
    if (answered || finished || !question) return;

    clearInterval(timerRef.current);
    setAnswered(true);
    setSelected(choice);

    if (choice === question.correct) {
      setScore(prev => prev + 1);
      new Audio('/correct.wav').play();
    } else if (choice !== "time_expired") {
      new Audio('/wrong.wav').play();
    }

    setTimeout(() => {
      if (questionNumber >= 10) {
        setFinished(true);
        sendScore();
      } else {
        setQuestionNumber(prev => prev + 1);
        setSelected(null);
        loadData();
      }
    }, 1000);
  };

  const sendScore = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      await axios.post('http://127.0.0.1:8000/api/quiz/sessions/create/', {
        score: score
      }, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error("Erreur enregistrement score :", error);
    }
  };

  if (finished) {
    return (
      <div className="container mt-4 text-center">
        <h2>Quiz terminé !</h2>
        <p>Votre score : <strong>{score} / 10</strong></p>
        <button className="btn btn-primary mt-3" onClick={() => {
          setScore(0);
          setQuestionNumber(1);
          setFinished(false);
          setSelected(null);
          loadData();
        }}>
          Rejouer
        </button>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="container mt-4 text-center">
        <p>Chargement de la question...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4 text-center">
      {user && <p className="fw-bold">Bienvenue, {user.username} !</p>}
      <p className="text-muted">Question {questionNumber} sur 10 — Temps restant : {timer}s</p>
      <h2>Quelle est la race de ce chien ?</h2>
      <img src={question.url} alt="Chien" className="img-fluid rounded my-3" style={{ maxWidth: 300 }} />

      <div>
        {question.options.map((b, i) => {
          let btnClass = 'btn d-block mx-auto my-2 ';

          if (answered) {
            if (b.name === question.correct) {
              btnClass += 'btn-success';
            } else if (b.name === selected) {
              btnClass += 'btn-danger';
            } else {
              btnClass += 'btn-outline-secondary';
            }
          } else {
            btnClass += 'btn-outline-primary';
          }

          return (
            <button
              key={i}
              onClick={() => handleAnswer(b.name)}
              className={btnClass}
              disabled={answered}
            >
              {b.name}
            </button>
          );
        })}
      </div>

      <p className="mt-3">Score : {score}</p>
    </div>
  );
};

export default Quiz;
