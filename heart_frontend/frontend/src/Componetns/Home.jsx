import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const quotes = [
  { text: "The greatest wealth is health.", author: "Virgil" },
  { text: "It is health that is real wealth and not pieces of gold and silver.", author: "Mahatma Gandhi" },
  { text: "A fit body, a calm mind, a house full of love. These things cannot be bought – they must be earned.", author: "Naval Ravikant" },
  { text: "Your heart is the most powerful muscle in your body—treat it with care.", author: "Unknown" },
];

export default function Home() {
  const [idx, setIdx] = useState(0);

  const nextQuote = () => {
    setIdx((prev) => (prev + 1) % quotes.length);
  };

  // Auto-rotate quotes every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextQuote();
    }, 10000);
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="home-container">
      <div className="hero-card">
        <h1 className="hero-title">Listen to Your Heart ❤️</h1>
        <p className="hero-subtitle">
          “Your heart tells a story—let’s help you read it.”
        </p>
        <Link to="/predict" className="neon-button predict-button">
          Predict Now
        </Link>
      </div>

      <div className="quote-section">
        <div className="quote-card">
          <p className="quote-text">“{quotes[idx].text}”</p>
          <p className="quote-author">— {quotes[idx].author}</p>
        </div>
      </div>
    </div>
  );
}
