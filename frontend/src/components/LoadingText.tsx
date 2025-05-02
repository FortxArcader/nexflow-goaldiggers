import React, { useEffect, useState } from 'react';
import "../styles/LoadingText.css";

const loadingPhrases = [
    "Processing your input... because somehow now computers have feelings ey!",
    "Searching knowledge base... under layers and layers of digital cobwebs.",
    "Generating insights... that you'll probably ignore anyway :( .",
    "Crafting personalized response... tailored to your choice.",
    "Almost ready... try not to pass out from the suspense."
];

const LoadingText: React.FC = () => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      
      setTimeout(() => {
        setCurrentPhrase((prev) => (prev + 1) % loadingPhrases.length);
        setIsAnimating(false);
      }, 200);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-text-wrapper">
      <div className={`loading-phrase ${isAnimating ? 'fade-out' : 'fade-in'}`}>
        {loadingPhrases[currentPhrase]}
      </div>
    </div>
  );
};

export default LoadingText;