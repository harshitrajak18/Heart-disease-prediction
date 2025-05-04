import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HeartForm.css';

const HeartForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    cp: '',
    fbs: '',
    restecg: '',
    exang: '',
    slope: '',
    ca: '',
    thal: '',
    chol: '',
    thalach: '',
    oldpeak: '',
    trestbps: ''
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    setResult(null);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    for (const key in formData) {
      if (formData[key] === '') {
        setError('Please fill in all fields.');
        return;
      }
    }

    const age = parseInt(formData.age);
    const chol = parseInt(formData.chol);
    let riskScore = 0;
    if (age > 60) riskScore += 1;
    if (chol > 240) riskScore += 1;
    if (formData.cp === 'Typical Angina') riskScore += 1;
    if (formData.exang === 'Yes') riskScore += 1;

    const prediction = riskScore >= 2 ? 'high' : 'low';
    setResult(prediction);

    // Redirect to /result with state
    navigate('/result', { state: { formData, result: prediction } });
  };

  return (
    <div className="heart-form-container">
      <h1>Heart Disease Risk Calculator</h1>
      <p>Enter your health details below to assess your risk of heart disease.</p>
      <form onSubmit={handleSubmit}>
        {[
          { label: "Age (years)", name: "age", type: "number", placeholder: "e.g., 45" },
          { label: "Sex", name: "sex", type: "select", options: ["Male", "Female", "Other"] },
          { label: "Chest Pain Type", name: "cp", type: "select", options: ["Typical Angina", "Atypical Angina", "Non-anginal Pain", "Asymptomatic"] },
          { label: "Fasting Blood Sugar > 120 mg/dL", name: "fbs", type: "select", options: ["Yes", "No"] },
          { label: "Resting ECG Results", name: "restecg", type: "select", options: ["Normal", "ST-T Abnormality", "Left Ventricular Hypertrophy"] },
          { label: "Exercise-Induced Angina", name: "exang", type: "select", options: ["Yes", "No"] },
          { label: "ST Slope", name: "slope", type: "select", options: ["Upsloping", "Flat", "Downsloping"] },
          { label: "Number of Major Vessels", name: "ca", type: "select", options: ["0", "1", "2", "3"] },
          { label: "Thalassemia", name: "thal", type: "select", options: ["Normal", "Fixed Defect", "Reversible Defect"] },
          { label: "Cholesterol (mg/dL)", name: "chol", type: "number", placeholder: "e.g., 200" },
          { label: "Max Heart Rate Achieved", name: "thalach", type: "number", placeholder: "e.g., 150" },
          { label: "ST Depression (oldpeak)", name: "oldpeak", type: "number", placeholder: "e.g., 1.0", step: "0.1" },
          { label: "Resting Blood Pressure (mm Hg)", name: "trestbps", type: "number", placeholder: "e.g., 120" }
        ].map((field, index) => (
          <div className="form-group" key={index}>
            <label htmlFor={field.name}>{field.label}</label>
            {field.type === "select" ? (
              <select id={field.name} name={field.name} value={formData[field.name]} onChange={handleChange} required>
                <option value="">Select...</option>
                {field.options.map(opt => (
                  <option value={opt} key={opt}>{opt}</option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
                required
                {...(field.step && { step: field.step })}
              />
            )}
          </div>
        ))}

        {error && <div className="error-message">{error}</div>}

        <button type="submit">Calculate Risk</button>
      </form>

      {result && (
        <div className={`result-message ${result === 'low' ? 'low-risk' : 'high-risk'}`}>
          {result === 'low'
            ? '✅ You are at low risk of heart disease.'
            : '⚠️ You might be at high risk of heart disease. Please consult a doctor.'}
        </div>
      )}
    </div>
  );
};

export default HeartForm;
