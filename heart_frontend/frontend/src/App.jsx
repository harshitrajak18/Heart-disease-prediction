import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeartForm from './Componetns/HeartForm';
import ResultPage from './Componetns/ResultPage';
import Home from './Componetns/Home';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path ="/" element={<Home/>}/>
        <Route path="/predict" element={<HeartForm/>} />
        <Route path="/result" element={<ResultPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
