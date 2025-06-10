import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/header.js';
import Footer from './components/footer.js';
import Home from './components/Home.js';
import Lligues from './components/Lligues.js';
import LliguesConcret from './components/Lligues_Concret.js';
import Equips from './components/Equips.js';
import EquipsConcret from './components/Equips_Concret.js';
import Jugadors from './components/Jugadors.js';
import JugadorsConcret from './components/Jugadors_Concret.js';
import QueSom from './components/QueSom.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lligues" element={<Lligues />} />
          <Route path="/lligues/:ligaId" element={<LliguesConcret />} /> 
          <Route path="/equips" element={<Equips />} />
          <Route path="/equips/:teamId" element={<EquipsConcret />} />
          <Route path="/jugadors" element={<Jugadors />} />
          <Route path="/jugadors/:jugadorId" element={<JugadorsConcret />} />
          <Route path="/quesom" element={<QueSom />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
