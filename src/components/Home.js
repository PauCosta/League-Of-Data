import React, { useState, useRef, useEffect } from 'react';
import './styles/Home.css';

function Home() {
  return (
    <div className="main-container">

      <main className="main-content">
        <h1>League of Data (LoD)</h1>
        <p>
          La primera pàgina web de visualització de dades d’equips professionals del videojoc
          <br />
          League of Legends en català!
        </p>

        <img
          src="/home_image1.png"
          alt="League of Legends"
          className="main-image"
        />

        <div className="dictionary-section">
          <p>
            Estàs perdut? Hi ha conceptes que no entens?
            <br />
            Ja està disponible el{' '}
            <a
              href="https://es.scribd.com/document/672949555/Diccionari-LOL-en-catala#from_embed"
              className="highlight-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              diccionari de League of Legends en català!
            </a>
          </p>
          <a
            href="https://es.scribd.com/document/672949555/Diccionari-LOL-en-catala#from_embed"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/home_diccionari.png" 
              alt="Diccionari"
              className="dictionary-icon"
            />
          </a>
        </div>
      </main>

    </div>
  );
}

export default Home;
