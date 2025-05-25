import React, { useEffect, useState } from 'react';
import { getRandomDogImage, getAllBreeds } from '../api/dogAPI';

const Quiz = () => {
  const [question, setQuestion] = useState(null);
  const [breeds, setBreeds] = useState([]);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      console.log("Fetching image...");
      const image = await getRandomDogImage();
      console.log("Image fetched:", image);
  
      const allBreeds = await getAllBreeds();
      console.log("Breeds fetched:", allBreeds);
  
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
    } catch (error) {
      console.error("Erreur dans loadData:", error);
    }
  };
  

  const handleAnswer = (choice) => {
    if (answered) return;

    setAnswered(true);
    if (choice === question.correct) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => loadData(), 1500);
  };

  if (!question) return <p>Chargement...</p>;

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Quelle est la race de ce chien ?</h2>
      <img src={question.url} alt="Chien" style={{ width: 300, borderRadius: 10 }} />
      <div style={{ marginTop: 20 }}>
        {question.options.map((b, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(b.name)}
            style={{ display: 'block', margin: '10px auto', padding: '10px 20px' }}
          >
            {b.name}
          </button>
        ))}
      </div>
      <p>Score : {score}</p>
    </div>
  );
};

export default Quiz;
