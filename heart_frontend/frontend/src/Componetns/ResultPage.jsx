import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ResultPage.css';

const ResultPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { result, formData } = state || {};

  if (!result || !formData) {
    return (
      <div className="result-container">
        <h2>Error</h2>
        <p>No data found. Please go back and submit the form.</p>
        <button onClick={() => navigate('/')}>Back to Form</button>
      </div>
    );
  }

  return (
    <div className="result-container">
      <h1>Your Heart Disease Risk</h1>
      <div className={`result-card ${result === 'high' ? 'high' : 'low'}`}>
        <h2>{result === 'high' ? '⚠️ High Risk' : '✅ Low Risk'}</h2>
        <p>
          {result === 'high'
            ? 'Your data indicates a high risk of heart disease. We recommend consulting a healthcare professional for a detailed evaluation.'
            : 'Your data suggests a low risk of heart disease. Continue maintaining a healthy lifestyle.'}
        </p>
      </div>
      <h3>Your Submitted Details:</h3>
      <ul className="summary-list">
        {Object.entries(formData).map(([key, value]) => (
          <li key={key}><strong>{key.replace(/([a-z])([A-Z])/g, '$1 $2')}:</strong> {value}</li>
        ))}
      </ul>
      <button onClick={() => navigate('/')}>Go Back</button>
    </div>
  );
};

export default ResultPage;
